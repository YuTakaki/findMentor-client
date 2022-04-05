import { AppBar, Avatar, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, Drawer, Box } from '@mui/material'
import { styled } from '@mui/styles'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useRef, useState } from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'
import { getImageUrl } from '../../utils/getImageUrl'
import theme from '../../styles/theme/theme'
import NavOptions from '../common/layout/NavOptions'


const MentorLayoutComponent = styled('main')(({
  display: 'flex',
  padding: 0,
  minHeight: '100vh !important',
}));

const CustomDrawer = styled(Drawer)(({theme} : any) => ({
  minHeight: '100vh',
  '& .MuiDrawer-paper': {  
    padding: '20px',
    width:'250px', 
    backgroundColor: theme.palette.primary.main,

  },
}))

const MentorLayout = ({children} : any) => {
  const profileSettingsRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const user = useSelector((state: RootStateOrAny) => state.authReducer.user);
  const mode = useSelector((state: RootStateOrAny) => state.themeReducer);
  const style = theme(mode);


  const toggleMenuSettings = () => {
    setOpenMenu(!openMenu);
  }

  return (
    <MentorLayoutComponent>
      <CustomDrawer
        variant="persistent"
        open={true}
        theme={style}
        sx={{
          display: { xs: 'none', md: 'block' },
        }}
      >
        <NavOptions />
      </CustomDrawer>
      <CustomDrawer
        variant="temporary"
        open={openNav}
        onClose={() => setOpenNav(false)}
        theme={style}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <NavOptions />
      </CustomDrawer>
      <Box sx={{
        display: {xs : 'none', md: 'block'},
        width: '250px',
      }}>
      </Box>
      <div style={{flex: 1}}>
        <AppBar
          position='static'
          color='transparent'
          elevation={0}
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <IconButton
            onClick={() => setOpenNav(true)}
            sx={{
              display: {xs : 'block', md: 'none'},
              padding: 1
            }}
          >
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
    </MentorLayoutComponent>
  )
}

export default MentorLayout