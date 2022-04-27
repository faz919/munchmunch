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
        backgroundColor: '#3d3935',
        padding: '40px 0',
      }}
    >
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
        {['Terms of Service', 'Privacy Policy'].map(
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
              {idx < 1 && <span>|</span>}
            </ListItem>
          )
        )}
      </List>
    </Box>
  )
}
export default Footer
