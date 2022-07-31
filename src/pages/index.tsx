import { Button, Flex, Image, Text, useBreakpoint, useDisclosure, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect } from 'react';
import { PageButton } from '../components/PageButton';
import { PatientItem } from '../components/PatientItem';

import { InfoModal } from '../components/InfoModal';

const patientTest = {
  name: 'Gabriel Matos',
  dataNascimento: '10/10/2010',
  cpf: '111.111.111-11',
  cidade: 'São Mateus',
  cep: '39440-040',
  logradouro: 'Rua Londrina',
  numero: 214,
  telefone: '(11) 12311-1232'
}

export default function Home() {
  const breakpoint = useBreakpoint();
  const { isOpen: infoModalIsOpen, onOpen: onOpenInfoModal, onClose: onCloseInfoModal } = useDisclosure(); // Controls InfoModal

  useEffect(() => {
    console.log(breakpoint);
  }, [breakpoint]);

  return (
    <>
      <Head>
        <title>Odontocli | Home</title>
      </Head>

      <InfoModal isOpen={infoModalIsOpen} onOpen={onOpenInfoModal} onClose={onCloseInfoModal} patient={patientTest} />
      
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
                  (6,234)
                </Text>
              </Flex>

              <Button
                colorScheme='customBlue'
                color='white'
                fontSize={{ base: '10px', xl: '12px', '2xl': '14px' }}
                height={{ base: '30px', xl: '34px', '2xl': '38px' }}
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
              <PatientItem name='Gabriel Matos' phone='11 9912-3123' onClick={onOpenInfoModal} />
              <PatientItem name='Gabriel Matos' phone='11 9912-3123' onClick={onOpenInfoModal} />
              <PatientItem name='Gabriel Matos' phone='11 9912-3123' onClick={onOpenInfoModal} />
              <PatientItem name='Gabriel Matos' phone='11 9912-3123' onClick={onOpenInfoModal} />
              <PatientItem name='Gabriel Matos' phone='11 9912-3123' onClick={onOpenInfoModal} />
              <PatientItem name='Gabriel Matos' phone='11 9912-3123' onClick={onOpenInfoModal} />
              <PatientItem name='Gabriel Matos' phone='11 9912-3123' onClick={onOpenInfoModal} />
              <PatientItem name='Gabriel Matos' phone='11 9912-3123' onClick={onOpenInfoModal} />
              <PatientItem name='Gabriel Matos' phone='11 9912-3123' onClick={onOpenInfoModal} />
              <PatientItem name='Gabriel Matos' phone='11 9912-3123' onClick={onOpenInfoModal} />
              <PatientItem name='Gabriel Matos' phone='11 9912-3123' onClick={onOpenInfoModal} />
              <PatientItem name='Gabriel Matos' phone='11 9912-3123' onClick={onOpenInfoModal} />
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
