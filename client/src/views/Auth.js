import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import { selectAuth } from '../store/auth/authSlice'

const Auth = ({ redirect }) => {
  const { isAuthenticated } = useSelector(selectAuth)

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
