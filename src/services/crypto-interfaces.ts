export interface IKey {
  key: IECSigner | IECVerifier;
}

export interface INationalBackendPublicKey {
  kid: string;
  publicKey: string;
  country: string;
}

export interface INationalBackendKeysByEnvironment {
  ACC: INationalBackendPublicKey[];
  PROD: INationalBackendPublicKey[];
  lastFetched: string;
}

export interface IECSigner {
  d: Buffer;
}

export interface IECVerifier {
  x: Buffer;
  y: Buffer;
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
