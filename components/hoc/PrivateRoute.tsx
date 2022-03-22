import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'

const PrivateRoute = (Component: NextPage) => {
  const HOC = ({...props}) => {
    const router = useRouter()
    const is_auth = useSelector((state: RootStateOrAny) => state.authReducer.is_auth);
    if (is_auth === false) {
      router.push('/login');
    }
    return (
      <>
        {is_auth === true ? (
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