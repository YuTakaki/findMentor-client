import { AppBar, Avatar, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, Drawer, Box } from '@mui/material'
import { styled } from '@mui/styles'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useRef, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { getImageUrl } from '../../utils/getImageUrl'
import theme from '../../styles/theme/theme'
import NavOptions from '../common/layout/NavOptions'
import { logoutAction } from '../../store/actions/authActions';
import { useRouter } from 'next/router';
import PrivateRoute from '../hoc/PrivateRoute';


const LayoutComponent = styled('main')(({
  display: 'flex',
  padding: 0,
  minHeight: '100vh !important',
}));

const CustomDrawer = styled(Drawer)(({theme} : any) => ({
  minHeight: '100vh',
  '& .MuiDrawer-paper': {  
    paddingTop: '20px',
    paddingBottom: '20px',
    width:'250px', 
    backgroundColor: theme.palette.primary.main,

  },
}))

const Layout = ({children} : any) => {
  const profileSettingsRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const user = useSelector((state: RootStateOrAny) => state.authReducer.user);
  const mode = useSelector((state: RootStateOrAny) => state.themeReducer);
  const style = theme(mode);
  const dispatch = useDispatch();
  const router = useRouter()

  const toggleMenuSettings = () => {
    setOpenMenu(!openMenu);
  }

  const logout = async() => {
    try {
      await dispatch(logoutAction());
      router.push('/');

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <LayoutComponent>
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
      <div style={{flex: 1, marginTop: 56}}>
        <AppBar
          position='fixed'
          color='transparent'
          elevation={0}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            bgcolor: 'background.default',
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
              <MenuItem onClick={logout}>
                <Typography>Log Out</Typography>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        {children}
      </div>
    </LayoutComponent>
  )
}

export default PrivateRoute(Layout)