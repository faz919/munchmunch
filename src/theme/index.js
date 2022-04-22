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
  // palette: {
  //   mm_lightblue: '#6CD4FF',
  //   mm_darkpurple: '#8B80F9',
  //   mm_lightpurple: '#CFBFF7',
  //   mm_yelloworange: '#FED18C',
  //   mm_orange: '#FE654F',
  //   mm_red: '#F64740',
  //   mm_green: '#09BC8A'
  // }
})
