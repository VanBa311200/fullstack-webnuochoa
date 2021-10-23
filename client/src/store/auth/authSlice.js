import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_AUTH, } from "../../context/contanst";
import { setAuthToken } from '../../utils/ConfigHeader'
import { setLocalStorage } from "../../helper";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// check Auth and SetAuth
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

// Register User
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

// Login user
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

// Update name
export const updateName = createAsyncThunk('auth/updateName',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}/api/auth/updateName`, formData)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Update email
export const updateEmail = createAsyncThunk('auth/updateEmail',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}/api/auth/updateEmail`, formData)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Update password
export const updatePassword = createAsyncThunk('auth/updatePassword',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}/api/auth/updatePassword`, formData)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
// Update password
export const updatePhone = createAsyncThunk('auth/updatePhone',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}/api/auth/updatePhone`, formData)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
// Update password
export const updateAddress = createAsyncThunk('auth/updateAddress',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}/api/auth/updateAddress`, formData)
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
    },
    [setAuth.rejected]: (state, action) => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_AUTH)
      setAuthToken(null)
      state.authLoading = false
    },
    [userLogin.fulfilled]: (state, action) => {
      setLocalStorage(LOCAL_STORAGE_TOKEN_AUTH, action.payload.accessToken)
    },
    [userLogin.rejected]: (state, action) => {
      state = initialState
    },
    [userRegister.fulfilled]: (state, action) => {
      // console.log(action.payload.message)
    },
    [userRegister.rejected]: (state, action) => {
      // console.log(action.payload.message)
    },
    [updateName.fulfilled]: (state, action) => {
      state.user.fullname = action.payload.user.fullname
    },
    [updateName.rejected]: (state, action) => {
    },
    [updateEmail.fulfilled]: (state, action) => {
      state.user.email = action.payload.user.email
    },
    [updatePhone.fulfilled]: (state, action) => {
      state.user.phone = action.payload.user.phone
    },
    [updateAddress.fulfilled]: (state, action) => {
      state.user.address = action.payload.user.address
    }
  }
})

export const { userLogout } = authSlice.actions

export const selectAuth = state => state.authReducer

export default authSlice.reducer