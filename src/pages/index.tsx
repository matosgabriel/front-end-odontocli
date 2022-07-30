import { Button, Flex, Image, Text, useBreakpoint, VStack } from '@chakra-ui/react';
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
                colorScheme='pageButtonBlue'
                color='white'
                fontSize={{ base: '10px', xl: '12px', '2xl': '14px' }}
                height={{ base: '30px', xl: '34px', '2xl': '38px' }}
              >
                Adicionar paciente
              </Button>
            </Flex>

            <Flex // Content main
              flexDir='column'
              width='100%'
              height='100%'
              bg='#333'
              mt={{ base: '15px', xl: '22px', '2xl': '32px' }}
            >
              
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
