import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { useEffect } from 'react'
import { verifyTokenAction } from '../store/actions/authActions'
import { ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/material'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    store.dispatch(verifyTokenAction());
  }, []);

  const theme = {
    palette: {
      mode: 'dark',
    },
  }
  return (
    <Provider
      store={store}
    >
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
