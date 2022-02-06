import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack
} from '@chakra-ui/react';
import * as React from 'react';
import { ISecurityClaims } from 'services/dcc/interfaces';

interface ISecurityClaimsFormProps {
  inputWidth: string;
  securityClaims: ISecurityClaims;
  onFormChange(securityClaims: ISecurityClaims): void;
}

const SecurityClaimsForm: React.FC<ISecurityClaimsFormProps> = ({
  inputWidth,
  securityClaims,
  onFormChange
}) => {
  return (
    <Stack direction={'column'} spacing={3}>
      <Heading as="h3" size="lg">
        Security Claims
      </Heading>
      <FormControl>
        <FormLabel>Issuing Country</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={inputWidth}
          value={securityClaims.issuerCountry}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...securityClaims, issuerCountry: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Issued At</FormLabel>
        <Input
          type={'date'}
          size={'sm'}
          width={inputWidth}
          value={securityClaims.issuingDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...securityClaims, issuingDate: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Expiry</FormLabel>
        <Input
          type={'date'}
          size={'sm'}
          width={inputWidth}
          value={securityClaims.expiry}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...securityClaims, expiry: e.target.value })
          }
        />
      </FormControl>
    </Stack>
  );
};

export default SecurityClaimsForm;
