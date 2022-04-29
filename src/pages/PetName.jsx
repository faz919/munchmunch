import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Typography,
  InputLabel,
  Input,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Box,
  Fade,
} from '@mui/material'
import { useAppState } from '../context'
import { AddDogName, AddGender, AddPercent } from '../context/appStateActions'
import Layout from '../components/Layout'
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp'
import styled from "styled-components";


const StyledHeading = styled.p`
  margin:0px;
  background-image: linear-gradient(0deg, rgb(255, 204, 51) 2%, rgb(226, 51, 255) 100%);
  background-image: -webkit-linear-gradient(0deg, rgb(255, 204, 51) 2%, rgb(226, 51, 255) 100%);
  background-image: -moz-linear-gradient(0deg, rgb(255, 204, 51) 2%, rgb(226, 51, 255) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  box-decoration-break: clone;
  text-shadow: none;
`;
const StyledHeading1 = styled.p`
    margin:0px;
    background-image: linear-gradient(0deg, rgb(255, 204, 51) 2%, rgb(226, 51, 255) 100%);
    background-image: -webkit-linear-gradient(0deg, rgb(255, 204, 51) 2%, rgb(226, 51, 255) 100%);
    background-image: -moz-linear-gradient(0deg, rgb(255, 204, 51) 2%, rgb(226, 51, 255) 100%);
    text-shadow: none;
    padding: 15px 25px;
    border-radius: 33px;
`;

