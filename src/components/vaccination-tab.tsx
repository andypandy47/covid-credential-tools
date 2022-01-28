import { Button, Flex, Stack, useDisclosure } from '@chakra-ui/react';
import * as React from 'react';
import { EUDCC, VaccinationEntry } from '../services/dcc-combined-schema';
import {
  ISigningDetails,
  IDCCGenerationResponse,
  IPersonalDetails,
  ISecurityClaims,
} from '../services/interfaces';
import PersonalDetailsForm from './personal-details-form';
import ResultModal from './result-modal';
import SecurityClaimsForm from './security-claims-form';
import VaccinationDetailsForm from './vaccination-details-form';
import icaotransliteration from 'icao-transliteration';
import { generateDCC } from '../services/dcc-generation-service';
import { Styles } from '../services/constants';
import SigningDetailsForm from './signing-details-form';

const VaccinationTab: React.FC = () => {
  const [personalDetails, setPersonalDetails] = React.useState(
    {} as IPersonalDetails
  );
  const [securityClaims, setSecurityClaims] = React.useState(
    {} as ISecurityClaims
  );
  const [vaccinationDetails, setVaccinationDetails] = React.useState(
    {} as VaccinationEntry
  );
  const [signingDetails, setSigningDetails] = React.useState(
    {} as ISigningDetails
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
      v: [vaccinationDetails],
    };

    generateDCC(dcc, securityClaims, signingDetails).then((value) => {
      setGeneratedDCC(value);
      onOpen();
    });
  };

  return (
    <Flex direction={'row'} mt={5} justifyContent={'space-between'}>
      <VaccinationDetailsForm onFormChange={setVaccinationDetails} />
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
              QRTitle="Vaccination QR"
            />
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default VaccinationTab;
