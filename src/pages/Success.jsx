import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../context'
import { SetState } from '../context/appStateActions'
import styled from "styled-components";


const StyledHeading1 = styled.p`
    margin:0px;
    background-image: linear-gradient(0deg, rgb(255, 204, 51) 2%, rgb(226, 51, 255) 100%);
    background-image: -webkit-linear-gradient(0deg, rgb(255, 204, 51) 2%, rgb(226, 51, 255) 100%);
    background-image: -moz-linear-gradient(0deg, rgb(255, 204, 51) 2%, rgb(226, 51, 255) 100%);
    text-shadow: none;
    padding: 15px 25px;
    border-radius: 33px;
`;

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

    // function getFaviconEl() {
    //     return document.getElementById("favicon")
    // }

    // useEffect(() => {
    //     const favicon = getFaviconEl()
    //     favicon.href = '%PUBLIC_URL%/success-favicon.ico'
    // }, [])

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
                        padding: toggleMobileSelect ? '20px' : '20px'
                    }}
                >
                    <CheckCircleIcon
                        sx={{ color: '#F64740',fontSize: '50px' }}
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
                            lineHeight: {
                                xs: '28px',
                                xl: '32px',
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
                            alignItems: 'center',
                            padding: '0px 30px',
                        }}
                    >
                        <Button
                            variant='contained'
                            fullWidth
                            sx={{
                                padding: '15px 25px;',
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                textTransform: 'none',
                                borderRadius: '33px',
                                fontFamily: 'system-ui, -apple-system, sans-serif',
                                fontSize: {
                                    sm: '18px',
                                    md: '24px'
                                },
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
                                fontSize: {
                                    sm: '18px',
                                    md: '24px'
                                },
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
                                whiteSpace: 'nowrap',
                                padding: '0px',
                                backgroundColor: 'transparent',
                                border: '0px',
                                boxShadow: 'none',
                                borderRadius: '33px',
                                ':hover': {
                                    backgroundColor: 'transparent',
                                    border: '0px',
                                    boxShadow: 'none',
                                },
                                ':active': {
                                    backgroundColor: 'transparent',
                                    border: '0px',
                                    boxShadow: 'none',
                                },
                                ':focusVisible': {
                                    backgroundColor: 'transparent',
                                    border: '0px',
                                    boxShadow: 'none',
                                }
                            }}
                            onClick={showBillingPortal}
                            >
                            <StyledHeading1>View Order Details</StyledHeading1>
                        </Button>
                    </Grid>
                </Box>
            </Box>
            <Footer />
        </Box >
    )
}

export default Success