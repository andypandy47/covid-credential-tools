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
  Stack
} from '@chakra-ui/react';
import * as React from 'react';
import { Styles } from 'services/constants';
import { VaccinationEntry } from 'services/dcc-combined-schema';

interface IVaccinationDetailsFormProps {
  vaccinationDetails: VaccinationEntry;
  onFormChange(vaccination: VaccinationEntry): void;
}

const VaccinationDetailsForm: React.FC<IVaccinationDetailsFormProps> = ({
  vaccinationDetails,
  onFormChange
}) => {
  return (
    <Stack direction={'column'} spacing={3}>
      <Heading as="h3" size="lg">
        Vaccination Details
      </Heading>
      <FormControl>
        <FormLabel>Disease Targeted</FormLabel>
        <Input
          value={vaccinationDetails.tg}
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...vaccinationDetails, tg: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Vaccine or Prohpylaxis</FormLabel>
        <Input
          value={vaccinationDetails.vp}
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...vaccinationDetails, vp: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Medicinal Product</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={vaccinationDetails.mp}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...vaccinationDetails, mp: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Manufacturer</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={vaccinationDetails.ma}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...vaccinationDetails, ma: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Dose Number</FormLabel>
        <NumberInput
          value={vaccinationDetails.dn}
          min={0}
          max={20}
          size={'sm'}
          onChange={(valueAsString: string, valueAsNumber: number) =>
            onFormChange({ ...vaccinationDetails, dn: valueAsNumber })
          }
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
          value={vaccinationDetails.sd}
          min={1}
          max={20}
          size={'sm'}
          onChange={(valueAsString: string, valueAsNumber: number) =>
            onFormChange({ ...vaccinationDetails, sd: valueAsNumber })
          }
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
          value={vaccinationDetails.dt}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...vaccinationDetails, dt: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Country of Vaccination</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={vaccinationDetails.co}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...vaccinationDetails, co: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Certificate Issuer</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={vaccinationDetails.is}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...vaccinationDetails, is: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>UVCI</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={vaccinationDetails.ci}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...vaccinationDetails, ci: e.target.value })
          }
        />
      </FormControl>
    </Stack>
  );
};

export default VaccinationDetailsForm;
