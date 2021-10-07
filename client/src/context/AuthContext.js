import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import { authReducer } from '../reducers/authReducer'
import { apiUrl, LOCAL_STORAGE_TOKEN_AUTH, SET_AUTH } from './contanst'
import { setLocalLocalStorage } from '../helper'
import setAuthToken from '../utils/ConfigHeader'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null
  })

  // Loaduser 
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_AUTH]) {
      console.log(`Set Token:  ${JSON.parse(localStorage[LOCAL_STORAGE_TOKEN_AUTH])}`)
      setAuthToken(JSON.parse(localStorage[LOCAL_STORAGE_TOKEN_AUTH]))
    }

    try {
      const res = await axios.get(`${apiUrl}/api/auth`)
      console.log(`[Success]Get api ${apiUrl}/api/auth`, res.data)
      if (res.data.success) {
        dispatch({
          type: SET_AUTH,
          payload: { isAuthenticated: true, user: res.data.user }
        })
      }
    } catch (error) {
      console.log(`[Error]Get api ${apiUrl}/api/auth`, error.response.data)
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_AUTH)
      setAuthToken(null)
      dispatch({
        type: SET_AUTH,
        payload: { isAuthenticated: false, user: null }
      })
    }
  }

  React.useEffect(() => {
    loadUser()
  }, [])

  // Login
  const loginUser = async (formdata) => {
    try {
      const res = await axios.post(`${apiUrl}/api/auth/login`, formdata)
      if (res.data.success) {
        setLocalLocalStorage(LOCAL_STORAGE_TOKEN_AUTH, res.data.accessToken)
        console.log(`[Success]Get api ${apiUrl}/api/auth/login`, res.data)
        loadUser()
      }
      return res.data
    } catch (error) {
      console.log(`[Error]Get api ${apiUrl}/api/auth/login`, error.response.data)
      if (error.response.data) return error.response.data
      return { success: false, message: 'Server error, try again...!' }
    }
  }

  const dataAuthContext = {
    authState,
    loginUser,
  }

  return (
    <AuthContext.Provider value={dataAuthContext}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
