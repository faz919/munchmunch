import React, { useEffect, useState } from 'react';
import {
  InputLabel,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from '@mui/material';
import { Box } from '@mui/system';
import Layout from '../components/Layout';
import { useAppState } from '../context';

const TargetWeight = () => {
  const { state, dispatch } = useAppState();
  const [meatTypesPicked, setMeatTypesPicked] = useState(false);

  useEffect(() => {
    if (state.weightType === 'inshape') {
      // setFormResponses(val => ({ ...val, targetWeight: formResponses.weight, meatTypes: null }))
    } else {
      // setFormResponses(val => ({ ...val, targetWeight: null, meatTypes: null }))
    }
  }, [state.weightType]);

  useEffect(() => {
    if (state.meatTypes) {
      let numSelected = 0;
      for (const [, selected] of Object.entries(state.meatTypes)) {
        selected && numSelected++;
      }
      // numSelected >= 2 ? setMeatTypesPicked(true) : setMeatTypesPicked(false)
    } else {
      // setMeatTypesPicked(false)
    }
  }, [state.meatTypes]);

  return (
    <Layout>
      <div className='animate__fade-in'>
        <InputLabel className='label' id='meat-select-label'>
          {state.dogName} can be described as...
        </InputLabel>
        <RadioGroup
          required
          name='radio-buttons-group'
          value={state.weightType}
          // onChange={(e) =>
          //   setFormResponses((val) => ({ ...val, weightType: e.target.value }))
          // }
        >
          <Box sx={{ display: 'flex', flexWrap: 1 }}>
            <FormControlLabel
              value='underweight'
              control={
                <Radio
                  className='regular-radio'
                  sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }}
                />
              }
              label='Underweight'
            />
            <FormControlLabel
              value='inshape'
              control={
                <Radio
                  className='regular-radio'
                  sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }}
                />
              }
              label='In Shape'
            />
            <FormControlLabel
              value='overweight'
              control={
                <Radio
                  className='regular-radio'
                  sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }}
                />
              }
              label='Overweight'
            />
          </Box>
        </RadioGroup>
      </div>

      {state.weightType && state.weightType !== 'inshape' && (
        <div className='animate__fade-in'>
          <InputLabel className='label' id='meat-select-label'>
            {state.dogName} has an adult target weight of...
          </InputLabel>
          <TextField
            label='weight in kgs'
            margin='normal'
            variant='outlined'
            type='number'
            value={state.targetWeight}
            // onChange={(e) => {
            //   if (e.target.value > 200) {
            //     e.target.value = 200;
            //   } else if (e.target.value < 0) {
            //     e.target.value = 0;
            //   }
            //   setFormResponses((val) => ({
            //     ...val,
            //     targetWeight: e.target.value,
            //   }));
            // }}
            fullWidth
            required
            inputProps={{ min: 0, max: 200 }}
          />
          {state.targetWeight && (
            <InputLabel className='label' id='meat-select-label'>
              {state.targetWeight - state.weight >= 0
                ? `${state.dogName} is going to gain ${
                    state.targetWeight - state.weight
                  } kgs.`
                : `${state.dogName} is going to lose ${
                    state.weight - state.targetWeight
                  } kgs.`}
            </InputLabel>
          )}
        </div>
      )}
      {state.weightType && state.targetWeight && (
        <div className='animate__fade-in'>
          <InputLabel className='label' id='meat-select-label'>
            {state.dogName} would like to eat...
          </InputLabel>
          <InputLabel className='label' id='meat-select-label'>
            (Choose at least 2 options)
          </InputLabel>
          <FormControlLabel
            control={
              <Checkbox
                sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }}
                // onChange={(e) =>
                //   setFormResponses((val) => ({
                //     ...val,
                //     meatTypes: {
                //       ...formResponses.meatTypes,
                //       beef: e.target.checked,
                //     },
                //   }))
                // }
              />
            }
            label='Beef'
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }}
                // onChange={(e) =>
                //   setFormResponses((val) => ({
                //     ...val,
                //     meatTypes: {
                //       ...formResponses.meatTypes,
                //       chicken: e.target.checked,
                //     },
                //   }))
                // }
              />
            }
            label='Chicken'
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }}
                // onChange={(e) =>
                //   setFormResponses((val) => ({
                //     ...val,
                //     meatTypes: {
                //       ...formResponses.meatTypes,
                //       lamb: e.target.checked,
                //     },
                //   }))
                // }
              />
            }
            label='Lamb'
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }}
                // onChange={(e) =>
                //   setFormResponses((val) => ({
                //     ...val,
                //     meatTypes: {
                //       ...formResponses.meatTypes,
                //       turkey: e.target.checked,
                //     },
                //   }))
                // }
              />
            }
            label='Turkey'
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }}
                // onChange={(e) =>
                //   setFormResponses((val) => ({
                //     ...val,
                //     meatTypes: {
                //       ...formResponses.meatTypes,
                //       kangaroo: e.target.checked,
                //     },
                //   }))
                // }
              />
            }
            label='Kangaroo'
          />
        </div>
      )}
      {state.weightType && state.targetWeight && meatTypesPicked && (
        <div className='animate__fade-in'>
          <Button
            variant='contained'
            color='primary'
            // style={classes.button}
            // onClick={() => {
            //   setFormPage(4);
            //   setPercent(100);
            // }}
          >
            Next
          </Button>
        </div>
      )}

      <div className='animate__fade-in'>
        <a
          className='form_back'
          target='_blank'
          // onClick={() => setFormPage(2)}
        >
          Back
        </a>
      </div>
    </Layout>
  );
};
export default TargetWeight;
