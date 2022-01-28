import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import * as React from 'react';
import { Styles } from '../services/constants';
import { RecoveryEntry } from '../services/dcc-combined-schema';

interface IRecoveryDetailsFormProps {
  onFormChange(recovery: RecoveryEntry): void;
}

const RecoveryDetailsForm: React.FC<IRecoveryDetailsFormProps> = ({
  onFormChange,
}) => {
  const [tgValue, setTgValue] = React.useState('840539006');
  const [frValue, setFrValue] = React.useState(
    dayjs().subtract(1, 'month').format('YYYY-MM-DD')
  );
  const [dfValue, setDfValue] = React.useState(
    dayjs(frValue).add(12, 'day').format('YYYY-MM-DD')
  );
  const [duValue, setDuValue] = React.useState(
    dayjs(dfValue).add(5, 'month').format('YYYY-MM-DD')
  );
  const [coValue, setCoValue] = React.useState('GB');
  const [isValue, setIsValue] = React.useState('NHS Digital');
  const [ciValue, setCiValue] = React.useState(
    'URN:UVCI:01:GB:1643189507929SED2CR3N#5'
  );

  const handleChange = () => {
    const recovery: RecoveryEntry = {
      tg: tgValue,
      fr: frValue,
      df: dfValue,
      du: duValue,
      co: coValue,
      is: isValue,
      ci: ciValue,
    };

    onFormChange(recovery);
  };

  React.useEffect(() => handleChange(), []);

  return (
    <Stack direction={'column'} spacing={3}>
      <Heading as="h3" size="lg">
        Recovery Details
      </Heading>
      <FormControl>
        <FormLabel>Disease Targeted</FormLabel>
        <Input
          value={tgValue}
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTgValue(e.target.value);
            handleChange();
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Date of First Positive NAA Test</FormLabel>
        <Input
          type={'date'}
          size={'sm'}
          width={Styles.InputWidth}
          value={frValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFrValue(e.target.value);
            handleChange();
          }}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Date From</FormLabel>
        <Input
          type={'date'}
          size={'sm'}
          width={Styles.InputWidth}
          value={dfValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDfValue(e.target.value);
            handleChange();
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Date Until</FormLabel>
        <Input
          type={'date'}
          size={'sm'}
          width={Styles.InputWidth}
          value={duValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDuValue(e.target.value);
            handleChange();
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Country of Vaccination</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={coValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCoValue(e.target.value);
            handleChange();
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Certificate Issuer</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={isValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIsValue(e.target.value);
            handleChange();
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>UVCI</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={ciValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCiValue(e.target.value);
            handleChange();
          }}
        />
      </FormControl>
    </Stack>
  );
};

export default RecoveryDetailsForm;
