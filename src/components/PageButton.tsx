import { Button as ChakraButton} from '@chakra-ui/react';

interface PageButtonProps {
  title: string;
  isActive?: boolean;
}

function PageButton({ title, isActive = false }: PageButtonProps) {
  return (
    <ChakraButton
      w='100%'
      borderLeftWidth={isActive ? '4px' : '0px'}
      borderColor='#0094FF'
      justifyContent='flex-start'
      fontSize='14px'
      lineHeight='21px'
      fontWeight={isActive ? '600' : '500'}
      variant={isActive ? 'solid' : 'ghost'}
    >
      { title }
    </ChakraButton>
  );
}

export { PageButton }