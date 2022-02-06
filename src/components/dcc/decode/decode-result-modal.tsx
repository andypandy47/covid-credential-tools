import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack
} from '@chakra-ui/react';
import * as React from 'react';
import { DefaultValues } from 'services/dcc/constants';
import { validateDCC } from 'services/dcc/dcc-validation-service';
import { IValidationContext } from 'services/dcc/interfaces';

interface IDecodeResultModalProps {
  isOpen: boolean;
  onClose(): void;
  qrData: string;
  publicKeyPem: string;
}

const DecodeResultModal: React.FC<IDecodeResultModalProps> = ({
  isOpen,
  onClose,
  qrData,
  publicKeyPem
}) => {
  const [validationContext, setValidationContext] =
    React.useState<IValidationContext>(DefaultValues.ValidationContext);

  React.useEffect(() => {
    if (qrData === '') {
      return;
    }

    validateDCC(qrData, publicKeyPem)
      .then((value) => {
        setValidationContext(value);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [qrData]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxWidth={'1100px'}>
          <ModalCloseButton />
          <ModalBody
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
          >
            <Flex flex={1} flexDirection={'column'}>
              <Heading as={'h3'} size={'lg'} mb={3}>
                Decode Result
              </Heading>
              <Stack>
                <FormControl>
                  <FormLabel>Key Id</FormLabel>
                  <Input
                    type={'text'}
                    isReadOnly
                    size={'sm'}
                    value={validationContext.decodedCose?.keyIdentifier}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Issuer</FormLabel>
                  <Input
                    type={'text'}
                    isReadOnly
                    size={'sm'}
                    value={validationContext.decodedCose?.issuer}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Issuing Date</FormLabel>
                  <Input
                    type={'text'}
                    isReadOnly
                    size={'sm'}
                    value={validationContext.decodedCose?.notValidBefore}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Expiry Date</FormLabel>
                  <Input
                    type={'text'}
                    isReadOnly
                    size={'sm'}
                    value={validationContext.decodedCose?.expiry}
                  />
                </FormControl>
                {/* <CodeBlock
                  text={JSON.stringify(validationContext.decodedCose?.hcert)}
                  language={'javascript'}
                  showLineNumbers={true}
                  theme={dracula}
                /> */}
              </Stack>
            </Flex>
            <Flex flex={1}></Flex>
          </ModalBody>

          <ModalFooter
            display={'flex'}
            justifyContent={'space-between'}
          ></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DecodeResultModal;
