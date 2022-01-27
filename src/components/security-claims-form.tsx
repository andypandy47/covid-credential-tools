import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import * as React from 'react';
import dayjs from 'dayjs';
import { ISecurityClaims } from '../services/interfaces';

interface ISecurityClaimsFormProps {
  inputWidth: string;
  onFormChange(securityClaims: ISecurityClaims): void;
}

const SecurityClaimsForm: React.FC<ISecurityClaimsFormProps> = ({
  inputWidth,
  onFormChange,
}) => {
  const [issCountryValue, setIssValue] = React.useState('GB');
  const [iatValue, setIatDateValue] = React.useState(
    dayjs().subtract(6, 'month').format('YYYY-MM-DD')
  );
  const [expValue, setExpValue] = React.useState(
    dayjs().add(6, 'month').format('YYYY-MM-DD')
  );

  const handleChange = () => {
    const securityClaims: ISecurityClaims = {
      issuerCountry: issCountryValue,
      issuingDate: iatValue,
      expiry: expValue,
    };

    onFormChange(securityClaims);
  };

  React.useEffect(() => handleChange(), []);

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
          value={issCountryValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIssValue(e.target.value);
            handleChange();
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Issued At</FormLabel>
        <Input
          type={'date'}
          size={'sm'}
          width={inputWidth}
          value={iatValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIatDateValue(e.target.value);
            handleChange();
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Expiry</FormLabel>
        <Input
          type={'date'}
          size={'sm'}
          width={inputWidth}
          value={expValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setExpValue(e.target.value);
            handleChange();
          }}
        />
      </FormControl>
    </Stack>
  );
};

export default SecurityClaimsForm;
