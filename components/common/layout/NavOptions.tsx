import { Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { styled } from '@mui/system';
import Link from 'next/link';
import React from 'react'
import { useDispatch } from 'react-redux'
import { changeThemeAction } from '../../../store/slicers/themeSlicers';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

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
      link: '',
      icon: <DashboardIcon />
    },
    {
      name: 'Calender',
      link: 'calendar',
      icon: <CalendarMonthIcon />
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
        <List>
          {options.map(_option => (
            <ListItem 
              button 
              key={_option.name}
              sx={{
                '& .MuiListItemIcon-root': {
                  alignItems: 'center',
                  gridGap: 10,
                  color: 'white'
                }
              }}
            >
              <Link href={`/mentor/${_option.link}`}>
                <a>
                  <ListItemIcon>
                    {_option.icon}
                  <ListItemText>{_option.name}</ListItemText>
                  </ListItemIcon>
                </a>
              </Link>
            </ListItem>

          ))}
        </List>
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