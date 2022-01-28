import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import * as React from 'react';
import { Styles } from '../services/constants';
import { TestEntry } from '../services/dcc-combined-schema';

interface ITestDetailsFormProps {
  onFormChange(test: TestEntry): void;
}

const NATValue = 'LP6464-4';
const RATValue = 'LP217198-3';

const TestDetailsForm: React.FC<ITestDetailsFormProps> = ({ onFormChange }) => {
  const [tgValue, setTgValue] = React.useState('840539006');
  const [ttValue, setTtValue] = React.useState(RATValue);
  const [nmValue, setNmValue] = React.useState(
    'ELITechGroup, SARS-CoV-2 ELITe MGB® Kit'
  );
  const [maValue, setMaValue] = React.useState('532');
  const [scValue, setScValue] = React.useState(
    dayjs().subtract(1, 'day').format('YYYY-MM-DDTHH:mm')
  );
  const [trValue, setTrValue] = React.useState('260415000');
  const [tcValue, setTcValue] = React.useState('Example Test Corp, Big City');
  const [coValue, setCoValue] = React.useState('GB');
  const [isValue, setIsValue] = React.useState('NHS Digital');
  const [ciValue, setCiValue] = React.useState(
    'URN:UVCI:01:GB:1643188068882Q5PU76VZ#V'
  );

  const handleChange = () => {
    const test: TestEntry = {
      tg: tgValue,
      tt: ttValue,
      sc: trValue,
      tr: scValue,
      tc: tcValue,
      co: coValue,
      is: isValue,
      ci: ciValue,
    };

    onFormChange(test);
  };

  React.useEffect(() => handleChange(), []);

  return (
    <Stack direction={'column'} spacing={3}>
      <Heading as="h3" size="lg">
        Test Details
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
        <FormLabel>Type of Test</FormLabel>
        <RadioGroup
          onChange={(value) => {
            setTtValue(value);
            handleChange();
          }}
          value={ttValue}
        >
          <Stack direction="row">
            <Radio value={NATValue}>NAAT</Radio>
            <Radio value={RATValue}>RAT</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      {ttValue === RATValue ? (
        <FormControl>
          <FormLabel>RAT Test Name / Manufacturer</FormLabel>
          <Input
            type={'text'}
            size={'sm'}
            width={Styles.InputWidth}
            value={maValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setMaValue(e.target.value);
              handleChange();
            }}
          />
        </FormControl>
      ) : (
        <FormControl>
          <FormLabel>NAAT Test Name</FormLabel>
          <Input
            type={'text'}
            size={'sm'}
            width={Styles.InputWidth}
            value={nmValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNmValue(e.target.value);
              handleChange();
            }}
          />
        </FormControl>
      )}
      <FormControl>
        <FormLabel>Date/Time of Sample Collection</FormLabel>
        <Input
          type={'datetime-local'}
          size={'sm'}
          width={Styles.InputWidth}
          value={scValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setScValue(e.target.value);
            handleChange();
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Test Result</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={trValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTrValue(e.target.value);
            handleChange();
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Testing Centre</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={tcValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTcValue(e.target.value);
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

export default TestDetailsForm;
