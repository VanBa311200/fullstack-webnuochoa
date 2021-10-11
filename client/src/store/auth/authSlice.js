import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_AUTH, } from "../../context/contanst";
import { setAuthToken } from '../../utils/ConfigHeader'
import { setLocalStorage } from "../../helper";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const setAuth = createAsyncThunk('auth/setAuth',
  async (formData, { rejectWithValue }) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_AUTH]) {
      setAuthToken(JSON.parse(localStorage[LOCAL_STORAGE_TOKEN_AUTH]))
    }

    try {
      const res = await axios.get(`${apiUrl}/api/auth`)
      if (res.data.success)
        return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const userRegister = createAsyncThunk('auth/userRegister',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}/api/auth/register`, formData)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const userLogin = createAsyncThunk('auth/userLogin',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}/api/auth/login`, formData)
      if (res.data.success)
        return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)


const initialState = {
  authLoading: true,
  isAuthenticated: false,
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogout(state, action) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_AUTH)
      setAuthToken(null)
      state.isAuthenticated = false
      state.user = null
    }
  },
  extraReducers: {
    [setAuth.fulfilled]: (state, action) => {
      state.user = action.payload.user
      state.authLoading = false
      state.isAuthenticated = true
      // console.log(state)
    },
    [setAuth.rejected]: (state, action) => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_AUTH)
      setAuthToken(null)
      state.authLoading = false
      // console.log(action.payload.message)
    },
    [userLogin.fulfilled]: (state, action) => {
      setLocalStorage(LOCAL_STORAGE_TOKEN_AUTH, action.payload.accessToken)
      // console.log('Login success: ', action.payload.accessToken)
    },
    [userLogin.rejected]: (state, action) => {
      // console.log(action.payload.message)
    },
    [userRegister.fulfilled]: (state, action) => {
      // console.log(action.payload.message)
    },
    [userRegister.rejected]: (state, action) => {
      // console.log(action.payload.message)
    }
  }
})

export const { userLogout } = authSlice.actions

export const selectAuth = state => state.authReducer

export default authSlice.reducer