import React from 'react'
import PrivateRoute from '../../components/hoc/PrivateRoute'
import MentorLayout from '../../components/layout/MentorLayout'

const Index = ({...props}) => {
  return (
    <MentorLayout {...props}>
      <div>Index</div>
    </MentorLayout>
  )
}

export default PrivateRoute(Index);