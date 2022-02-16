import b45 from 'base45-web';
import zlib from 'browserify-zlib';
import cose from 'cose-js';
import dayjs from 'dayjs';
import ecKey from 'ec-key';
import { IKey, INationalBackendKeysByEnvironment } from '../crypto-interfaces';
import {
  DCCValues,
  DefaultValues,
  ValidationStepState,
  ValidationType
} from './constants';
import { CoseSign1_Object } from './Cose/CoseSign1_Object';
import { IValidationContext } from './dcc-interfaces';

const formatSpkiAsPem = (spki: string): string => {
  if (!spki) {
    return '';
  }

  const publicKeyPrefix = '-----BEGIN PUBLIC KEY-----\n';
  const publicKeyPostfix = '-----END PUBLIC KEY-----';

  const publicKeyPEM = `${publicKeyPrefix}${spki
    .match(/.{0,64}/g)
    .join('\n')}${publicKeyPostfix}`;

  return publicKeyPEM;
};

export const validateDCC = async (
  data: string,
  nationalBackendKeys: INationalBackendKeysByEnvironment,
  publicKeyPem: string,
  validationType: ValidationType
): Promise<IValidationContext> => {
  const validationContext = DefaultValues.ValidationContext;

  const contextIdentifier = data.substring(0, 4);

  if (contextIdentifier !== DCCValues.HcertContextIdentifier) {
    validationContext.contextIdentifier = {
      ...validationContext.contextIdentifier,
      state: ValidationStepState.Failed,
      message: `'${contextIdentifier}' is not a valid context identifier`
    };
  } else {
    validationContext.contextIdentifier = {
      ...validationContext.contextIdentifier,
      state: ValidationStepState.Passed
    };
  }

  const base45Data = data.replace(DCCValues.HcertContextIdentifier, '');

  const compressedData = b45.decode(base45Data);

  const signedCose = zlib.inflateSync(Buffer.from(compressedData));

  let decodedCose = {} as CoseSign1_Object;

  try {
    decodedCose = CoseSign1_Object.decode(signedCose);

    validationContext.coseFormat = {
      ...validationContext.coseFormat,
      state: ValidationStepState.Passed
    };
  } catch (err) {
    validationContext.coseFormat = {
      ...validationContext.coseFormat,
      state: ValidationStepState.Failed
    };
  }

  const issuingDate = dayjs.unix(decodedCose?.notValidBefore);

  if (issuingDate && issuingDate > dayjs()) {
    validationContext.issuingDate = {
      ...validationContext.issuingDate,
      state: ValidationStepState.Failed,
      message: `Certificate is valid staring from ${issuingDate.format(
        'DD/MM/YYYY'
      )}`
    };
  } else {
    validationContext.issuingDate = {
      ...validationContext.issuingDate,
      state: ValidationStepState.Passed
    };
  }

  const expiryDate = dayjs.unix(decodedCose?.expiry);

  if (expiryDate && expiryDate < dayjs()) {
    validationContext.expiryDate = {
      ...validationContext.expiryDate,
      state: ValidationStepState.Failed,
      message: `Ceritificate expired on ${expiryDate.format('DD/MM/YYYY')}`
    };
  } else {
    validationContext.expiryDate = {
      ...validationContext.expiryDate,
      state: ValidationStepState.Passed
    };
  }

  try {
    switch (validationType) {
      case ValidationType.PublicKey: {
        const verifier = getVerifierFromPem(publicKeyPem);

        await cose.sign.verify(signedCose, verifier);

        validationContext.signautre = {
          ...validationContext.signautre,
          state: ValidationStepState.Passed
        };
      }
      case ValidationType.NBProd || ValidationType.NBAcc: {
        const keyObject = getKeyFromNationalBackend(
          decodedCose.keyIdentifier,
          nationalBackendKeys
        );

        if (!keyObject) {
          throw new Error(
            `Could not find Key Id: [${decodedCose.keyIdentifier}] in Gateway`
          );
        }

        const keyPem = formatSpkiAsPem(keyObject?.publicKey);

        const verifier = getVerifierFromPem(keyPem);

        await cose.sign.verify(signedCose, verifier);

        validationContext.signautre = {
          ...validationContext.signautre,
          state: ValidationStepState.Passed
        };
      }
    }
  } catch (err) {
    let message = 'Could not be verified';

    if (err instanceof Error) {
      message = err.message;
    }

    validationContext.signautre = {
      ...validationContext.signautre,
      state: ValidationStepState.Failed,
      message
    };

    console.error(err);
  }

  return {
    ...validationContext,
    decodedCose
  };
};

const getKeyFromNationalBackend = (
  kid: string,
  nationalBackendKeys: INationalBackendKeysByEnvironment
) => {
  const prodKeyIndex = nationalBackendKeys?.PROD?.findIndex((key) => {
    return key.kid === kid;
  });

  if (prodKeyIndex !== -1) {
    return nationalBackendKeys?.PROD[prodKeyIndex];
  }

  const accKeyIndex = nationalBackendKeys?.ACC?.findIndex((key) => {
    return key.kid === kid;
  });

  if (accKeyIndex !== -1) {
    return nationalBackendKeys?.ACC[accKeyIndex];
  }

  return null;
};

const getVerifierFromPem = (publicKeyPem: string): IKey => {
  const { x, y } = new ecKey(publicKeyPem);

  const verifier: IKey = {
    key: {
      x: Buffer.from(x),
      y: Buffer.from(y)
    }
  };

  return verifier;
};
