'use client'

import { Provider } from 'react-redux'
import { store } from './index'
import { useEffect } from 'react'
import { useAppDispatch } from './hooks'
import { checkAuthStatus } from './slices/authSlice'

interface ReduxProviderProps {
  children: React.ReactNode
}

// Component to handle auth initialization
function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Check authentication status on app start
    dispatch(checkAuthStatus())
  }, [dispatch])

  return <>{children}</>
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        {children}
      </AuthInitializer>
    </Provider>
  )
}

export default ReduxProvider