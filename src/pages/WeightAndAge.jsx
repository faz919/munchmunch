import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  InputLabel,
  Input,
  TextField,
  Typography,
  Button,
  Box,
  Fade,
} from '@mui/material';
// import ArrowCircleLeftSharpIcon from '@mui/icons-material/ArrowCircleLeftSharp';
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import { useAppState } from '../context';
import {
  AddWeight,
  AddAgeYear,
  AddAgeMonth,
  AddPercent,
} from '../context/appStateActions';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const WeightAndAge = () => {
  let navigate = useNavigate();
  const { state, dispatch } = useAppState();

  useEffect(() => {
    dispatch(AddPercent(33));
  }, []);

  const stylesInputLabel = {
    width: 'fit-content',
    cursor: 'pointer',
    fontFamily: 'Bubblegum Sans',
    fontSize: '18px',
    lineHeight: '22px',
    fontWeight: 500,
  };
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
      border: '2px solid #09BC8A',
    },
    '& .MuiInput-input::placeholder': {
      fontSize: '18px',
      lineHeight: '30px',
      color: 'rgba(20, 20, 20, 1.0)',
    },
  };

  const addWeightHandler = (e) => {
    let weight = e.target.value;
    if (weight > 200) {
      weight = 200;
    } else if (weight < 0) {
      weight = 0;
    }
    dispatch(AddWeight(weight));
  };
  const addAgeYearHandler = (e) => {
    let ageYear = e.target.value;
    if (ageYear > 20) {
      ageYear = 20;
    } else if (ageYear < 0) {
      ageYear = 0;
    }
    dispatch(AddAgeYear(ageYear));
  };

  const addAgeMonthHandler = (e) => {
    let ageMonth = e.target.value;
    if (ageMonth > 12) {
      ageMonth = 12;
    } else if (ageMonth < 0) {
      ageMonth = 0;
    }
    dispatch(AddAgeMonth(ageMonth));
  };

  const nextButtonHandler = () => {
    navigate('/dog-weight-required');
  };

  return (
    <Layout percent={state.progressInPercent}>
      <Fade in={true} timeout={500}>
        <Box>
          <InputLabel
            htmlFor='weight-field'
            sx={{
              ...stylesInputLabel,
              padding: '0 0 5px 15px',
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
            onChange={(e) => addWeightHandler(e)}
            placeholder='weight in kgs'
            autoComplete='off'
            disableUnderline={true}
            fullWidth={true}
            sx={{
              ...stylesInput,
              '.MuiInput-input': {
                display: 'block',
                position: 'relative',
                height: '40px',
                padding: '6px 8px 4px',
                border: '2px solid',
                borderColor: `${
                  state.weight.length > 0 ? '#09BC8A' : 'rgba(0, 0, 0, 0.3)'
                }`,
                borderRadius: '10px',
                fontFamily: 'Bubblegum Sans',
                fontSize: '18px',
                lineHeight: '22px',
              },
            }}
          />

          {state.weight && (
            <Fade in={true} timeout={500}>
              <Box component='div'>
                <Typography
                  component='p'
                  sx={{
                    ...stylesInputLabel,
                    margin: '50px 0 5px 15px',
                    color: '#000',
                    cursor: 'default',
                  }}
                >
                  {state.dogName} is...
                </Typography>
                <Box
                  component='div'
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '500px',
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
                    <Input
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
                            state.age_years.length > 0 ? '#09BC8A' : '#FED18C'
                          }`,
                          borderRadius: '10px',
                          fontFamily: 'Bubblegum Sans',
                          fontSize: '18px',
                          lineHeight: '22px',
                        },
                      }}
                    />
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
                    <Input
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
                            state.age_months.length > 0 ? '#09BC8A' : '#FED18C'
                          }`,
                          borderRadius: '10px',
                          fontFamily: 'Bubblegum Sans',
                          fontSize: '18px',
                          lineHeight: '22px',
                        },
                      }}
                    />
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
              </Box>
            </Fade>
          )}

          <Fade in={true} timeout={500}>
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
                  <KeyboardBackspaceSharpIcon sx={{ color: '#F64740' }} />
                  <Typography
                    component='p'
                    sx={{
                      fontFamily: 'Bubblegum Sans',
                      fontSize: '18px',
                      lineHeight: '22px',
                      fontWeight: 500,
                      color: '#F64740',
                      marginLeft: '2px',
                    }}
                  >
                    Back
                  </Typography>
                </Box>
              </Link>
              {state.age_years && state.age_months && (
                <Fade in={true} timeout={500}>
                  <Button
                    variant='contained'
                    onClick={nextButtonHandler}
                    sx={{
                      padding: '8px 25px',
                      backgroundColor: 'rgba(9, 188, 138, 0.7)',
                      textTransform: 'none',
                      fontFamily: 'Bubblegum Sans',
                      fontSize: '18px',
                      lineHeight: '22px',
                      fontWeight: '400',
                      // marginLeft: '40px',
                      ':hover': {
                        backgroundColor: 'rgba(9, 188, 138, 1.0)',
                      },
                    }}
                  >
                    Next
                  </Button>
                </Fade>
              )}
            </Box>
          </Fade>
        </Box>
      </Fade>
    </Layout>
  );
};
export default WeightAndAge;