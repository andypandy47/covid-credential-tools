import base45 from 'base45-web';
import zlib from 'browserify-zlib';
import cbor from 'cbor';
import cose from 'cose-js';
import dayjs from 'dayjs';
import ecKey from 'ec-key';
import { Base64 } from 'js-base64';
import x509 from 'js-x509-utils';
import jwkToPem from 'jwk-to-pem';
import sha256 from 'sha256';
import { EUDCC } from './dcc-combined-schema';
import { IDCCGenerationResponse, ISecurityClaims } from './interfaces';

const certPem = `
-----BEGIN CERTIFICATE-----
MIICCTCCAa+gAwIBAgIUQ4CHxP8wPIcOT00z9CHO4EyG9mAwCgYIKoZIzj0EAwIw
MzELMAkGA1UEBhMCR0IxEDAOBgNVBAgTB0VuZ2xhbmQxEjAQBgNVBAoTCVRlc3Qg
Q2VydDAeFw0yMjAxMjQyMDMzMTJaFw0yNDAxMTQyMDMzMTJaMDMxCzAJBgNVBAYT
AkdCMRAwDgYDVQQIEwdFbmdsYW5kMRIwEAYDVQQKEwlUZXN0IENlcnQwWTATBgcq
hkjOPQIBBggqhkjOPQMBBwNCAATl1vhZhStzxWGeZU9YudQV9CvKfycOJa73YllW
V7fDo3CdL+/iw4XIMgmC4Gshx5R6jAPDy/B5VfPfC7Wk1Srgo4GgMIGdMB0GA1Ud
DgQWBBTp+tzQ0Iu5/XyYRPftUGXFxMehWzBuBgNVHSMEZzBlgBTp+tzQ0Iu5/XyY
RPftUGXFxMehW6E3pDUwMzELMAkGA1UEBhMCR0IxEDAOBgNVBAgTB0VuZ2xhbmQx
EjAQBgNVBAoTCVRlc3QgQ2VydIIUQ4CHxP8wPIcOT00z9CHO4EyG9mAwDAYDVR0T
BAUwAwEB/zAKBggqhkjOPQQDAgNIADBFAiAOfMgGPC7U8cPdXyWbERwX8BcWdCtc
5QTNnNIu7LKGnAIhALhzHN6LTqkkVTC0Zjqdq2WM0dYqnTM3MSq2/kyNwGO/
-----END CERTIFICATE-----
`;

const privateKeyPem = `
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIL//YMwZwS233Q589Ug1btmvDxbQ2G5X4KoI6qt93b7/oAoGCCqGSM49
AwEHoUQDQgAE5db4WYUrc8VhnmVPWLnUFfQryn8nDiWu92JZVle3w6NwnS/v4sOF
yDIJguBrIceUeowDw8vweVXz3wu1pNUq4A==
-----END EC PRIVATE KEY-----
`;

const certPrefix = '-----BEGIN CERTIFICATE-----\n';
const certPostfix = '-----END CERTIFICATE-----';
const pubKeyPrefix = '-----BEGIN PUBLIC KEY-----\n';
const pubKeyPostfix = '-----END PUBLIC KEY-----';
const privateKeyPrefix = '-----BEGIN EC PRIVATE KEY-----\n';
const privateKeyPostfix = '-----END EC PRIVATE KEY-----';

const CWT_ISSUER = 1;
const CWT_EXP = 4;
const CWT_IAT = 6;
const CWT_HCERT = -260;

const hcertContextIdentifier = 'HC1:';

const removeCertTags = (cert: string) => {
  return cert.replace(certPrefix, '').replace(certPostfix, '');
};

const removePrivateKeyTags = (privateKey: string) => {
  return privateKey
    .replace(privateKeyPrefix, '')
    .replace(privateKeyPostfix, '');
};

const extractKid = (cert: string): Uint8Array => {
  const certNoTags = removeCertTags(cert);
  const decodedCert = Base64.toUint8Array(certNoTags);

  const hashBuffer = sha256(decodedCert, { asBytes: true }) as Uint8Array;

  return hashBuffer.slice(0, 8);
};

export const generateDCC = async (
  eudccPayload: EUDCC,
  securityClaims: ISecurityClaims
): Promise<IDCCGenerationResponse> => {
  const expEpoch = dayjs(securityClaims.expiry).unix();
  const iatEpoch = dayjs(securityClaims.issuingDate).unix();

  const hcert = new Map();
  hcert.set(1, eudccPayload);

  const fullPayloadMap = new Map();
  fullPayloadMap.set(CWT_ISSUER, securityClaims.issuerCountry);
  fullPayloadMap.set(CWT_EXP, expEpoch);
  fullPayloadMap.set(CWT_IAT, iatEpoch);
  fullPayloadMap.set(CWT_HCERT, hcert);

  const cborPayload = cbor.encode(fullPayloadMap);

  const privateKey = new ecKey(privateKeyPem, 'pem');

  const publicKeyJWK = await x509.toJwk(certPem, 'pem');
  const publicKeyPem = jwkToPem(publicKeyJWK);

  const kid = extractKid(certPem);

  const headers = {
    p: {
      alg: 'ES256',
      kid: kid,
    },
    u: {},
  };

  const signer = {
    key: {
      d: Buffer.from(privateKey.d),
    },
  };

  const signedCose = (await cose.sign.create(
    headers,
    cborPayload,
    signer
  )) as Buffer;

  const zippedCose = zlib.deflateSync(signedCose);

  const base45Encoded = base45.encode(zippedCose);

  const prefixed = `${hcertContextIdentifier}${base45Encoded}`;

  return {
    signedHcert: prefixed,
    kid: Buffer.from(kid).toString('base64'),
    publicKeyPem: publicKeyPem,
  } as IDCCGenerationResponse;
};
