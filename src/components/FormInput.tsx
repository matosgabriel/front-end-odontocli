import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from "@chakra-ui/react";

interface FormInputProps extends InputProps {
  label: string;
  isInvalid: boolean;
  errorMessage: string | undefined;
  initialFocus?: boolean;
  mask?: string | (string | RegExp)[];
}

function FormInput({  isInvalid, label, errorMessage, initialFocus, mask, ...rest }: FormInputProps) {
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel fontSize={{ base: '12px', xl: '14px', '2xl': '16px' }}>{ label }</FormLabel>
      <Input autoFocus={initialFocus} mask={mask} {...rest} height={{ base: '30px', xl: '34px', '2xl': '40px' }} fontSize={{ base: '12px', xl: '14px', '2xl': '16px' }} />
      <FormErrorMessage>{ errorMessage }</FormErrorMessage>
    </FormControl>
  );
}

export { FormInput }