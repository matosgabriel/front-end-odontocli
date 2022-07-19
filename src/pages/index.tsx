import { Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { Image, LinkBox } from '@chakra-ui/react';

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

      
    </Flex>
  )
}
