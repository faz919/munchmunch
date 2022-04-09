import React, { useState } from 'react';
import { theme } from '../theme';
import {
  LinearProgress,
  CardMedia,
  Fade,
  Grid,
  Box,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Welcome from './Welcome';
import Footer from './Footer';
import logo from '../assets/images/munchmunch-logo.png';

const Layout = ({ children }) => {
  const [percent, setPercent] = useState(0);
  // const paddingContainer = useMediaQuery('(min-width:600px)');

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
      {/* <div className='signup-container'> */}
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
            width: '50%',
            paddingTop: '100px',
            padding: '75px 50px 0',
            backgroundColor: '#6CD4FF',
          }}
        >
          <Fade in={true} timeout={500}>
            <CardMedia
              component='img'
              sx={{
                display: 'flex',
                width: '300px',
                marginLeft: '',
                marginBottom: '85px',
              }}
              image={logo}
              alt='MunchMunch logo'
            />
          </Fade>
          {children}
        </Box>
        <Welcome />
      </Grid>
      {/* </div> */}
      <Footer />
    </div>
  );
};
export default Layout;
