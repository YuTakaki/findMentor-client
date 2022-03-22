import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { useEffect } from 'react'
import { verifyTokenAction } from '../store/actions/authActions'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    store.dispatch(verifyTokenAction());
  }, []);
  return (
    <Provider
      store={store}
    >
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
