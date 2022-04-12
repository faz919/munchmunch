import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { Box } from '@mui/system';
import Layout from '../components/Layout';
import { useAppState } from '../context';
import {
  AddWeightType,
  AddTargetWeight,
  SelectMeatType,
  DeleteTargetWeight,
  DeleteMeatTypes,
  DeleteCurrentMeatType,
  AddPercent,
} from '../context/appStateActions';
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import { Link, useNavigate } from 'react-router-dom';

const TargetWeight = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();
  // const [meatTypesPicked, setMeatTypesPicked] = useState(false);

  useEffect(() => {
    dispatch(AddPercent(66));
  }, []);

  const stylesText = {
    fontFamily: 'Bubblegum Sans',
    fontSize: '18px',
    lineHeight: '22px',
  };

  const wightTypeHandler = (e) => {
    let valueWeightType = e.target.value;
    dispatch(AddWeightType(valueWeightType));
  };
  const addTargetWeightHandler = (e) => {
    let valueTargetWeight = e.target.value;
    if (valueTargetWeight > 200) {
      valueTargetWeight = 200;
    } else if (valueTargetWeight < -200) {
      valueTargetWeight = -200;
    }
    dispatch(AddTargetWeight(valueTargetWeight));
  };
  const selectMeatTypeHandler = (e) => {
    let meatTypeValue = e.target.value;
    let checkedCheckbox = e.target.checked;
    // console.log('Checked', e.target.checked);

    checkedCheckbox ?
      dispatch(SelectMeatType(meatTypeValue)) :
      dispatch(DeleteCurrentMeatType(meatTypeValue))
  };
  const nextButtonHandler = () => {
    navigate('/checkout');
  };

  useEffect(() => {
    if (state.weightType === 'inshape') {
      dispatch(AddTargetWeight(state.weight));
      dispatch(DeleteMeatTypes());
    } else {
      dispatch(DeleteTargetWeight());
      dispatch(DeleteMeatTypes());
    }
  }, [state.weightType]);

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
              onChange={(e) => wightTypeHandler(e)}
            >
              <Box sx={{ display: 'flex' }}>
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
        {state.weightType && state.weightType !== 'inshape' && (
          <Fade in={true} timeout={500}>
            <Box component='div' sx={{ marginTop: '35px' }}>
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
                onChange={(e) => addTargetWeightHandler(e)}
                placeholder='weight in kgs'
                autoComplete='off'
                disableUnderline={true}
                fullWidth={true}
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
                    height: '40px',
                    padding: '5px 8px',
                    border: '2px solid',
                    borderColor: `${
                      state.targetWeight.length > 0
                        ? '#09BC8A'
                        : 'rgba(0, 0, 0, 0.3)'
                    }`,
                    borderRadius: '10px',
                    fontFamily: 'Bubblegum Sans',
                    fontSize: '18px',
                    lineHeight: '26px',
                  },
                  '& .MuiInput-input:focus': {
                    outline: 'none',
                    appearance: 'none',
                    border: '2px solid #09BC8A',
                  },
                  '& .MuiInput-input::placeholder': {
                    fontSize: '18px',
                    lineHeight: '26px',
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
                    ? `${state.dogName} is going to gain ${
                        state.targetWeight - state.weight
                      } kgs.`
                    : `${state.dogName} is going to lose ${
                        state.weight - state.targetWeight
                      } kgs.`}
                </Typography>
              )}
            </Box>
          </Fade>
        )}
        {state.weightType && state.targetWeight && (
          <Fade in={true} timeout={500}>
            <FormControl
              // required
              // error={error}
              component='fieldset'
              sx={{
                ...stylesText,
                margin: '20px 0 20px 15px',
                width: '100%',
              }}
              variant='standard'
            >
              <Typography
                component='p'
                sx={{ ...stylesText, fontWeight: '500', color: '#000' }}
              >
                {state.dogName} would like to eat...
              </Typography>
              <Typography
                component='p'
                sx={{ ...stylesText, fontWeight: '500', color: '#000' }}
              >
                (choose at least 2 options)
              </Typography>
              <FormGroup
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {['beef', 'chicken', 'lamb', 'turkey', 'kangaroo'].map(
                  (item, idx) => (
                    <FormControlLabel
                      key={idx}
                      label={item}
                      sx={{
                        '& .MuiTypography-root': {
                          ...stylesText,
                          textTransform: 'capitalize',
                        },
                      }}
                      control={
                        <Checkbox
                          value={item}
                          sx={{
                            'input[type="checkbox"]': {
                              opacity: '1',
                              position: 'relative',
                              zIndex: '0',
                              width: '30px',
                              height: '30px',
                            },
                            '.MuiSvgIcon-root': {
                              display: 'none',
                            },
                          }}
                          onClick={(e) => selectMeatTypeHandler(e)}
                        />
                      }
                    />
                  )
                )}
              </FormGroup>
            </FormControl>
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

            {state.weightType &&
              state.targetWeight &&
              state.meatTypes.length >= 2 && (
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
    </Layout>
  );
};
export default TargetWeight;
