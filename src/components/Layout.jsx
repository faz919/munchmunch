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
        height: 'auto',
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
                backgroundColor: '#4caf50',
              },
              '&.MuiLinearProgress-determinate': {
                backgroundColor: '#e6ee9c',
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
          height: '100%',
          padding: '0',
        }}
      >
        <Box
          component='div'
          sx={{
            width: { xs: '100%', md: '55%' },
            paddingTop: { xs: '100px', xl: '150px' },
            padding: `${toggleMobileSelect ? '50px 25px 50px' : '75px 50px 75px'
              }`,
            backgroundColor: '#CFBFF7',
          }}
        >
          <Fade in={true} timeout={500}>
            <Link to='/'>
              <CardMedia
                component='img'
                sx={{
                  display: 'flex',
                  width: { xs: '250px', sm: '300px', xl: '600px' },
                  marginLeft: '',
                  marginBottom: '85px',
                }}
                image={logo}
                alt='MunchMunch logo'
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
