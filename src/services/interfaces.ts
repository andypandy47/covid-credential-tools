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
}
