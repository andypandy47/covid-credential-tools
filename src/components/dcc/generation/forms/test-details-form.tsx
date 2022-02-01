import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react';
import * as React from 'react';
import { DCCValues, Styles } from 'services/constants';
import { TestEntry } from 'services/dcc-combined-schema';

interface ITestDetailsFormProps {
  testDetails: TestEntry;
  onFormChange(test: TestEntry): void;
}

const TestDetailsForm: React.FC<ITestDetailsFormProps> = ({
  testDetails,
  onFormChange
}) => {
  return (
    <Stack direction={'column'} spacing={3}>
      <Heading as="h3" size="lg">
        Test Details
      </Heading>
      <FormControl>
        <FormLabel>Disease Targeted</FormLabel>
        <Input
          value={testDetails.tg}
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...testDetails, tg: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Type of Test</FormLabel>
        <RadioGroup
          onChange={(value) => onFormChange({ ...testDetails, tt: value })}
          value={testDetails.tt}
        >
          <Stack direction="row">
            <Radio value={DCCValues.NAATValue}>NAAT</Radio>
            <Radio value={DCCValues.RATValue}>RAT</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      {testDetails.tt === DCCValues.NAATValue ? (
        <FormControl>
          <FormLabel>NAAT Test Name</FormLabel>
          <Input
            type={'text'}
            size={'sm'}
            width={Styles.InputWidth}
            value={testDetails.nm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onFormChange({ ...testDetails, nm: e.target.value })
            }
          />
        </FormControl>
      ) : (
        <FormControl>
          <FormLabel>RAT Test Name / Manufacturer</FormLabel>
          <Input
            type={'text'}
            size={'sm'}
            width={Styles.InputWidth}
            value={testDetails.ma}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onFormChange({ ...testDetails, ma: e.target.value })
            }
          />
        </FormControl>
      )}
      <FormControl>
        <FormLabel>Date/Time of Sample Collection</FormLabel>
        <Input
          type={'datetime-local'}
          size={'sm'}
          width={Styles.InputWidth}
          value={testDetails.sc}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...testDetails, sc: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Test Result</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={testDetails.tr}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...testDetails, tr: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Testing Centre</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={testDetails.tc}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...testDetails, tc: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Country of Test</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={testDetails.co}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...testDetails, co: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Certificate Issuer</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={testDetails.is}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...testDetails, is: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>UVCI</FormLabel>
        <Input
          type={'text'}
          size={'sm'}
          width={Styles.InputWidth}
          value={testDetails.ci}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange({ ...testDetails, ci: e.target.value })
          }
        />
      </FormControl>
    </Stack>
  );
};

export default TestDetailsForm;
