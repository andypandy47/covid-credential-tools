import type { NextApiRequest, NextApiResponse } from 'next';
import { DCCEntryType } from 'services/dcc/constants';
import { IDCCGenerationResponse } from 'services/dcc/dcc-interfaces';
import { FakeDCCService } from 'services/dcc/faker/fake-dcc-service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const fakeDCCService = new FakeDCCService();

  const fakeDCCs: IDCCGenerationResponse[] = [];

  const count = Number(req.query.count ?? 5);

  const type = Number(req.query.type ?? 0) as DCCEntryType;

  for (let i = 0; i < count; i++) {
    switch (type) {
      case DCCEntryType.Vaccination: {
        const fakeDCC = await fakeDCCService.generateFakeVaccineCertificate();
        fakeDCCs.push(fakeDCC);
        break;
      }
      case DCCEntryType.Test: {
        const fakeDCC = await fakeDCCService.generateFakeTestEntry();
        fakeDCCs.push(fakeDCC);
        break;
      }
      case DCCEntryType.Recovery: {
        const fakeDCC = await fakeDCCService.generateFakeRecoveryEntry();
        fakeDCCs.push(fakeDCC);
        break;
      }
      case DCCEntryType.UKDomestic: {
        const fakeDCC = await fakeDCCService.generateFakeUKDomesticEntry();
        fakeDCCs.push(fakeDCC);
        break;
      }
    }
  }

  res.status(200).json(fakeDCCs);
};

export default handler;
