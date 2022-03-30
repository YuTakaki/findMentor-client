import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, Drawer } from '@mui/material'
import { makeStyles } from '@mui/styles'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useRef, useState } from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'
import { getImageUrl } from '../../utils/getImageUrl'
import theme from '../../styles/theme/theme'
import NavOptions from '../common/layout/NavOptions'

const useStyle = (mode : 'light' | 'dark') => {
  return makeStyles(() => {
    const style = theme(mode)
    return {
      layout : {
        display: 'flex',
        padding: 0,
        minHeight: '100vh !important',
        '&' : {
          color: 'white'

        }
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
    }
  })
}
const MentorLayout = ({children} : any) => {
  const profileSettingsRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const user = useSelector((state: RootStateOrAny) => state.authReducer.user);
  const theme = useSelector((state: RootStateOrAny) => state.themeReducer);
  const style = useStyle(theme)();

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
        sx={{
          display: { xs: 'none', md: 'block' },
        }}
      >
        <NavOptions />
      </Drawer>
      <Drawer
        className={style.header}
        variant="temporary"
        open={openNav}
        onClose={() => setOpenNav(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <NavOptions />
      </Drawer>
      <div className={style.mainBox}>
        <AppBar
          position='static'
          color='transparent'
          elevation={1}
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <IconButton sx={{ p: 1 }} onClick={() => setOpenNav(true)}>
            <MenuIcon />
          </IconButton>
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