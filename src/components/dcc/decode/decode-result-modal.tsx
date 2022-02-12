import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useGBNationalBackend } from 'hooks/useGBNationalBackend';
import * as React from 'react';
import { DefaultValues, ValidationType } from 'services/dcc/constants';
import { EUDCC } from 'services/dcc/dcc-combined-schema';
import { IValidationContext } from 'services/dcc/dcc-interfaces';
import { validateDCC } from 'services/dcc/dcc-validation-service';
import PayloadDisplay from './payload-display';
import ValidationStep from './validation-step';

interface IDecodeResultModalProps {
  isOpen: boolean;
  onClose(): void;
  qrData: string;
  publicKeyPem: string;
  validationType: ValidationType;
}

const DecodeResultModal: React.FC<IDecodeResultModalProps> = ({
  isOpen,
  onClose,
  qrData,
  publicKeyPem,
  validationType
}) => {
  const [validationContext, setValidationContext] =
    React.useState<IValidationContext>(DefaultValues.ValidationContext);

  const { nationalBackendData } = useGBNationalBackend();

  React.useEffect(() => {
    if (qrData === '') {
      return;
    }

    validateDCC(qrData, nationalBackendData, publicKeyPem, validationType)
      .then((value) => {
        setValidationContext(value);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [qrData]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior={'inside'}
      >
        <ModalOverlay />
        <ModalContent maxWidth={'1100px'}>
          <Heading
            as={'h3'}
            size={'lg'}
            py={2}
            px={6}
            borderBottom={'1px'}
            borderBottomColor={'gray.100'}
          >
            Decode Result
          </Heading>
          <ModalBody display={'flex'} flexDirection={'column'}>
            <Flex flexDirection={'row'}>
              <Flex flex={1} flexDirection={'column'} p={2}>
                <Stack>
                  <Flex>
                    <Text fontWeight={'bold'}>Key Id: </Text>
                    <Text ml={2}>
                      {validationContext.decodedCose?.keyIdentifier ?? ''}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight={'bold'}>Issuer: </Text>
                    <Text ml={2}>
                      {validationContext.decodedCose?.issuer ?? ''}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight={'bold'}>Issuing Date: </Text>
                    <Text ml={2}>
                      {dayjs
                        .unix(
                          validationContext.decodedCose?.notValidBefore ?? 0
                        )
                        .format() ?? ''}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight={'bold'}>Expiry Date: </Text>
                    <Text ml={2}>
                      {dayjs
                        .unix(validationContext.decodedCose?.expiry ?? 0)
                        .format() ?? ''}
                    </Text>
                  </Flex>
                  <PayloadDisplay
                    payload={
                      validationContext.decodedCose?.hcert ?? ({} as EUDCC)
                    }
                  />
                </Stack>
              </Flex>
              <Flex flex={1} flexDirection={'column'} p={2}>
                <Text fontWeight={'bold'} mb={2}>
                  Validation:
                </Text>
                <Stack spacing={1}>
                  <ValidationStep
                    validationStep={validationContext.contextIdentifier}
                  />
                  <ValidationStep
                    validationStep={validationContext.issuingDate}
                  />
                  <ValidationStep
                    validationStep={validationContext.expiryDate}
                  />
                  <ValidationStep
                    validationStep={validationContext.signautre}
                  />
                </Stack>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter
            display={'flex'}
            justifyContent={'flex-end'}
            alignItems={'flex-end'}
          >
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DecodeResultModal;
