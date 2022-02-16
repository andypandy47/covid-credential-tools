import { Flex, Icon, Text, useToast } from '@chakra-ui/react';
import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import QrScanner from 'qr-scanner';

interface IFileUploadProps {
  setIsProcessing(isProcessing: boolean): void;
  onFileAccepted(qrCodeData: string): void;
}

const FileUpload: React.FC<IFileUploadProps> = ({
  onFileAccepted,
  setIsProcessing
}) => {
  const toast = useToast();

  const onDrop = React.useCallback(
    async (acceptedFiles) => {
      if (!acceptedFiles) {
        toast({
          title: 'Something went wrong with file upload',
          position: 'bottom-right',
          isClosable: true,
          status: 'error',
          variant: 'subtle'
        });

        return;
      }

      const file = acceptedFiles[0] as File;

      setIsProcessing(true);

      try {
        const qrEngine = await QrScanner.createQrEngine(QrScanner.WORKER_PATH);
        const qrCode = await QrScanner.scanImage(file, {
          returnDetailedScanResult: true,
          qrEngine: qrEngine
        });

        onFileAccepted(qrCode.data);
      } catch (err) {
        console.error(err);
        toast({
          title: 'QR code could not be scanned',
          description: 'Try using a different file',
          position: 'bottom-right',
          isClosable: true,
          status: 'error',
          variant: 'subtle'
        });

        setIsProcessing(false);
      }
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false
  });

  const dropText = isDragActive
    ? 'Drop file here ...'
    : 'Upload a file / Drag and drop';

  return (
    <Flex
      p={10}
      cursor="pointer"
      bg={isDragActive ? 'transparent' : 'gray.100'}
      borderColor={isDragActive ? 'gray.100' : 'transparent'}
      borderWidth={isDragActive ? '3px' : 'transparent'}
      borderStyle={isDragActive ? 'dashed' : 'none'}
      _hover={{ bg: 'gray.200' }}
      transition="background-color 0.2s ease"
      rounded={'md'}
      height={'200px'}
      width={'300px'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Text fontSize={'xl'} mb={2} fontWeight={'semibold'} textAlign={'center'}>
        {dropText}
      </Text>
      <Icon as={FiUpload} fontSize={'2xl'} />
    </Flex>
  );
};

export default FileUpload;
