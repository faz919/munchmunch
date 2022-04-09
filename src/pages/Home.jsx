import React from 'react';
import Layout from '../components/Layout';
import { Button, Typography, Box, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  let navigate = useNavigate();
  return (
    <Layout>
      <Fade in={true} timeout={500}>
        <Box
          component='div'
          sx={{
            display: 'block',
            width: '80%',
          }}
        >
          <Typography
            component='p'
            sx={{
              fontFamily: 'Bubblegum Sans',
              fontSize: '24px',
              lineHeight: '30px',
              color: '#000',
              marginBottom: '50px',
              // width: '50%',
            }}
          >
            Answer a few quick questions about your pet(s) so we can create
            their custom meal plan. Just a couple of minutes and you’ll be good
            to go.
          </Typography>
          <Button
            // color='secondary'
            variant='contained'
            onClick={() => navigate('/pet-name')}
            sx={{
              fontFamily: 'Bubblegum Sans',
              fontSize: '16px',
              lineHeight: '22px',
              padding: '10px 20px',
              backgroundColor: '#F64740',
              '&:hover': {
                backgroundColor: '#FE654F',
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Fade>
    </Layout>
  );
};
export default Home;
