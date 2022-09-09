import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, List, ListItem } from '@mui/material'

const Footer = () => {
  const styles = {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '18px',
    lineHeight: '24px',
    textAlign: 'center',
    color: 'rgba(250, 250, 250, 0.5)',
  }
  return (
    <Box
      component='div'
      sx={{
        backgroundColor: '#111',
        padding: '40px 0',
      }}
    >
      <Typography component='p' sx={{ ...styles, padding: '20px 20px 0', color: '#fff' }}>
        <Box component='span' sx={{ fontFamily: 'Roboto', fontSize: '16px' }}>
          &copy;
        </Box>{' '}
        2022 Munch+Munch Inc. Munch+Munch is a registered trademark. We are
        committed to ensuring digital accessibility for people with
        disabilities.
      </Typography>
      <Typography component='p' sx={{ ...styles, padding: '0 20px 0', color: '#fff' }}>
        We are continually improving the user experience for everyone, and
        applying the relevant accessibility standards.
      </Typography>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          paddingTop: '20px',
          color: '#fff'
        }}
      >
        {['Terms of Service', 'Privacy Policy'].map(
          (item, idx) => (
            <ListItem
              key={idx}
              sx={{
                ...styles,
                width: 'fit-content',
                padding: '0',
                '& a': {
                  color: '#fff',
                  '&:hover': {
                    color: '#d3d3d3',
                  },
                },
                '& span': {
                  fontSize: '26px',
                  lineHeight: '32px',
                  margin: '0 5px',
                },
              }}
            >
              <a href='https://start.munchmunch.com.au/terms.html'>{item}</a>
              {idx < 1 && <span>|</span>}
            </ListItem>
          )
        )}
      </List>
    </Box>
  )
}
export default Footer
