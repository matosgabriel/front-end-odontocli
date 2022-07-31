import React, { useEffect, useState } from 'react';

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

interface Patient {
  name: string;
  dataNascimento: string;
  cpf: string;
  cidade: string;
  cep: string;
  logradouro: string;
  numero: number;
  telefone: string;
}

interface ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  patient?: Patient;
}

function Modal({isOpen, onOpen, onClose, patient}: ModalProps) {
  const initialRef = React.useRef(null);

  return (
    <>
      <ChakraModal
        initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size='5xl'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dados do paciente</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display='grid' gridTemplateColumns={{ base: '1fr 1fr', xl: '1fr 1fr 1fr' }} gap='20px'>
            <FormControl>
              <FormLabel>Nome completo</FormLabel>
              <Input ref={initialRef} placeholder='André da Silva Andrade' />
            </FormControl>

            <FormControl>
              <FormLabel>Data de nascimento</FormLabel>
              <Input placeholder='00/00/0000' />
            </FormControl>

            <FormControl>
              <FormLabel>CPF</FormLabel>
              <Input placeholder='000.000.000-00' />
            </FormControl>

            <FormControl>
              <FormLabel>Cidade</FormLabel>
              <Input placeholder='São Mateus' />
            </FormControl>

            <FormControl>
              <FormLabel>CEP</FormLabel>
              <Input placeholder='00000-000' />
            </FormControl>

            <FormControl>
              <FormLabel>Logradouro</FormLabel>
              <Input placeholder='Av. José Tozzi' />
            </FormControl>

            <FormControl>
              <FormLabel>Número</FormLabel>
              <Input placeholder='3213' />
            </FormControl>

            <FormControl>
              <FormLabel>Telefone</FormLabel>
              <Input placeholder='(00) 00000-0000' />
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