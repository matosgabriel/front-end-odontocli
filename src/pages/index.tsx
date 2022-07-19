import { Flex } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

export default function Home() {
  return (
    <Flex width='100vw' height='100vh' flexDir='column'>
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

      <Flex
        as='main'
        flex='1'
        flexDir='column'
        position='relative'
        _before={{ content: `''`, height: '1px', bg:'#E4E6EF', width: '100%', position: 'absolute', left: 0, top: 0 }}
      >
      </Flex>
    </Flex>
  )
}
