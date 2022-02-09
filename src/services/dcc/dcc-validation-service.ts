import b45 from 'base45-web';
import zlib from 'browserify-zlib';
import cose from 'cose-js';
import dayjs from 'dayjs';
import ecKey from 'ec-key';
import { IKey } from '../crypto-interfaces';
import { DCCValues, DefaultValues, ValidationStepState } from './constants';
import { CoseSign1_Object } from './Cose/CoseSign1_Object';
import { IValidationContext } from './dcc-interfaces';

export const validateDCC = async (
  data: string,
  publicKeyPem: string
): Promise<IValidationContext> => {
  const validationContext = DefaultValues.ValidationContext;

  const contextIdentifier = data.substring(0, 4);

  if (contextIdentifier !== DCCValues.HcertContextIdentifier) {
    validationContext.contextIdentifier = {
      ...validationContext.contextIdentifier,
      state: ValidationStepState.Failed,
      message: `'${contextIdentifier}' is not a valid context identifier`
    };
  }

  const base45Data = data.replace(DCCValues.HcertContextIdentifier, '');

  const compressedData = b45.decode(base45Data);

  const signedCose = zlib.inflateSync(Buffer.from(compressedData));

  const decodedCose = CoseSign1_Object.decode(signedCose);

  const issuingDate = dayjs.unix(decodedCose.notValidBefore);

  if (issuingDate > dayjs()) {
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

  const expiryDate = dayjs.unix(decodedCose.expiry);

  if (expiryDate < dayjs()) {
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

  const { x, y } = new ecKey(publicKeyPem);

  const verifier: IKey = {
    key: {
      x: Buffer.from(x),
      y: Buffer.from(y)
    }
  };

  try {
    await cose.sign.verify(signedCose, verifier);

    validationContext.signautre = {
      ...validationContext.signautre,
      state: ValidationStepState.Passed
    };
  } catch (err) {
    validationContext.signautre = {
      ...validationContext.signautre,
      state: ValidationStepState.Failed,
      message: `Signature could not be verified`
    };
  }

  return {
    ...validationContext,
    decodedCose: decodedCose
  };
};
