import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack
} from '@chakra-ui/react';
import * as React from 'react';
import { IPersonalDetails } from 'services/dcc/interfaces';

interface IPersonalDetailsFormProps {
  inputWidth: string;
  personalDetails: IPersonalDetails;
  onFormChange(personalDetails: IPersonalDetails): void;
}

const PersonalDetailsForm: React.FC<IPersonalDetailsFormProps> = ({
  inputWidth,
  personalDetails,
  onFormChange
}) => {
  return (
    <Stack direction={'column'} spacing={3}>
      <Heading as="h3" size="lg">
        Personal Info
      </Heading>
      <FormControl>
        <FormLabel>First Name</FormLabel>
        <Input
          placeholder="Marcellus"
          type={'text'}
          size={'sm'}
          width={inputWidth}
          value={personalDetails.givenName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...personalDetails, givenName: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Last Name</FormLabel>
        <Input
          placeholder="Wallace"
          type={'text'}
          size={'sm'}
          width={inputWidth}
          value={personalDetails.foreName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...personalDetails, foreName: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Date of Birth</FormLabel>
        <Input
          type={'date'}
          size={'sm'}
          width={inputWidth}
          value={personalDetails.dob}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...personalDetails, dob: e.target.value })
          }
        />
      </FormControl>
    </Stack>
  );
};

export default PersonalDetailsForm;
