import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Button,
    Typography,
    Divider,
    Fade,
    Box,
} from '@mui/material'
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp'
import Layout from '../components/Layout'
import { useAppState } from '../context'
import { AddPercent } from '../context/appStateActions'
import FormInputElement from '../components/FormInputElem'
import { AddShippingInfo } from '../context/appStateActions'
import styled from "styled-components";
const ReactPixel = require('react-facebook-pixel');

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

const ShippingInfo = () => {
    const navigate = useNavigate()
    const { state, dispatch } = useAppState()
    const [metadata, setMetadata] = useState({})
    const [clientInfo, setClientInfo] = useState({
        name: '',
        email: '',
        shipping: {
            line1: '',
            city: '',
            state: '',
            postal_code: ''
        },
    })

    useEffect(() => {
        dispatch(AddPercent(83));
        document.getElementById('full_name').focus();
        ReactPixel.default.init('426736622778173');
    }, [])

    const shippingInfoSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(AddShippingInfo(clientInfo))

        window.fbq('track', 'ViewContent', {
            content_type: clientInfo,
        });

        navigate('/checkout')
    }

    return (
        <Layout percent={state.progressInPercent}>
            <form onSubmit={shippingInfoSubmitHandler}>
                <Fade in={true} timeout={500}>
                    <Box component='div'>
                        <Typography
                            variant='h6'
                            sx={{
                                fontFamily: 'system-ui, -apple-system, sans-serif',
                                fontSize: '24px',
                                lineHeight: '30px',
                                marginBottom: '15px',
                            }}
                        >
                            Shipping Info
                        </Typography>

                        <FormInputElement
                            type='text'
                            id='full_name'
                            label='Full Name'
                            value={clientInfo.name}
                            callback={(e) =>
                                setClientInfo((val) => ({ ...val, name: e.target.value }))
                            }
                        />
                        <FormInputElement
                            type='email'
                            label='Email'
                            value={clientInfo.email}
                            callback={(e) =>
                                setClientInfo((val) => ({ ...val, email: e.target.value }))}
                        />
                        <FormInputElement
                            type='text'
                            label='Address'
                            value={clientInfo.shipping?.line1}
                            callback={(e) =>
                                setClientInfo((val) => ({
                                    ...val,
                                    shipping: {
                                        ...clientInfo.shipping,
                                        line1: e.target.value,
                                    },
                                }))
                            }
                        />
                        <FormInputElement
                            type='text'
                            label='City'
                            value={clientInfo.shipping?.city}
                            callback={(e) =>
                                setClientInfo((val) => ({
                                    ...val,
                                    shipping: {
                                        ...clientInfo.shipping,
                                        city: e.target.value,
                                    },
                                }))
                            }
                        />
                        <FormInputElement
                            type='text'
                            label='State'
                            value={clientInfo.shipping?.state}
                            callback={(e) =>
                                setClientInfo((val) => ({
                                    ...val,
                                    shipping: {
                                        ...clientInfo.shipping,
                                        state: e.target.value,
                                    },
                                }))
                            }
                        />
                        <FormInputElement
                            type='number'
                            label='ZIP Code'
                            value={clientInfo.shipping?.postal_code}
                            callback={(e) =>
                                setClientInfo((val) => ({
                                    ...val,
                                    shipping: {
                                        ...clientInfo.shipping,
                                        postal_code: e.target.value,
                                    },
                                }))
                            }
                        />

                        <Divider
                            sx={{ borderColor: 'rgba(0, 0, 0, 0.3)', margin: '10px 0' }}
                        />
                        <Fade in={true} timeout={500}>
                            <Box
                                component='div'
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Link to='/meat-types'>
                                    <Box
                                        component='div'
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            opacity: '0.8',
                                            transition: 'opacity 0.3s ease-in',
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
                                                    xl: '28px',
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
                                <Button
                                    variant='contained'
                                    type='submit'
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
                                        padding: '0px',
                                        borderRadius: '33px',
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
                            </Box>
                        </Fade>
                    </Box>
                </Fade>
            </form>
        </Layout>
    )
}
export default ShippingInfo
