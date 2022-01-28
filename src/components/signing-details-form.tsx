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

  const handleChange = () => {
    const signingDetails: ISigningDetails = {
      privateKeyPem: privateKeyValue,
      dscPem: dscValue,
    };

    onFormChange(signingDetails);
  };

  React.useEffect(() => handleChange(), []);

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
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setPrivateKeyValue(event.target.value);
            handleChange();
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Document Signer Certificate</FormLabel>
        <Textarea
          size={'xs'}
          value={dscValue}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setDSCValue(event.target.value);
            handleChange();
          }}
        />
      </FormControl>
    </Stack>
  );
};

export default SigningDetailsForm;
