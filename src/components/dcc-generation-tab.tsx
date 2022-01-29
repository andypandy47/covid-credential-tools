import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure
} from '@chakra-ui/react';
import icaotransliteration from 'icao-transliteration';
import * as React from 'react';
import { DCCEntryType, DCCValues, Styles } from '../services/constants';
import {
  EUDCC,
  RecoveryEntry,
  TestEntry,
  VaccinationEntry
} from '../services/dcc-combined-schema';
import { generateDCC } from '../services/dcc-generation-service';
import {
  IDCCGenerationResponse,
  IPersonalDetails,
  ISecurityClaims,
  ISigningDetails
} from '../services/interfaces';
import RecoveryTab from './recovery-tab';
import ResultModal from './result-modal';
import TestTab from './test-tab';
import VaccinationTab from './vaccination-tab';

const DCCGenerationTab: React.FC = () => {
  const [generatedDCC, setGeneratedDCC] = React.useState(
    {} as IDCCGenerationResponse
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGeneration = async (
    personalDetails: IPersonalDetails,
    securityClaims: ISecurityClaims,
    signingDetails: ISigningDetails,
    payloadDetails: VaccinationEntry | RecoveryEntry | TestEntry,
    dccType: DCCEntryType
  ) => {
    const fnTransliterated = icaotransliteration(
      personalDetails.foreName.toUpperCase()
    );
    const gnTransliterated = icaotransliteration(
      personalDetails.givenName.toUpperCase()
    );
    const dcc: EUDCC = {
      ...getPayloadDetails(dccType, payloadDetails),
      ver: '1.3.0',
      nam: {
        gn: personalDetails.givenName,
        gnt: gnTransliterated,
        fnt: fnTransliterated
      },
      fn: personalDetails.foreName,
      dob: personalDetails.dob
    };

    try {
      const generatedDCC = await generateDCC(
        dcc,
        securityClaims,
        signingDetails
      );
      setGeneratedDCC({ ...generatedDCC, dccType });
      onOpen();
    } catch (error) {
      console.error(error);
    }
  };

  const getPayloadDetails = (
    dccType: DCCEntryType,
    payloadDetails: VaccinationEntry | RecoveryEntry | TestEntry
  ): EUDCC => {
    switch (dccType) {
      case DCCEntryType.Vaccination:
        return { v: [payloadDetails as VaccinationEntry] };
      case DCCEntryType.Recovery:
        return { r: [payloadDetails as RecoveryEntry] };
      case DCCEntryType.Test:
        const testEntry = { ...payloadDetails } as TestEntry;

        if (testEntry.tt === DCCValues.NAATValue) {
          delete testEntry.ma;
        } else {
          delete testEntry.nm;
        }

        return { t: [testEntry] };
      default:
        throw new Error('DCC Type not set!');
    }
  };

  return (
    <>
      <Tabs size="md" variant="enclosed" mt={5} width={Styles.PageWidth}>
        <TabList>
          <Tab>Vaccination</Tab>
          <Tab>Recovery</Tab>
          <Tab>Test</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VaccinationTab onSubmit={handleGeneration} />
          </TabPanel>
          <TabPanel>
            <RecoveryTab onSubmit={handleGeneration} />
          </TabPanel>
          <TabPanel>
            <TestTab onSubmit={handleGeneration} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ResultModal
        isOpen={isOpen}
        onClose={onClose}
        generationResult={generatedDCC}
      />
    </>
  );
};

export default DCCGenerationTab;
