import React from 'react'
import { Typography, Box, Fade, List, ListItem } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import styled from "styled-components";

const Welcome = () => {
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
    background-image: linear-gradient(0deg, rgb(255, 204, 51) 2%, rgb(226, 51, 255) 100%);
    background-image: -webkit-linear-gradient(0deg, rgb(255, 204, 51) 2%, rgb(226, 51, 255) 100%);
    background-image: -moz-linear-gradient(0deg, rgb(255, 204, 51) 2%, rgb(226, 51, 255) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    box-decoration-break: clone;
    text-shadow: none;
  `;
  const reviews = [
    {
      text: "We'd been trying other food for a year and a half with no results, but after a couple of weeks eating Munch+Munch, she'd already lost a pound and half.",
      author: '— Corin on her dog, Luna',
    },
    {
      text: "Having the portioned food, the individual servings, is great. It helps control his weight, and it doesn't let me mess up.",
      author: '— Susan on her dog, Harold',
    },
    {
      text: 'She gained a pound and a half, her coat is beautiful, and her meow is back! She was very skinny, but now she is thriving and happy.',
      author: '— Jessica on her cat, Oreo',
    },
  ]
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
          <StyledHeading>Welcome</StyledHeading>
          </Typography>
          <List>
            <ListItem
              sx={{
                ...stylesList,
                color: '#6c757d',
              }}
            >
              We've helped thousands of pets achieve healthy weight goals
              with personalized meal plans.
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
export default Welcome
