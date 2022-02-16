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
import {
  supportedAlgorithms,
  x509AlgorithmsToCOSEAlgortihms
} from '../constants';
import {
  EUDCC,
  RecoveryEntry,
  TestEntry,
  VaccinationEntry
} from './dcc-combined-schema';
import { IKey } from '../crypto-interfaces';
import {
  IDCCGenerationResponse,
  IPersonalDetails,
  ISecurityClaims,
  ISigningDetails
} from './dcc-interfaces';
import { DCCEntryType, DCCValues } from './constants';
import icaotransliteration from 'icao-transliteration';

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

const getSigningAlgorithm = async (dscPem: string): Promise<string> => {
  const parsedX509 = await x509.parse(dscPem, 'pem');

  return x509AlgorithmsToCOSEAlgortihms[
    parsedX509.signatureAlgorithm.algorithm
  ];
};

const getPrivateKeySigner = (
  privateKeyPem: string,
  signingAlgorithm: string
): IKey => {
  if (supportedAlgorithms.includes(signingAlgorithm)) {
    const { d } = new ecKey(privateKeyPem);

    return {
      key: {
        d: Buffer.from(d)
      }
    };
  }

  throw new Error(`Unsupported signing algorithm: ${signingAlgorithm}`);
};

const getPayloadDetails = (
  dccType: DCCEntryType,
  payloadDetails: VaccinationEntry | RecoveryEntry | TestEntry
): EUDCC => {
  switch (dccType) {
    case DCCEntryType.Vaccination:
      return { v: [payloadDetails as VaccinationEntry] };
    case DCCEntryType.Recovery:
      return { r: [payloadDetails as RecoveryEntry] };
    case DCCEntryType.Test:
      const testEntry = { ...payloadDetails } as TestEntry;

      if (testEntry.tt === DCCValues.NAATValue) {
        delete testEntry.ma;
      } else {
        delete testEntry.nm;
      }

      return { t: [testEntry] };
    default:
      throw new Error('DCC Type not set');
  }
};

export const generateDCC = async (
  personalDetails: IPersonalDetails,
  securityClaims: ISecurityClaims,
  signingDetails: ISigningDetails,
  payloadDetails: VaccinationEntry | RecoveryEntry | TestEntry,
  dccType: DCCEntryType
): Promise<IDCCGenerationResponse> => {
  const expEpoch = dayjs(securityClaims.expiry).unix();
  const iatEpoch = dayjs(securityClaims.issuingDate).unix();

  const fnTransliterated = icaotransliteration(
    personalDetails.foreName.toUpperCase()
  );
  const gnTransliterated = icaotransliteration(
    personalDetails.givenName.toUpperCase()
  );

  const dccPayload: EUDCC = {
    ...getPayloadDetails(dccType, payloadDetails),
    ver: '1.3.0',
    nam: {
      gn: personalDetails.givenName,
      gnt: gnTransliterated,
      fnt: fnTransliterated
    },
    fn: personalDetails.foreName,
    dob: personalDetails.dob
  };

  const hcert = new Map();
  hcert.set(1, dccPayload);

  const fullPayloadMap = new Map();
  fullPayloadMap.set(CWT_ISSUER, securityClaims.issuerCountry);
  fullPayloadMap.set(CWT_EXP, expEpoch);
  fullPayloadMap.set(CWT_IAT, iatEpoch);
  fullPayloadMap.set(CWT_HCERT, hcert);

  const cborPayload = cbor.encode(fullPayloadMap);

  const publicKeyPem = await getPublicKeyPem(signingDetails.dscPem);

  const kid = extractKid(signingDetails.dscPem);
  const signingAlgorithm = await getSigningAlgorithm(signingDetails.dscPem);

  const privateKeySigner = getPrivateKeySigner(
    signingDetails.privateKeyPem,
    signingAlgorithm
  );

  const headers = {
    p: {
      alg: signingAlgorithm,
      kid: kid
    },
    u: {}
  };

  const signedCose = (await cose.sign.create(
    headers,
    cborPayload,
    privateKeySigner
  )) as Buffer;

  const zippedCose = zlib.deflateSync(signedCose);

  const base45Encoded = base45.encode(zippedCose);

  const prefixed = `${hcertContextIdentifier}${base45Encoded}`;

  return {
    signedHcert: prefixed,
    kid: Buffer.from(kid).toString('base64'),
    publicKeyPem
  } as IDCCGenerationResponse;
};
