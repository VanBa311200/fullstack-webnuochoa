import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { selectAuth } from '../store/auth/authSlice'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector(selectAuth)

  return (
    <Route {...rest} render={props => isAuthenticated ? <Component {...rest} {...props} /> : <Redirect to='/login' />} />
  )
}

export default ProtectedRoute
