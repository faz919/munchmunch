import React from 'react'
import { LinearProgress, CardMedia, Fade, Grid, Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import Welcome from './Welcome'
import Footer from './Footer'
import logo from '../assets/images/munchmunch-logo.png'
import { useAppState } from '../context'
import { AddPercent } from '../context/appStateActions'

const Layout = ({ percent, children }) => {
  let location = useLocation()
  const { state, dispatch } = useAppState()

  const toggleMobileSelect = useMediaQuery('(max-width:450px)')

  const deleteProgress = () => {
    dispatch(AddPercent(0))
  }

  return (
    <Box
      component='div'
      sx={{
        display: 'block',
        position: 'relative',
        // width: '100%',
      }}
    >
      {location.pathname !== '/' && (
        <Box
          component='div'
          sx={{
            display: 'block',
            position: 'fixed',
            width: '100%',
          }}
        >
          <LinearProgress
            variant='determinate'
            value={percent}
            sx={{
              height: '10px',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#8B80F9',
              },
              '&.MuiLinearProgress-determinate': {
                backgroundColor: '#CFBFF7',
              },
            }}
          />
        </Box>
      )}
      <Grid
        component='div'
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          minHeight: {
            xs: 'auto',
            md: window.innerHeight
          }, 
          padding: '0',
        }}
      >
        <Box
          component='div'
          sx={{
            width: { xs: '100%', md: '55%' },
            paddingTop: { xs: '100px', xl: '150px' },
            padding: `${toggleMobileSelect ? '20px 10px 20px' : '75px 50px 75px'
              }`,
            backgroundColor: '#FED18C',
          }}
        >
          <Fade in={true} timeout={500}>
            <Link to='/'>
              <CardMedia
                component='img'
                sx={{
                  display: 'flex',
                  width: { xs: '180px', sm: '200px', xl: '400px' },
                  marginLeft: '',
                  marginBottom: { sm: '35px', md: '45px', xl: '85px' },
                }}
                image={logo}
                alt='Munch+Munch logo'
                onClick={deleteProgress}
              />
            </Link>
          </Fade>
          {children}
        </Box>
        <Welcome />
      </Grid>
      <Footer />
    </Box>
  )
}
export default Layout
