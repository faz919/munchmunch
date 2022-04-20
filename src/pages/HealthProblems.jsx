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
    AddHealthProblem,
    DeleteCurrentHealthProblem,
} from '../context/appStateActions'
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp'
import { Link, useNavigate } from 'react-router-dom'

const HealthProblems = () => {
    const navigate = useNavigate()
    const { state, dispatch } = useAppState()

    const checkboxToMobile = useMediaQuery('(max-width:650px)')

    useEffect(() => {
        dispatch(AddPercent(50))
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
    const nextButtonHandler = () => {
        navigate('/meat-types')
    }

    const problems = [
        'Picky eater',
        'Food allergies or a sensitive stomach',
        'Dull or flaky coat',
        'Arthritis or joint pain',
        'No problems'
    ]

    const selectHealthProblemHandler = (e) => {
        let healthProblemValue = e.target.value
        let checkedCheckbox = e.target.checked

        checkedCheckbox
            ? dispatch(AddHealthProblem(healthProblemValue))
            : dispatch(DeleteCurrentHealthProblem(healthProblemValue))
    }

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
                            margin: '20px 0 20px 15px',
                            width: '100%',
                        }}
                        variant='standard'
                    >
                        <Typography
                            component='p'
                            sx={{ ...stylesText, fontWeight: '500', color: '#000' }}
                        >
                            What's up with {state.dogName}?
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
                            {problems.map(
                                (item, idx) => (
                                    <FormControlLabel
                                        key={idx}
                                        label={item}
                                        sx={{
                                            width: '100%',
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
                                                defaultChecked={state.healthProblems.includes(item)}
                                                onClick={(e) => selectHealthProblemHandler(e)}
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
                            marginTop: '50px',
                        }}
                    >
                        <Link to='/dog-weight-required'>
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
                            in={state.healthProblems.length >= 1}
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
export default HealthProblems
