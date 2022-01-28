import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import * as React from 'react';
import { IPersonalDetails } from '../services/interfaces';

interface IPersonalDetailsFormProps {
  inputWidth: string;
  onFormChange(personalDetails: IPersonalDetails): void;
}

const PersonalDetailsForm: React.FC<IPersonalDetailsFormProps> = ({
  inputWidth,
  onFormChange,
}) => {
  const [gnValue, setGnValue] = React.useState('Marcellus');
  const [fnValue, setFnValue] = React.useState('Wallace');
  const [dobValue, setDobValue] = React.useState(
    dayjs().subtract(30, 'year').format('YYYY-MM-DD')
  );

  const handleChange = () => {
    const personalDetails: IPersonalDetails = {
      givenName: gnValue,
      foreName: fnValue,
      dob: dobValue,
    };

    onFormChange(personalDetails);
  };

  React.useEffect(() => handleChange(), []);

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
          value={gnValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setGnValue(event.target.value);
            handleChange();
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Last Name</FormLabel>
        <Input
          placeholder="Wallace"
          type={'text'}
          size={'sm'}
          width={inputWidth}
          value={fnValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFnValue(event.target.value);
            handleChange();
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Date of Birth</FormLabel>
        <Input
          type={'date'}
          size={'sm'}
          width={inputWidth}
          value={dobValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDobValue(event.target.value);
            handleChange();
          }}
        />
      </FormControl>
    </Stack>
  );
};

export default PersonalDetailsForm;
