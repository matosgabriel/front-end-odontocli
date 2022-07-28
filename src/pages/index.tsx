import { Flex, Image, Text, useBreakpoint, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect } from 'react';
import { PageButton } from '../components/PageButton';

export default function Home() {
  const getAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?background=D7ECFF&color=0063BF&bold=true&size=100&font-size=0.55&rounded=true&name=${name[0]}`
  };

  const breakpoint = useBreakpoint();
  
  useEffect(() => {
    console.log(breakpoint);
  }, [breakpoint]);

  return (
    <>
    <Head>
      <title>Odontocli | Home</title>
    </Head>
    
    <Flex width='100%' height='100vh' flexDir='column'>
      <Flex
        w='100%'
        position='relative'
        _before={{ content: `''`, height: '1px', bg:'#E4E6EF', width: '100%', position: 'absolute', left: 0, bottom: 0 }}
      >
        <Flex
          position='relative'
          as='header'
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
        h='100%'
        w='100%'
        padding={{ '2xl': '45px 123px 0', xl: '30px 70px 0', lg: '20px 50px 0', sm: '15px 30px 0' }}
        align='flex-start'
      >
        {/* <VStack as='aside' w='242px' h='100%' spacing='35px' borderRightWidth='1px'> Aside */}
        <VStack as='aside' w='242px' h='100%' spacing={{base: '20px', xl: '25px', '2xl': '35px'}} borderRightWidth='1px'> {/* Aside */}
          <VStack as='section' w='100%' spacing='12px' justify='flex-start'> {/* Seção */}
            <Text fontWeight='600' lineHeight='18px' fontSize='12px' w='100%' color='#A1A5B7'>INÍCIO</Text>
            
            <VStack spacing={{ xl: '10px', '2xl': '20px' }} w='100%'>
              <PageButton title='Pacientes' isActive />
            </VStack>
          </VStack>

          <VStack as='section' w='100%' spacing='12px' justify='flex-start'> {/* Seção */}
            <Text fontWeight='600' lineHeight='18px' fontSize='12px' w='100%' color='#A1A5B7'>ATENDIMENTO</Text>
            
            <VStack spacing={{ base: '8px', xl: '10px', '2xl': '12px' }} w='100%'>
              <PageButton title='Consultas' />
              <PageButton title='Tratamentos' />
            </VStack>
          </VStack>
          
          <VStack as='section' w='100%' spacing='12px' justify='flex-start'> {/* Seção */}
            <Text fontWeight='600' lineHeight='18px' fontSize='12px' w='100%' color='#A1A5B7'>FINANCEIRO</Text>
            
            <VStack spacing={{ xl: '10px', '2xl': '12px' }} w='100%'>
              <PageButton title='Débitos recebidos' />
              <PageButton title='Dívidas' />
              <PageButton title='Balanço' />
            </VStack>
          </VStack>

          <VStack as='section' w='100%' spacing='12px' justify='flex-start'> {/* Seção */}
            <Text fontWeight='600' lineHeight='18px' fontSize='12px' w='100%' color='#A1A5B7'>ASPECTOS LEGAIS</Text>
            
            <VStack spacing={{ xl: '10px', '2xl': '12px' }} w='100%'>
              <PageButton title='Termos de uso' />
            </VStack>
          </VStack>
        </VStack>
        
        <Flex>
          <Image
            src={getAvatarUrl('Gabriel Matos')}
            // borderRadius='50%'
            alt='Avatar'
            height='50px'
          />
        </Flex>
      </Flex>
    </Flex>
    </>
  );
}
