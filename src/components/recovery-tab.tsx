import { Button, Flex, Stack, useDisclosure } from '@chakra-ui/react';
import icaotransliteration from 'icao-transliteration';
import * as React from 'react';
import { DefaultValues, Styles } from '../services/constants';
import { EUDCC } from '../services/dcc-combined-schema';
import { generateDCC } from '../services/dcc-generation-service';
import { IDCCGenerationResponse } from '../services/interfaces';
import PersonalDetailsForm from './personal-details-form';
import RecoveryDetailsForm from './recovery-details-form';
import ResultModal from './result-modal';
import SecurityClaimsForm from './security-claims-form';
import SigningDetailsForm from './signing-details-form';

const RecoveryTab: React.FC = () => {
  const [personalDetails, setPersonalDetails] = React.useState(
    DefaultValues.PersonalDetails
  );
  const [securityClaims, setSecurityClaims] = React.useState(
    DefaultValues.SecurityClaims
  );
  const [recoveryDetails, setRecoveryDetails] = React.useState(
    DefaultValues.RecoveryEntry
  );
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
    const dcc: EUDCC = {
      ver: '1.3.0',
      nam: {
        gn: personalDetails.givenName,
        gnt: gnTransliterated,
        fn: personalDetails.foreName,
        fnt: fnTransliterated
      },
      dob: personalDetails.dob,
      r: [recoveryDetails]
    };

    generateDCC(dcc, securityClaims, signingDetails).then((value) => {
      setGeneratedDCC(value);
      onOpen();
    });
  };

  return (
    <Flex direction={'row'} mt={5} justifyContent={'space-between'}>
      <RecoveryDetailsForm
        recoveryDetails={recoveryDetails}
        onFormChange={setRecoveryDetails}
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
              QRTitle="Recovery QR"
            />
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default RecoveryTab;
