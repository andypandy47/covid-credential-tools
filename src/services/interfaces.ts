import { DCCEntryType } from './constants';

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

export interface ISigner {
  key: IECSigner;
}

export interface IECSigner {
  d: Buffer;
}

export interface IRSASigner {
  e: string | number;
  n: Buffer;
  d: Buffer;
  p: Buffer;
  q: Buffer;
  dmp1: Buffer;
  dmq1: Buffer;
  coeff: Buffer;
}
