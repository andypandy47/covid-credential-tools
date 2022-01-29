import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import * as React from 'react';
import { DCCEntryType, Styles } from '../services/constants';
import {
  RecoveryEntry,
  TestEntry,
  VaccinationEntry
} from '../services/dcc-combined-schema';
import RecoveryTab from './recovery-tab';
import TestTab from './test-tab';
import VaccinationTab from './vaccination-tab';

interface IDCCGenerationTabProps {
  defaultPayload: VaccinationEntry | TestEntry | RecoveryEntry;
  dccType: DCCEntryType;
}

const DCCGenerationTab: React.FC<IDCCGenerationTabProps> = ({}) => {
  // const [personalDetails, setPersonalDetails] = React.useState(
  //   DefaultValues.PersonalDetails
  // );
  // const [securityClaims, setSecurityClaims] = React.useState(
  //   DefaultValues.SecurityClaims
  // );
  // const [payloadDetails, setPayloadDetails] = React.useState(defaultPayload);
  // const [signingDetails, setSigningDetails] = React.useState(
  //   DefaultValues.SigningDetails
  // );

  // const [generatedDCC, setGeneratedDCC] = React.useState(
  //   {} as IDCCGenerationResponse
  // );

  // const { isOpen, onOpen, onClose } = useDisclosure();

  // const handleGeneration = async () => {
  //   const fnTransliterated = icaotransliteration(
  //     personalDetails.foreName.toUpperCase()
  //   );
  //   const gnTransliterated = icaotransliteration(
  //     personalDetails.givenName.toUpperCase()
  //   );
  //   const dcc: EUDCC = {
  //     ...getPayloadDetails(),
  //     ver: '1.3.0',
  //     nam: {
  //       gn: personalDetails.givenName,
  //       gnt: gnTransliterated,
  //       fnt: fnTransliterated
  //     },
  //        fn: personalDetails.foreName,
  //    dob: personalDetails.dob
  //   };

  //   generateDCC(dcc, securityClaims, signingDetails).then((value) => {
  //     setGeneratedDCC(value);
  //     onOpen();
  //   });
  // };

  // const getPayloadDetails = (): EUDCC => {
  //   switch (dccType) {
  //     case DCCEntryType.Vaccination:
  //       return { v: [payloadDetails as VaccinationEntry] };
  //     case DCCEntryType.Recovery:
  //       return { r: [payloadDetails as RecoveryEntry] };
  //     case DCCEntryType.Test:
  //       return { t: [payloadDetails as TestEntry] };
  //     default:
  //       throw new Error('DCC Type not set!');
  //   }
  // };

  return (
    <Tabs size="md" variant="enclosed" mt={5} width={Styles.PageWidth}>
      <TabList>
        <Tab>Vaccination</Tab>
        <Tab>Recovery</Tab>
        <Tab>Test</Tab>
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
      </TabPanels>
    </Tabs>

    //     <Flex direction={'row'} mt={5} justifyContent={'space-between'}>
    //       {dccType === DCCEntryType.Vaccination && <VaccinationDetailsForm
    //         vaccinationDetails={payloadDetails as VaccinationEntry}
    //         onFormChange={setPayloadDetails}
    //       />}

    // {dccType === DCCEntryType.Recovery && <RecoveryDetailsForm
    //         recoveryDetails={payloadDetails as RecoveryEntry}
    //         onFormChange={setPayloadDetails}
    //       />}

    // {dccType === DCCEntryType.Test && <RecoveryDetailsForm
    //         recoveryDetails={payloadDetails as RecoveryEntry}
    //         onFormChange={setPayloadDetails}
    //       />}

    //       <Flex direction={'column'} justifyContent={'space-between'}>
    //         <Stack direction={'column'} spacing={6}>
    //           <SecurityClaimsForm
    //             inputWidth={Styles.InputWidth}
    //             securityClaims={securityClaims}
    //             onFormChange={setSecurityClaims}
    //           />
    //           <PersonalDetailsForm
    //             personalDetails={personalDetails}
    //             inputWidth={Styles.InputWidth}
    //             onFormChange={setPersonalDetails}
    //           />
    //           <SigningDetailsForm
    //             signingDetails={signingDetails}
    //             onFormChange={setSigningDetails}
    //           />
    //           <Flex justifyContent={'flex-end'}>
    //             <Button onClick={handleGeneration}>Generate Certificate</Button>
    //             <ResultModal
    //               isOpen={isOpen}
    //               onClose={onClose}
    //               generationResult={generatedDCC}
    //               QRTitle="Vaccination QR"
    //             />
    //           </Flex>
    //         </Stack>
    //       </Flex>
    //     </Flex>
  );
};

export default DCCGenerationTab;
