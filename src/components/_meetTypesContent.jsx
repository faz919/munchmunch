import React from 'react'
import { Typography, Box, Fade, List, ListItem } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import styled from "styled-components";

const meetTypesContent = () => {
  const mobileScreen = useMediaQuery('(max-width:1024px)')

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
            paddingTop: { xs: '20px', md: '75px', xl: '150px'},
            paddingBottom: { xs: '20px', md: '150px', xl: '150px'},
            paddingRight: { xs: '50px', md: '50px', xl: '50px'},
            paddingLeft: { xs: '50px', md: '50px', xl: '50px'}
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
              // textTransform: 'uppercase',
              color: '#FE654F', //#CFBFF7
              // marginTop: `${mobileScreen ? '40px' : '60px'}`,
            }}
          >
          <StyledHeading>FAQ</StyledHeading>
          </Typography>
          <List>
            <ListItem
              sx={{
                ...stylesList,
                color: '#6c757d',
              }}
            >
              How do you make fresh-cooked food for dogs?
            </ListItem>
            <ListItem
              sx={{
                ...stylesList,
                color: '#6c757d',
              }}
            >
              At MunchMunch, we don't just make dog food, we make "human grade dog food".We prepare our meals in commercial kitchens, hot-filling them to ensure safety and flash-freezing them to secure freshness.
            </ListItem>
            <ListItem
              sx={{
                ...stylesList,
                color: '#6c757d',
              }}
            >
              How do I transition my pup to fresh-cooked food?
            </ListItem>
            <ListItem
              sx={{
                ...stylesList,
                color: '#6c757d',
              }}
            >
              Slowly start mixing in Munch+Munch food in with your existing pet food. One day one Munch+Munch should be around 1/4 of the total meal size. The next day it can be 1/2. The following day 3/4, and finally on the last day you can start feeding your dog 100% fresh Munch+Munch food.
            </ListItem>
            <ListItem
              sx={{
                ...stylesList,
                color: '#6c757d',
              }}
            >
              What is the difference between a full and half plan?
            </ListItem>
            <ListItem
              sx={{
                ...stylesList,
                color: '#6c757d',
              }}
            >
              If you want to feed your pup a fully fresh cooked and healthy diet then go with the 'full plan'. The half plan is to supplement your dry food with some fresh food and add some variety to what you are feeding your pup.
            </ListItem>
            {reviews.map((item, idx) => (
              <ListItem
                key={idx}
                sx={{
                  ...stylesList,
                }}
              >
                "{item.text}"
                <Typography
                  component='p'
                  sx={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: { xs: '18px', xl: '24px' },
                    lineHeight: { sx: '24px', xl: '30px' },
                    color: '#6c757d',
                  }}
                >
                {item.author}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Fade>
    </Box>
  )
}
export default meetTypesContent
