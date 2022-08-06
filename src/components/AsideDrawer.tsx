import React, { useRef } from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  Text
} from '@chakra-ui/react'
import { PageButton } from './PageButton';

interface AsideDrawerProps {
  onClose: () => void;
  isOpen: boolean;
}

function AsideDrawer({ onClose, isOpen }: AsideDrawerProps) {
  // const { onClose, isOpen, onOpen } = useDisclosure();

  return (
    <>
      {/* <Button onClick={onOpen}>Teste</Button> */}
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader />

          <DrawerBody>
            <VStack as='aside' w='242px' h='100%' spacing={{base: '20px', xl: '25px', '2xl': '35px'}}> {/* Aside */}
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export { AsideDrawer }