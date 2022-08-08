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
  useToast
} from '@chakra-ui/react';

import { IPatientRequest } from '../pages';
import { api } from '../utils/api';
import { AxiosError } from 'axios';
import { FormikState } from 'formik';

interface ConfirmationModalModalProps {
  message: string;
  name: string | undefined;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  patientRequestData: IPatientRequest;
  onCloseFormModal: () => void;
  loadPatients: () => Promise<void>;
  type: 'update' | 'delete' | 'create';
  resetForm: (nextState?: Partial<FormikState<IPatientRequest>> | undefined) => void;
}

function ConfirmationModal({
  message,
  name,
  isOpen,
  onOpen,
  onClose,
  patientRequestData,
  onCloseFormModal,
  type,
  loadPatients,
  resetForm 
}: ConfirmationModalModalProps) {
  const toast = useToast();
  
  const initialRef = React.useRef(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const getAxiosErrorMessage = useCallback((err: any, keyWord: string) => {
    const errorMessage = err instanceof AxiosError ? 
      (err.response && err.response.data.message)
      : `Erro ao ${keyWord} paciente. Tente novamente!`;

    return errorMessage;
  }, []);

  const handleConfirmUpdate = useCallback(async (values: IPatientRequest) => {
    try {
      setConfirmLoading(true);
      await api.put(`/paciente/update/${values.cpf}`, values);

      toast({
        title: 'Sucesso',
        description: 'Dados atualizados!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      loadPatients();
      onCloseFormModal();
    } catch (err) {
      toast({
        title: 'Erro',
        description: getAxiosErrorMessage(err, 'atualizar'),
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }

    setConfirmLoading(false);
    onClose();
  }, []); // eslint-disable-line

  const handleConfirmCreate = useCallback(async (values: IPatientRequest) => {
    try {
      setConfirmLoading(true);
      await api.post('/paciente/create', values);

      toast({
        title: 'Sucesso',
        description: 'Paciente cadastrado!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      loadPatients();
      onCloseFormModal();
      resetForm();
    } catch(err) {
      toast({
        title: 'Erro',
        description: getAxiosErrorMessage(err, 'inserir'),
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    
    setConfirmLoading(false);
    onClose();
  }, [patientRequestData]); // eslint-disable-line

  const handleConfirmDelete = useCallback(async () => {
    try {
      setConfirmLoading(true);
      await api.delete(`/paciente/delete/${patientRequestData.cpf}`);

      toast({
        title: 'Sucesso',
        description: 'Paciente deletado!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      loadPatients();
      onCloseFormModal();
    } catch (err) {
      toast({
        title: 'Erro',
        description: getAxiosErrorMessage(err, 'deletar'),
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    
    setConfirmLoading(false);
    onClose();
  }, [patientRequestData]); // eslint-disable-line

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
                colorScheme='customGreen'
                fontWeight='500'
                ml={3}
                onClick={
                  () => {
                    switch(type) {
                      case 'update':
                        handleConfirmUpdate(patientRequestData);
                        break;
                      case 'delete':
                        handleConfirmDelete();
                        break;
                      case 'create':
                        handleConfirmCreate(patientRequestData);
                        break;
                    } 
                  }
                }
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