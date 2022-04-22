import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Button,
    FormControlLabel,
    Checkbox,
    Typography,
    Divider,
    Fade,
    Box,
    Collapse,
} from '@mui/material'
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp'
import Layout from '../components/Layout'
import { useAppState } from '../context'
import CardInput from '../components/CardInput'
import calculatePrice from '../formulae/formula'
import { AddPercent } from '../context/appStateActions'
import FormInputElement from '../components/FormInputElem'
import { AddShippingInfo } from '../context/appStateActions'

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
    const stylesText = {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '18px',
        lineHeight: '22px',
    }

    useEffect(() => {
        dispatch(AddPercent(83))
    }, [])

    const shippingInfoSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(AddShippingInfo(clientInfo))
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
                            }}
                        >
                            Shipping Info
                        </Typography>

                        <FormInputElement
                            type='text'
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
                                        <KeyboardBackspaceSharpIcon sx={{ color: '#F64740' }} />
                                        <Typography
                                            component='p'
                                            sx={{
                                                fontFamily: 'system-ui, -apple-system, sans-serif',
                                                fontSize: '18px',
                                                lineHeight: '22px',
                                                fontWeight: 500,
                                                color: '#F64740',
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
                                        padding: {
                                            xs: '8px',
                                            sm: '8px 25px',
                                        },
                                        backgroundColor: 'rgba(254,101,79, 0.7)',
                                        fontFamily: 'system-ui, -apple-system, sans-serif',
                                        fontSize: '18px',
                                        lineHeight: '22px',
                                        fontWeight: '400',
                                        ':hover': {
                                            backgroundColor: 'rgba(254,101,79, 1.0)',
                                        },
                                        width: {
                                            xs: '200px',
                                            sm: 'auto',
                                        },
                                        height: {
                                            xs: 'auto',
                                            sm: '38px',
                                        },
                                    }}
                                >
                                    Next
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
