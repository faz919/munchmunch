import React from 'react';
import { Typography, Box, Fade, List, ListItem } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const Welcome = () => {
  const mobileScreen = useMediaQuery('(max-width:1024px)');

  const stylesList = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontFamily: 'Bubblegum Sans',
    fontSize: { xs: '18px', xl: '24px' },
    lineHeight: { xs: '24px', xl: '30px' },
    color: '#8B80F9',
    padding: '20px 0 20px',
    borderBottom: '1px solid #CFBFF7',
  };

  const reviews = [
    {
      text: "We'd been trying other food for a year and a half with no results, but after a couple of weeks eating MunchMunch, she'd already lost a pound and half.",
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
  ];
  return (
    <Box
      component='div'
      sx={{
        display: 'block',
        width: { xs: '100%', md: '45%' },
      }}
    >
      <Fade in={true} timeout={500}>
        <Box
          component='div'
          sx={{
            padding: { xs: '20px', md: '55px' },
          }}
        >
          <Typography
            component='h1'
            sx={{
              fontFamily: 'Bubblegum Sans',
              fontSize: { xs: '62px', xl: '80px' },
              lineHeight: { xs: '70px', xl: '100px' },
              textAlign: 'center',
              textTransform: 'uppercase',
              color: '#8B80F9', //#CFBFF7
              marginBottom: `${mobileScreen ? '20px' : '40px'}`,
            }}
          >
            Welcome
          </Typography>
          <List>
            <ListItem
              sx={{
                ...stylesList,
                color: '#000',
              }}
            >
              We&apos;ve helped thousands of pets achieve healthy weight goals
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
                    fontFamily: 'Bubblegum Sans',
                    fontSize: { xs: '18px', xl: '24px' },
                    lineHeight: { sx: '24px', xl: '30px' },
                    color: '#000',
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
  );
};
export default Welcome;
