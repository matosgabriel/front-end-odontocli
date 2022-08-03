import { Button, Flex, Image, Text, useDisclosure, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { PageButton } from '../components/PageButton';
import { PatientItem } from '../components/PatientItem';

import { FormModal } from '../components/FormModal';
import { api } from '../utils/api';

const defaultPatient = {
  nomeCompleto: 'Fulano',
  dtNascimento: '00/00/0000',
  cpf: '111.111.111-11',
  cidade: {
    idCidade: '00000000-0000-0000-0000-00000000',
    nomeCidade: 'Cidade',
    uf: 'ES'
  },
  cepEndereco: '00000-000',
  logradouroEndereco: 'Rua 1',
  numeroEndereco: 1,
  telefone: '(000) 00000-0000'
}

export interface IPatient {
  cpf: string;
  nomeCompleto: string;
  telefone: string;
  dtNascimento: string;
  numeroEndereco: number;
  logradouroEndereco: string;
  cepEndereco: string;
  cidade: {
    idCidade: string;
    nomeCidade: string;
    uf: string;
  }
}

export interface ICity {
  id: string;
  nomeCidade: string;
  uf: string;
}

export default function Home() {
  const { isOpen: formModalIsOpen, onOpen: onOpenFormModal, onClose: onCloseFormModal } = useDisclosure(); // Controls InfoModal
  const [totalPatientsCount, setTotalPatientsCount] = useState(0);
  const [patients, setPatients] = useState([] as IPatient[]);
  const [cities, setCities] = useState([] as ICity[]);
  const [selectedPatient, setSelectedPatient] = useState<IPatient | undefined>(undefined);

  function handleClickVisualize(patient: IPatient) {
    onCloseFormModal();
    console.log(patient);
    setSelectedPatient(patient);


    onOpenFormModal();
  }

  useEffect(() => {
    async function loadPacientes() {
      const { data: patientsCount } = await api.get('/paciente/count');
      const { data: patientsLoaded } = await api.get('/paciente/list');
      const { data: loadedCities } = await api.get('/cidade/list');

      setTotalPatientsCount(patientsCount);
      setPatients(patientsLoaded);
      setCities(loadedCities);
    }

    loadPacientes();
  }, []);

  return (
    <>
      <Head>
        <title>Odontocli | Home</title>
      </Head>

      { (selectedPatient != undefined) && // Checking if selectPatient its not a empty object
        <FormModal isOpen={formModalIsOpen} onOpen={onOpenFormModal} onClose={onCloseFormModal} patient={selectedPatient} cities={cities} />
      }
      
      <Flex width='100%' height='100vh' flexDir='column'>
        <Flex
          w='100%'
          as='header'
          position='relative'
          _before={{ content: `''`, height: '1px', bg:'#E4E6EF', width: '100%', position: 'absolute', left: 0, bottom: 0 }}
        >
          <Flex
            maxW='1650px'
            w='100%'
            h='94px'
            m='0 auto'
            align='center'
            p='0 20px'
          >
            <Image src='/logo.svg' alt='Logo' draggable='false' />
          </Flex>
        </Flex>
        
        <Flex
          as='main'
          flexDir='row'
          height='calc(100% - 94px)'
          w='100%'
          padding={{ '2xl': '45px 123px 0', xl: '30px 70px 0', lg: '20px 50px 0', sm: '15px 30px 0' }}
          align='flex-start'
        >
          <VStack as='aside' w='242px' h='100%' spacing={{base: '20px', xl: '25px', '2xl': '35px'}} borderRightWidth='1px'> {/* Aside */}
            <VStack as='section' w='100%' spacing='12px' justify='flex-start'> {/* Section */}
              <Text fontWeight='600' lineHeight='18px' fontSize='12px' w='100%' color='#A1A5B7'>INÍCIO</Text>
              
              <VStack spacing={{ xl: '10px', '2xl': '20px' }} w='100%'>
                <PageButton title='Pacientes' isActive />
              </VStack>
            </VStack>

            <VStack as='section' w='100%' spacing='12px' justify='flex-start'> {/* Section */}
              <Text fontWeight='600' lineHeight='18px' fontSize='12px' w='100%' color='#A1A5B7'>ATENDIMENTO</Text>
              
              <VStack spacing={{ base: '8px', xl: '10px', '2xl': '12px' }} w='100%'>
                <PageButton title='Consultas' />
                <PageButton title='Tratamentos' />
              </VStack>
            </VStack>
            
            <VStack as='section' w='100%' spacing='12px' justify='flex-start'> {/* Section */}
              <Text fontWeight='600' lineHeight='18px' fontSize='12px' w='100%' color='#A1A5B7'>FINANCEIRO</Text>
              
              <VStack spacing={{ xl: '10px', '2xl': '12px' }} w='100%'>
                <PageButton title='Débitos recebidos' />
                <PageButton title='Dívidas' />
                <PageButton title='Balanço' />
              </VStack>
            </VStack>

            <VStack as='section' w='100%' spacing='12px' justify='flex-start'> {/* Section */}
              <Text fontWeight='600' lineHeight='18px' fontSize='12px' w='100%' color='#A1A5B7'>ASPECTOS LEGAIS</Text>
              
              <VStack spacing={{ xl: '10px', '2xl': '12px' }} w='100%'>
                <PageButton title='Termos de uso' />
              </VStack>
            </VStack>
          </VStack>

          <Flex w='100%' h='100%' pl={{ base: '30px', md: '40px', xl: '60px', '2xl': '97px' }} flexDir='column'> {/* Content */}
            <Flex // Content header
              flexDir='row'
              align='center'
              justify='space-between'
              w='100%'
              h='42px'
            > 
              <Flex display='flex' align='baseline'>
                <Text
                  fontSize={{ base: '16px', xl: '18px', '2xl': '22px' }}
                  lineHeight={{ base: '20px', xl: '24px', '2xl': '33px' }}
                  fontWeight='600'
                >
                  Pacientes
                </Text>
                <Text
                  as='p'
                  color='#A1A5B7'
                  fontSize={{ base: '12px', xl: '13px', '2xl': '16px' }}
                  fontWeight='600'
                  ml='4px'
                >
                  ({ totalPatientsCount })
                </Text>
              </Flex>

              <Button
                colorScheme='customBlue'
                color='white'
                fontSize={{ base: '10px', xl: '12px', '2xl': '14px' }}
                height={{ base: '30px', xl: '34px', '2xl': '38px' }}
                onClick={onOpenFormModal}
              >
                Adicionar paciente
              </Button>
            </Flex>

            <VStack // Content main
              flexDir='column'
              mt={{ base: '26px', xl: '38px', '2xl': '62px' }}
              spacing='30px'
              height='100%'
              overflow='hidden'
              overflowY='scroll'
              sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
              pb='40px'
            >
              { patients.map(patient => {
                return (
                  <PatientItem
                    key={patient.cpf}
                    name={patient.nomeCompleto}
                    phone={patient.telefone}
                    onClick={() => handleClickVisualize(patient)}
                  />
                );
              }) }
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
