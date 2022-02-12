import {
  Button,
  Divider,
  Flex,
  Icon,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import * as React from 'react';
import { FiCamera } from 'react-icons/fi';
import { DefaultValues, ValidationType } from 'services/dcc/constants';
import CameraScanner from './camera-scanner';
import DecodeResultModal from './decode-result-modal';
import FileUpload from './file-upload';
import ValidationTypeSelect from './validation-type-select';

enum DecodeState {
  None = 0,
  CameraInUse = 1,
  FileUpload = 2,
  Processing = 3,
  ShowResult = 4
}

const DecodeTab: React.FC = () => {
  const [publicKey, setPublicKey] = React.useState(DefaultValues.PublicKeyPem);
  const [decodeState, setDecodeState] = React.useState(DecodeState.None);
  const [qrData, setQRData] = React.useState('');
  const [validationType, setValidationType] = React.useState(
    ValidationType.NBAcc
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSuccessfulQRRead = (data: string) => {
    setQRData(data);
    setDecodeState(DecodeState.None);

    onOpen();
  };

  return (
    <>
      <Flex alignItems={'center'}>
        <ValidationTypeSelect
          validationType={validationType}
          onSelect={setValidationType}
          onPublicKeyChange={setPublicKey}
          publicKeyPem={publicKey}
        />
      </Flex>

      <Divider my={3} />

      {decodeState === DecodeState.None && (
        <Flex alignItems={'center'} justifyContent={'space-evenly'}>
          <Button
            backgroundColor={'gray.100'}
            m={4}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
            height={'200px'}
            width={'300px'}
            rounded={'md'}
            boxShadow={'sm'}
            onClick={() => setDecodeState(DecodeState.CameraInUse)}
          >
            <Text fontSize={'xl'} mb={2}>
              Click to use your camera
            </Text>
            <Icon as={FiCamera} fontSize={'2xl'} />
          </Button>
          <Text fontSize={'xl'}>OR</Text>
          <FileUpload
            onFileAccepted={handleSuccessfulQRRead}
            setIsProcessing={() => setDecodeState(DecodeState.None)}
          />
        </Flex>
      )}

      {decodeState === DecodeState.CameraInUse && (
        <CameraScanner
          onSuccessfulScan={handleSuccessfulQRRead}
          onClickBack={() => setDecodeState(DecodeState.None)}
        />
      )}

      <Divider mt={3} />

      <DecodeResultModal
        isOpen={isOpen}
        onClose={onClose}
        qrData={qrData}
        publicKeyPem={publicKey}
        validationType={validationType}
      />
    </>
  );
};

export default DecodeTab;
