import { faker, GenderType } from '@faker-js/faker';
import dayjs from 'dayjs';
import { removeKeyHeaders } from 'utilities/get-public-key-pem';
import getRandomInt from 'utilities/random-int';
import { DCCEntryType } from '../constants';
import {
  RecoveryEntry,
  TestEntry,
  UKDomesticEntry,
  VaccinationEntry
} from '../dcc-combined-schema';
import { generateDCC } from '../dcc-generation-service';
import {
  IDCCGenerationResponse,
  IPersonalDetails,
  ISecurityClaims,
  ISigningDetails
} from '../dcc-interfaces';
import {
  DomesticIssuingCountryMap,
  TestManufacturers,
  TestTypes,
  VaccineMaps
} from '../value-sets';
import { privateKeys, publicCerts } from './fake-signing-details';

export class FakeDCCService {
  private IssuingCountries: string[] = [
    'GB',
    'FR',
    'DE',
    'DK',
    'SE',
    'SG',
    'HR',
    'PO'
  ];

  private generateCheckCharacter = (input: string) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/:';
    const n = charset.length;
    let factor = 2;
    let sum = 0;

    for (let i = 0; i < input.length; i++) {
      const codePoint = charset.indexOf(input[i]);

      if (codePoint === -1) {
        continue;
      }

      let addend = factor * codePoint;

      factor = factor === 2 ? 1 : 2;

      addend = addend / n + (addend % n);
      sum += Math.round(addend);
    }

    const remainder = sum % n;
    const checkPointCode = (n - remainder) % n;

    return charset[checkPointCode];
  };

  private generateFakePersonalDetails = (): IPersonalDetails => {
    const gender = faker.name.gender(true) as GenderType;
    const givenName = faker.name.firstName(gender);
    const foreName = faker.name.lastName(gender);

    const dob = dayjs(faker.date.past(12)).format('YYYY-MM-DD');

    return {
      givenName,
      foreName,
      dob
    };
  };

  private generateFakeSecurityClaims = (
    issOverride: string = null
  ): ISecurityClaims => {
    const issuingDate = dayjs().subtract(6, 'month').format('YYYY-MM-DD');
    const expiry = dayjs().add(6, 'month').format('YYYY-MM-DD');
    const issuerCountry =
      issOverride ??
      this.IssuingCountries[getRandomInt(this.IssuingCountries.length)];

    return {
      issuingDate,
      expiry,
      issuerCountry
    };
  };

  private getFakeSigningDetails = (): ISigningDetails => {
    const index = getRandomInt(publicCerts.length);
    return {
      dscPem: publicCerts[index],
      privateKeyPem: privateKeys[index]
    };
  };

  private generateUVCI = (issuerCountry: string): string => {
    const uvci = `URN:UVCI:01:${issuerCountry}:${faker.random
      .alphaNumeric(21)
      .toUpperCase()}`;

    return `${uvci}#${this.generateCheckCharacter(uvci)}`;
  };

  public generateFakeVaccineCertificate =
    async (): Promise<IDCCGenerationResponse> => {
      const personalDetails = this.generateFakePersonalDetails();

      const securityClaims = this.generateFakeSecurityClaims();

      const vaccineMap = VaccineMaps[getRandomInt(VaccineMaps.length)];

      const payload: VaccinationEntry = {
        ...vaccineMap,
        co: securityClaims.issuerCountry,
        ci: this.generateUVCI(securityClaims.issuerCountry),
        is: faker.company.companyName(),
        tg: '840539006',
        dn: getRandomInt(vaccineMap.sd + 1) + 1,
        dt: dayjs(faker.date.recent(60)).format('YYYY-MM-DD')
      };

      const signingDetails = this.getFakeSigningDetails();

      const generatedDCCResponse = await generateDCC(
        personalDetails,
        securityClaims,
        signingDetails,
        payload,
        DCCEntryType.Vaccination
      );

      return {
        ...generatedDCCResponse,
        publicKeyPem: removeKeyHeaders(
          generatedDCCResponse.publicKeyPem
        ).replace(/\n/gm, '')
      };
    };

  public generateFakeTestEntry = async (): Promise<IDCCGenerationResponse> => {
    const personalDetails = this.generateFakePersonalDetails();

    const securityClaims = this.generateFakeSecurityClaims();

    const testType = TestTypes[getRandomInt(2)];

    const payload: TestEntry = {
      co: securityClaims.issuerCountry,
      ci: this.generateUVCI(securityClaims.issuerCountry),
      is: faker.company.companyName(),
      tg: '840539006',
      tr: '260415000',
      tc: faker.address.city(),
      sc: dayjs(faker.date.recent(1)).format('YYYY-MM-DDTHH:mm'),
      tt: testType,
      nm: faker.company.companyName(),
      ma: TestManufacturers[getRandomInt(TestManufacturers.length)]
    };

    const signingDetails = this.getFakeSigningDetails();

    const generatedDCCResponse = await generateDCC(
      personalDetails,
      securityClaims,
      signingDetails,
      payload,
      DCCEntryType.Test
    );

    return {
      ...generatedDCCResponse,
      publicKeyPem: removeKeyHeaders(generatedDCCResponse.publicKeyPem).replace(
        /\n/gm,
        ''
      )
    };
  };

  public generateFakeRecoveryEntry =
    async (): Promise<IDCCGenerationResponse> => {
      const personalDetails = this.generateFakePersonalDetails();

      const securityClaims = this.generateFakeSecurityClaims();

      const payload: RecoveryEntry = {
        co: securityClaims.issuerCountry,
        ci: this.generateUVCI(securityClaims.issuerCountry),
        is: faker.company.companyName(),
        tg: '840539006',
        df: dayjs(
          faker.date.between(
            dayjs().subtract(1, 'month').toString(),
            faker.date.recent(3)
          )
        ).format('YYYY-MM-DD'),
        du: dayjs().add(5, 'month').format('YYYY-MM-DD'),
        fr: dayjs().subtract(1, 'month').subtract(5, 'day').format('YYYY-MM-DD')
      };

      const signingDetails = this.getFakeSigningDetails();

      const generatedDCCResponse = await generateDCC(
        personalDetails,
        securityClaims,
        signingDetails,
        payload,
        DCCEntryType.Recovery
      );

      return {
        ...generatedDCCResponse,
        publicKeyPem: removeKeyHeaders(
          generatedDCCResponse.publicKeyPem
        ).replace(/\n/gm, '')
      };
    };

  public generateFakeUKDomesticEntry =
    async (): Promise<IDCCGenerationResponse> => {
      const personalDetails = this.generateFakePersonalDetails();

      const securityClaims = this.generateFakeSecurityClaims('GB');

      const certificateCountry = Object.keys(DomesticIssuingCountryMap)[
        getRandomInt(2)
      ];

      const payload: UKDomesticEntry = {
        co: certificateCountry,
        ci: this.generateUVCI(securityClaims.issuerCountry),
        is: faker.company.companyName(),
        df: securityClaims.issuingDate,
        du: securityClaims.expiry,
        pm: 123,
        po: [...DomesticIssuingCountryMap[certificateCountry]]
      };

      const signingDetails = this.getFakeSigningDetails();

      const generatedDCCResponse = await generateDCC(
        personalDetails,
        securityClaims,
        signingDetails,
        payload,
        DCCEntryType.UKDomestic
      );

      return {
        ...generatedDCCResponse,
        publicKeyPem: removeKeyHeaders(
          generatedDCCResponse.publicKeyPem
        ).replace(/\n/gm, '')
      };
    };
}
