import { Flex } from '@chakra-ui/react';
import * as React from 'react';
import { ValidationStepState } from 'services/dcc/constants';
import { IValidationStep } from 'services/dcc/dcc-interfaces';

interface IValidationStepProps {
  validationStep: IValidationStep;
}

const ValidationStep: React.FC<IValidationStepProps> = ({ validationStep }) => {
  return (
    <Flex
      flex={1}
      minH={'30px'}
      backgroundColor={
        validationStep.state === ValidationStepState.Failed
          ? 'red.500'
          : 'green.500'
      }
      rounded={'md'}
    ></Flex>
  );
};

export default ValidationStep;
