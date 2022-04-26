import * as React from 'react'
import { styled } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'
import checkIconSvg from '../assets/images/checkicon.svg'

const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: 3,
    width: '40px',
    height: '40px',
    // boxShadow:
    //     theme.palette.mode === 'dark'
    //         ? '0 0 0 1px rgb(16 22 26 / 40%)'
    //         : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#fff',
    // backgroundImage:
    //     theme.palette.mode === 'dark'
    //         ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
    //         : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
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
    // backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
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
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            inputProps={{ 'aria-label': 'Checkbox demo' }}
            {...props}
        />
    );
}