import React from 'react';

import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

interface ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function Modal({isOpen, onOpen, onClose}: ModalProps) {
  const initialRef = React.useRef(null);

  return (
    <>
      <ChakraModal
        initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size='5xl'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dados do paciente</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display='grid' gridTemplateColumns='1fr 1fr 1fr' gridColumnGap='20px'>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>

            <FormControl>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>

            <FormControl>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
}

export { Modal }