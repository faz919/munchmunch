import React from 'react';
import { InputLabel, TextField, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useAppState } from '../context';
import Layout from '../components/Layout';

const WeightAndAge = () => {
  const { state, dispatch } = useAppState();

  return (
    <Layout>
      <div className='animate__fade-in'>
        <InputLabel className='label' id='meat-select-label'>
          {state.dogName} currently weights...
        </InputLabel>
        <TextField
          label='weight in kgs'
          margin='normal'
          variant='outlined'
          type='number'
          value={state.weight}
          // onChange={(e) => {
          //   if (e.target.value > 200) {
          //     e.target.value = 200;
          //     setFormResponses((val) => ({ ...val, weight: e.target.value }));
          //   } else if (e.target.value < 0) {
          //     e.target.value = 0;
          //     setFormResponses((val) => ({ ...val, weight: e.target.value }));
          //   } else {
          //     setFormResponses((val) => ({ ...val, weight: e.target.value }));
          //   }
          // }}
          fullWidth
          required
          inputProps={{ min: 0, max: 200 }}
        />
      </div>

      {state.weight && (
        <div className='animate__fade-in'>
          <InputLabel className='label' id='meat-select-label'>
            {state.dogName} is...
          </InputLabel>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <TextField
              margin='normal'
              variant='outlined'
              type='number'
              value={state.age_years}
              // onChange={(e) => {
              //   if (e.target.value > 20) {
              //     e.target.value = 20;
              //     setFormResponses((val) => ({
              //       ...val,
              //       age_years: e.target.value,
              //     }));
              //   } else if (e.target.value < 0) {
              //     e.target.value = 0;
              //     setFormResponses((val) => ({
              //       ...val,
              //       age_years: e.target.value,
              //     }));
              //   } else {
              //     setFormResponses((val) => ({
              //       ...val,
              //       age_years: e.target.value,
              //     }));
              //   }
              // }}
              required
              inputProps={{ min: 0, max: 20 }}
            />
            <Typography className='label' variant='subtitle2'>
              {' '}
              years and{' '}
            </Typography>
            <TextField
              margin='normal'
              variant='outlined'
              type='number'
              value={state.age_months}
              // onChange={(e) => {
              //   if (e.target.value > 11) {
              //     e.target.value = 11;
              //     setFormResponses((val) => ({
              //       ...val,
              //       age_months: e.target.value,
              //     }));
              //   } else if (e.target.value < 0) {
              //     e.target.value = 0;
              //     setFormResponses((val) => ({
              //       ...val,
              //       age_months: e.target.value,
              //     }));
              //   } else {
              //     setFormResponses((val) => ({
              //       ...val,
              //       age_months: e.target.value,
              //     }));
              //   }
              // }}
              required
              inputProps={{ min: 0, max: 11 }}
            />
            <Typography className='label' variant='subtitle2'>
              {' '}
              months old.
            </Typography>
          </Box>
        </div>
      )}
      {state.age_years && state.age_months && (
        <div className='animate__fade-in'>
          <Button
            variant='contained'
            color='primary'
            // style={classes.button}
            // onClick={() => {
            //   setFormPage(3);
            //   setPercent(66);
            // }}
          >
            Next
          </Button>
        </div>
      )}

      <div className='animate__fade-in'>
        <a className='form_back' target='_blank'
          // onClick={() => setFormPage(1)}
        >
          Back
        </a>
      </div>
    </Layout>
  );
};
export default WeightAndAge;
