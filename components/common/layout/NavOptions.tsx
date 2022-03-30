import { Button, Typography } from '@mui/material'
import { styled } from '@mui/system';
import React from 'react'
import { useDispatch } from 'react-redux'
import { changeThemeAction } from '../../../store/slicers/themeSlicers';

const Nav = styled('nav')({
  marginTop: 20,
  flexDirection: 'column',
  alignItems: 'start',
  gridGap: 10,
  
});

const NavOptions = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Typography
        component='h1'
        fontSize={30}
        textAlign='center'
        sx={{
          color: 'white'
        }}
      >
        Find Mentor
      </Typography>
      <Nav>
        <Typography sx={{
          color: 'white'
        }}>Page</Typography>
        <Typography sx={{
          color: 'white'
        }}>Page</Typography>
        <Typography sx={{
          color: 'white'
        }}>Page</Typography>
        <Typography sx={{
          color: 'white'
        }}>Page</Typography>
      </Nav>
      <Button 
        variant='contained' 
        color='secondary'
        sx={{
          width: 'max-content',
          margin: 'auto auto 0',
        }}
        onClick={() => dispatch(changeThemeAction())}
      >Toggle Dark Theme</Button>
    </>
  )
}

export default NavOptions