import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import Footer from '../components/Footer'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context';

const Success = () => {

    const navigate = useNavigate()
    const { state } = useAppState()
    const toggleMobileSelect = useMediaQuery('(max-width:1110px)')

    const stylesText = {
        fontFamily: 'Bubblegum Sans',
        fontSize: '30px',
        lineHeight: {
            xs: '22px',
            xl: '30px',
        },
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
                            color: '#09BC8A',
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
                        Your order is confirmed. You will receive your product in 3-5 business days, depending on if the re-up come thoo
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
                                fontFamily: 'Bubblegum Sans',
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
                            onClick={() => navigate('/')}
                        >
                            Add Another Dog
                        </Button>
                        <Button
                            variant='contained'
                            fullWidth
                            sx={{
                                padding: '8px 25px',
                                backgroundColor: 'rgba(9, 188, 138, 0.7)',
                                textTransform: 'none',
                                fontFamily: 'Bubblegum Sans',
                                fontSize: '24px',
                                lineHeight: {
                                    xs: '22px',
                                    xl: '30px',
                                },
                                fontWeight: '400',
                                ':hover': {
                                    backgroundColor: 'rgba(9, 188, 138, 1.0)',
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
        </Box>
    )
}

export default Success