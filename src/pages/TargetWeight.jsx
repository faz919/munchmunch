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

const TargetWeight = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useAppState()
  // const [meatTypesPicked, setMeatTypesPicked] = useState(false)

  const checkboxToMobile = useMediaQuery('(max-width:650px)')

  useEffect(() => {
    dispatch(AddPercent(33))
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
  }

  useEffect(() => {
    if (state.weightType === 'inshape') {
      dispatch(AddTargetWeight(state.weight))
    } else {
      dispatch(DeleteTargetWeight())
    }
  }, [state.weightType])

  return (
    <Layout percent={state.progressInPercent}>
      <Box>
        <Fade in={true} timeout={500}>
          <Box component='div'>
            <Typography
              component='p'
              sx={{
                ...stylesText,
                fontWeight: 500,
                color: '#000',
                width: 'fit-content',
                margin: '0 0 5px 15px',
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
                {['underweight', 'inshape', 'overweight'].map((elem, idx) => (
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
                          color: state.weightType === elem ? '#09BC8A' : '#000',
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
                            '&.Mui-checked': { color: '#09BC8A' },
                            '&:hover': { color: '#09BC8A' },
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
          in={state.weightType.length > 0 && state.weightType !== 'inshape'}
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
            }}
          >
            <InputLabel
              htmlFor='target-weight'
              sx={{
                ...stylesText,
                fontWeight: 500,
                color: '#000',
                width: 'fit-content',
                margin: '0 0 5px 15px',
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
                    ? '#09BC8A'
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
                  border: '2px solid #09BC8A',
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
                  fontWeight: '500',
                  margin: '20px 0 0 15px',
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
              marginTop: '50px',
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
                <KeyboardBackspaceSharpIcon sx={{ color: '#F64740' }} />
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
                    color: '#F64740',
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
                  padding: '8px 25px',
                  backgroundColor: 'rgba(9, 188, 138, 0.7)',
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
                  ':hover': {
                    backgroundColor: 'rgba(9, 188, 138, 1.0)',
                  },
                }}
              >
                Next
              </Button>
            </Fade>
          </Box>
        </Fade>
      </Box>
    </Layout>
  )
}
export default TargetWeight
