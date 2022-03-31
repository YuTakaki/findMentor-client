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

  const options = [
    {
      name: 'Dashboard',
      link: ''
    },
    {
      name: 'Profile',
      link: ''
    },
    {
      name: 'Calender',
      link: ''
    },
  ]

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
        {options.map(_option => (
          <Typography 
            key={_option.name} 
            sx={{
              color: 'white',
              marginTop: '20px'
            }}
          >{_option.name}</Typography>

        ))}
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