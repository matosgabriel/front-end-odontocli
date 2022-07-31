import React from 'react';

import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';

interface ConfirmationModalModalProps {
  message: string;
  name: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function ConfirmationModal({ message, name, isOpen, onOpen, onClose }: ConfirmationModalModalProps) {
  const initialRef = React.useRef(null);

  return (
    <>
      <ChakraModal
        initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size='xl'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmação</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Text>{`${message} ${name}?`}</Text>
            
            <Flex align='center' justify='center' mt='20px'>
              <Button colorScheme='customGray' fontWeight='500' onClick={onClose}>Cancelar</Button>
              <Button colorScheme='green' fontWeight='500' ml={3}>Confirmar</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  );
}

export { ConfirmationModal }