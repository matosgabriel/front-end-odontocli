import React, { useCallback, useState } from 'react';

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

import { IPatientRequest } from '../pages';
import { api } from '../utils/api';

interface ConfirmationModalModalProps {
  message: string;
  name: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  patientRequestData: IPatientRequest;
  onCloseFormModal: () => void;
  loadPatients: () => Promise<void>;
  type: 'update' | 'delete';
}

function ConfirmationModal({ message, name, isOpen, onOpen, onClose, patientRequestData, onCloseFormModal, type, loadPatients }: ConfirmationModalModalProps) {
  const initialRef = React.useRef(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleConfirmUpdate = useCallback(async (values: IPatientRequest) => {
    setConfirmLoading(true);
    await api.put(`/paciente/update/${values.cpf}`, values);
    setConfirmLoading(false);

    onClose();
    onCloseFormModal();
    loadPatients();
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    setConfirmLoading(true);
    await api.delete(`/paciente/delete/${patientRequestData.cpf}`);
    setConfirmLoading(false);

    onClose();
    onCloseFormModal();
    loadPatients();
  }, [patientRequestData]);

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
              <Button
                colorScheme='customGray'
                fontWeight='500'
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                colorScheme='green'
                fontWeight='500'
                ml={3}
                onClick={type === 'update' ? () => handleConfirmUpdate(patientRequestData) : handleConfirmDelete }
                isLoading={confirmLoading}
              >
                Confirmar
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  );
}

export { ConfirmationModal }