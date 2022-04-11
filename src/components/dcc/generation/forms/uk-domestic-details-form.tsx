import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  UnorderedList
} from '@chakra-ui/react';
import * as React from 'react';
import { Styles } from 'services/crypto-constantsnstants';
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

  const handleDeletePolicyValue = (index: number) => {
    const newPo = [...ukDomesticDetails.po];
    newPo.splice(index, 1);

    onFormChange({ ...ukDomesticDetails, po: newPo });
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

        <UnorderedList ml={8}>
          {ukDomesticDetails.po.map((value, index) => {
            return (
              <ListItem key={`${value}-${index}`}>
                <Flex width={'full'} justifyContent={'space-between'}>
                  <Text mb={1}>{value}</Text>
                  <IconButton
                    icon={<DeleteIcon />}
                    size={'xs'}
                    variant={'ghost'}
                    aria-label={'delete-policy-value'}
                    color={'red.600'}
                    onClick={() => handleDeletePolicyValue(index)}
                  />
                </Flex>
              </ListItem>
            );
          })}
        </UnorderedList>

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
            autoFocus
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
