import React, { useEffect } from 'react'
import {
  InputLabel,
  Input,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
  Checkbox,
  Fade,
  FormGroup,
  InputAdornment,
  Box,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import Layout from '../components/Layout'
import { useAppState } from '../context'
import {
  AddWeightType,
  AddTargetWeight,
  SelectMeatType,
  DeleteTargetWeight,
  DeleteMeatTypes,
  DeleteCurrentMeatType,
  AddPercent,
} from '../context/appStateActions'
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp'
import { Link, useNavigate } from 'react-router-dom'
import styled from "styled-components";
const ReactPixel = require('react-facebook-pixel');

const StyledHeading1 = styled.p`
    margin:0px;
    background: rgba(0, 0, 0, 0) linear-gradient(0deg, rgb(255, 204, 51) 0%, rgb(254, 101, 79) 100%) repeat scroll 0% 0%;
    background: rgba(0, 0, 0, 0) -webkit-linear-gradient(0deg, rgb(255, 204, 51) 0%, rgb(254, 101, 79) 100%) repeat scroll 0% 0%;
    background: rgba(0, 0, 0, 0) -moz-linear-gradient(0deg, rgb(255, 204, 51) 0%, rgb(254, 101, 79) 100%) repeat scroll 0% 0%;
    text-shadow: none;
    padding: 13px 35px;
    font-size: 21px;
    border-radius: 33px;
`;

const TargetWeight = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useAppState()
  // const [meatTypesPicked, setMeatTypesPicked] = useState(false)

  const checkboxToMobile = useMediaQuery('(max-width:650px)')

  useEffect(() => {
    dispatch(AddPercent(33))
    ReactPixel.default.init('426736622778173');
  }, [])

  const stylesText = {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: {
      xs: '18px',
      xl: '24px',
    },
    lineHeight: {
      xs: '22px',
      xl: '30px',
    },
  }

  const weightTypeHandler = (e) => {
    let valueWeightType = e.target.value
    dispatch(AddWeightType(valueWeightType))
  }
  const nextButtonHandler = () => {
    state.weightType.length > 0 &&
      state.targetWeight.length > 0 &&
      state.targetWeight > 0 &&
      state.targetWeight <= 200 && navigate('/health-problems')

    window.fbq('track', 'ViewContent', {
      content_type: state.targetWeight,
    });
  }

  useEffect(() => {
    if (state.weightType === 'in shape') {
      dispatch(AddTargetWeight(state.weight))
    } else {
      dispatch(DeleteTargetWeight())
    }
  }, [state.weightType])

  return (
    <Layout percent={state.progressInPercent}>
      <Box>
        <Fade in={true} timeout={500}>
          <Box component='div'
            sx={{
              height: 'auto'
            }}
          >
            <Typography
              component='p'
              sx={{
                ...stylesText,
                fontWeight: 500,
                color: '#000',
                width: 'fit-content',
                margin: '0 0 15px 0px',
                cursor: 'pointer',
              }}
            >
              {state.dogName} can be described as...
            </Typography>

            <RadioGroup
              // required
              name='radio-buttons-group'
              value={state.weightType}
              onChange={(e) => weightTypeHandler(e)}
            >
              <Box
                component='div'
                sx={{
                  display: 'flex',
                  flexDirection: `${checkboxToMobile ? 'column' : 'row'}`,
                  // justifyContent: 'flex-start'
                }}
              >
                {['underweight', 'in shape', 'overweight'].map((elem, idx) => (
                  <React.Fragment key={idx}>
                    <FormControlLabel
                      value={elem}
                      label={elem}
                      labelPlacement='end'
                      sx={{
                        marginRight: '60px',
                        textTransform: 'capitalize',
                        '& .MuiTypography-root': {
                          ...stylesText,
                          fontWeight: state.weightType === elem ? '550' : '400',
                          color: state.weightType === elem ? '#FE654F' : '#000',
                        },
                      }}
                      control={
                        <Radio
                          checked={state.weightType === elem}
                          sx={{
                            color: '#000',
                            '& .MuiSvgIcon-root': {
                              width: '36px',
                              height: '36px',
                            },
                            '&.Mui-checked': { color: '#FE654F' },
                            '&:hover': { color: '#FE654F' },
                          }}
                        />
                      }
                    />
                  </React.Fragment>
                ))}
              </Box>
            </RadioGroup>
          </Box>
        </Fade>

        <Fade
          in={state.weightType.length > 0 && state.weightType !== 'in shape'}
          timeout={500}
          unmountOnExit={true}
        >
          <Box
            component='div'
            sx={{
              display: 'block',
              position: 'relative',
              width: '100%',
              marginTop: '35px',
              maxWidth: {
                xs: '900px',
                md: 'auto',
              },
              height: 'auto'
            }}
          >
            <InputLabel
              htmlFor='target-weight'
              sx={{
                ...stylesText,
                fontWeight: 500,
                color: '#000',
                width: 'fit-content',
                margin: '0 0 15px 0px',
                cursor: 'pointer',
              }}
            >
              {state.dogName} has an adult target weight of...
            </InputLabel>

            <Input
              id='target-weight'
              name='name'
              type='number'
              value={state.targetWeight}
              onChange={(e) => {
                if (e.target.value > 200) {
                  e.target.value = 200
                } else if (e.target.value < 0) {
                  e.target.value = 0
                }
                dispatch(AddTargetWeight(e.target.value))
              }}
              placeholder='weight in kgs'
              autoComplete='off'
              disableUnderline={true}
              fullWidth={true}
              endAdornment={
                state.targetWeight.length > 0 && (
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
                background: 'transparent',
                borderRadius: '10px',
                border: 'none',
                appearance: 'none',
                '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button ':
                {
                  appearance: 'none',
                  margin: '0',
                },
                '& input[type=number]': {
                  appearance: 'textfield',
                },
                '.MuiInput-input': {
                  display: 'block',
                  position: 'relative',
                  height: {
                    xs: '40px',
                    xl: '50px',
                  },
                  padding: '6px 15px 4px',
                  border: '2px solid',
                  borderColor: `${state.targetWeight.length > 0
                    ? '#FE654F'
                    : 'rgba(0, 0, 0, 0.3)'
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

            {state.targetWeight && (
              <Typography
                component='p'
                sx={{
                  ...stylesText,
                  fontWeight: '600',
                  margin: '20px 0 15px 0px',
                }}
              >
                {state.targetWeight - state.weight >= 0
                  ? `${state.dogName} is going to gain ${state.targetWeight - state.weight
                  } kgs.`
                  : `${state.dogName} is going to lose ${state.weight - state.targetWeight
                  } kgs.`}
              </Typography>
            )}
          </Box>
        </Fade>

        <Fade in={true} timeout={500}>
          <Box
            component='div'
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: {
                xs: '250px',
                sm: '300px',
              },
              marginTop: { sm: '50px', xs: '30px', md: '50px', xl: '50px' },
              marginBottom: { sm: '20px', xs: '20px' },
            }}
          >
            <Link to='/dog-weight-and-age'>
              <Box
                component='div'
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  opacity: '0.8',
                  transition: 'opacity 0.3s ease-in',
                  textDecoration: 'none',
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
                      xl: '30px',
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

            <Fade
              in={
                state.weightType.length > 0 &&
                state.targetWeight.length > 0 &&
                state.targetWeight > 0 &&
                state.targetWeight <= 200
              }
              timeout={500}
            >
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
                    xl: '30px',
                  },
                  fontWeight: '400',
                  borderRadius: '33px',
                  padding: '0px',
                  backgroundColor: 'transparent',
                  border: '0px',
                  boxShadow: 'none',
                  ':hover': {
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
    </Layout>
  )
}
export default TargetWeight
