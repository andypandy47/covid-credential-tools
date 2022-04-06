import { DownloadIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useClipboard,
  VStack
} from '@chakra-ui/react';
import { toCanvas } from 'qrcode';
import * as React from 'react';
import { DCCEntryType } from 'services/dcc/constants';
import { IDCCGenerationResponse } from 'services/dcc/dcc-interfaces';
import CopyableResultValue from 'components/copyable-result-value';

interface IGenerationResultModalProps {
  isOpen: boolean;
  onClose(): void;
  onGenerationComplete(): void;
  generationResult: IDCCGenerationResponse;
}

const GenerationResultModal: React.FC<IGenerationResultModalProps> = ({
  isOpen,
  onClose,
  onGenerationComplete,
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
    link.download = `${DCCEntryType[generationResult.dccType]}_qr.png`;
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

      onGenerationComplete();
    }
  }, [canvas]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxWidth={'1100px'}>
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
              <CopyableResultValue
                label="HC1"
                value={generationResult.signedHcert}
                height="200px"
                onCopy={onHcertCopy}
              />
              <CopyableResultValue
                label="Public Key"
                value={generationResult.publicKeyPem}
                height="110px"
                onCopy={onPublicKeyCopy}
              />
              <CopyableResultValue
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
