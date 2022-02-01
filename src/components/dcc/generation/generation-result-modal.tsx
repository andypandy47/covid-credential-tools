import { DownloadIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useClipboard,
  VStack
} from '@chakra-ui/react';
import { toCanvas } from 'qrcode';
import * as React from 'react';
import { DCCEntryType } from 'services/constants';
import { IDCCGenerationResponse } from 'services/interfaces';
import ResultValue from './result-value';

interface IGenerationResultModalProps {
  isOpen: boolean;
  onClose(): void;
  generationResult: IDCCGenerationResponse;
}

const GenerationResultModal: React.FC<IGenerationResultModalProps> = ({
  isOpen,
  onClose,
  generationResult
}) => {
  const [canvas, setCanvas] = React.useState<HTMLCanvasElement>(
    {} as HTMLCanvasElement
  );
  const { onCopy: onHcertCopy } = useClipboard(
    generationResult.signedHcert,
    1000000
  );
  const { onCopy: onPublicKeyCopy } = useClipboard(
    generationResult.publicKeyPem,
    1000000
  );
  const { onCopy: onKidCopy } = useClipboard(generationResult.kid, 1000000);

  const downloadQR = () => {
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'vaccine_qr.png';
    link.href = url;
    link.click();
  };

  const qrRef = React.useCallback((canvasNode) => {
    setCanvas(canvasNode);
  }, []);

  React.useEffect(() => {
    if (generationResult.signedHcert && canvas) {
      const qrValue = generationResult.signedHcert;

      toCanvas(
        canvas,
        qrValue,
        { errorCorrectionLevel: 'Q', width: 512, margin: 2 },
        (error) => {
          if (error) {
            console.error(error);
            return;
          }
        }
      );
    }
  }, [canvas]);

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
            <Flex direction={'column'} flex={1}>
              <Heading as="h3" size={'lg'}>
                {`${DCCEntryType[generationResult.dccType]} QR`}
              </Heading>
              <canvas id="canvas" ref={qrRef} />
            </Flex>
            <VStack
              direction={'column'}
              flex={1}
              alignItems={'flex-start'}
              justifyContent={'flex-start'}
              minHeight={'100%'}
            >
              <ResultValue
                label="HC1"
                value={generationResult.signedHcert}
                height="200px"
                onCopy={onHcertCopy}
              />
              <ResultValue
                label="Public Key"
                value={generationResult.publicKeyPem}
                height="110px"
                onCopy={onPublicKeyCopy}
              />
              <ResultValue
                label="Key Id"
                height="50px"
                value={generationResult.kid}
                onCopy={onKidCopy}
              />
            </VStack>
          </ModalBody>

          <ModalFooter display={'flex'} justifyContent={'space-between'}>
            <Button
              variant="ghost"
              leftIcon={<DownloadIcon />}
              onClick={downloadQR}
            >
              Download QR
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GenerationResultModal;
