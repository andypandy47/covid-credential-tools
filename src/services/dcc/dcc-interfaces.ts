import { DCCEntryType, ValidationStepState } from './constants';
import { CoseSign1_Object } from './Cose/CoseSign1_Object';

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
  dccType: DCCEntryType;
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
