import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';

import { ICity, IPatientRequest } from '../pages';

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
  FormErrorMessage,
  Box,
  Flex,
  useDisclosure,
  Select,
  Radio
} from '@chakra-ui/react';

import { ConfirmationModal } from './ConfirmationModal';
import { FormInput } from './FormInput';
import { validationSchema } from '../utils/validationSchema';

interface FormModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  patient?: IPatientRequest;
  cities: ICity[];
  loadPatients: () => Promise<void>;
}

function FormModal({isOpen, onOpen, onClose, patient, cities, loadPatients}: FormModalProps) {
  const { isOpen: confirmModalIsOpen, onOpen: onOpenConfirmModal, onClose: onCloseConfirmModal } = useDisclosure(); // Controls the ConfirmModal
  const [confirmModalMessage, setConfirmModalMessage] = useState('');
  const [confirmModalType, setConfirmModalType] = useState<'update' | 'delete' | 'create'>('update');
  const [validateOnChange, setValidateOnChange] = useState(false);
  const [radio, setRadio] = useState(false);

  const formik = useFormik({
    initialValues: { ...patient },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: !!patient || validateOnChange,
    initialErrors: {},
    onSubmit: (values, { validateForm }) => {
      validateForm(values);
      !!patient ? handleChangeSubmit() : handleCreateSubmit();
    },
  });

  useEffect(() => {
    // formik.setFieldValue('nomeCompleto', patient.nomeCompleto, true);
    if (!!patient) {
      formik.setValues({ ...patient }, true)
    } else {
      formik.resetForm();
    }

  }, [patient]); // eslint-disable-line

  const handleChangeSubmit = useCallback(() => {
    setConfirmModalMessage('Alterar os dados de');
    setConfirmModalType('update');
    onOpenConfirmModal();
  }, [onOpenConfirmModal]);

  const handleCreateSubmit = useCallback(() => {
    setConfirmModalMessage('Incluir os dados de');
    setConfirmModalType('create');
    onOpenConfirmModal();
  }, [onOpenConfirmModal]);

  const handleDeleteSubmit = useCallback(() => {
    setConfirmModalMessage('Deletar os dados de');
    setConfirmModalType('delete');
    onOpenConfirmModal();
  }, [onOpenConfirmModal]);

  return (
    <>
      { 
        <ConfirmationModal
          message={confirmModalMessage}
          name={!!patient ? patient.nomeCompleto : formik.values.nomeCompleto}
          isOpen={confirmModalIsOpen}
          onOpen={onOpenConfirmModal}
          onClose={onCloseConfirmModal}
          patientRequestData={formik.values}
          onCloseFormModal={onClose}
          loadPatients={loadPatients}
          type={confirmModalType}
          resetForm={formik.resetForm}
        />
      }

      <ChakraModal
        // finalFocusRef={finalRef}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size='5xl'
      >
        <ModalOverlay />
        <ModalContent p={{ base: '0 0px', xl: '0 5px', '2xl': '0 10px' }}>
          <ModalHeader>Dados do paciente</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <form onSubmit={formik.handleSubmit}>
              <Box display='grid' gridTemplateColumns={{ base: '1fr 1fr', md: '1fr 1fr 1fr' }} gap='20px'>
                <FormInput
                  isInvalid={!!formik.errors.nomeCompleto}
                  id='nomeCompleto'
                  initialFocus
                  label='Nome completo'
                  errorMessage={formik.errors.nomeCompleto}
                  placeholder='Fulano da Silva'
                  value={formik.values.nomeCompleto}
                  onChange={formik.handleChange}
                />

                <FormInput
                  isInvalid={!!formik.errors.dtNascimento}
                  id='dtNascimento'
                  label='Data de nascimento'
                  errorMessage={formik.errors.dtNascimento}
                  placeholder='00/00/0000'
                  value={formik.values.dtNascimento}
                  onChange={formik.handleChange}
                  as={InputMask}
                  mask='99/99/9999'
                />

                <FormInput
                  id='cpf'
                  as={InputMask}
                  mask='999.999.999-99'
                  isInvalid={!!formik.errors.cpf}
                  isDisabled={!!patient}
                  label='CPF'
                  errorMessage={formik.errors.cpf}
                  placeholder='000.000.000-00'
                  value={formik.values.cpf}
                  onChange={(e) => {
                    const oldTargetValue = e.target.value
                    e.target.value = oldTargetValue.replace(/[^0-9]/g, '');

                    formik.handleChange(e);
                    e.target.value = oldTargetValue;
                  }}
                />

                <FormControl isInvalid={!!formik.errors.cidade}>
                  <FormLabel fontSize={{ base: '12px', xl: '14px', '2xl': '16px' }}>Cidade</FormLabel>
                  <Select
                    id='cidade'
                    placeholder='Selecione a cidade'
                    value={formik.values.cidade}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    height={{ base: '30px', xl: '34px', '2xl': '40px' }}
                    fontSize={{ base: '12px', xl: '14px', '2xl': '16px' }}
                  >
                    { cities.map(city => {
                      return (
                        <option key={city.idCidade} value={city.idCidade}>{ city.nomeCidade }</option>
                      );
                    }) }
                  </Select>
                  <FormErrorMessage>{ formik.errors.cidade }</FormErrorMessage>
                </FormControl>

                <FormInput
                  isInvalid={!!formik.errors.cepEndereco}
                  id='cepEndereco'
                  label='CEP'
                  errorMessage={formik.errors.cepEndereco}
                  placeholder='00000-000'
                  value={formik.values.cepEndereco}
                  onChange={formik.handleChange}
                  as={InputMask}
                  mask='99999-999'
                />

                <FormInput
                  isInvalid={!!formik.errors.logradouroEndereco}
                  id='logradouroEndereco'
                  label='Logradouro'
                  errorMessage={formik.errors.logradouroEndereco}
                  placeholder='Avenida'
                  value={formik.values.logradouroEndereco}
                  onChange={formik.handleChange}
                />

                <FormInput
                  isInvalid={!!formik.errors.numeroEndereco}
                  id='numeroEndereco'
                  label='Número'
                  type='number'
                  errorMessage={formik.errors.numeroEndereco}
                  placeholder='0'
                  value={formik.values.numeroEndereco}
                  onChange={formik.handleChange}
                />

                <FormInput
                  isInvalid={!!formik.errors.telefone}
                  id='telefone'
                  label='Telefone'
                  errorMessage={formik.errors.telefone}
                  placeholder='(000) 00000-0000'
                  value={formik.values.telefone}
                  as={InputMask}
                  mask='(999) 99999-9999'
                  onChange={(e) => {
                    const oldTargetValue = e.target.value;
                    e.target.value = oldTargetValue.replace(/[^0-9]/g, '');

                    formik.handleChange(e);
                    e.target.value = oldTargetValue;
                  }}
                />
              </Box>

              <Flex mt={{ base: '25px', xl: '35px', '2xl': '50px' }} align='center' justify='center'>
                { patient ? <>
                    <Button
                      fontWeight='500'
                      colorScheme='customYellow'
                      textColor='white'
                      type='submit'
                      height={{ base: '30px', xl: '34px', '2xl': '40px' }}
                      fontSize={{ base: '12px', xl: '14px', '2xl': '16px' }}
                    >
                      Alterar
                    </Button>
                  
                    <Button
                      fontWeight='500'
                      colorScheme='customRed'
                      ml={3}
                      height={{ base: '30px', xl: '34px', '2xl': '40px' }}
                      fontSize={{ base: '12px', xl: '14px', '2xl': '16px' }}
                      onClick={handleDeleteSubmit}
                    >
                      Deletar
                    </Button>
                  </> :
                  <Button
                    colorScheme='customGreen'
                    fontWeight='500'
                    type='submit'
                    height={{ base: '30px', xl: '34px', '2xl': '40px' }}
                    fontSize={{ base: '12px', xl: '14px', '2xl': '16px' }}
                    onClick={() => {setValidateOnChange(true)}}
                  >
                    Cadastrar
                  </Button>
                }
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  );
}

export { FormModal }