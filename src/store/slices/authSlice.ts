import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types'
import { authAPI } from '../api/authAPI'


interface AuthState {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
}

// Async thunks for API calls
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('token', response.data.token)
      return response.data.user
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('token', response.data.token)
      return response.data.user
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed')
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout()
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      return null
    } catch (error: any) {
      // Even if logout fails on server, clear local storage
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      return null
    }
  }
)

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const storedUser = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      
      if (!storedUser || !token) {
        return null
      }
      
      const user = JSON.parse(storedUser)
      // For dummy authentication, just return the stored user
      // In production, you would verify the token with the server
      return user
    } catch (error: any) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      return null
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isLoggedIn = true
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    clearAuth: (state) => {
      state.user = null
      state.isLoggedIn = false
      state.error = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = {
          ...action.payload,
          firstName: action.payload.name, // Map name to firstName
          createdAt: new Date(action.payload.joinedAt), // Map joinedAt to createdAt
          updatedAt: new Date(action.payload.joinedAt), // Initially set updatedAt same as joinedAt
        }
        state.isLoggedIn = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isLoggedIn = true
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false
        state.user = null
        state.isLoggedIn = false
        state.error = null
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false
        state.user = null
        state.isLoggedIn = false
        state.error = null
      })
      // Check auth status cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload) {
          state.user = action.payload
          state.isLoggedIn = true
        } else {
          state.user = null
          state.isLoggedIn = false
        }
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isLoading = false
        state.user = null
        state.isLoggedIn = false
      })
  },
})

export const { clearError, setUser, clearAuth } = authSlice.actions
export default authSlice.reducer