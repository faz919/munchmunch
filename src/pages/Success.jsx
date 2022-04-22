import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import Footer from '../components/Footer'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../context'
import { SetState } from '../context/appStateActions'

const Success = () => {

    const navigate = useNavigate()
    const { state, dispatch } = useAppState()
    const toggleMobileSelect = useMediaQuery('(max-width:1110px)')

    const stylesText = {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '30px',
        lineHeight: {
            xs: '22px',
            xl: '30px',
        },
    }

    const addAnotherDog = () => {
        window.localStorage.removeItem('form_responses')
        window.localStorage.removeItem('form_percent')
        dispatch(SetState('default'))
        navigate('/')
    }

    const showBillingPortal = () => {
        window.open(state.billingPortal, '_blank')
    }

    return (
        <Box
            component='div'
            sx={{
                display: 'block',
                position: 'relative',
                height: 'auto',
            }}
        >
            <Box
                component='div'
                sx={{
                    display: 'flex',
                    width: '100%',
                    padding: '75px 50px 75px',
                    backgroundColor: '#fff',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    component='div'
                    sx={{
                        display: 'flex',
                        width: toggleMobileSelect ? '95%' : '50%',
                        height: toggleMobileSelect ? '500px' : '400px',
                        backgroundColor: '#fff',
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                        borderRadius: '7px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        padding: toggleMobileSelect ? '2px' : '10px'
                    }}
                >
                    <CheckCircleIcon
                        sx={{ color: '#F64740' }}
                    />
                    <Typography
                        component='p'
                        sx={{
                            ...stylesText,
                            fontWeight: 500,
                            color: '#FE654F',
                            width: 'fit-content',
                            marginTop: '15px'
                        }}
                    >
                        Success!
                    </Typography>
                    <Typography
                        component='p'
                        sx={{
                            ...stylesText,
                            fontSize: {
                                xs: '22px',
                                xl: '24px',
                            },
                            color: '#000',
                            width: 'fit-content',
                            marginTop: '15px',
                            textAlign: 'center'
                        }}
                    >
                        Please check your email for your order confirmation. You will receive your product in 3-5 business days.
                    </Typography>
                    <Grid
                        sx={{
                            marginTop: '10%',
                            display: 'flex',
                            flexDirection: toggleMobileSelect ? 'column' : 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Button
                            variant='contained'
                            fullWidth
                            sx={{
                                padding: '8px 25px',
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                textTransform: 'none',
                                fontFamily: 'system-ui, -apple-system, sans-serif',
                                fontSize: '24px',
                                lineHeight: {
                                    xs: '22px',
                                    xl: '30px',
                                },
                                fontWeight: '400',
                                ':hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 1.0)',
                                },
                                color: '#000',
                                whiteSpace: 'nowrap'
                            }}
                            onClick={addAnotherDog}
                        >
                            Add Another Dog
                        </Button>
                        <Button
                            variant='contained'
                            fullWidth
                            sx={{
                                padding: '8px 25px',
                                backgroundColor: 'rgba(254,101,79, 0.7)',
                                textTransform: 'none',
                                fontFamily: 'system-ui, -apple-system, sans-serif',
                                fontSize: '24px',
                                lineHeight: {
                                    xs: '22px',
                                    xl: '30px',
                                },
                                fontWeight: '400',
                                ':hover': {
                                    backgroundColor: 'rgba(254,101,79, 1.0)',
                                },
                                marginLeft: toggleMobileSelect ? '0px' : '30px',
                                marginTop: toggleMobileSelect ? '20px' : '0px',
                                whiteSpace: 'nowrap'
                            }}
                            onClick={showBillingPortal}
                        >
                            View Order Details
                        </Button>
                    </Grid>
                </Box>
            </Box>
            <Footer />
        </Box >
    )
}

export default Success