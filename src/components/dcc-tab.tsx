import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import RecoveryTab from 'components/dcc/generation/recovery-tab';
import TestTab from 'components/dcc/generation/test-tab';
import VaccinationTab from 'components/dcc/generation/vaccination-tab';
import * as React from 'react';
import { Styles } from 'services/constants';
import UkDomesticTab from './dcc/generation/uk-domestic-tab';
import KidAndPublicKeyExtractor from './dcc/kid-and-public-key-extractor';
import ValidateTab from './dcc/validate/validate-tab';

const DCCTab: React.FC = () => {
  return (
    <>
      <Tabs size="md" variant="enclosed" mt={5} width={Styles.PageWidth} isLazy>
        <TabList>
          <Tab>Vaccination</Tab>
          <Tab>Recovery</Tab>
          <Tab>Test</Tab>
          <Tab>UK Domestic</Tab>
          <Tab>Validate</Tab>
          <Tab>KID + Public Key Extraction</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VaccinationTab />
          </TabPanel>
          <TabPanel>
            <RecoveryTab />
          </TabPanel>
          <TabPanel>
            <TestTab />
          </TabPanel>
          <TabPanel>
            <UkDomesticTab />
          </TabPanel>
          <TabPanel>
            <ValidateTab />
          </TabPanel>
          <TabPanel>
            <KidAndPublicKeyExtractor />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default DCCTab;
