import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1024,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mm_lightblue: {
      main: '#6CD4FF',
    }, 
    mm_darkpurple: {
      main: '#8B80F9',
    },
    mm_lightpurple: {
      main: '#CFBFF7',
    },
    mm_yelloworange: {
      main: '#FED18C',
    },
    mm_orange: {
      main: '#FE654F',
    },
    mm_red: {
      main: '#F64740',
    },
    mm_green: {
      main: '#09BC8A'
    }
  }
})
