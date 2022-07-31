import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

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
  Box,
  Flex,
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
  patient: Patient;
}

function Modal({isOpen, onOpen, onClose, patient}: ModalProps) {
  const initialRef = React.useRef(null);

  const [patientInfo, setPatientInfo] = useState({} as Patient);
  
  const formik = useFormik({
    initialValues: patient,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  });

  useEffect(() => {
    // alert(JSON.stringify(patient));
  }, [patient]);

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

          <ModalBody pb={6}>
            <form onSubmit={formik.handleSubmit}>
              <Box display='grid' gridTemplateColumns={{ base: '1fr 1fr', xl: '1fr 1fr 1fr' }} gap='20px'>
                <FormControl>
                  <FormLabel>Nome completo</FormLabel>
                  <Input id='name' ref={initialRef} placeholder='Fulano da Silva' value={formik.values.name} onChange={formik.handleChange} />
                </FormControl>

                <FormControl>
                  <FormLabel>Data de nascimento</FormLabel>
                  <Input id='dataNascimento' placeholder='00/00/0000' value={formik.values.dataNascimento} onChange={formik.handleChange} />
                </FormControl>

                <FormControl>
                  <FormLabel>CPF</FormLabel>
                  <Input id='cpf' placeholder='000.000.000-00' value={formik.values.cpf} onChange={formik.handleChange} />
                </FormControl>

                <FormControl>
                  <FormLabel>Cidade</FormLabel>
                  <Input id='cidade' placeholder='Dubai' value={formik.values.cidade} onChange={formik.handleChange} />
                </FormControl>

                <FormControl>
                  <FormLabel>CEP</FormLabel>
                  <Input id='cep' placeholder='00000-000' value={formik.values.cep} onChange={formik.handleChange} />
                </FormControl>

                <FormControl>
                  <FormLabel>Logradouro</FormLabel>
                  <Input id='logradouro' placeholder='Rua dos bobos' value={formik.values.logradouro} onChange={formik.handleChange} />
                </FormControl>

                <FormControl>
                  <FormLabel>Número</FormLabel>
                  <Input id='numero' type='number' placeholder='0' value={formik.values.numero} onChange={formik.handleChange} />
                </FormControl>

                <FormControl>
                  <FormLabel>Telefone</FormLabel>
                  <Input id='telefone' placeholder='(00) 00000-0000' value={formik.values.telefone} onChange={formik.handleChange} />
                </FormControl>
              </Box>

              <Flex mt='50px' align='center' justify='center'>
                <Button fontWeight='500' colorScheme='customYellow' textColor='white' type='submit'>
                  Alterar
                </Button>
                
                <Button fontWeight='500' colorScheme='customRed' ml={3}>
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

export { Modal }