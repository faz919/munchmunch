import * as React from 'react'
import { styled } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'
import checkIconSvg from '../assets/images/checkicon.svg'

const BpIcon = styled('span')(() => ({
    borderRadius: 3,
    width: '40px',
    height: '40px',
    backgroundColor: '#fff',
    '.Mui-focusVisible &': {
        outline: '2px auto rgba(254,101,79,.6)',
        outlineOffset: 2,
    },
    'input:hover ~ &': {
        backgroundColor: '#fff',
    },
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: 'rgba(254,101,79,.7)',
    '&:before': {
        display: 'block',
        width: '40px',
        height: '40px',
        backgroundImage:
            `url(${checkIconSvg})`,
        content: '""',
    },
    'input:hover ~ &': {
        backgroundColor: 'rgb(254,101,79)',
    },
});

// Inspired by blueprintjs
export default function CustomCheckbox(props) {
    return (
        <Checkbox
            sx={{
                '&:hover': { bgcolor: 'transparent' },
            }}
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            inputProps={{ 'aria-label': 'Checkbox demo' }}
            {...props}
        />
    );
}