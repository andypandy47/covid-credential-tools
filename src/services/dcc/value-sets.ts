interface IDCCValueSet {
  [key: string]: string;
}

export interface IDCCValueSets {
  valueSetDate: string;
  valueSets: {
    diseasesTargeted: IDCCValueSet;
    testManufacturers: IDCCValueSet;
    testResults: IDCCValueSet;
    testTypes: IDCCValueSet;
    vaccineManufacturers: IDCCValueSet;
    vaccineNames: IDCCValueSet;
    vaccineTypes: IDCCValueSet;
  };
}

interface IVaccineMap {
  vp: string;
  mp: string;
  ma: string;
  sd: number;
}

export const VaccineMaps: IVaccineMap[] = [
  {
    mp: 'EU/1/20/1528',
    ma: 'ORG-100030215',
    vp: '1119349007',
    sd: 2
  },
  {
    mp: 'EU/1/20/1507',
    ma: 'ORG-100031184',
    vp: '1119349007',
    sd: 2
  },
  {
    mp: 'EU/1/21/1529',
    ma: 'ORG-100001699',
    vp: 'J07BX03',
    sd: 2
  },
  {
    mp: 'EU/1/20/1525',
    ma: 'ORG-100001417',
    vp: 'J07BX03',
    sd: 1
  },
  {
    mp: 'EU/1/21/1618',
    ma: 'ORG-100032020',
    vp: 'J07BX03',
    sd: 2
  }
];
