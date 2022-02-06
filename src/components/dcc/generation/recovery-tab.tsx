import { Button, Flex, Stack } from '@chakra-ui/react';
import * as React from 'react';
import { Styles } from 'services/constants';
import { DCCEntryType, DefaultValues } from 'services/dcc/constants';
import { RecoveryEntry } from 'services/dcc/dcc-combined-schema';
import {
  IPersonalDetails,
  ISecurityClaims,
  ISigningDetails
} from 'services/dcc/interfaces';
import PersonalDetailsForm from './forms/personal-details-form';
import RecoveryDetailsForm from './forms/recovery-details-form';
import SecurityClaimsForm from './forms/security-claims-form';
import SigningDetailsForm from './forms/signing-details-form';

interface IRecoveryTabProps {
  onSubmit(
    personalDetails: IPersonalDetails,
    securityClaims: ISecurityClaims,
    signingDetails: ISigningDetails,
    recoveryDetails: RecoveryEntry,
    dccType: DCCEntryType
  ): void;
  isLoading: boolean;
}

const RecoveryTab: React.FC<IRecoveryTabProps> = ({ onSubmit, isLoading }) => {
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
            <Button
              onClick={() =>
                onSubmit(
                  personalDetails,
                  securityClaims,
                  signingDetails,
                  recoveryDetails,
                  DCCEntryType.Recovery
                )
              }
              isLoading={isLoading}
              loadingText={'Generating'}
            >
              Generate Certificate
            </Button>
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default RecoveryTab;
