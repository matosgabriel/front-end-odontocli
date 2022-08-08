import React from 'react';


import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text
} from '@chakra-ui/react';

interface UsageTermsModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function UsageTermsModal({isOpen, onOpen, onClose}: UsageTermsModalProps) {

  return (
    <>
      <ChakraModal
        // finalFocusRef={finalRef}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size='5xl'
      >
        <ModalOverlay />
        <ModalContent p={{ base: '0 10px', xl: '0 20px', '2xl': '0 30px' }}>
          <ModalHeader>Termos de uso</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb='10'>
            <Text textAlign='justify' maxHeight='500px' overflowY='scroll' css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consectetur quidem dolorem quo perferendis similique, dolore doloribus rerum esse, et eum aliquam aliquid sapiente optio, repellendus atque sequi minima sit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consectetur quidem dolorem quo perferendis similique, dolore doloribus rerum esse, et eum aliquam aliquid sapiente optio, repellendus atque sequi minima sit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consectetur quidem dolorem quo perferendis similique, dolore doloribus rerum esse, et eum aliquam aliquid sapiente optio, repellendus atque sequi minima sit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consectetur quidem dolorem quo perferendis similique, dolore doloribus rerum esse, et eum aliquam aliquid sapiente optio, repellendus atque sequi minima sit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consectetur quidem dolorem quo perferendis similique, dolore doloribus rerum esse, et eum aliquam aliquid sapiente optio, repellendus atque sequi minima sit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consectetur quidem dolorem quo perferendis similique, dolore doloribus rerum esse, et eum aliquam aliquid sapiente optio, repellendus atque sequi minima sit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consectetur quidem dolorem quo perferendis similique, dolore doloribus rerum esse, et eum aliquam aliquid sapiente optio, repellendus atque sequi minima sit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consectetur quidem dolorem quo perferendis similique, dolore doloribus rerum esse, et eum aliquam aliquid sapiente optio, repellendus atque sequi minima sit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consectetur quidem dolorem quo perferendis similique, dolore doloribus rerum esse, et eum aliquam aliquid sapiente optio, repellendus atque sequi minima sit.
            </Text>
          </ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  );
}

export { UsageTermsModal }