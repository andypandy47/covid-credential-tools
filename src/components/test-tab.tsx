import { useDisclosure, Flex, Stack, Button } from '@chakra-ui/react';
import * as React from 'react';
import { EUDCC, TestEntry } from '../services/dcc-combined-schema';
import { generateDCC } from '../services/dcc-generation-service';
import {
  IPersonalDetails,
  ISecurityClaims,
  IDCCGenerationResponse,
  ISigningDetails,
} from '../services/interfaces';
import PersonalDetailsForm from './personal-details-form';
import ResultModal from './result-modal';
import SecurityClaimsForm from './security-claims-form';
import TestDetailsForm from './test-details-form';
import icaotransliteration from 'icao-transliteration';
import { Styles } from '../services/constants';
import SigningDetailsForm from './signing-details-form';

const TestTab: React.FC = () => {
  const [personalDetails, setPersonalDetails] = React.useState(
    {} as IPersonalDetails
  );
  const [securityClaims, setSecurityClaims] = React.useState(
    {} as ISecurityClaims
  );
  const [testDetails, setTestDetails] = React.useState({} as TestEntry);

  const [generatedDCC, setGeneratedDCC] = React.useState(
    {} as IDCCGenerationResponse
  );
  const [signingDetails, setSigningDetails] = React.useState(
    {} as ISigningDetails
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGeneration = async () => {
    const fnTransliterated = icaotransliteration(
      personalDetails.foreName.toUpperCase()
    );
    const gnTransliterated = icaotransliteration(
      personalDetails.givenName.toUpperCase()
    );
    const dcc: EUDCC = {
      ver: '1.3.0',
      nam: {
        gn: personalDetails.givenName,
        gnt: gnTransliterated,
        fn: personalDetails.foreName,
        fnt: fnTransliterated,
      },
      dob: personalDetails.dob,
      t: [testDetails],
    };

    generateDCC(dcc, securityClaims, signingDetails).then((value) => {
      setGeneratedDCC(value);
      onOpen();
    });
  };

  return (
    <Flex direction={'row'} mt={5} justifyContent={'space-between'}>
      <TestDetailsForm onFormChange={setTestDetails} />
      <Flex direction={'column'} justifyContent={'space-between'}>
        <Stack direction={'column'} spacing={6}>
          <SecurityClaimsForm
            inputWidth={Styles.InputWidth}
            onFormChange={setSecurityClaims}
          />
          <PersonalDetailsForm
            inputWidth={Styles.InputWidth}
            onFormChange={setPersonalDetails}
          />
          <SigningDetailsForm onFormChange={setSigningDetails} />
          <Flex justifyContent={'flex-end'}>
            <Button onClick={handleGeneration}>Generate Certificate</Button>
            <ResultModal
              isOpen={isOpen}
              onClose={onClose}
              generationResult={generatedDCC}
              QRTitle="Test QR"
            />
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default TestTab;
