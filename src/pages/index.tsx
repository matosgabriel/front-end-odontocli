import { Flex } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

export default function Home() {
  return (
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
        height='100%'
        width='100%'
        padding={{ lg: '45px 123px 0', sm: '20px 30px 0', base: '10px 15px 0' }}
      >
        <Flex flex='1' ><h1>TESTE</h1></Flex>
      </Flex>
    </Flex>
  );
}
