import {
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import * as React from 'react';
import { DefaultValues } from '../services/constants';
import { ISigningDetails } from '../services/interfaces';

interface ISigningDetailsFormProps {
  onFormChange(cryptoDetails: ISigningDetails): void;
}

const SigningDetailsForm: React.FC<ISigningDetailsFormProps> = ({
  onFormChange,
}) => {
  const [privateKeyValue, setPrivateKeyValue] = React.useState(
    DefaultValues.PrivateKeyPem
  );
  const [dscValue, setDSCValue] = React.useState(DefaultValues.DSCPem);

  const handlePrivateKeyChange = (newPrivateKeyValue: string) => {
    setPrivateKeyValue(newPrivateKeyValue);
    const signingDetails: ISigningDetails = {
      privateKeyPem: newPrivateKeyValue,
      dscPem: dscValue,
    };

    onFormChange(signingDetails);
  };

  const handleDscChange = (newDscValue: string) => {
    setDSCValue(newDscValue);
    const signingDetails: ISigningDetails = {
      privateKeyPem: privateKeyValue,
      dscPem: newDscValue,
    };

    onFormChange(signingDetails);
  };

  React.useEffect(
    () => onFormChange({ dscPem: dscValue, privateKeyPem: privateKeyValue }),
    []
  );

  return (
    <Stack direction={'column'} spacing={3}>
      <Heading as="h3" size="lg">
        Signing Details
      </Heading>
      <FormControl>
        <FormLabel>Private Key</FormLabel>
        <Textarea
          size={'xs'}
          value={privateKeyValue}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            handlePrivateKeyChange(event.target.value)
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Document Signer Certificate</FormLabel>
        <Textarea
          size={'xs'}
          value={dscValue}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleDscChange(event.target.value)
          }
        />
      </FormControl>
    </Stack>
  );
};

export default SigningDetailsForm;
