import React, { useState } from 'react';
import { LinearProgress, CardMedia, Fade, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Welcome from './Welcome';
import Footer from './Footer';
import logo from '../assets/images/munchmunch-logo.png';

const Layout = ({ children }) => {
  const [percent, setPercent] = useState(0);

  return (
    <div className='page-container'>
      <Box
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
    </div>
  );
};
export default Layout;
