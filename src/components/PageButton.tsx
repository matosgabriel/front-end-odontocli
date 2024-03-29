import { Button as ChakraButton, ButtonProps as ChakraButtonProps} from '@chakra-ui/react';

interface PageButtonProps extends ChakraButtonProps {
  title: string;
  isActive?: boolean;
}

function PageButton({ title, isActive = false, ...rest }: PageButtonProps) {
  return (
    <ChakraButton
      w='90%'
      borderLeftWidth={isActive ? '4px' : '0px'}
      borderColor='#0094FF'
      justifyContent='flex-start'
      fontSize={{ sm: '12px', '2xl': '14px' }}
      lineHeight={{ sm: '16px', '2xl': '21px' }}
      fontWeight={isActive ? '600' : '500'}
      variant={isActive ? 'solid' : 'ghost'}
      alignSelf='flex-start'
      {...rest}
    >
      { title }
    </ChakraButton>
  );
}

export { PageButton }