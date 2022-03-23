import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { useEffect, useState } from 'react'
import { verifyTokenAction } from '../store/actions/authActions'
import { createTheme,  ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material'
function MyApp({ Component, pageProps }: AppProps) {

  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    store.dispatch(verifyTokenAction());
  }, []);

  const theme = createTheme({
    palette: {
      mode: currentTheme,
      primary: {
        main: '#272727'
      },
      secondary: {
        main: '#ffde03'
      }
    }
  });

  const setCurrentThemeHandler = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark': 'light')
  }
  return (
    <Provider
      store={store}
    >
      <ThemeProvider theme={theme}>
        <Box
          id='root'
          color='default'
          sx={{
            height: '100vh',
            width: '100%',
            bgcolor: 'background.default'
          }}
        >
          <Component {...pageProps} setCurrentThemeHandler={setCurrentThemeHandler}/>
        </Box>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
