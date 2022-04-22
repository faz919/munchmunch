import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { Button, Typography, Box, Fade } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../context'
import { AddPercent } from '../context/appStateActions'

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
              fontSize: { xs: '24px', xl: '30px' },
              lineHeight: { xs: '30px', xl: '38px' },
              color: '#000',
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
              fontSize: { xs: '16px', xl: '24px' },
              lineHeight: { xs: '22px', xl: '30px' },
              textTransform: 'none',
              padding: '10px 20px',
              backgroundColor: 'rgba(254,101,79, 0.7)',
              '&:hover': {
                backgroundColor: 'rgba(254,101,79, 1.0)',
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Fade>
    </Layout>
  )
}
export default Home
