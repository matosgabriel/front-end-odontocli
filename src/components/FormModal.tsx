import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';

import { IPatient, ICity } from '../pages';

import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Flex,
  useDisclosure,
  Select,
} from '@chakra-ui/react';
import { ConfirmationModal } from './ConfirmationModal';

interface FormModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  patient: IPatient;
  cities: ICity[];
}

function FormModal({isOpen, onOpen, onClose, patient, cities}: FormModalProps) {
  const initialRef = React.useRef(null);
  const { isOpen: confirmModalIsOpen, onOpen: onOpenConfirmModal, onClose: onCloseConfirmModal } = useDisclosure(); // Controls the ConfirmModal
  const [confirmModalMessage, setConfirmModalMessage] = useState('');

  const formik = useFormik({
    initialValues: patient,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  });

  useEffect(() => {
    console.log(patient);
    // formik.setFieldValue('nomeCompleto', patient.nomeCompleto, true);
    formik.setValues(patient, true);
  }, []);

  const handleChangeSubmit = useCallback(() => {
    setConfirmModalMessage('Alterar os dados de');
    onOpenConfirmModal();
  }, [onOpenConfirmModal]);

  const handleDeleteSubmit = useCallback(() => {
    setConfirmModalMessage('Deletar os dados de');
    onOpenConfirmModal();
  }, [onOpenConfirmModal]);

  useEffect(() => {
    // alert(JSON.stringify(patient));
  }, [patient]);

  return (
    <>
      <ConfirmationModal
        message={confirmModalMessage}
        name={patient.nomeCompleto}
        isOpen={confirmModalIsOpen}
        onOpen={onOpenConfirmModal}
        onClose={onCloseConfirmModal}
      />

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

          <ModalBody pb={6}>
            <form onSubmit={formik.handleSubmit}>
              <Box display='grid' gridTemplateColumns={{ base: '1fr 1fr', xl: '1fr 1fr 1fr' }} gap='20px'>
                <FormControl>
                  <FormLabel>Nome completo</FormLabel>
                  <Input id='nomeCompleto' ref={initialRef} placeholder='Fulano da Silva' value={formik.values.nomeCompleto} onChange={formik.handleChange} />
                </FormControl>

                <FormControl>
                  <FormLabel>Data de nascimento</FormLabel>
                  <Input
                    as={InputMask}
                    mask='99/99/9999'
                    id='dtNascimento'
                    placeholder='00/00/0000'
                    value={formik.values.dtNascimento}
                    onChange={formik.handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>CPF</FormLabel>
                  <Input
                    as={InputMask}
                    mask='999.999.999-99'
                    isDisabled
                    id='cpf'
                    placeholder='000.000.000-00'
                    value={formik.values.cpf}
                    onChange={formik.handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Cidade</FormLabel>
                  {/* <Input id='cidade' placeholder='Dubai' value={formik.values.cidade} onChange={formik.handleChange} /> */}
                  <Select id='cidade.nomeCidade' placeholder='Selecione a cidade' value={formik.values.cidade.nomeCidade} onChange={formik.handleChange}>
                    { cities.map(city => {
                      return (
                        <option key={city.id} value={city.nomeCidade}>{ city.nomeCidade }</option>
                      );
                    }) }
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>CEP</FormLabel>
                  <Input
                    as={InputMask}
                    mask='99999-999'
                    id='cepEndereco'
                    placeholder='00000-000'
                    value={formik.values.cepEndereco}
                    onChange={formik.handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Logradouro</FormLabel>
                  <Input id='logradouroEndereco' placeholder='Rua dos bobos' value={formik.values.logradouroEndereco} onChange={formik.handleChange} />
                </FormControl>

                <FormControl>
                  <FormLabel>Número</FormLabel>
                  <Input id='numeroEndereco' type='number' placeholder='0' value={formik.values.numeroEndereco} onChange={formik.handleChange} />
                </FormControl>

                <FormControl>
                  <FormLabel>Telefone</FormLabel>
                  <Input
                    as={InputMask}
                    mask='(99) 99999-9999'
                    id='telefone'
                    placeholder='(00)
                    00000-0000'
                    value={formik.values.telefone}
                    onChange={formik.handleChange}
                  />
                </FormControl>
              </Box>

              <Flex mt='50px' align='center' justify='center'>
                <Button fontWeight='500' colorScheme='customYellow' textColor='white' type='submit'>
                  Alterar
                </Button>
                
                <Button fontWeight='500' colorScheme='customRed' ml={3} onClick={handleDeleteSubmit}>
                  Deletar
                </Button>
                  
              </Flex>
            </form>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter> */}
        </ModalContent>
      </ChakraModal>
    </>
  );
}

export { FormModal }