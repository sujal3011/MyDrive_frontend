import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const CustomButton = styled(Button)({
  backgroundColor: 'white',
  color: 'rgb(25,118,210)',
  borderRadius: '12px',
  border: '2px solid rgb(25,118,210)',
  padding: '10px 20px',
  textTransform: 'none',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: 'white',
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    border: '2px solid rgb(25,118,210)',
    borderRadius: '14px',
  },
});

const Button1 = ({title}) => {
  return <CustomButton>{title}</CustomButton>;
};

export default Button1;
