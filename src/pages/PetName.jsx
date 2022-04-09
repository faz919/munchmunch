import React from 'react';
import {
  Typography,
  InputLabel,
  Input,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from '@mui/material';
import { Box } from '@mui/system';
import logo from '../assets/images/munchmunch-logo.png';
import { useAppState } from '../context';
import { AddDogName } from '../context/appStateActions';
import Layout from '../components/Layout';

const PetName = () => {
  const { state, dispatch } = useAppState();
  // console.log('state: ', state);

  const dogNameHandler = (e) => {
    // console.log('Dog Name: ', e.target.value);
    let dogName = e.target.value;
    dispatch(AddDogName(dogName));
  };

  return (
    <Layout>
      {/* <div className='signup-form dark'> */}
        <div className='animate__fade-in'>
          {/* <div>
            <div className='padding-bottom' />
            <img src={logo} className='signup-logo' alt='MunchMunch logo' />
          </div> */}
{/* <img src={logo} className='signup-logo' alt='MunchMunch logo' /> */}
          <Typography
            component='h2'
            sx={{
              fontFamily: 'Bubblegum Sans',
              fontSize: '38px',
              lineHeight: '48px',
              color: '#bbc592',
              marginBottom: '20px',
              textAlign: 'center',
              textTransform: 'none',
            }}
          >
            About your dog
          </Typography>

          <div className='animate__fade-in'>
            <div className='padding-bottom'>
              <InputLabel
                htmlFor='name-field'
                sx={{
                  width: 'fit-content',
                  cursor: 'pointer',
                  fontFamily: 'Bubblegum Sans',
                  fontSize: '18px',
                  lineHeight: '22px',
                  fontWeight: 700,
                  marginBottom: '5px',
                  marginLeft: '15px',
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
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  border: 'none',
                  '.MuiInput-input': {
                    display: 'block',
                    position: 'relative',
                    height: '40px',
                    padding: '5px 8px',
                    border: '2px solid',
                    borderColor: `${
                      state.dogName.length > 0 ? '#6d4c41' : '#bbc592'
                    }`,
                    borderRadius: '10px',
                    fontFamily: 'Bubblegum Sans',
                    fontSize: '18px',
                    lineHeight: '26px',
                  },
                  '& .MuiInput-input:focus': {
                    outline: 'none',
                    appearance: 'none',
                    border: '2px solid #6d4c41',
                  },
                  '& .MuiInput-input::placeholder': {
                    fontSize: '18px',
                    lineHeight: '26px',
                  },
                }}
              />
            </div>
          </div>
        {/* </div> */}
        {state.dogName && (
          <div className='animate__fade-in'>
            <InputLabel
              // className='label'
              id='meat-select-label'
              sx={{
                width: 'fit-content',
                cursor: 'pointer',
                fontFamily: 'Bubblegum Sans',
                fontSize: '18px',
                fontWeight: 700,
                marginBottom: '5px',
                marginLeft: '15px',
              }}
            >
              {state.dogName} is...
            </InputLabel>

            <RadioGroup
              required
              name='radio-buttons-group'
              value={state.gender}
              // onChange={(e) => setFormResponses(val => ({ ...val, gender: e.target.value }))}
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
                      // className='regular-radio'
                      checked={state.gender === 'male'}
                      sx={{
                        color: '#bbc592', //#fff
                        '& .MuiSvgIcon-root': {
                          width: '36px',
                          height: '36px',
                        },
                        '&.Mui-checked': { color: '#6d4c41' }, //#E6A65D
                        '&:hover': { color: '#6d4c41' },
                      }}
                    />
                  }
                  sx={{
                    marginRight: '60px',
                    '& .MuiTypography-root': {
                      fontFamily: 'Bubblegum Sans',
                      fontSize: '18px',
                      lineHeight: '22px',
                      color: '#bbc592',
                    },
                    '&:checked': {
                      color: '#6d4c41',
                    },
                  }}
                />
                <FormControlLabel
                  value='female'
                  label='Female'
                  labelPlacement='end'
                  control={
                    <Radio
                      // className='regular-radio'
                      checked={state.gender === 'female'}
                      sx={{
                        color: '#bbc592', //#fff
                        '& .MuiSvgIcon-root': {
                          width: '36px',
                          height: '36px',
                        },
                        '&.Mui-checked': { color: '#6d4c41' }, //#E6A65D
                        '&:hover': { color: '#6d4c41' },
                      }}
                    />
                  }
                  sx={{
                    '& .MuiTypography-root': {
                      fontFamily: 'Bubblegum Sans',
                      fontSize: '18px',
                      lineHeight: '22px',
                      color: '#bbc592',
                    },
                    '&:checked': {
                      color: '#6d4c41',
                    },
                  }}
                />
              </Box>
            </RadioGroup>
          </div>
        )}
        {state.dogName && state.gender && (
          <div className='animate__fade-in'>
            <Button
              variant='contained'
              // color="primary"
              // style={classes.button}
              // onClick={() => {
              //   setFormPage(2);
              //   setPercent(33);
              // }}
              sx={{
                // width: '50px',
                padding: '8px 25px',
                margin: '2em auto 0.5em',
                backgroundColor: '#bbc592',
                textTransform: 'none',
                fontFamily: 'Bubblegum Sans',
                fontSize: '18px',
                // lineHeight: '22px',
                fontWeight: '400',
                color: 'rgba(0, 0, 0, 0.6)',
                ':hover': {
                  backgroundColor: '#6d4c41',
                  color: '#bbc592',
                },
              }}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default PetName;
