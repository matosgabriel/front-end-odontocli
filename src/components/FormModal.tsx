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
  Input,
  Box,
  Flex,
  useDisclosure,
  Select,
} from '@chakra-ui/react';

import { ConfirmationModal } from './ConfirmationModal';

import * as yup from 'yup';

interface FormModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  patient?: IPatientRequest;
  cities: ICity[];
  loadPatients: () => Promise<void>;
}

const dateRegex = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
const nameRegex = /^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/;

const schema = yup.object().shape({
  cpf: yup.string().required("O cpf é obrigatório!").max(11, "A quantidade de números é onze!").min(11, "A quantidade de números é onze!").matches(/^[0-9]+$/, "O cpf aceita apenas números!"),
  nomeCompleto: yup.string().required("O nome do paciente é obrigatório!").matches(nameRegex, "Formato do nome inválido!"),
  telefone: yup.string().required("O telefone é obrigatório!").matches(/^[0-9]+$/, "O telefone aceita apenas números!").max(12, "A quantidade de números do telefone é 12!").min(12, "A quantidade de números do telefone é 12!"),
  dtNascimento: yup.string().required("A data de nascimento é obrigatória!").matches(dateRegex, "O formato deve ser dd/mm/yyyy!"),
  numeroEndereco: yup.string().required("O número de endereço é obrigatório!").matches(/^[0-9]+$/, "O número de endereço aceita apenas números!"),
  logradouroEndereco: yup.string().required("O logradouro é obrigatório!").matches(/^[aA-zZ]+$/, "O logradouro deve conter apenas letras!"),
  cepEndereco: yup.string().required("O cep é obrigatório!").matches(/^([0-9]{5})\-([0-9]{3})$/, "O formato do cep deve ser nnnnn-nnn!"),
  cidade: yup.string().required("A cidade é obrigatória!"),
});

function FormModal({isOpen, onOpen, onClose, patient, cities, loadPatients}: FormModalProps) {
  const initialRef = React.useRef(null);
  const { isOpen: confirmModalIsOpen, onOpen: onOpenConfirmModal, onClose: onCloseConfirmModal } = useDisclosure(); // Controls the ConfirmModal
  const [confirmModalMessage, setConfirmModalMessage] = useState('');
  const [confirmModalType, setConfirmModalType] = useState<'update' | 'delete' | 'create'>('update');
  const [validateOnChange, setValidateOnChange] = useState(false);

  const formik = useFormik({
    initialValues: { ...patient },
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: !!patient || validateOnChange,
    onSubmit: (values, { validateForm }) => {
      validateForm(values);
      !!patient ? handleChangeSubmit() : handleCreateSubmit();
    },
  });

  useEffect(() => {
    // formik.setFieldValue('nomeCompleto', patient.nomeCompleto, true);
    !!patient ? formik.setValues({ ...patient }, true) : formik.resetForm();
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
        />
      }

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
                <FormControl isInvalid={!!formik.errors.nomeCompleto}>
                  <FormLabel>Nome completo</FormLabel>
                  <Input
                    id='nomeCompleto'
                    ref={initialRef}
                    placeholder='Fulano da Silva'
                    value={formik.values.nomeCompleto}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{ formik.errors.nomeCompleto }</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!formik.errors.dtNascimento}>
                  <FormLabel>Data de nascimento</FormLabel>
                  <Input
                    as={InputMask}
                    mask='99/99/9999'
                    id='dtNascimento'
                    placeholder='00/00/0000'
                    value={formik.values.dtNascimento}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{ formik.errors.dtNascimento }</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!formik.errors.cpf}>
                  <FormLabel>CPF</FormLabel>
                  <Input
                    as={InputMask}
                    mask='999.999.999-99'
                    isDisabled={!!patient}
                    id='cpf'
                    placeholder='000.000.000-00'
                    value={formik.values.cpf}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      const oldTargetValue = e.target.value
                      e.target.value = oldTargetValue.replace(/[^0-9]/g, '');

                      formik.handleChange(e);
                      e.target.value = oldTargetValue;
                    }}
                  />
                  <FormErrorMessage>{ formik.errors.cpf }</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!formik.errors.cidade}>
                  <FormLabel>Cidade</FormLabel>
                  <Select
                    id='cidade'
                    placeholder='Selecione a cidade'
                    value={formik.values.cidade}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  >
                    { cities.map(city => {
                      return (
                        <option key={city.idCidade} value={city.idCidade}>{ city.nomeCidade }</option>
                      );
                    }) }
                  </Select>
                  <FormErrorMessage>{ formik.errors.cidade }</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!formik.errors.cepEndereco}>
                  <FormLabel>CEP</FormLabel>
                  <Input
                    as={InputMask}
                    mask='99999-999'
                    id='cepEndereco'
                    placeholder='00000-000'
                    value={formik.values.cepEndereco}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{ formik.errors.cepEndereco }</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!formik.errors.logradouroEndereco}>
                  <FormLabel>Logradouro</FormLabel>
                  <Input
                    id='logradouroEndereco'
                    placeholder='Avenida'
                    value={formik.values.logradouroEndereco}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{ formik.errors.logradouroEndereco }</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!formik.errors.numeroEndereco}>
                  <FormLabel>Número</FormLabel>
                  <Input
                    id='numeroEndereco'
                    type='number'
                    placeholder='0'
                    value={formik.values.numeroEndereco}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{ formik.errors.numeroEndereco }</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!formik.errors.telefone }>
                  <FormLabel>Telefone</FormLabel>
                  <Input
                    as={InputMask}
                    mask='(999) 99999-9999'
                    id='telefone'
                    placeholder='(000) 00000-0000'
                    value={formik.values.telefone}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      const oldTargetValue = e.target.value;
                      e.target.value = oldTargetValue.replace(/[^0-9]/g, '');

                      formik.handleChange(e);
                      e.target.value = oldTargetValue;
                    }}
                  />
                  <FormErrorMessage> {formik.errors.telefone} </FormErrorMessage>
                </FormControl>
              </Box>

              <Flex mt='50px' align='center' justify='center'>
                { patient ? <>
                  <Button fontWeight='500' colorScheme='customYellow' textColor='white' type='submit' onClick={() => {setValidateOnChange(true)}}>
                    Alterar
                  </Button>
                
                  <Button fontWeight='500' colorScheme='customRed' ml={3} onClick={handleDeleteSubmit}>
                    Deletar
                  </Button> </>
                  : <Button colorScheme='customGreen' fontWeight='500' type='submit' onClick={() => {setValidateOnChange(true)}}>Cadastrar</Button>
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