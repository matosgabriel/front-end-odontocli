import { Flex, Image, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { PageButton } from '../components/PageButton';

export default function Home() {
  return (
    <>
    <Head>
      <title>Odontocli | Home</title>
    </Head>
    
    <Flex width='100vw' height='100vh' flexDir='column'>
      <Flex
        w='100%'
        position='relative'
        _before={{ content: `''`, height: '1px', bg:'#E4E6EF', width: '100%', position: 'absolute', left: 0, bottom: 0 }}
      >
        <Flex
          position='relative'
          as='header'
          maxW='1200px'
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
        flexDir='column'
        h='100%'
        w='100%'
        padding={{ lg: '45px 123px 0', sm: '20px 30px 0', base: '10px 15px 0' }}
      >
        <VStack as='aside' w='242px' h='100%' spacing='35px' borderRightWidth='1px'> {/* Aside */}
          <VStack as='section' w='100%' spacing='12px' justify='flex-start'> {/* Seção */}
            <Text fontWeight='600' lineHeight='18px' fontSize='12px' w='100%' color='#A1A5B7'>INÍCIO</Text>
            
            <VStack spacing='20px' w='100%'>
              <PageButton title='Pacientes' isActive />
            </VStack>
          </VStack>

          <VStack as='section' w='100%' spacing='12px' justify='flex-start'> {/* Seção */}
            <Text fontWeight='600' lineHeight='18px' fontSize='12px' w='100%' color='#A1A5B7'>ATENDIMENTO</Text>
            
            <VStack spacing='20px' w='100%'>
              <PageButton title='Consultas' />
              <PageButton title='Tratamentos' />
            </VStack>
          </VStack>
          
          <VStack as='section' w='100%' spacing='12px' justify='flex-start'> {/* Seção */}
            <Text fontWeight='600' lineHeight='18px' fontSize='12px' w='100%' color='#A1A5B7'>FINANCEIRO</Text>
            
            <VStack spacing='20px' w='100%'>
              <PageButton title='Débitos recebidos' />
              <PageButton title='Dívidas' />
              <PageButton title='Balanço' />
            </VStack>
          </VStack>

          <VStack as='section' w='100%' spacing='12px' justify='flex-start'> {/* Seção */}
            <Text fontWeight='600' lineHeight='18px' fontSize='12px' w='100%' color='#A1A5B7'>ASPECTOS LEGAIS</Text>
            
            <VStack spacing='20px' w='100%'>
              <PageButton title='Termos de uso' />
            </VStack>
          </VStack>
        </VStack>
      </Flex>
    </Flex>
    </>
  );
}
