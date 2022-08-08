import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    customBlue: {
      500: '#0094FF', // Background color
      600: '#0081de', // Hover color
      700: '#0068b3' // Pressed color
    },
    customYellow: {
      500: '#FFB562',
      600: '#fa9e37',
      700: '#f5860a'
    },
    customRed: {
      500: '#EC406A',
      600: '#e82353',
      700: '#c20432'
    },
    customGreen: {
      500: '#24BC8C',
      600: '#1fa178',
      700: '#1a8765'
    },
    customGray: {
      500: '#A1A5B7'
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