import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login as loginCall, register as registerCall } from 'api/apiClient'
import { RootState } from 'app/store'
import { Auth, Error } from 'app/types'

interface AuthParam {
  username: string
  password: string
}

interface AuthState {
  auth: Auth | null
  loginError: string | null
  registerError: string | null
}

export const login = createAsyncThunk(
  'auth/doLogin',
  async (auth: AuthParam) => {
    return await loginCall(auth.username, auth.password)
  }
)

export const register = createAsyncThunk(
  'auth/doRegister',
  async (auth: AuthParam, thunkAPI) => {
    try {
      const response = await registerCall(auth.username, auth.password)
      thunkAPI.dispatch(login(auth))
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const initialState: AuthState = {
  auth: null,
  loginError: null,
  registerError: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadAuth: (state) => {
      const authJson = window.localStorage.getItem('auth')
      const auth = authJson ? JSON.parse(authJson) : null
      return { auth: auth, loginError: null, registerError: null }
    },
    logout: () => {
      window.localStorage.removeItem('auth')
      return { auth: null, loginError: null, registerError: null }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      window.localStorage.setItem('auth', JSON.stringify(action.payload))
      return { auth: action.payload, loginError: null, registerError: null }
    })
    builder.addCase(login.rejected, (state, action) => {
      return { auth: null, loginError: 'login_failed', registerError: null }
    })
    builder.addCase(register.rejected, (state, action) => {
      return {
        auth: null,
        loginError: null,
        registerError: (action.payload as Error).error,
      }
    })
  },
})

export const getAuth = (state: RootState) => state.auth.auth
export const getLoginError = (state: RootState) => state.auth.loginError
export const getRegisterError = (state: RootState) => state.auth.registerError

export const { loadAuth, logout } = authSlice.actions
export default authSlice.reducer
