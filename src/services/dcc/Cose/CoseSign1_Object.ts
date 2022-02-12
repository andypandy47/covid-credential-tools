import cbor from 'cbor';
import { EUDCC } from '../dcc-combined-schema';

const HeaderParameterKey = {
  KID: 4,
  ALG: 1
};

const ContentParameterKey = {
  ISS: 1,
  EXP: 4,
  NBF: 6,
  HCERT: -260
};

export class CoseSign1_Object {
  constructor(decodedCose: IDecodedCose) {
    if (decodedCose.value.length !== 4) {
      throw new Error(
        `Invalid COSE_Sign1 structure - Expected an array of 4 items - but instead received ${decodedCose.value.length} items`
      );
    }

    this.protectedAttributes = cbor.decode(decodedCose.value[0] as Uint8Array);
    this.unprotectedAttributes = decodedCose.value[1] as Map<
      number,
      number | Uint8Array
    >;
    this.content = cbor.decode(decodedCose.value[2] as Uint8Array);
    this.signature = decodedCose.value[3] as Uint8Array;
  }

  public static readonly messageTag: number = 18;

  public protectedAttributes: Map<number, number | Uint8Array>;

  public unprotectedAttributes: Map<number, number | Uint8Array>;

  public content: Map<number, number | string | Map<number, EUDCC>>;

  public signature: Uint8Array;

  public static decode(data: Buffer): CoseSign1_Object {
    return new CoseSign1_Object(cbor.decode(data));
  }

  public get keyIdentifier(): string {
    const protectedKid = this.protectedAttributes?.get?.(
      HeaderParameterKey.KID
    ) as Uint8Array;

    const unprotectedKid = this.unprotectedAttributes?.get?.(
      HeaderParameterKey.KID
    ) as Uint8Array;

    const kid = protectedKid ?? unprotectedKid;

    if (!kid) {
      throw new Error('Key Id is undefined');
    }

    const kidBase64 = Buffer.from(kid).toString('base64');

    return kidBase64;
  }

  public get issuer(): string {
    return this.content.get(ContentParameterKey.ISS) as string;
  }

  public get expiry(): number {
    return this.content.get(ContentParameterKey.EXP) as number;
  }

  public get notValidBefore(): number {
    return this.content.get(ContentParameterKey.NBF) as number;
  }

  public get hcert(): EUDCC {
    return (
      this.content.get(ContentParameterKey.HCERT) as Map<number, EUDCC>
    ).get(1) as EUDCC;
    //return (this.content["-260"] as Map<string, EUDCC>)["1"] as EUDCC;
  }
}

export interface IDecodedCose {
  err: unknown;
  tag: number | null;
  value: Array<Uint8Array | unknown>;
}
