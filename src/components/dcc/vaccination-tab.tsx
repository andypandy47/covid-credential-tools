import * as React from 'react';
import { Button, Flex, Stack } from '@chakra-ui/react';
import { DCCEntryType, DefaultValues, Styles } from 'services/constants';
import { VaccinationEntry } from 'services/dcc-combined-schema';
import {
  IPersonalDetails,
  ISecurityClaims,
  ISigningDetails
} from 'services/interfaces';
import PersonalDetailsForm from './generation/forms/personal-details-form';
import SecurityClaimsForm from './generation/forms/security-claims-form';
import SigningDetailsForm from './generation/forms/signing-details-form';
import VaccinationDetailsForm from './generation/forms/vaccination-details-form';

interface IVaccinationTabProps {
  onSubmit(
    personalDetails: IPersonalDetails,
    securityClaims: ISecurityClaims,
    signingDetails: ISigningDetails,
    vaccinationDetails: VaccinationEntry,
    dccType: DCCEntryType
  ): void;
}

const VaccinationTab: React.FC<IVaccinationTabProps> = ({ onSubmit }) => {
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
              onClick={() =>
                onSubmit(
                  personalDetails,
                  securityClaims,
                  signingDetails,
                  vaccinationDetails,
                  DCCEntryType.Vaccination
                )
              }
            >
              Generate Certificate
            </Button>
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default VaccinationTab;
