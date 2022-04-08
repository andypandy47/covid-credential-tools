import type { NextApiRequest, NextApiResponse } from 'next';
import { IDCCGenerationResponse } from 'services/dcc/dcc-interfaces';
import { FakeDCCService } from 'services/dcc/faker/fake-dcc-service';
import { IDCCValueSets } from 'services/dcc/value-sets';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const valueSetsResponse = await fetch(
    'https://covid-status.service.nhsx.nhs.uk/eudcc/ValueSets?LocalValueSetDate=2021-03-03'
  );
  const valueSets = (await valueSetsResponse.json()) as IDCCValueSets;

  const fakeDCCService = new FakeDCCService(valueSets);

  const fakeDCCs: IDCCGenerationResponse[] = [];

  const count = Number(req.query.count ?? 5);

  for (let i = 0; i < count; i++) {
    const fakeDCC = await fakeDCCService.generateFakeVaccineCertificate();

    fakeDCCs.push(fakeDCC);
  }

  res.status(200).json(fakeDCCs);
};

export default handler;
