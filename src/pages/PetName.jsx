import React from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
// import logo from '../assets/images/munchmunch-logo.png';
import { useAppState } from '../context';
import { AddDogName, AddGender } from '../context/appStateActions';
import Layout from '../components/Layout';

const PetName = () => {
  let navigate = useNavigate();
  const { state, dispatch } = useAppState();
  // console.log('state: ', state);

  const dogNameHandler = (e) => {
    let dogName = e.target.value;
    dispatch(AddDogName(dogName));
  };

  const checkboxGenderHandler = (e) => {
    // console.log('Gender: ', e.target.value);
    dispatch(AddGender(e.target.value));
  };

  const nextButtonHandler = () => {
    navigate('/weight-and-age');
    //   setPercent(33);
  };

  return (
    <Layout>
      <Fade in={true} timeout={500}>
        <Box component='div'>
          <Typography
            component='h2'
            sx={{
              fontFamily: 'Bubblegum Sans',
              fontSize: '38px',
              lineHeight: '48px',
              color: '#09BC8A', //#bbc592
              marginBottom: '20px',
              textAlign: 'center',
              textTransform: 'none',
            }}
          >
            About your dog
          </Typography>

          <Box component='div' sx={{ paddingBottom: '20px' }}>
            <InputLabel
              htmlFor='name-field'
              sx={{
                width: 'fit-content',
                cursor: 'pointer',
                fontFamily: 'Bubblegum Sans',
                fontSize: '18px',
                lineHeight: '22px',
                fontWeight: 600,
                marginBottom: '5px',
                marginLeft: '15px',
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
                  height: '40px',
                  padding: '5px 8px',
                  border: '2px solid',
                  borderColor: `${
                    state.dogName.length > 0 ? '#09BC8A' : '#FED18C'
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
          </Box>

          {state.dogName && (
            <Fade in={true} timeout={500}>
              <Box component='div'>
                <Typography
                  component='p'
                  sx={{
                    width: 'fit-content',
                    cursor: 'pointer',
                    fontFamily: 'Bubblegum Sans',
                    fontSize: '18px',
                    fontWeight: 600,
                    marginBottom: '5px',
                    marginLeft: '15px',
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
                            '&.Mui-checked': { color: '#09BC8A' }, //#E6A65D
                            '&:hover': { color: '#09BC8A' },
                          }}
                        />
                      }
                      sx={{
                        marginRight: '60px',
                        '& .MuiTypography-root': {
                          fontFamily: 'Bubblegum Sans',
                          fontSize: '18px',
                          lineHeight: '22px',
                          fontWeight: state.gender === 'male' ? '600' : '400',
                          color: state.gender === 'male' ? '#09BC8A' : '#000',
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
                            '&.Mui-checked': { color: '#09BC8A' }, //#E6A65D
                            '&:hover': { color: '#09BC8A' },
                          }}
                        />
                      }
                      sx={{
                        '& .MuiTypography-root': {
                          fontFamily: 'Bubblegum Sans',
                          fontSize: '18px',
                          lineHeight: '22px',
                          fontWeight: state.gender === 'female' ? '600' : '400',
                          color: state.gender === 'female' ? '#09BC8A' : '#000',
                        },
                      }}
                    />
                  </Box>
                </RadioGroup>
              </Box>
            </Fade>
          )}
          {state.dogName && state.gender && (
            <Fade in={true} timeout={500}>
              <Button
                variant='contained'
                onClick={nextButtonHandler}
                sx={{
                  padding: '8px 25px',
                  margin: '2em auto 0.5em',
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
    </Layout>
  );
};
export default PetName;
