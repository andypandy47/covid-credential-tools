import { Button, Icon, Input, Text } from '@chakra-ui/react';
import * as React from 'react';
import { FiUpload } from 'react-icons/fi';

interface IFileUploadProps {
  onSuccessfulQRUpload(data: string): void;
}

const FileUpload: React.FC<IFileUploadProps> = ({}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      console.error('File was undefined!');
      return;
    }

    console.log(e.target.files[0]);
  };

  return (
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
    >
      <Text fontSize={'xl'} mb={2}>
        Upload an image
      </Text>
      <Icon as={FiUpload} fontSize={'2xl'} />
      <Input
        type={'file'}
        name="file"
        onChange={handleChange}
        width={'300px'}
        height={'200px'}
        backgroundColor={'gray.100'}
        display={'none'}
      ></Input>
    </Button>
  );
};

export default FileUpload;
