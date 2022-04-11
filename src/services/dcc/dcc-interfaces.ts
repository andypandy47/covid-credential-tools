import { DCCEntryType, ValidationStepState } from './constants';
import { CoseSign1_Object } from './Cose/CoseSign1_Object';
import { EUDCC } from './dcc-combined-schema';

export interface IPersonalDetails {
  givenName: string;
  foreName: string;
  dob: string;
}

export interface ISecurityClaims {
  issuerCountry: string;
  issuingDate: string;
  expiry: string;
}

export interface IDCCGenerationResponse {
  signedHcert: string;
  kid: string;
  publicKeyPem: string;
  expectedDCCPayload: IDCC;
  dccType: DCCEntryType;
}

export interface IDCC {
  iat: number;
  exp: number;
  iss: string;
  hCert: {
    euHcertV1Schema: EUDCC;
  };
}

export interface ISigningDetails {
  privateKeyPem: string;
  dscPem: string;
}

export interface IValidationStep {
  title: string;
  state: ValidationStepState;
  message?: string;
}

export interface IValidationContext {
  contextIdentifier: IValidationStep;
  coseFormat: IValidationStep;
  issuingDate: IValidationStep;
  expiryDate: IValidationStep;
  signautre: IValidationStep;
  decodedCose?: CoseSign1_Object;
}
