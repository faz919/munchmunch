import React from 'react';
import { LinearProgress, CardMedia, Fade, Grid, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Welcome from './Welcome';
import Footer from './Footer';
import logo from '../assets/images/munchmunch-logo.png';

const Layout = ({ percent, children }) => {
  let location = useLocation();

  return (
    <Box
      component='div'
      sx={{
        display: 'block',
        position: 'relative',
        width: '100%',
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
            // backgroundColor: '#FED18C',
            // top: '0',
            // zIndex: '50',
          }}
        >
          {/* <Box
            component='div'
            sx={{
              height: '10px',
              margin: '0',
              width: `${percent}%`,
              transition: 'all .5s ease-in-out',
              backgroundColor: '#4caf50'
            }}
          ></Box> */}
          {/* <Fade in={true} timeout={1000}> */}
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
              // '.MuiLinearProgress-bar1': {
              //   transition: 'transform 10s linear'
              // }
            }}
          />
          {/* </Fade> */}
        </Box>
      )}
      <Grid
        component='div'
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          height: '100%',
          padding: '0',
        }}
      >
        <Box
          component='div'
          sx={{
            width: { xs: '100%', md: '55%' },
            paddingTop: { xs: '100px', xl: '150px' },
            padding: '75px 50px 75px',
            backgroundColor: '#CFBFF7', // 6CD4FF
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
              />
            </Link>
          </Fade>
          {children}
        </Box>
        <Welcome />
      </Grid>
      <Footer />
    </Box>
  );
};
export default Layout;
