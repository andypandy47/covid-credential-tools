import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, Flex, Spinner } from '@chakra-ui/react';
import QrScanner from 'qr-scanner';
import * as React from 'react';

interface ICameraScannerProps {
  onSuccessfulScan(data: string): void;
  onClickBack(): void;
}

const CameraScanner: React.FC<ICameraScannerProps> = ({
  onSuccessfulScan,
  onClickBack
}) => {
  const [isLoading, setIsLoading] = React.useState(true);

  const videoRef = React.useRef<HTMLVideoElement>({} as HTMLVideoElement);

  const scannerRef = React.useRef<QrScanner>({} as QrScanner);

  React.useEffect(() => {
    if (!videoRef) {
      console.error('Video ref not set properly!');
      return;
    }

    const scanner = new QrScanner(
      videoRef.current,
      (result) => {
        scanner.stop();
        scanner.destroy();
        onSuccessfulScan(result.data);
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true
      }
    );

    scanner.start().then(() => {
      scannerRef.current = scanner;

      setIsLoading(false);
    });
  });

  const handleClickBack = () => {
    scannerRef.current.stop();
    onClickBack();
  };

  return (
    <Flex
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      {isLoading && (
        <Spinner
          thickness={'4px'}
          speed={'0.65s'}
          emptyColor={'gray.200'}
          color={'#005EB8'}
          size={'xl'}
        />
      )}

      <video ref={videoRef}></video>

      <Flex justifyContent={'flex-end'} width={'full'}>
        <Button
          aria-label="back"
          leftIcon={<ArrowBackIcon />}
          mt={3}
          onClick={handleClickBack}
        >
          Go Back
        </Button>
      </Flex>
    </Flex>
  );
};

export default CameraScanner;
