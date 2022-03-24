import { NextPage, NextPageContext } from 'next'
import { route } from 'next/dist/server/router'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'

const PrivateRoute = (Component: NextPage) => {
  const HOC = ({...props}) => {
    const router = useRouter()
    const is_auth = useSelector((state: RootStateOrAny) => state.authReducer.is_auth);
    const error = useSelector((state: RootStateOrAny) => state.authReducer.error);
    if (is_auth === false) {
      router.push('/login');
    }

    if ((error !== null) && (router.pathname !== '/profile/info')) {
      router.push('/profile/info');
    }
    return (
      <>
        {is_auth === true && error === null ? (
          <Component {...props}/>
        ) :  (
          <h1>Loading</h1>
        )}
      </>
    )
  }
  return HOC
}

export default PrivateRoute