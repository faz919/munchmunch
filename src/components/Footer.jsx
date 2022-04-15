import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, CardMedia, List, ListItem } from '@mui/material'

const Footer = () => {
  const styles = {
    fontFamily: 'Bubblegum Sans',
    fontSize: '18px',
    lineHeight: '24px',
    textAlign: 'center',
    color: 'rgba(250, 250, 250, 0.5)',
  }
  return (
    <Box
      component='div'
      sx={{
        backgroundColor: '#3d3935',
        padding: '40px 0',
      }}
    >
      <Typography
        component='h3'
        sx={{ ...styles, marginBottom: '20px' }}
      >
        Have questions or concerns?
      </Typography>
      <Typography
        component='p'
        sx={{
          ...styles,
          color: 'rgba(250, 250, 250, 1.0)',
          marginBottom: '20px',
          '& a': {
            ...styles,
            color: 'rgba(250, 250, 250, 1.0)',
            '&:hover': {
              color: 'rgba(139, 128, 249, 1.0)',
            },
          },
        }}
      >
        <Link to='#'>Click here</Link> to ask us anything.
      </Typography>
      <Typography component='p' sx={{ ...styles }}>
        Mon-Fri, 6am-7pm PT
      </Typography>
      <Typography component='p' sx={{ ...styles, marginBottom: '20px' }}>
        Sat-Sun, 9am-3pm PT
      </Typography>
      <Box
        component='div'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '160px',
          margin: '0 auto',
        }}
      >
        {['facebook', 'instagram', 'twitter', 'youtube'].map((item, idx) => (
          <Link key={idx} to='#'>
            <CardMedia
              component='img'
              image={`/static/img/${item}.svg`}
              alt={`${item} icon`}
              sx={{
                width: '32px',
                height: '32px',
                margin: '0 5px',
              }}
            />
          </Link>
        ))}
      </Box>
      <Typography component='p' sx={{ ...styles, padding: '20px 20px 0' }}>
        <Box component='span' sx={{ fontFamily: 'Roboto', fontSize: '16px' }}>
          &copy;
        </Box>{' '}
        2021 MunchMunch Inc. MunchMunch is a registered trademark. We are
        committed to ensuring digital accessibility for people with
        disabilities.
      </Typography>
      <Typography component='p' sx={{ ...styles, padding: '0 20px 0' }}>
        We are continually improving the user experience for everyone, and
        applying the relevant accessibility standards.
      </Typography>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          paddingTop: '20px',
        }}
      >
        {['Terms of Service', 'Privacy Policy', 'CA Privacy Rights'].map(
          (item, idx) => (
            <ListItem
              key={idx}
              sx={{
                ...styles,
                width: 'fit-content',
                padding: '0',
                '& a': {
                  color: 'rgba(250, 250, 250, 0.5)',
                  '&:hover': {
                    color: 'rgba(139, 128, 249, 1.0)',
                  },
                },
                '& span': {
                  fontSize: '26px',
                  lineHeight: '32px',
                  margin: '0 5px',
                },
              }}
            >
              <Link to='#'>{item}</Link>
              {idx < 2 && <span>|</span>}
            </ListItem>
          )
        )}
      </List>
    </Box>
  )
}
export default Footer
