import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Text,
  Textarea
} from '@chakra-ui/react';
import * as React from 'react';
import { FiCamera } from 'react-icons/fi';
import { DefaultValues } from 'services/constants';
import CameraScanner from './decode/camera-scanner';
import FileUpload from './decode/file-upload';

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

  const handleSuccessfulQRRead = (data: string) => {
    console.log(data);
    setData(data);
    setDecodeState(DecodeState.ShowResult);

    
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
            setIsProcessing={(isProcessing) =>
              isProcessing
                ? setDecodeState(DecodeState.Processing)
                : setDecodeState(DecodeState.None)
            }
          />
        </Flex>
      )}

      {decodeState === DecodeState.CameraInUse && (
        <CameraScanner
          onSuccessfulScan={handleSuccessfulQRRead}
          onClickBack={() => setDecodeState(DecodeState.None)}
        />
      )}

      {decodeState === DecodeState.ShowResult && <Text>{data}</Text>}

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
    </>
  );
};

export default DecodeTab;
