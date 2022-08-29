import React from 'react'
import { Box, Fade, CardMedia } from '@mui/material'
import CheckoutImg from '../assets/images/checkout.jpg'

const Checkout = () => {
    return (
        <Box
            component='div'
            sx={{
                display: 'block',
                width: { xs: '100%', md: '45%' }
            }}
        >
            <Fade in={true} timeout={500}>
                <Box
                    component='div'
                    sx={{
                        paddingTop: { xs: '0', md: '0', xl: '0' },
                        paddingBottom: { xs: '0', md: '0', xl: '0' },
                        paddingRight: { xs: '0', md: '0', xl: '0' },
                        paddingLeft: { xs: '0', md: '0', xl: '0' }
                    }}
                >
                    <CardMedia
                        component='img'
                        image={CheckoutImg}
                        alt='Dog Name Image'
                    />
                </Box>
            </Fade>
        </Box>
    )
}
export default Checkout
