import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { Flex, Icon, Text } from '@chakra-ui/react';
import * as React from 'react';
import { ValidationStepState } from 'services/dcc/constants';
import { IValidationStep } from 'services/dcc/dcc-interfaces';

interface IValidationStepProps {
  validationStep: IValidationStep;
}

const ValidationStep: React.FC<IValidationStepProps> = ({ validationStep }) => {
  const isValid = validationStep.state === ValidationStepState.Passed;
  return (
    <Flex
      flex={1}
      p={2}
      minH={'30px'}
      backgroundColor={isValid ? 'green.500' : 'red.500'}
      rounded={'md'}
      color={'gray.100'}
      alignItems={'center'}
    >
      {isValid ? (
        <>
          <Icon as={CheckCircleIcon} mr={2} />
          <Text fontWeight={'semibold'} mr={2}>
            {validationStep.title}
          </Text>
        </>
      ) : (
        <>
          <Icon as={WarningIcon} mr={2} />
          <Text fontWeight={'semibold'} mr={2}>
            {validationStep.title}:
          </Text>
          <Text>{validationStep?.message}</Text>
        </>
      )}
    </Flex>
  );
};

export default ValidationStep;
