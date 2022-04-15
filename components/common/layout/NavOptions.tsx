import { Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { styled } from '@mui/system';
import Link from 'next/link';
import React from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { changeThemeAction } from '../../../store/slicers/themeSlicers';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const Nav = styled('nav')({
  marginTop: 20,
  flexDirection: 'column',
  alignItems: 'start',
  gridGap: 10,
  
});


const NavOptions = () => {
  const dispatch = useDispatch();
  const accountType = useSelector((state: RootStateOrAny) => state.authReducer.user.account_type)

  const options = [
    {
      name: 'Dashboard',
      link: '',
      icon: <DashboardIcon />,
      account: 'both'
    },
    {
      name: 'Calender',
      link: 'calendar',
      icon: <CalendarMonthIcon />,
      account: 'both'
    },
    {
      name: 'Find Mentor',
      link: 'find-mentor',
      icon: <PersonSearchIcon />,
      account: 'student'
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
            <>
              {(_option.account === 'both' || _option.account === accountType) && (
                <Link href={`/${accountType}/${_option.link}`} key={_option.name}>
                  <a>
                    <ListItem 
                      button 
                      sx={{
                        '& .MuiListItemIcon-root': {
                          alignItems: 'center',
                          gridGap: 10,
                          color: 'white'
                        }
                      }}
                    >
                    <ListItemIcon>
                      {_option.icon}
                    <ListItemText>{_option.name}</ListItemText>
                    </ListItemIcon>
                    </ListItem>
                  </a>
                </Link>
              )}
            </>

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