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
import { DefaultValues } from './constants';
import { EUDCC } from './dcc-combined-schema';
import {
  ISigningDetails,
  IDCCGenerationResponse,
  ISecurityClaims,
} from './interfaces';

const certPrefix = '-----BEGIN CERTIFICATE-----\n';
const certPostfix = '-----END CERTIFICATE-----';

const CWT_ISSUER = 1;
const CWT_EXP = 4;
const CWT_IAT = 6;
const CWT_HCERT = -260;

const hcertContextIdentifier = 'HC1:';

const removeCertTags = (cert: string) => {
  return cert.replace(certPrefix, '').replace(certPostfix, '');
};

const extractKid = (cert: string): Uint8Array => {
  const certNoTags = removeCertTags(cert);
  const decodedCert = Base64.toUint8Array(certNoTags);

  const hashBuffer = sha256(decodedCert, { asBytes: true }) as Uint8Array;

  return hashBuffer.slice(0, 8);
};

const getPublicKeyPem = async (dscPem: string): Promise<string> => {
  const publicJwk = await x509.toJwk(dscPem, 'pem');

  return jwkToPem(publicJwk);
};

export const generateDCC = async (
  eudccPayload: EUDCC,
  securityClaims: ISecurityClaims,
  signingDetails: ISigningDetails
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

  const privateKey = new ecKey(signingDetails.privateKeyPem, 'pem');

  const publicKeyPem = await getPublicKeyPem(signingDetails.dscPem);

  const kid = extractKid(signingDetails.dscPem);

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
