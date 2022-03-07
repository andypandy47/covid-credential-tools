import { AddIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text
} from '@chakra-ui/react';
import * as React from 'react';
import { Styles } from 'services/constants';
import { UKDomesticEntry } from 'services/dcc/dcc-combined-schema';

interface IUKDomesticDetailsFormProps {
  ukDomesticDetails: UKDomesticEntry;
  onFormChange(ukDomestic: UKDomesticEntry): void;
}

const UKDomesticDetailsForm: React.FC<IUKDomesticDetailsFormProps> = ({
  ukDomesticDetails,
  onFormChange
}) => {
  const [isAddingNewPolicy, setIsAddingNewPolicy] = React.useState(false);
  const [newPolicy, setNewPolicy] = React.useState('');

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    const newPo = [...ukDomesticDetails.po, newPolicy];

    onFormChange({ ...ukDomesticDetails, po: newPo });
    setIsAddingNewPolicy(() => false);
    setNewPolicy('');
  };

  return (
    <Stack direction={'column'} spacing={3}>
      <Heading as="h3" size="lg">
        UK Domestic Details
      </Heading>
      <FormControl>
        <FormLabel>
          Policy Keys
          <IconButton
            ml={2}
            size={'xs'}
            icon={<AddIcon />}
            aria-label={'add-policy-key'}
            onClick={() => setIsAddingNewPolicy(() => true)}
          />
        </FormLabel>

        {ukDomesticDetails.po.map((value, index) => {
          return (
            <Text key={`${value}-${index}`} mb={1}>
              {value}
            </Text>
          );
        })}

        {isAddingNewPolicy ? (
          <Input
            type={'text'}
            size={'sm'}
            width={Styles.InputWidth}
            onKeyUp={handleKeyUp}
            value={newPolicy}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPolicy(e.target.value)
            }
          />
        ) : null}
      </FormControl>

      <FormControl>
        <FormLabel>Policy Mask</FormLabel>
        <NumberInput
          value={ukDomesticDetails.pm}
          min={0}
          max={20}
          size={'sm'}
          onChange={(valueAsString: string, valueAsNumber: number) =>
            onFormChange({ ...ukDomesticDetails, pm: valueAsNumber })
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
        <FormLabel>Date From</FormLabel>
        <Input
          type={'date'}
          size={'sm'}
          width={Styles.InputWidth}
          value={ukDomesticDetails.df}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...ukDomesticDetails, df: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Date Until</FormLabel>
        <Input
          type={'date'}
          size={'sm'}
          width={Styles.InputWidth}
          value={ukDomesticDetails.du}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...ukDomesticDetails, du: e.target.value })
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel>Country of Certificate</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={ukDomesticDetails.co}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...ukDomesticDetails, co: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Certificate Issuer</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={ukDomesticDetails.is}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...ukDomesticDetails, is: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>UVCI</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={ukDomesticDetails.ci}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...ukDomesticDetails, ci: e.target.value })
          }
        />
      </FormControl>
    </Stack>
  );
};

export default UKDomesticDetailsForm;
