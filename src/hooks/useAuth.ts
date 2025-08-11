'use client'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loginUser, logoutUser, registerUser, clearError, setUser } from '../store/slices/authSlice'
import { User } from '../types'

// Compatibility hook to replace the old useAuth context hook
export function useAuth() {
  const dispatch = useAppDispatch()
  const { user, isLoggedIn, isLoading, error } = useAppSelector((state) => state.auth)

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const result = await dispatch(loginUser(credentials)).unwrap()
      return result
    } catch (error) {
      throw error
    }
  }

  const register = async (userData: Partial<User>) => {
    try {
      const result = await dispatch(registerUser(userData)).unwrap()
      return result
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap()
    } catch (error) {
      // Even if logout fails on server, we still clear local state
      console.error('Logout error:', error)
    }
  }

  const clearAuthError = () => {
    dispatch(clearError())
  }

  const setUserData = (userData: User) => {
    dispatch(setUser(userData))
  }

  return {
    user,
    isLoggedIn,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError: clearAuthError,
    setUser: setUserData,
  }
}

export default useAuth