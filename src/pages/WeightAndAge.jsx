import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  InputLabel,
  Input,
  TextField,
  Typography,
  Button,
  Box,
  Fade,
  InputAdornment,
} from '@mui/material'
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useAppState } from '../context'
import {
  AddWeight,
  AddAgeYear,
  AddAgeMonth,
  AddPercent,
} from '../context/appStateActions'
import Layout from '../components/Layout'
import SelectAgeYearsField from '../components/WeightAndAgeComponents/SelectAgeYearsField'
import styled from "styled-components";

const WeightAndAge = () => {
  let navigate = useNavigate()
  const { state, dispatch } = useAppState()

  const togleMobileSelect = useMediaQuery('(max-width:450px)')

  useEffect(() => {
    dispatch(AddPercent(16))
  }, [])

  const stylesInputLabel = {
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
  }
  const stylesInput = {
    background: 'transparent',
    borderRadius: '10px',
    border: 'none',
    appearance: 'none',
    '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button ': {
      appearance: 'none',
      margin: '0',
    },
    '& input[type=number]': {
      appearance: 'textfield',
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
        xs: '30px',
        xl: '38px',
      },
      color: 'rgba(20, 20, 20, 1.0)',
    },
  }
  const StyledHeading1 = styled.p`
    margin:0px;
    background-image: linear-gradient(0deg, rgb(255, 204, 51) 2%, rgb(226, 51, 255) 100%);
    background-image: -webkit-linear-gradient(0deg, rgb(255, 204, 51) 2%, rgb(226, 51, 255) 100%);
    background-image: -moz-linear-gradient(0deg, rgb(255, 204, 51) 2%, rgb(226, 51, 255) 100%);
    text-shadow: none;
    padding: 13px 35px;
    font-size: 21px;
    border-radius: 33px;
`;
  const addAgeYearHandler = (e) => {
    let ageYear = e.target.value
    dispatch(AddAgeYear(ageYear))
  }

  const addAgeMonthHandler = (e) => {
    let ageMonth = e.target.value
    dispatch(AddAgeMonth(ageMonth))
  }

  const nextButtonHandler = () => {
    state.weight > 0 && state.weight <= 200 && state.age_years && state.age_months && navigate('/dog-weight-required')
  }

  return (
    <Layout percent={state.progressInPercent}>
      <Fade in={true} timeout={500}>
        <div>
          <InputLabel
            htmlFor='weight-field'
            sx={{
              ...stylesInputLabel,
              padding: '0 0 15px 0',
              color: '#000',
            }}
          >
            {state.dogName} currently weights...
          </InputLabel>

          <Input
            id='weight-field'
            name='weight'
            type='number'
            value={state.weight}
            onChange={(e) => {
              if (e.target.value > 200) {
                e.target.value = 200
              } else if (e.target.value < 0) {
                e.target.value = 0
              }
              dispatch(AddWeight(e.target.value))
            }}
            placeholder='weight in kgs'
            autoComplete='off'
            disableUnderline={true}
            fullWidth={true}
            endAdornment={
              state.weight.length > 0 && (
                <InputAdornment
                  position='start'
                  sx={{
                    display: 'block',
                    position: 'absolute',
                    right: '10px',
                    top: '19px',
                    '.MuiTypography-root': {
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
                    },
                  }}
                >
                  kgs
                </InputAdornment>
              )
            }
            sx={{
              ...stylesInput,
              position: 'relative',
              '.MuiInput-input': {
                display: 'block',
                position: 'relative',
                height: {
                  xs: '40px',
                  xl: '50px',
                },
                padding: '6px 15px 4px',
                border: '2px solid',
                borderColor: `${state.weight.length > 0 ? '#FE654F' : 'rgba(0, 0, 0, 0.3)'
                  }`,
                borderRadius: '10px',
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
            }}
          />

          {state.weight > 0 && state.weight <= 200 && (
            <Fade in={true} timeout={500}>
              <div>
                <Typography
                  component='p'
                  sx={{
                    ...stylesInputLabel,
                    margin: '20px 0 20px 0px',
                    color: '#000',
                    fontWeight: 600,
                    cursor: 'default',
                  }}
                >
                  {state.dogName} is...
                </Typography>
                <Box
                  component='div'
                  sx={{
                    display: 'flex',
                    flexDirection: `${togleMobileSelect ? 'column' : 'row'}`,
                    justifyContent: `${togleMobileSelect ? 'space-between' : 'space-between'
                      }`,
                    alignItems: `${togleMobileSelect ? 'flex-start' : 'center'
                      }`,
                    width: {
                      xs: '100%',
                      sm: '500px',
                    },
                    height: `${togleMobileSelect ? '130px' : 'auto'}`,
                  }}
                >
                  <Box
                    component='div'
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <SelectAgeYearsField
                      value={state.age_years}
                      handleChange={addAgeYearHandler}
                      number={20}
                    />
                    {/* <Input
                      name='age_year'
                      type='number'
                      value={state.age_years}
                      onChange={(e) => addAgeYearHandler(e)}
                      placeholder='add year'
                      autoComplete='off'
                      disableUnderline={true}
                      fullWidth={false}
                      sx={{
                        ...stylesInput,
                        width: '95px',
                        '.MuiInput-input': {
                          display: 'block',
                          position: 'relative',
                          height: '40px',
                          padding: '6px 8px 4px',
                          border: '2px solid',
                          borderColor: `${
                            state.age_years.length > 0
                              ? '#FE654F'
                              : 'rgba(0, 0, 0, 0.3)'
                          }`,
                          borderRadius: '10px',
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          fontSize: '18px',
                          lineHeight: '22px',
                        },
                      }}
                    /> */}
                    <InputLabel
                      sx={{
                        ...stylesInputLabel,
                        color: '#000',
                        marginLeft: '15px',
                        cursor: 'default',
                      }}
                    >
                      years and
                    </InputLabel>
                  </Box>
                  <Box
                    component='div'
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <SelectAgeYearsField
                      value={state.age_months}
                      handleChange={addAgeMonthHandler}
                      number={11}
                    />
                    {/* <Input
                      name='age_month'
                      type='number'
                      value={state.age_months}
                      onChange={(e) => addAgeMonthHandler(e)}
                      placeholder='add mohth'
                      autoComplete='off'
                      disableUnderline={true}
                      fullWidth={false}
                      sx={{
                        ...stylesInput,
                        width: '95px',
                        '.MuiInput-input': {
                          display: 'block',
                          position: 'relative',
                          height: '40px',
                          padding: '6px 8px 4px',
                          border: '2px solid',
                          borderColor: `${
                            state.age_months.length > 0
                              ? '#FE654F'
                              : 'rgba(0, 0, 0, 0.3)'
                          }`,
                          borderRadius: '10px',
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          fontSize: '18px',
                          lineHeight: '22px',
                        },
                      }}
                    /> */}
                    <InputLabel
                      sx={{
                        ...stylesInputLabel,
                        color: '#000',
                        marginLeft: '15px',
                        cursor: 'default',
                      }}
                    >
                      months old.
                    </InputLabel>
                  </Box>
                </Box>
              </div>
            </Fade>
          )}

          <Fade in={true} timeout={500}>
            <Box
              component='div'
              sx={{
                display: 'flex',
                // justifyContent: 'space-between',
                alignItems: 'center',
                width: '300px',
                marginTop: {sm: '50px', xs: '30px', md: '50px', xl: '50px'},
                marginBottom: {sm: '20px', xs: '20px'},
              }}
            >
              <Link to='/dog-name'>
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
                      marginRight: {xs: '80px', sm: '100px', md: '120px', xl: '120px'}
                    }}
                  >
                    Back
                  </Typography>
                </Box>
              </Link>
                <Fade in={state.weight > 0 && state.weight <= 200 && state.age_years && state.age_months} timeout={500}>
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
                        xl: '28px',
                      },
                      fontWeight: '400',
                      // marginLeft: '40px',
                      ':hover': {
                        backgroundColor: 'rgba(254,101,79, 1.0)',
                      },
                      padding: '0px',
                      borderRadius: '33px',
                      backgroundColor: 'transparent',
                      border: '0px',
                      boxShadow: 'none',
                      ':hover': {
                        backgroundColor: 'transparent',
                        border: '0px',
                        boxShadow: 'none',
                      },
                      ':active': {
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
        </div>
      </Fade>
    </Layout>
  )
}
export default WeightAndAge
