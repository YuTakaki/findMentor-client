import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { useEffect } from 'react'
import { verifyTokenAction } from '../store/actions/authActions'
import { createTheme,  ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material'
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    store.dispatch(verifyTokenAction());
  }, []);

  const theme = createTheme({
    palette: {
      mode: 'light'
    }
  })
  return (
    <Provider
      store={store}
    >
      <ThemeProvider theme={theme}>
        <Box
          id='root'
          color='primary'
          sx={{
            height: '100vh',
            width: '100%',
            bgcolor: 'background.default'
          }}
        >
          <Component {...pageProps} />
        </Box>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
