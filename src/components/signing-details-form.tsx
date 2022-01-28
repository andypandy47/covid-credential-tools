import {
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Textarea
} from '@chakra-ui/react';
import * as React from 'react';
import { ISigningDetails } from '../services/interfaces';

interface ISigningDetailsFormProps {
  signingDetails: ISigningDetails;
  onFormChange(cryptoDetails: ISigningDetails): void;
}

const SigningDetailsForm: React.FC<ISigningDetailsFormProps> = ({
  signingDetails,
  onFormChange
}) => {
  return (
    <Stack direction={'column'} spacing={3}>
      <Heading as="h3" size="lg">
        Signing Details
      </Heading>
      <FormControl>
        <FormLabel>Private Key</FormLabel>
        <Textarea
          size={'xs'}
          value={signingDetails.privateKeyPem}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            onFormChange({ ...signingDetails, privateKeyPem: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Document Signer Certificate</FormLabel>
        <Textarea
          size={'xs'}
          value={signingDetails.dscPem}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            onFormChange({ ...signingDetails, dscPem: e.target.value })
          }
        />
      </FormControl>
    </Stack>
  );
};

export default SigningDetailsForm;
