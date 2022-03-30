import { Button, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { AppProps } from 'next/app';
import React from 'react'
import { useDispatch } from 'react-redux'
import { changeThemeAction } from '../../../store/slicers/themeSlicers';

const useStyle = makeStyles(() => ({
  nav: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'start',
    gridGap: 10,
  }
}))
const NavOptions = () => {
  const dispatch = useDispatch();
  const style = useStyle();
  
  return (
    <>
      <Typography
        component='h1'
        fontSize={30}
        textAlign='center'
      >
        Find Mentor
      </Typography>
      <Toolbar component='nav' className={style.nav}>
        <Typography>Page</Typography>
        <Typography>Page</Typography>
        <Typography>Page</Typography>
        <Typography>Page</Typography>
      </Toolbar>
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