import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import * as React from 'react';
import { Styles } from '../services/constants';
import { VaccinationEntry } from '../services/dcc-combined-schema';

interface IVaccinationDetailsFormProps {
  onFormChange(vaccination: VaccinationEntry): void;
}

const VaccinationDetailsForm: React.FC<IVaccinationDetailsFormProps> = ({
  onFormChange,
}) => {
  const [tgValue, setTgValue] = React.useState('840539006');
  const [vpValue, setVpValue] = React.useState('1119349007');
  const [mpValue, setMpValue] = React.useState('EU/1/20/1507'); //Spikevax
  const [maValue, setMaValue] = React.useState('ORG-100031184'); //Moderna
  const [dnValue, setDnValue] = React.useState(2);
  const [sdValue, setSdValue] = React.useState(2);
  const [dtValue, setDtValue] = React.useState(
    dayjs().subtract(3, 'month').format('YYYY-MM-DD')
  );
  const [coValue, setCoValue] = React.useState('GB');
  const [isValue, setIsValue] = React.useState('NHS Digital');
  const [ciValue, setCiValue] = React.useState(
    'URN:UVCI:01:GB:1643188028017ZPZEURP2#T'
  );

  const handleChange = () => {
    const vaccination: VaccinationEntry = {
      tg: tgValue,
      vp: vpValue,
      mp: mpValue,
      ma: maValue,
      dn: dnValue,
      sd: sdValue,
      dt: dtValue,
      co: coValue,
      is: isValue,
      ci: ciValue,
    };

    onFormChange(vaccination);
  };

  React.useEffect(() => handleChange(), []);

  return (
    <Stack direction={'column'} spacing={3}>
      <Heading as="h3" size="lg">
        Vaccination Details
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
        <FormLabel>Vaccine or Prohpylaxis</FormLabel>
        <Input
          value={vpValue}
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setVpValue(e.target.value);
            handleChange();
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Medicinal Product</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={mpValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setMpValue(e.target.value);
            handleChange();
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Manufacturer</FormLabel>
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
      <FormControl>
        <FormLabel>Dose Number</FormLabel>
        <NumberInput
          value={dnValue}
          min={0}
          max={20}
          size={'sm'}
          onChange={(valueAsString: string, valueAsNumber: number) => {
            setDnValue(valueAsNumber);
            handleChange();
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Series of Doses</FormLabel>
        <NumberInput
          value={sdValue}
          min={1}
          max={20}
          size={'sm'}
          onChange={(valueAsString: string, valueAsNumber: number) => {
            setSdValue(valueAsNumber);
            handleChange();
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Date of Vaccination</FormLabel>
        <Input
          type={'date'}
          size={'sm'}
          width={Styles.InputWidth}
          value={dtValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDtValue(e.target.value);
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

export default VaccinationDetailsForm;
