import { Button, Flex, Stack, useDisclosure } from '@chakra-ui/react';
import * as React from 'react';
import { Styles } from 'services/constants';
import { DCCEntryType, DefaultValues } from 'services/dcc/constants';
import { generateDCC } from 'services/dcc/dcc-generation-service';
import { IDCCGenerationResponse } from 'services/dcc/dcc-interfaces';
import PersonalDetailsForm from './forms/personal-details-form';
import SecurityClaimsForm from './forms/security-claims-form';
import SigningDetailsForm from './forms/signing-details-form';
import VaccinationDetailsForm from './forms/vaccination-details-form';
import GenerationResultModal from './generation-result-modal';

const VaccinationTab: React.FC = () => {
  const [personalDetails, setPersonalDetails] = React.useState(
    DefaultValues.PersonalDetails
  );
  const [securityClaims, setSecurityClaims] = React.useState(
    DefaultValues.SecurityClaims
  );
  const [vaccinationDetails, setVaccinationDetails] = React.useState(
    DefaultValues.VaccinationEntry
  );
  const [signingDetails, setSigningDetails] = React.useState(
    DefaultValues.SigningDetails
  );

  const [generatedDCC, setGeneratedDCC] = React.useState(
    {} as IDCCGenerationResponse
  );

  const [isLoading, setIsLoading] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async () => {
    setIsLoading(true);

    const dccType = DCCEntryType.Vaccination;

    try {
      const generatedDCC = await generateDCC(
        personalDetails,
        securityClaims,
        signingDetails,
        vaccinationDetails,
        dccType
      );

      setTimeout(() => {
        setGeneratedDCC({ ...generatedDCC, dccType });
        onOpen();
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <Flex direction={'row'} mt={5} justifyContent={'space-between'}>
      <VaccinationDetailsForm
        vaccinationDetails={vaccinationDetails}
        onFormChange={setVaccinationDetails}
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
            <Button
              onClick={handleSubmit}
              isLoading={isLoading}
              loadingText={'Generating'}
            >
              Generate Certificate
            </Button>
          </Flex>
        </Stack>
      </Flex>
      <GenerationResultModal
        isOpen={isOpen}
        onClose={onClose}
        onGenerationComplete={() => setIsLoading(false)}
        generationResult={generatedDCC}
      />
    </Flex>
  );
};

export default VaccinationTab;
