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
      <FormLabel>{ label }</FormLabel>
      <Input autoFocus={initialFocus} mask={mask} {...rest} />
      <FormErrorMessage>{ errorMessage }</FormErrorMessage>
    </FormControl>
  );
}

export { FormInput }