import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    customBlue: {
      500: "#0094FF", // Background color
      600: '#0081de', // Hover color
      700: '#0068b3' // Pressed color
    }
  },
  styles: {
    global: {
      body: {
        bg: '#fff'
      }
    }
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins'
  }
});