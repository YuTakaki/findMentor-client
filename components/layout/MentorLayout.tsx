import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, Button, CardMedia, Drawer } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useRef, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { getImageUrl } from '../../utils/getImageUrl'
import theme from '../../styles/theme/theme'
import { changeThemeAction } from '../../store/slicers/themeSlicers'

const useStyle = (mode : 'light' | 'dark') => {
  return makeStyles(() => {
    const style = theme(mode)
    return {
      layout : {
        display: 'flex',
        padding: 0,
        minHeight: '100vh !important',
      },
    
      mainBox: {
        flex: 1
      },
      header: {
        minHeight: '100vh',
        '& .MuiDrawer-paper': {  
          padding: 20,
          width: 250, 
          backgroundColor: style.palette.primary.main,
        },
      },
      nav: {
        marginTop: 20,
        flexDirection: 'column',
        alignItems: 'start',
        gridGap: 10,
      }
    }
  })
}
const MentorLayout = ({children} : any) => {
  const profileSettingsRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const user = useSelector((state: RootStateOrAny) => state.authReducer.user);
  const theme = useSelector((state: RootStateOrAny) => state.themeReducer)
  const style = useStyle(theme)();
  const dispatch = useDispatch();
  
  const toggleMenuSettings = () => {
    setOpenMenu(!openMenu);
  }

  return (
    <Box
      component="main"
      className={style.layout}
    >
      <Drawer
        className={style.header}
        variant="persistent"
        open={true}

      >
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
        
      </Drawer>
      <div className={style.mainBox}>
        <AppBar position='static' color='transparent' elevation={1}>
          <Toolbar 
            sx={{
              marginLeft: 'auto'
            }}
          >
                  
            <div ref={profileSettingsRef}>
              <Tooltip title="Settings">
                <IconButton sx={{ p: 0 }} onClick={toggleMenuSettings}>
                  <Avatar alt="Remy Sharp" src={getImageUrl(user)} />
                </IconButton>
              </Tooltip>
            </div>
            <Menu 
              open={openMenu} 
              anchorEl={profileSettingsRef.current}
              id="menu-appbar"
              keepMounted
              onClose={toggleMenuSettings}
            >
              {[1,2,3,4].map((_, i) => (
                <MenuItem key={i}>
                  <Typography>{i}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
        {children}
      </div>
      
      
    </Box>
  )
}

export default MentorLayout