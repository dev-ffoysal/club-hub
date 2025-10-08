import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { RootState } from '../index'

// Base query with authentication and error handling
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api/v1',
  timeout: 10000,
  prepareHeaders: (headers, { getState }) => {
    // Get accessToken from Redux state (Redux Persist automatically decrypts it)
    const state = getState() as RootState
    const authState = state.auth
    
    // Check if Redux Persist has rehydrated
    const isRehydrated = authState._persist?.rehydrated
    const accessToken = authState.accessToken
    
    // console.log('Auth state check:', {
    //   isRehydrated,
    //   hasToken: !!accessToken,
    //   isAuthenticated: authState.isAuthenticated,
    //   persistVersion: authState._persist?.version
    // })
    
    if (accessToken && isRehydrated) {
      headers.set('authorization', `Bearer ${accessToken}`)
      console.log('Authorization header set with token')
    } else {
      console.log('No token available or not rehydrated yet')
    }

    return headers
  }
})

// Enhanced base query with error handling
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // Token expired or invalid - clear auth data using Redux action
    const { clearAuth } = await import('../slices/AuthSlice')
    api.dispatch(clearAuth())
    
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login'
    }
  }

  if (result.error && result.error.status === 403) {
    console.error('Access denied: Insufficient permissions')
  }

  if (result.error && result.error.status && result.error.status === 500) {
    console.error('Server error:', result.error.data || 'Internal server error')
  }

  return result
}

// Create the base API
export const baseAPI = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Club', 'Event', 'User', 'Achievement', 'ClubRegistration', 'Committee', 'Engagement'],
  keepUnusedDataFor: 60, // Keep cache for 1 minute to allow fresh data on navigation
  refetchOnMountOrArgChange: true, // Refetch data when component mounts or args change
  refetchOnFocus: false, // Don't refetch when window regains focus
  refetchOnReconnect: true, // Refetch on network reconnect
  endpoints: () => ({}),
})

export default baseAPI