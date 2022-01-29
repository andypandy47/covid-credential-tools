import { Button, Flex, Stack } from '@chakra-ui/react';
import * as React from 'react';
import { DCCEntryType, DefaultValues, Styles } from 'services/constants';
import { TestEntry } from 'services/dcc-combined-schema';
import {
  IPersonalDetails,
  ISecurityClaims,
  ISigningDetails
} from 'services/interfaces';
import PersonalDetailsForm from './forms/personal-details-form';
import SecurityClaimsForm from './forms/security-claims-form';
import SigningDetailsForm from './forms/signing-details-form';
import TestDetailsForm from './forms/test-details-form';

interface ITestTabProps {
  onSubmit(
    personalDetails: IPersonalDetails,
    securityClaims: ISecurityClaims,
    signingDetails: ISigningDetails,
    testDetails: TestEntry,
    dccType: DCCEntryType
  ): void;
}

const TestTab: React.FC<ITestTabProps> = ({ onSubmit }) => {
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
            <Button
              onClick={() =>
                onSubmit(
                  personalDetails,
                  securityClaims,
                  signingDetails,
                  testDetails,
                  DCCEntryType.Test
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

export default TestTab;
