import {
  Flex,
  FormControl,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react';
import * as React from 'react';
import { ValidationType } from 'services/dcc/constants';
import GatewayDataRevalidation from './gateway-data-revalidation';

interface IValidationTypeSelectProps {
  onSelect(selectedType: ValidationType): void;
  onPublicKeyChange(newValue: string): void;
  publicKeyPem: string;
  validationType: ValidationType;
}

const ValidationTypeSelect: React.FC<IValidationTypeSelectProps> = ({
  onSelect,
  validationType,
  publicKeyPem,
  onPublicKeyChange
}) => {
  return (
    <>
      <Flex flexDirection={'column'} flex={1}>
        <Text fontSize={'xl'} fontWeight={'semibold'} mb={2}>
          Verify against the EU Gateway or provide a public key
        </Text>
        <Flex flex={1} alignItems={'flex-start'} p={2}>
          <RadioGroup
            onChange={(nextValue) => onSelect(parseInt(nextValue))}
            value={validationType}
            mr={8}
          >
            <Stack direction="column">
              <Radio value={ValidationType.NBProd}>EU Gateway (Prod)</Radio>
              <Radio value={ValidationType.NBAcc}>EU Gateway (Acc)</Radio>
              <Radio value={ValidationType.PublicKey}>Input Public Key</Radio>
            </Stack>
          </RadioGroup>

          {validationType === ValidationType.PublicKey ? (
            <FormControl flex={2}>
              <Textarea
                size={'xs'}
                value={publicKeyPem}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  onPublicKeyChange(e.target.value)
                }
              />
            </FormControl>
          ) : (
            <GatewayDataRevalidation />
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default ValidationTypeSelect;
