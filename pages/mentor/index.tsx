import React from 'react'
import PrivateRoute from '../../components/hoc/PrivateRoute'

const Index = () => {
  return (
    <div>Index</div>
  )
}

export default PrivateRoute(Index);