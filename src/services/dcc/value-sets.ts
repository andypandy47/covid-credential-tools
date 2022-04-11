import { DCCValues } from './constants';

interface MapObject {
  [key: string]: string[];
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

export const TestManufacturers: string[] = [
  '1883',
  '1232',
  '1468',
  '2108',
  '1870',
  '1484',
  '1173',
  '1253',
  '2183',
  '1215',
  '1271'
];

export const TestTypes: string[] = [DCCValues.NAATValue, DCCValues.RATValue];

export const DomesticIssuingCountryMap: MapObject = {
  'GB-ENG': ['GB-ENG:3', 'GB-ENG:2'],
  'GB-SCT': ['GB-SCT:2', 'GB-SCT:1']
};
