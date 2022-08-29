import React from 'react'
import { LinearProgress, CardMedia, Fade, Grid, Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import Welcome from './Welcome'
import DogWeightRequired from './dogWeightRequiredContent';
import HelathProblem from './healthProblemContent';
import DogNameImage from './DogName';
import DogWeightAndAge from './DogWeightAndAge';
import Checkout from './Checkout';
import MeetType from './meetTypesContent';
import ShippingInfo from './shippingInfoContent';
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
                backgroundColor: 'rgba(254, 101, 79, 0.77)',
              },
              '&.MuiLinearProgress-determinate': {
                backgroundColor: '#FEA59878',
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
            paddingTop: { xs: '50px', md: '100px', xl: '150px', },
            padding: `${toggleMobileSelect ? '20px 10px 20px' : '75px 50px 75px'
              }`,
            // backgroundColor: '#FED18C',
            backgroundColor: 'rgb(255, 244, 243)',
            borderRight: '1px solid #FE654F',
          }}
        >
          <Fade in={true} timeout={500}>
            <Link to='/'>
              <CardMedia
                component='img'
                sx={{
                  display: 'flex',
                  width: { xs: '180px', sm: '200px', xl: '400px' },
                  minHeight: { xs: '24.5312px', sm: '27.2569px', xl: '54.5138px' },
                  marginLeft: '',
                  marginBottom: { xs: '35px', sm: '35px', md: '45px', xl: '45px', },
                }}
                image={logo}
                alt='Munch+Munch logo'
                onClick={deleteProgress}
              />
            </Link>
          </Fade>
          {children}
        </Box>
        {/* <Welcome /> */}
        {

          location.pathname == "/dog-name" ?
            <DogNameImage /> :
            location.pathname == "/dog-weight-and-age" ?
              <DogWeightAndAge />
              : location.pathname == "/dog-weight-required"
                ? <DogWeightRequired />
                : location.pathname == "/checkout"
                  ? <Checkout />
                  : location.pathname == "/health-problems"
                    ? <HelathProblem />
                    : location.pathname == "/meat-types" ? <MeetType />
                      : location.pathname == "/shipping-info" ? <ShippingInfo /> : <Welcome />
        }
      </Grid>
      <Footer />
    </Box>
  )
}
export default Layout
