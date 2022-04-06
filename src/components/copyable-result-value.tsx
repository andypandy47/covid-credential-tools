import { CopyIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  IconButton,
  Heading,
  Textarea,
  useToast
} from '@chakra-ui/react';
import * as React from 'react';

interface ICopyableResultValueProps {
  label: string;
  value: string;
  height: string;
  onCopy(): void;
}

const CopyableResultValue: React.FC<ICopyableResultValueProps> = ({
  label,
  value,
  height,
  onCopy
}) => {
  const toast = useToast();

  const handleCopy = () => {
    toast({
      title: `${label} copied`,
      variant: 'subtle',
      isClosable: true,
      status: 'info',
      duration: 3000
    });
    onCopy();
  };

  return (
    <Box width={'100%'}>
      <Flex direction={'row'} alignItems={'center'}>
        <IconButton
          aria-label="copy-hc1"
          icon={<CopyIcon />}
          mr={1}
          size={'sm'}
          variant={'ghost'}
          onClick={handleCopy}
        />
        <Heading as="h3" size={'md'}>
          {label}
        </Heading>
      </Flex>
      <Textarea value={value} size="xs" height={height} mt={1} readOnly />
    </Box>
  );
};

export default CopyableResultValue;
