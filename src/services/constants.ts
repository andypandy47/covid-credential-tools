export class Styles {
  public static readonly InputWidth = '400px';

  public static readonly PageWidth = '1000px';
}
export class SignatureAlgortihms {
  public static readonly ES256 = 'ES256';
  public static readonly ES384 = 'ES384';
  public static readonly ES512 = 'ES512';
  public static readonly PS256 = 'PS256';
  public static readonly PS384 = 'PS384';
  public static readonly PS512 = 'PS512';
}

export const supportedAlgorithms = [
  SignatureAlgortihms.ES256,
  SignatureAlgortihms.ES384,
  SignatureAlgortihms.ES512
];

export const x509AlgorithmsToCOSEAlgortihms = {
  // ECDSA
  'ecdsa-with-sha256': SignatureAlgortihms.ES256,
  'ecdsa-with-sha384': SignatureAlgortihms.ES384,
  'ecdsa-with-sha512': SignatureAlgortihms.ES512,
  'ecdsa-with-sha1': '',

  // RSASSA-PKCS1-v1_5
  sha256WithRSAEncryption: SignatureAlgortihms.PS256,
  sha384WithRSAEncryption: SignatureAlgortihms.PS384,
  sha512WithRSAEncryption: SignatureAlgortihms.PS512,
  sha1WithRSAEncryption: '',
  rsassaPss: ''
};
