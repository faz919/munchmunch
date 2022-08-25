import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { Button, Typography, Box, Fade } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../context'
import { AddPercent } from '../context/appStateActions'
import styled from "styled-components";

const StyledHeading = styled.p`
    margin:0px;
    background: rgba(0, 0, 0, 0) linear-gradient(0deg, rgb(255, 204, 51) 0%, rgb(254, 101, 79) 100%) repeat scroll 0% 0%;
    background: rgba(0, 0, 0, 0) -webkit-linear-gradient(0deg, rgb(255, 204, 51) 0%, rgb(254, 101, 79) 100%) repeat scroll 0% 0%;
    background: rgba(0, 0, 0, 0) -moz-linear-gradient(0deg, rgb(255, 204, 51) 0%, rgb(254, 101, 79) 100%) repeat scroll 0% 0%;
    text-shadow: none;
    padding: 10px 20px;
    border-radius: 33px;
`;

const Home = () => {
  let navigate = useNavigate()
  const { state, dispatch } = useAppState()

  useEffect(() => {
    dispatch(AddPercent(null))
  }, [])

  return (
    <Layout percent={state.progressInPercent}>
      <Fade in={true} timeout={500}>
        <Box
          component='div'
          sx={{
            display: 'block',
            // width: '80%',
          }}
        >
          <Typography
            component='p'
            sx={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: { xs: '18px', xl: '24px' },
              lineHeight: { xs: '24px', xl: '30px' },
              color: '#6c757d',
              marginBottom: '50px',
            }}
          >
            Answer a few quick questions about your pet(s) so we can create
            their custom meal plan. Just a couple of minutes and you’ll be good
            to go.
          </Typography>
          <Button
            variant='contained'
            onClick={() => navigate('/dog-name')}
            sx={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: { xs: '16px', xl: '22px' },
              lineHeight: { xs: '22px', xl: '30px' },
              letterSpacing: '0px',
              fontWeight: '500',
              textTransform: 'none',
              padding: '0px',
              backgroundColor: 'transparent',
              border: '0px',
              borderRadius: '33px',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                border: '0px',
                boxShadow: 'none',
              },
            }}
          >
            <StyledHeading>Get Started</StyledHeading>
          </Button>
        </Box>
      </Fade>
    </Layout>
  )
}
export default Home
