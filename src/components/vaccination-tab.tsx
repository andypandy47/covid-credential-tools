import { Button, Flex, Stack, useDisclosure } from '@chakra-ui/react';
import * as React from 'react';
import { EUDCC, VaccinationEntry } from '../services/dcc-combined-schema';
import {
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

const inputWidth = '400px';

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

    generateDCC(dcc, securityClaims).then((value) => {
      setGeneratedDCC(value);
      onOpen();
    });
  };

  return (
    <Flex direction={'row'} mt={5} justifyContent={'space-between'}>
      <VaccinationDetailsForm
        inputWidth={inputWidth}
        onFormChange={setVaccinationDetails}
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
              QRTitle="Vaccination QR"
            />
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default VaccinationTab;
