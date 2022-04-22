import React from 'react'
import NativeSelect from '@mui/material/NativeSelect'
import Input from '@mui/material/Input'

const SelectAgeYearsField = ({ value, handleChange, number }) => {
  const valueOptions = []
  for (let i = 0; i <= number; i++) {
    valueOptions.push(i)
  }

  return (
    <NativeSelect
      value={value}
      onChange={handleChange}
      variant='outlined'
      input={
        <Input
          sx={{
            '&::before': { border: '0', display: 'none' },
            '&::after': { border: '0', display: 'none' },
            '& .MuiInputBase-input': {
              width: '30px',
              height: '40px',
              padding: '6px 0px 4px 10px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: {
                xs: '18px',
                xl: '24px',
              },
              lineHeight: {
                xs: '22px',
                xl: '28px',
              },
              textAlign: 'center',
              border: '2px solid',
              borderColor: `${
                value.length > 0 ? '#FE654F' : 'rgba(0, 0, 0, 0.3)'
              }`,
              borderRadius: '7px',
            },
          }}
        />
      }
    >
      <option aria-label='None' value='' />
      {valueOptions.map((option) => (
        <option key={option} value={option} sx={{ textAlign: 'center' }}>
          {option}
        </option>
      ))}
    </NativeSelect>
  )
}
export default SelectAgeYearsField
