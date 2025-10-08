import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '@/types/interfaces'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: IUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  _persist?: {
    version: number
    rehydrated: boolean
  }
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ accessToken: string; refreshToken?: string; user: IUser }>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken || null
      state.user = action.payload.user
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
    },
    setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken?: string }>) => {
      console.log('setTokens action received:', {
        accessToken: action.payload.accessToken ? '***TOKEN_PRESENT***' : 'NO_TOKEN',
        refreshToken: action.payload.refreshToken ? '***REFRESH_TOKEN_PRESENT***' : 'NO_REFRESH_TOKEN'
      })
      
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken || null
      state.isAuthenticated = true
      state.error = null
      
      console.log('Auth state updated:', {
        accessToken: state.accessToken ? '***TOKEN_STORED***' : 'NO_TOKEN_STORED',
        isAuthenticated: state.isAuthenticated
      })
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
    },
    updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearAuth: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
    },
    initializeAuth: (state, action: PayloadAction<{ accessToken: string; refreshToken?: string }>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken || null
      state.isLoading = true
      state.error = null
    },
  },
})

export const { 
  setAuth, 
  setTokens, 
  setUser, 
  updateUser, 
  setLoading, 
  setError, 
  clearAuth, 
  initializeAuth 
} = authSlice.actions

export default authSlice.reducer
