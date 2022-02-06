import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react';
import * as React from 'react';

interface IDecodeResultModalProps {
  isOpen: boolean;
  onClose(): void;
  qrData: string;
}

const DecodeResultModal: React.FC<IDecodeResultModalProps> = ({
  isOpen,
  onClose
}) => {
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
          ></ModalBody>

          <ModalFooter
            display={'flex'}
            justifyContent={'space-between'}
          ></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DecodeResultModal;
