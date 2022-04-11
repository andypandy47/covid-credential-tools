import dayjs from 'dayjs';
import {
  RecoveryEntry,
  TestEntry,
  UKDomesticEntry,
  VaccinationEntry
} from './dcc-combined-schema';
import {
  IPersonalDetails,
  ISecurityClaims,
  ISigningDetails,
  IValidationContext
} from './dcc-interfaces';

export class DCCValues {
  public static readonly NAATValue = 'LP6464-4';

  public static readonly RATValue = 'LP217198-3';

  public static readonly HcertContextIdentifier = 'HC1:';

  public static readonly UkDomesticContextIdentifier = 'UK1:';
}

export class ValidationStepTitles {
  public static readonly ContextIdentifier = 'Context Identifier';
  public static readonly COSEFormat = 'COSE Format';
  public static readonly IssuingDate = 'Issuing Date';
  public static readonly ExpiryDate = 'Expiry Date';
  public static readonly Signature = 'Signature';
}

export enum DCCEntryType {
  Vaccination = 0,
  Recovery = 1,
  Test = 2,
  UKDomestic = 3
}

export enum ValidationStepState {
  None,
  Passed,
  Failed
}

export enum ValidationType {
  NBProd,
  NBAcc,
  PublicKey
}

export class DefaultValues {
  public static readonly PublicKeyPem = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE5db4WYUrc8VhnmVPWLnUFfQryn8nDiWu92JZVle3w6NwnS/v4sOFyDIJguBrIceUeowDw8vweVXz3wu1pNUq4A==
 -----END PUBLIC KEY-----`;

  public static readonly SigningDetails: ISigningDetails = {
    privateKeyPem: `-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIL//YMwZwS233Q589Ug1btmvDxbQ2G5X4KoI6qt93b7/oAoGCCqGSM49AwEHoUQDQgAE5db4WYUrc8VhnmVPWLnUFfQryn8nDiWu92JZVle3w6NwnS/v4sOFyDIJguBrIceUeowDw8vweVXz3wu1pNUq4A==
-----END EC PRIVATE KEY-----`,
    dscPem: `-----BEGIN CERTIFICATE-----
MIICCTCCAa+gAwIBAgIUQ4CHxP8wPIcOT00z9CHO4EyG9mAwCgYIKoZIzj0EAwIwMzELMAkGA1UEBhMCR0IxEDAOBgNVBAgTB0VuZ2xhbmQxEjAQBgNVBAoTCVRlc3QgQ2VydDAeFw0yMjAxMjQyMDMzMTJaFw0yNDAxMTQyMDMzMTJaMDMxCzAJBgNVBAYTAkdCMRAwDgYDVQQIEwdFbmdsYW5kMRIwEAYDVQQKEwlUZXN0IENlcnQwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAATl1vhZhStzxWGeZU9YudQV9CvKfycOJa73YllWV7fDo3CdL+/iw4XIMgmC4Gshx5R6jAPDy/B5VfPfC7Wk1Srgo4GgMIGdMB0GA1UdDgQWBBTp+tzQ0Iu5/XyYRPftUGXFxMehWzBuBgNVHSMEZzBlgBTp+tzQ0Iu5/XyYRPftUGXFxMehW6E3pDUwMzELMAkGA1UEBhMCR0IxEDAOBgNVBAgTB0VuZ2xhbmQxEjAQBgNVBAoTCVRlc3QgQ2VydIIUQ4CHxP8wPIcOT00z9CHO4EyG9mAwDAYDVR0TBAUwAwEB/zAKBggqhkjOPQQDAgNIADBFAiAOfMgGPC7U8cPdXyWbERwX8BcWdCtc5QTNnNIu7LKGnAIhALhzHN6LTqkkVTC0Zjqdq2WM0dYqnTM3MSq2/kyNwGO/
-----END CERTIFICATE-----`
  };

  public static readonly PersonalDetails: IPersonalDetails = {
    givenName: 'Marcellus',
    foreName: 'Wallace',
    dob: dayjs().subtract(30, 'year').format('YYYY-MM-DD')
  };

  public static readonly SecurityClaims: ISecurityClaims = {
    issuerCountry: 'GB',
    issuingDate: dayjs().subtract(6, 'month').format('YYYY-MM-DD'),
    expiry: dayjs().add(6, 'month').format('YYYY-MM-DD')
  };

  public static readonly VaccinationEntry: VaccinationEntry = {
    tg: '840539006',
    vp: '1119349007',
    mp: 'EU/1/20/1507',
    ma: 'ORG-100031184',
    dn: 2,
    sd: 2,
    dt: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
    co: 'GB',
    is: 'NHS Digital',
    ci: 'URN:UVCI:01:GB:1643188028017ZPZEURP2#T'
  };

  public static readonly RecoveryEntry: RecoveryEntry = {
    tg: '840539006',
    fr: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
    df: dayjs().subtract(1, 'month').add(12, 'day').format('YYYY-MM-DD'),
    du: dayjs().add(4, 'month').format('YYYY-MM-DD'),
    co: 'GB',
    is: 'NHS Digital',
    ci: 'URN:UVCI:01:GB:1643188028017ZPZEURP2#T'
  };

  public static readonly TestEntry: TestEntry = {
    tg: '840539006',
    tt: 'LP217198-3',
    nm: 'ELITechGroup, SARS-CoV-2 ELITe MGB® Kit',
    ma: '532',
    sc: dayjs().subtract(1, 'day').format('YYYY-MM-DDTHH:mm'),
    tr: '260415000',
    tc: 'Example Test Corp, Big City',
    co: 'GB',
    is: 'NHS Digital',
    ci: 'URN:UVCI:01:GB:1643188068882Q5PU76VZ#V'
  };

  public static readonly UKDomesticEntry: UKDomesticEntry = {
    co: 'GB-ENG',
    is: 'NHS Digital',
    ci: 'URN:UVCI:01:GB:1643188028017ZPZEURP2#T',
    df: dayjs().subtract(2, 'day').format('YYYY-MM-DD'),
    du: dayjs().add(3, 'week').format('YYYY-MM-DD'),
    pm: 123,
    po: ['GB-ENG:3']
  };

  public static readonly ValidationContext: IValidationContext = {
    contextIdentifier: {
      title: ValidationStepTitles.ContextIdentifier,
      state: ValidationStepState.None
    },
    coseFormat: {
      title: ValidationStepTitles.COSEFormat,
      state: ValidationStepState.None
    },
    issuingDate: {
      title: ValidationStepTitles.IssuingDate,
      state: ValidationStepState.None
    },
    expiryDate: {
      title: ValidationStepTitles.ExpiryDate,
      state: ValidationStepState.None
    },
    signautre: {
      title: ValidationStepTitles.Signature,
      state: ValidationStepState.None
    }
  };
}
