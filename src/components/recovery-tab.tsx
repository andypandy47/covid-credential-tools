import { Button, Flex, Stack, useDisclosure } from '@chakra-ui/react';
import icaotransliteration from 'icao-transliteration';
import * as React from 'react';
import { EUDCC, RecoveryEntry } from '../services/dcc-combined-schema';
import { generateDCC } from '../services/dcc-generation-service';
import {
  IDCCGenerationResponse,
  IPersonalDetails,
  ISecurityClaims,
} from '../services/interfaces';
import PersonalDetailsForm from './personal-details-form';
import RecoveryDetailsForm from './recovery-details-form';
import ResultModal from './result-modal';
import SecurityClaimsForm from './security-claims-form';

const inputWidth = '400px';

const RecoveryTab: React.FC = () => {
  const [personalDetails, setPersonalDetails] = React.useState(
    {} as IPersonalDetails
  );
  const [securityClaims, setSecurityClaims] = React.useState(
    {} as ISecurityClaims
  );
  const [recoveryDetails, setRecoveryDetails] = React.useState(
    {} as RecoveryEntry
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
    const dcc: EUDCC = {
      ver: '1.3.0',
      nam: {
        gn: personalDetails.givenName,
        gnt: gnTransliterated,
        fn: personalDetails.foreName,
        fnt: fnTransliterated,
      },
      dob: personalDetails.dob,
      r: [recoveryDetails],
    };

    generateDCC(dcc, securityClaims).then((value) => {
      setGeneratedDCC(value);
      onOpen();
    });
  };

  return (
    <Flex direction={'row'} mt={5} justifyContent={'space-between'}>
      <RecoveryDetailsForm
        inputWidth={inputWidth}
        onFormChange={setRecoveryDetails}
      />
      <Flex direction={'column'} justifyContent={'space-between'}>
        <Stack direction={'column'} spacing={10}>
          <SecurityClaimsForm
            inputWidth={inputWidth}
            onFormChange={setSecurityClaims}
          />
          <PersonalDetailsForm
            inputWidth={inputWidth}
            onFormChange={setPersonalDetails}
          />
          <Flex justifyContent={'flex-end'}>
            <Button onClick={handleGeneration}>Generate Certificate</Button>
            <ResultModal
              isOpen={isOpen}
              onClose={onClose}
              generationResult={generatedDCC}
              QRTitle="Recovery QR"
            />
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default RecoveryTab;
