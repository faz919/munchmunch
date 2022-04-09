import React from 'react';
import { Typography, Box, Fade } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const Welcome = () => {
  const mobileScreen = useMediaQuery('(max-width:1024px)');

  return (
    <Box component='div' sx={{ display: 'block', width: '50%' }}>
      <Fade  in={true} timeout={500}>
        <div className='padding-block-medium'>
          {/* <h1 className="facts-heading">Welcome</h1> */}
          <Typography
            component='h1'
            sx={{
              fontFamily: 'Bubblegum Sans',
              fontSize: '62px',
              lineHeight: '70px',
              textAlign: 'center',
              color: '#6d4c41',
              marginBottom: `${mobileScreen ? '20px' : '40px'}`,
            }}
          >
            Welcome
          </Typography>
          <ul className='bullets-lined--bowl'>
            <li>
              We&apos;ve helped thousands of pets achieve healthy weight goals
              with personalized meal plans.
            </li>
            <li>
              "We&apos;d been trying other food for a year and a half with no
              results, but after a couple of weeks eating MunchMunch, she&apos;d
              already lost a pound and half."
              <div>— Corin on her dog, Luna</div>
            </li>
            <li>
              "Having the portioned food, the individual servings, is great. It
              helps control his weight, and it doesn't let me mess up."
              <div>— Susan on her dog, Harold</div>
            </li>
            <li>
              "She gained a pound and a half, her coat is beautiful, and her
              meow is back! She was very skinny, but now she is thriving and
              happy."
              <div>— Jessica on her cat, Oreo</div>
            </li>
          </ul>
          {/* <Typography
              component="p"
              sx={{
                fontFamily: 'Bubblegum Sans',
                fontSize: '18px',
                lineHeight: '24px',
                color: '#6d4c41'
              }}
            >
              We&apos;ve helped thousands of pets achieve healthy weight goals with personalized meal plans.
            </Typography> */}
        </div>
      </Fade>
    </Box>
  );
};
export default Welcome;
