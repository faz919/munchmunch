import React from 'react'
import { Typography, Box, Fade, List, ListItem } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import styled from "styled-components";

const ShippingInfoContent = () => {

  const stylesList = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: { xs: '18px', xl: '24px' },
    lineHeight: { xs: '24px', xl: '30px' },
    color: '#FE654F',
    padding: '20px 0 20px',
    borderBottom: '1px solid rgba(61, 57, 53, 0.5)',
  }
  const StyledHeading = styled.p`
    margin:0px;
    background-image: linear-gradient(0deg, rgb(255, 204, 51) 2%, rgb(254, 101, 79) 100%);
    background-image: -webkit-linear-gradient(0deg, rgb(255, 204, 51) 2%, rgb(254, 101, 79) 100%);
    background-image: -moz-linear-gradient(0deg, rgb(255, 204, 51) 2%, rgb(254, 101, 79) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    box-decoration-break: clone;
    text-shadow: none;
  `;
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
            paddingTop: { xs: '20px', md: '75px', xl: '150px' },
            paddingBottom: { xs: '20px', md: '150px', xl: '150px' },
            paddingRight: { xs: '50px', md: '50px', xl: '50px' },
            paddingLeft: { xs: '50px', md: '50px', xl: '50px' }
          }}
        >
          <Typography
            component='h1'
            sx={{
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
              fontSize: { xs: '42px', xl: '50px' },
              fontWeight: '700',
              lineHeight: { xs: '50px', xl: '70px' },
              textAlign: 'center',
              color: '#FE654F', //#CFBFF7
            }}
          >
            <StyledHeading>Yes, we Deliver!</StyledHeading>
          </Typography>
          <List>
            <ListItem
              sx={{
                ...stylesList,
                color: 'rgb(254, 101, 79)',
              }}
            >
              Is shipping free?
            </ListItem>
            <ListItem
              sx={{
                ...stylesList,
                color: '#6c757d',
              }}
            >
              Yes, we ship Sydney-wide!
            </ListItem>
            <ListItem
              sx={{
                ...stylesList,
                color: '#6c757d',
              }}
            >
              Coming to other Capital Cities soon….
            </ListItem>
            <ListItem
              sx={{
                ...stylesList,
                color: 'rgb(254, 101, 79)',
              }}
            >
              How is Munch+Munch shipped?
            </ListItem>
            <ListItem
              sx={{
                ...stylesList,
                color: '#6c757d',
              }}
            >
              Right to your door, all in one box. We pride ourselves as a sustainable company and all our shipments and their contents are made from recycled materials. Put them straight in the yellow bin when done!
            </ListItem>
            <ListItem
              sx={{
                ...stylesList,
                color: '#6c757d',
              }}
            >
              What if nobody is home on delivery day?
            </ListItem>
            <ListItem
              sx={{
                ...stylesList,
                color: 'rgb(254, 101, 79)',
              }}
            >
              No stress!We deliver all our food packsin boxes with dry ice to keep them chilled until you’re back.
            </ListItem>
          </List>
        </Box>
      </Fade>
    </Box>
  )
}
export default ShippingInfoContent;
