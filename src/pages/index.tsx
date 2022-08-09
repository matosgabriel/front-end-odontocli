import Link from 'next/link';
import { Button, Flex, Image, Text, useBreakpoint, useDisclosure, VStack, InputLeftElement, InputGroup, Input, Icon } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { PageButton } from '../components/PageButton';
import { PatientItem } from '../components/PatientItem';

import { FormModal } from '../components/FormModal';
import { UsageTermsModal } from '../components/UsageTermsModal';

import { api } from '../utils/api';
import { AsideDrawer } from '../components/AsideDrawer';
import { FiMenu, FiSearch } from 'react-icons/fi';

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
  idCidade: string;
  nomeCidade: string;
  uf: string;
}

export interface IPatientRequest {
  cpf?: string | undefined;
  nomeCompleto?: string | undefined;
  telefone?: string | undefined;
  dtNascimento?: string | undefined;
  numeroEndereco?: number | undefined;
  logradouroEndereco?: string | undefined;
  cepEndereco?: string | undefined;
  cidade?: string | undefined;
}

export default function Home() {
  const { isOpen: formModalIsOpen, onOpen: onOpenFormModal, onClose: onCloseFormModal } = useDisclosure(); // Controls InfoModal
  const { isOpen: usageTermsModalIsOpen, onOpen: onOpenUsageTermsModal, onClose: onCloseUsageTermsModal } = useDisclosure(); // Controls UsageTermsModal
  const { isOpen: asideDrawerIsOpen, onOpen: onOpenAsideDrawer, onClose: onCloseAsideDrawer } = useDisclosure(); // Controls InfoModal

  const [totalPatientsCount, setTotalPatientsCount] = useState(0);
  const [patients, setPatients] = useState([] as IPatient[]);
  const [cities, setCities] = useState([] as ICity[]);
  const [selectedPatient, setSelectedPatient] = useState<IPatient | undefined>(undefined);

  const [search, setSearch] = useState('');

  const breakpoint = useBreakpoint();

  const filteredPatients = search.length
    ? patients.filter(patient => patient.nomeCompleto.toLowerCase().includes(search.toLowerCase()))
    : [];

  function handleClickVisualize(patient: IPatient) {
    onCloseFormModal();
    setSelectedPatient(patient);

    onOpenFormModal();
  }

  function handleClickCreatePatient() {
    setSelectedPatient(undefined);
    onOpenFormModal();
  }

  async function loadPatients() {
    const { data: patientsCount } = await api.get('/paciente/count');
    const { data: patientsLoaded } = await api.get('/paciente/list');
    const { data: loadedCities } = await api.get('/cidade/list');

    setTotalPatientsCount(patientsCount);
    setPatients(patientsLoaded);
    setCities(loadedCities);
  }

  useEffect(() => {
    loadPatients();
  }, []);

  return (
    <>
      <Head>
        <title>Odontocli | Home</title>
      </Head>

      { (!!selectedPatient) ? // Checking if selectPatient its not undefined
        <FormModal
          isOpen={formModalIsOpen}
          onOpen={onOpenFormModal}
          onClose={onCloseFormModal}
          cities={cities}
          patient={{ ...selectedPatient, cidade: selectedPatient.cidade.idCidade }}
          loadPatients={loadPatients}
        />
        : <FormModal
          isOpen={formModalIsOpen}
          onOpen={onOpenFormModal}
          onClose={onCloseFormModal}
          cities={cities}
          loadPatients={loadPatients}
        />
      }

      { 
        <UsageTermsModal
          isOpen={usageTermsModalIsOpen}
          onOpen={onOpenUsageTermsModal}
          onClose={onCloseUsageTermsModal}
        />
      }
      
      <Flex width='100%' height='100vh' flexDir='column'>
        <Flex
          w='100%'
          as='header'
          position='relative'
          _before={{ content: `''`, height: '1px', bg:'#E4E6EF', width: '100%', position: 'absolute', left: 0, bottom: 0 }}
        >
          <Flex
            p={{ '2xl': '0 123px', xl: '0 70px', lg: '0 50px', base: '0 30px' }}
            justify={ (breakpoint == 'sm' || breakpoint == 'base') ? 'space-between' : 'flex-start' }
            align='center'
            w='100%'
            h='94px'
          >
            { (breakpoint == 'sm' || breakpoint == 'base') &&
              <Button onClick={onOpenAsideDrawer} bg='transparent'>
                <FiMenu size='25' />
              </Button>
            }
            <Button onClick={() => setSearch('')} background='transparent' colorScheme='none'>
              <Image src='/logo.svg' alt='Logo' draggable='false' />
            </Button>
          </Flex>
        </Flex>
        
        <Flex
          as='main'
          flexDir='row'
          height='calc(100% - 94px)'
          w='100%'
          padding={{ '2xl': '45px 123px 0', xl: '30px 70px 0', lg: '20px 50px 0', base: '15px 30px 0' }}
          align='flex-start'
        >
          { (breakpoint != 'sm' && breakpoint != 'base') ? 
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
                  <PageButton title='Termos de uso' onClick={onOpenUsageTermsModal} />
                </VStack>
              </VStack>
            </VStack> 
          : <AsideDrawer isOpen={asideDrawerIsOpen} onClose={onCloseAsideDrawer} onOpenUsageTermsModal={onOpenUsageTermsModal} />}

          <Flex w='100%' h='100%' pl={{ sm: '0px', md: '40px', xl: '60px', '2xl': '97px' }} flexDir='column'> {/* Content */}
            <Flex // Content header
              flexDir={{ base: 'column', md: 'row' }}
              align='center'
              justify='space-between'
              w='100%'
              // h='42px'
            >
              <Flex width='100%' justify='space-between'>
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

                { (breakpoint != 'base' && breakpoint != 'sm') &&
                  <InputGroup width='250px'>
                    <InputLeftElement>
                      <FiSearch color='gray' />
                    </InputLeftElement>
                    <Input value={search} onChange={e => setSearch(e.target.value)} placeholder='Procurar'/>
                  </InputGroup>
                }

                <Button
                  colorScheme='customBlue'
                  color='white'
                  fontSize={{ base: '10px', xl: '12px', '2xl': '14px' }}
                  height={{ base: '30px', xl: '34px', '2xl': '38px' }}
                  onClick={handleClickCreatePatient}
                >
                  Adicionar paciente
                </Button>
              </Flex>

              { (breakpoint == 'base' || breakpoint == 'sm') &&
                <InputGroup width='100%' alignItems='center' justifyContent='center' mt='20px' >
                  <InputLeftElement height='30px'>
                    <FiSearch size='12' />
                  </InputLeftElement>
                  <Input height='30px' fontSize='12px' value={search} onChange={e => setSearch(e.target.value)} placeholder='Procurar'/>
                </InputGroup>
              }
            </Flex>

            <VStack // Content main
              flexDir='column'
              mt={{ base: '26px', xl: '38px', '2xl': '62px' }}
              spacing='30px'
              height='100%'
              overflowY='scroll'
              sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
              pb='40px'
            >
              { search.length
                ? filteredPatients.map(patient => {
                  return (
                    <PatientItem
                      key={patient.cpf}
                      name={patient.nomeCompleto}
                      phone={patient.telefone}
                      onClick={() => handleClickVisualize(patient)}
                    />
                  );
                })
                : patients.map(patient => {
                  return (
                    <PatientItem
                      key={patient.cpf}
                      name={patient.nomeCompleto}
                      phone={patient.telefone}
                      onClick={() => handleClickVisualize(patient)}
                    />
                  );
                })
              }
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
