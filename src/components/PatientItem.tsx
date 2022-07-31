import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

interface PatientItemProps {
  name: string;
  phone: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

function PatientItem({ name, phone, onClick }: PatientItemProps) {
  const getAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?background=D7ECFF&color=0063BF&bold=true&size=100&font-size=0.55&rounded=true&name=${name[0]}`
  };
  
  return (
    <Flex align='center' justify='space-between' width='100%'>
      <Flex align='center'> {/* Info container */}
        <Image
          src={getAvatarUrl('Gabriel Matos')}
          alt='Avatar'
          height={{ base: '30px', xl: '34px', '2xl': '40px' }}
        />
        <Flex direction='column' ml='12px' fontWeight='500'>
          <Text
            color='#181C32'
            lineHeight='20px'
            fontSize={{ base: '12px', xl: '14px', '2xl': '16px' }}
          >
            {name}
          </Text>
          <Text
            color='#A1A5B7'
            lineHeight='16px'
            fontSize={{ base: '10px', xl: '12xp', '2xl': '14px' }}
            mt={{ base: '1px', xl: '3px', '2xl': '5px' }}
          >
            {phone}
          </Text>
        </Flex>
      </Flex>

      <Button
        colorScheme='customBlue'
        color='white'
        fontSize={{ base: '10px', xl: '12px', '2xl': '14px' }}
        height={{ base: '30px', xl: '34px', '2xl': '38px' }}
        fontWeight='500'
        onClick={onClick}
      >
        Visualizar
      </Button>
    </Flex>
  );
}

export { PatientItem }