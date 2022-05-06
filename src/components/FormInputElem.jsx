import React from 'react'
import TextField from '@mui/material/TextField'

const FormInputElement = ({ value, callback, type, label, id }) => {
  const stylesText = {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '20px',
    lineHeight: '24px',
    fontWeight: '500',
  }
  
  return (
    <TextField
      label={label}
      type={type}
      required
      fullWidth
      autoComplete='off'
      value={value}
      onChange={(e) => callback(e)}
      id={id}
      sx={{
        margin: '10px 0',
        '& label': {
          ...stylesText,
          top: '3.5px',
        },
        '& label.Mui-focused': {
          ...stylesText,
          top: '0',
          color: '#FE654F',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderWidth: '1px',
            borderColor: 'rgba(0, 0, 0, 0.3)',
          },
          '&:hover fieldset': {
            borderWidth: '2px',
            borderColor: '#FE654F',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#FE654F',
          },
        },
        '& input + fieldset': {
          borderRadius: '10px',
        },
        '& input': {
          ...stylesText,
        },
      }}
    />
  )
}
export default FormInputElement
