import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack
} from '@chakra-ui/react';
import * as React from 'react';
import { Styles } from 'services/constants';
import { RecoveryEntry } from 'services/dcc/dcc-combined-schema';

interface IRecoveryDetailsFormProps {
  recoveryDetails: RecoveryEntry;
  onFormChange(recovery: RecoveryEntry): void;
}

const RecoveryDetailsForm: React.FC<IRecoveryDetailsFormProps> = ({
  recoveryDetails,
  onFormChange
}) => {
  return (
    <Stack direction={'column'} spacing={3}>
      <Heading as="h3" size="lg">
        Recovery Details
      </Heading>
      <FormControl>
        <FormLabel>Disease Targeted</FormLabel>
        <Input
          value={recoveryDetails.tg}
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...recoveryDetails, tg: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Date of First Positive NAA Test</FormLabel>
        <Input
          type={'date'}
          size={'sm'}
          width={Styles.InputWidth}
          value={recoveryDetails.fr}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...recoveryDetails, fr: e.target.value })
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel>Date From</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={recoveryDetails.df}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...recoveryDetails, df: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Date Until</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={recoveryDetails.du}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...recoveryDetails, du: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Country of Test</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={recoveryDetails.co}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...recoveryDetails, co: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Certificate Issuer</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={recoveryDetails.is}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...recoveryDetails, is: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>UVCI</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={recoveryDetails.ci}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...recoveryDetails, ci: e.target.value })
          }
        />
      </FormControl>
    </Stack>
  );
};

export default RecoveryDetailsForm;
