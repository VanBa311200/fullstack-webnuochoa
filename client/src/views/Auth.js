import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import { AuthContext } from '../context/AuthContext'


const Auth = ({ redirect }) => {
  const { authState: { isAuthenticated } } = useContext(AuthContext)

  if (isAuthenticated) {
    return <Redirect to='/' />
  }

  let body

  body = (
    <>
      {redirect === 'register' ? <RegisterForm /> : <LoginForm />}
    </>
  )

  return (
    body
  )
}

export default Auth
