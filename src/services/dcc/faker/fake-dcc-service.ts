import {
  RecoveryEntry,
  TestEntry,
  VaccinationEntry
} from '../dcc-combined-schema';
import {
  IDCCGenerationResponse,
  IPersonalDetails,
  ISecurityClaims,
  ISigningDetails
} from '../dcc-interfaces';
import { IDCCValueSets, VaccineMaps } from '../value-sets';
import { faker, GenderType } from '@faker-js/faker';
import dayjs from 'dayjs';
import { privateKeys, publicCerts } from './fake-signing-details';
import { generateDCC } from '../dcc-generation-service';
import { DCCEntryType } from '../constants';
import { removeKeyHeaders } from 'utilities/get-public-key-pem';
import randomInt from 'utilities/random-int';

export class FakeDCCService {
  constructor(valueSets: IDCCValueSets) {
    this.ValueSets = valueSets;
  }

  private ValueSets: IDCCValueSets;

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

  private getFakeSigningDetails = (): ISigningDetails => {
    const index = randomInt(0, publicCerts.length);
    return {
      dscPem: publicCerts[index],
      privateKeyPem: privateKeys[index]
    };
  };

  public generateFakeVaccineCertificate =
    async (): Promise<IDCCGenerationResponse> => {
      const personalDetails = this.generateFakePersonalDetails();

      const issuingDate = dayjs().subtract(6, 'month').format('YYYY-MM-DD');
      const expiry = dayjs().add(6, 'month').format('YYYY-MM-DD');
      const issuerCountry =
        this.IssuingCountries[randomInt(0, this.IssuingCountries.length)];

      const securityClaims: ISecurityClaims = {
        issuingDate,
        expiry,
        issuerCountry
      };

      const uvci = `URN:UVCI:01:${issuerCountry}:${faker.random
        .alphaNumeric(21)
        .toUpperCase()}`;

      const vaccineMap = VaccineMaps[randomInt(0, VaccineMaps.length)];

      const payload: VaccinationEntry = {
        ...vaccineMap,
        co: issuerCountry,
        ci: `${uvci}#${this.generateCheckCharacter(uvci)}`,
        is: faker.company.companyName(),
        tg: '840539006',
        dn: randomInt(1, vaccineMap.sd + 1),
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
        publicKeyPem: removeKeyHeaders(generatedDCCResponse.publicKeyPem)
      };
    };

  public generateFakeTestEntry = (): TestEntry => {
    return null;
  };

  public generateFakeRecoveryEntry = (): RecoveryEntry => {
    return null;
  };
}
