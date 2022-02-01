import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import * as React from 'react';
import { FiCamera } from 'react-icons/fi';
import CameraScanner from './decode/camera-scanner';
import FileUpload from './decode/file-upload';

enum DecodeState {
  None = 0,
  CameraInUse = 1,
  FileUpload = 2,
  ShowResult = 3
}

const DecodeTab: React.FC = () => {
  const [decodeState, setDecodeState] = React.useState(DecodeState.None);
  const [data, setData] = React.useState('');

  const handleSuccessfulScan = (data: string) => {
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
              Use your camera
            </Text>
            <Icon as={FiCamera} fontSize={'2xl'} />
          </Button>
          <Text fontSize={'xl'}>OR</Text>
          {/* <Button
            backgroundColor={'gray.100'}
            m={4}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
            height={'200px'}
            width={'300px'}
            rounded={'md'}
            boxShadow={'sm'}
          >
            <Text fontSize={'xl'} mb={2}>
              Upload an image
            </Text>
            <Icon as={FiUpload} fontSize={'2xl'} />
          </Button> */}
          <FileUpload onSuccessfulQRUpload={setData} />
        </Flex>
      )}

      {decodeState === DecodeState.CameraInUse && (
        <CameraScanner onSuccessfulScan={handleSuccessfulScan} />
      )}

      {decodeState === DecodeState.ShowResult && <Text>{data}</Text>}
    </>
  );
};

export default DecodeTab;
