import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { NextPage } from 'next'
import React, { useRef, useState } from 'react'

const useStyle = makeStyles({
  layout : {
    display: 'flex',
    padding: 0,
  },

  mainBox: {
    flex: 1
  },
  header: {
    height: '100vh',
    maxWidth: 250,
  },
  nav: {
    flexDirection: 'column',
    alignItems: 'start',
    gridGap: 10,
  }
})
const MentorLayout = ({children} : any) => {
  const style = useStyle();
  const profileSettingsRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenuSettings = () => {
    setOpenMenu(!openMenu)
  }
  return (
    <Box
      component="main"
      className={style.layout}
    >
      <AppBar
        className={style.header}
        position='static'
      >
        <Toolbar component='nav' className={style.nav}>
          <Typography>Page</Typography>
          <Typography>Page</Typography>
          <Typography>Page</Typography>
          <Typography>Page</Typography>
        </Toolbar>
      </AppBar>
      <div className={style.mainBox}>
        <AppBar position='static' color='transparent'>
          <Toolbar 
            sx={{
              marginLeft: 'auto'
            }}
          >
            <div ref={profileSettingsRef}>
              <Tooltip title="Settings">
                <IconButton sx={{ p: 0 }} onClick={toggleMenuSettings}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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