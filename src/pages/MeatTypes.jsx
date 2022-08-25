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
  SelectMeatType,
  DeleteCurrentMeatType,
  AddPercent,
  SetState,
} from '../context/appStateActions'
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp'
import { Link, useNavigate } from 'react-router-dom'
import CustomCheckbox from '../components/CustomCheckbox'
import styled from "styled-components";

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

const MeatTypes = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useAppState()

  const checkboxToMobile = useMediaQuery('(max-width:650px)')

  useEffect(() => {
    dispatch(AddPercent(67))
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

  const selectMeatTypeHandler = (e) => {
    let meatTypeValue = e.target.value
    let checkedCheckbox = e.target.checked

    checkedCheckbox
      ? dispatch(SelectMeatType(meatTypeValue))
      : dispatch(DeleteCurrentMeatType(meatTypeValue))
  }
  const nextButtonHandler = () => {
    state.meatTypes.length > 0 && state.meatTypes.length < 3 && navigate('/shipping-info')
  }

  const activeMeatTypes = JSON.parse(process.env.REACT_APP_ACTIVE_MEAT_TYPES)

  return (
    <Layout percent={state.progressInPercent}>
      <Box>
        <Fade
          in={state.weightType.length > 0 && state.targetWeight.length > 0}
          timeout={500}
        >
          <FormControl
            // required
            // error={error}
            component='fieldset'
            sx={{
              ...stylesText,
              margin: '0px 0 20px 0px',
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
              (choose up to 2 options)
            </Typography>
            <FormGroup
              sx={{
                display: 'flex',
                flexDirection: 'column',
                // justifyContent: `${
                //   checkboxToMobile ? 'flex-start' : 'space-between'
                // }`,
                justifyContent: {
                  xs: 'flex-start',
                  xl: 'space-between',
                },
                alignItems: 'flex-start',
                // width: `${checkboxToMobile ? '300px' : '500px'}`,
                width: {
                  sm: '530px',
                  xl: '700px',
                },
                height: 'auto',
                marginTop: {
                  xs: '0',
                  xl: '20px',
                },
              }}
            >
              {activeMeatTypes.map(
                (item, idx) => (
                  <FormControlLabel
                    key={idx}
                    label={item}
                    sx={{
                      width: `${checkboxToMobile ? '115px' : '95px'}`,
                      '& .MuiTypography-root': {
                        ...stylesText,
                        textTransform: 'capitalize',
                      },
                    }}
                    control={
                      <CustomCheckbox
                        value={item}
                        defaultChecked={state.meatTypes.includes(item)}
                        onClick={(e) => selectMeatTypeHandler(e)}
                      />
                    }
                  />
                )
              )}
            </FormGroup>
          </FormControl>
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
              marginTop: {sm: '30px', xs: '10px', md: '30px', xl: '30px'},
              marginBottom: {sm: '20px', xs: '20px'},
            }}
          >
            <Link to='/health-problems'>
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
                state.meatTypes.length > 0 && state.meatTypes.length < 3
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
                  ':hover': {
                    backgroundColor: 'rgba(254,101,79, 1.0)',
                  },
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
export default MeatTypes