const PetName = () => {
  let navigate = useNavigate()
  const { state, dispatch } = useAppState()

  useEffect(() => {
    dispatch(AddPercent(0))
  }, [])

  const dogNameHandler = (e) => {
    let dogName = e.target.value
    dispatch(AddDogName(dogName))
  }

  const checkboxGenderHandler = (e) => {
    dispatch(AddGender(e.target.value))
  }

  const nextButtonHandler = () => {
    state.dogName && state.gender && navigate('/dog-weight-and-age')
  }

  return (
    <Layout percent={state.progressInPercent}>
      <Fade in={true} timeout={500}>
        <Box component='div'>
          <Typography
            component='h2'
            sx={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: {
                xs: '38px',
                xl: '48px',
              },
              lineHeight: {
                xs: '52px',
                xl: '64px',
              },
              color: '#FE654F',
              marginBottom: '20px',
              textAlign: 'left',
              fontWeight: '600',
              textTransform: 'none',
            }}
          >
          <StyledHeading>About your dog</StyledHeading>
          </Typography>

          <Box component='div' sx={{ paddingBottom: '20px' }}>
            <InputLabel
              htmlFor='name-field'
              sx={{
                width: 'fit-content',
                cursor: 'pointer',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: {
                  xs: '18px',
                  xl: '24px',
                },
                lineHeight: {
                  xs: '22px',
                  xl: '30px',
                },
                fontWeight: 500,
                marginBottom: '15px',
                color: '#000',
              }}
            >
              My dog is named...
            </InputLabel>
            <Input
              id='name-field'
              name='name'
              value={state.dogName}
              onChange={(e) => dogNameHandler(e)}
              placeholder='Your pet’s name'
              autoComplete='off'
              disableUnderline={true}
              fullWidth={true}
              sx={{
                background: 'transparent',
                borderRadius: '10px',
                border: 'none',
                '.MuiInput-input': {
                  display: 'block',
                  position: 'relative',
                  height: {
                    xs: '40px',
                    xl: '50px',
                  },
                  padding: '5px 15px 5px 30px',
                  border: '2px solid',
                  borderColor: `${state.dogName.length > 0 ? '#FE654F' : 'rgba(0, 0, 0, 0.3)'
                    }`,
                  borderRadius: '12px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: {
                    xs: '18px',
                    xl: '24px',
                  },
                  lineHeight: {
                    xs: '26px',
                    xl: '30px',
                  },
                },
                '& .MuiInput-input:focus': {
                  outline: 'none',
                  appearance: 'none',
                  border: '2px solid #FE654F',
                },
                '& .MuiInput-input::placeholder': {
                  fontSize: {
                    xs: '18px',
                    xl: '24px',
                  },
                  lineHeight: {
                    xs: '26px',
                    xl: '30px',
                  },
                  color: 'rgba(20, 20, 20, 1.0)',
                },
              }}
            />
          </Box>
          <Fade in={state.dogName} timeout={500}>
            <Box component='div'>
              <Typography
                component='p'
                sx={{
                  width: 'fit-content',
                  cursor: 'pointer',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: {
                    xs: '18px',
                    xl: '24px',
                  },
                  lineHeight: {
                    xs: '26px',
                    xl: '30px',
                  },
                  fontWeight: 600,
                  marginBottom: '5px',
                  color: '#000',
                }}
              >
                {state.dogName} is...
              </Typography>

              <RadioGroup
                required
                name='radio-buttons-group'
                value={state.gender}
                onChange={(e) => checkboxGenderHandler(e)}
                sx={{
                  paddingBottom: '20px',
                }}
              >
                <Box sx={{ display: 'flex', flexWrap: 1 }}>
                  <FormControlLabel
                    value='male'
                    label='Male'
                    labelPlacement='end'
                    control={
                      <Radio
                        checked={state.gender === 'male'}
                        sx={{
                          color: '#000',
                          '& .MuiSvgIcon-root': {
                            width: '36px',
                            height: '36px',
                          },
                          '&.Mui-checked': { color: '#FE654F' }, //#E6A65D
                          '&:hover': { color: '#FE654F' },
                        }}
                      />
                    }
                    sx={{
                      marginRight: '60px',
                      '& .MuiTypography-root': {
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        fontSize: {
                          xs: '18px',
                          xl: '24px',
                        },
                        lineHeight: {
                          xs: '22px',
                          xl: '30px',
                        },
                        fontWeight: state.gender === 'male' ? '600' : '400',
                        color: state.gender === 'male' ? '#FE654F' : '#000',
                      },
                    }}
                  />
                  <FormControlLabel
                    value='female'
                    label='Female'
                    labelPlacement='end'
                    control={
                      <Radio
                        checked={state.gender === 'female'}
                        sx={{
                          color: '#000',
                          '& .MuiSvgIcon-root': {
                            width: '36px',
                            height: '36px',
                          },
                          '&.Mui-checked': { color: '#FE654F' }, //#E6A65D
                          '&:hover': { color: '#FE654F' },
                        }}
                      />
                    }
                    sx={{
                      '& .MuiTypography-root': {
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        fontSize: {
                          xs: '18px',
                          xl: '24px',
                        },
                        lineHeight: {
                          xs: '22px',
                          xl: '30px',
                        },
                        fontWeight: state.gender === 'female' ? '600' : '400',
                        color: state.gender === 'female' ? '#FE654F' : '#000',
                      },
                    }}
                  />
                </Box>
              </RadioGroup>
            </Box>
          </Fade>
          <Fade in={state.dogName} timeout={500}>
            <Box
              component='div'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '300px',
                marginTop: '50px',
              }}
            >
              <Link to='/'>
                <Box
                  component='div'
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    opacity: '0.8',
                    transition: 'opacity 0.3s ease-in',
                    '&:hover': {
                      opacity: '1.0',
                      transition: 'opacity 0.3s ease-in',
                    },
                  }}
                >
                  <KeyboardBackspaceSharpIcon sx={{ color: '#3d3935' }} />
                  <Typography
                    component='p'
                    sx={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontSize: {
                        xs: '18px',
                        xl: '24px',
                      },
                      lineHeight: {
                        xs: '22px',
                        xl: '28px',
                      },
                      fontWeight: 500,
                      color: '#3d3935',
                      marginLeft: '2px',
                    }}
                  >
                    Back
                  </Typography>
                </Box>
              </Link>
                <Fade in={state.dogName && state.gender} timeout={500}>
                  <Button
                    variant='contained'
                    onClick={nextButtonHandler}
                    sx={{
                      textTransform: 'none',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontSize: {
                        xs: '18px',
                        xl: '24px',
                      },
                      lineHeight: {
                        xs: '22px',
                        xl: '28px'
                      },
                      fontWeight: '400',
                      padding: '0px',
                      backgroundColor: 'transparent',
                      border: '0px',
                      boxShadow: 'none',
                      borderRadius: '33px',
                      ':hover': {
                        backgroundColor: 'transparent',
                        border: '0px',
                        boxShadow: 'none',
                      },
                      ':active': {
                        backgroundColor: 'transparent',
                        border: '0px',
                        boxShadow: 'none',
                      },
                      ':focusVisible': {
                        backgroundColor: 'transparent',
                        border: '0px',
                        boxShadow: 'none',
                      }
                    }}
                  >
                  <StyledHeading1>Next</StyledHeading1>
                  </Button>
                </Fade>
            </Box>
          </Fade>
        </Box>
      </Fade>
    </Layout>
  )
}
export default PetName
