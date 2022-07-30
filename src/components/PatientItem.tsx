import { Button, Flex, Image, Text } from "@chakra-ui/react";

interface PatientItemProps {
  name: string;
  phone: string;
}

function PatientItem({ name, phone }: PatientItemProps) {
  const getAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?background=D7ECFF&color=0063BF&bold=true&size=100&font-size=0.55&rounded=true&name=${name[0]}`
  };
  
  return (
    <Flex align='center' justify='space-between' width='100%'>
      <Flex align='center'> {/* Info container */}
        <Image
          src={getAvatarUrl('Gabriel Matos')}
          alt='Avatar'
          height='40px'
        />
        <Flex direction='column' ml='12px' fontWeight='500'>
          <Text color='#181C32' lineHeight='20px' fontSize='16px'> {name}</Text>
          <Text color='#A1A5B7' lineHeight='16px' fontSize='14px' mt='5px'>{phone}</Text>
        </Flex>
      </Flex>

      <Button
        colorScheme='customBlue'
        color='white'
        fontSize={{ base: '10px', xl: '12px', '2xl': '14px' }}
        height={{ base: '30px', xl: '34px', '2xl': '38px' }}
        fontWeight='500'
      >
        Visualizar
      </Button>
    </Flex>
  );
}

export { PatientItem }