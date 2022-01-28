import { Button, Flex, Stack, useDisclosure } from '@chakra-ui/react';
import icaotransliteration from 'icao-transliteration';
import * as React from 'react';
import { DCCValues, DefaultValues, Styles } from '../services/constants';
import { EUDCC } from '../services/dcc-combined-schema';
import { generateDCC } from '../services/dcc-generation-service';
import { IDCCGenerationResponse } from '../services/interfaces';
import PersonalDetailsForm from './personal-details-form';
import ResultModal from './result-modal';
import SecurityClaimsForm from './security-claims-form';
import SigningDetailsForm from './signing-details-form';
import TestDetailsForm from './test-details-form';

const TestTab: React.FC = () => {
  const [personalDetails, setPersonalDetails] = React.useState(
    DefaultValues.PersonalDetails
  );
  const [securityClaims, setSecurityClaims] = React.useState(
    DefaultValues.SecurityClaims
  );
  const [testDetails, setTestDetails] = React.useState(DefaultValues.TestEntry);
  const [signingDetails, setSigningDetails] = React.useState(
    DefaultValues.SigningDetails
  );

  const [generatedDCC, setGeneratedDCC] = React.useState(
    {} as IDCCGenerationResponse
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGeneration = async () => {
    const fnTransliterated = icaotransliteration(
      personalDetails.foreName.toUpperCase()
    );
    const gnTransliterated = icaotransliteration(
      personalDetails.givenName.toUpperCase()
    );

    const testEntry = { ...testDetails };

    if (testEntry.tt === DCCValues.NAATValue) {
      delete testEntry.ma;
    } else {
      delete testEntry.nm;
    }

    const dcc: EUDCC = {
      ver: '1.3.0',
      nam: {
        gn: personalDetails.givenName,
        gnt: gnTransliterated,
        fn: personalDetails.foreName,
        fnt: fnTransliterated
      },
      dob: personalDetails.dob,
      t: [testEntry]
    };

    generateDCC(dcc, securityClaims, signingDetails).then((value) => {
      setGeneratedDCC(value);
      onOpen();
    });
  };

  return (
    <Flex direction={'row'} mt={5} justifyContent={'space-between'}>
      <TestDetailsForm
        testDetails={testDetails}
        onFormChange={setTestDetails}
      />
      <Flex direction={'column'} justifyContent={'space-between'}>
        <Stack direction={'column'} spacing={6}>
          <SecurityClaimsForm
            inputWidth={Styles.InputWidth}
            securityClaims={securityClaims}
            onFormChange={setSecurityClaims}
          />
          <PersonalDetailsForm
            personalDetails={personalDetails}
            inputWidth={Styles.InputWidth}
            onFormChange={setPersonalDetails}
          />
          <SigningDetailsForm
            signingDetails={signingDetails}
            onFormChange={setSigningDetails}
          />
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
