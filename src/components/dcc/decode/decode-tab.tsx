import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Text,
  Textarea,
  useDisclosure
} from '@chakra-ui/react';
import * as React from 'react';
import { FiCamera } from 'react-icons/fi';
import { DefaultValues } from 'services/dcc/constants';
import CameraScanner from './camera-scanner';
import DecodeResultModal from './decode-result-modal';
import FileUpload from './file-upload';

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
  const [data, setData] = React.useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSuccessfulQRRead = (data: string) => {
    setData(data);
    setDecodeState(DecodeState.None);

    onOpen();
  };

  return (
    <>
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
      <FormControl width={'50%'} mt={3}>
        <FormLabel>Public Key</FormLabel>
        <Textarea
          size={'xs'}
          value={publicKey}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPublicKey(e.target.value)
          }
        />
      </FormControl>

      <DecodeResultModal
        isOpen={isOpen}
        onClose={onClose}
        qrData={data}
        publicKeyPem={publicKey}
      />
    </>
  );
};

export default DecodeTab;
