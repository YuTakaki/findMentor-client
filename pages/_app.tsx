import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider, RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { store } from '../store/store'
import { useEffect, useState } from 'react'
import { verifyTokenAction } from '../store/actions/authActions'
import { createTheme,  ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material'
import theme from '../styles/theme/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const mode = useSelector((state: RootStateOrAny) => state.themeReducer)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyTokenAction());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme(mode)}>
      <Box
        id='root'
        sx={{
          height: '100vh',
          width: '100%',
          bgcolor: 'background.default'
        }}
      >
        <Component {...pageProps}/>
      </Box>
    </ThemeProvider>
  )
}

const App = (props : AppProps) => {
  return (
    <Provider store={store}>
      <MyApp {...props}/>
    </Provider>
  )
}

export default App
