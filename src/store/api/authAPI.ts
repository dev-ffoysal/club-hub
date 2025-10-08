import { ClubApplicationForm, IUser } from '@/types'
import { baseAPI } from './baseAPI'
import { setUser, setError, clearAuth, setTokens, setLoading } from '../slices/AuthSlice'

import { ApiResponse, IClubApplicationResponse, IMemberRegistrationResponse, IUserLoginResponse, IVerifyOtpResponse } from '@/types/response'
import { ILoginRequest, IMemberRegistration } from '@/types/request'






// Auth API endpoints
export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<IUserLoginResponse>, ILoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(setLoading(true))
          const { data } = await queryFulfilled
          
          console.log('Login response received:', data)
          
          if (data.data?.accessToken && data.data?.role) {
          
            
            // Store tokens in Redux store (Redux Persist will handle localStorage automatically)
            dispatch(setTokens({
              accessToken: data.data.accessToken,
              refreshToken: data.data.refreshToken || '',
            }))
            
            console.log('Tokens dispatched to Redux store')
            
            // Fetch complete user details after successful login
            try {
                console.log("💪💪💪💪💪💪💪","FETCHING PROFILE")

              const userResponse = await dispatch(authAPI.endpoints.checkAuthStatus.initiate()).unwrap()
              if (userResponse) {
                // Merge the role from login response with user data from getUserMe
                const userWithRole = { ...userResponse, role: data.data.role }
                console.log("💪💪💪💪💪💪💪",userWithRole)
                dispatch(setUser(userWithRole))
                console.log('Login successful, user data stored:', userWithRole)
              }
            } catch (userError) {
              console.error('Failed to fetch user data after login:', userError)
              dispatch(setError('Failed to fetch user data'))
            }
          } else {
            console.error('Login response missing required data:', {
              hasAccessToken: !!data.data?.accessToken,
              hasRole: !!data.data?.role,
              data: data.data
            })
          }
          dispatch(setLoading(false))
        } catch (error: any) {
          dispatch(setLoading(false))
          const errorMessage = error?.data?.message || 'Login failed'
          dispatch(setError(errorMessage))
          console.error('Login failed:', error)
        }
      },
      invalidatesTags: ['Auth'],
    }),

    register: builder.mutation<ApiResponse<IMemberRegistrationResponse>, IMemberRegistration>({
      query: (userData) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // Store auth data in localStorage
          console.log("registration completed:",data)

        } catch (error) {
          console.error('Registration failed:', error)
        }
      },
      invalidatesTags: ['Auth'],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          // Even if logout fails on server, clear auth state
          console.error('Logout error:', error)
        } finally {
          // Clear Redux auth state (Redux Persist will handle localStorage automatically)
          dispatch(clearAuth())
        }
      },
      invalidatesTags: ['Auth'],
    }),

    verifyOtp: builder.mutation<ApiResponse<IVerifyOtpResponse>, { email: string; oneTimeCode: string }>({
      query: (otpData) => ({
        url: '/auth/verify-account',
        method: 'POST',
        body: otpData,
      }),
      invalidatesTags: ['Auth'],
    }),

    checkAuthStatus: builder.query<IUser | null, void>({
      query: () => '/auth/me',
      transformResponse: (response: ApiResponse<IUser>) => response.data || null,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log("💪💪💪💪💪💪💪",data)

          if (data) {
            dispatch(setUser(data))
          }
        } catch (error) {
          // If auth check fails, clear auth state and local storage
          dispatch(clearAuth())
        }
      },
      providesTags: ['Auth'],
    }),



    applyClub: builder.mutation<ApiResponse<IClubApplicationResponse>, ClubApplicationForm>({
      query: (clubApplicationData) => ({
        url: '/application/create-club-application',
        method: 'POST',
        body: clubApplicationData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // Store auth data in localStorage
          console.log("club application completed:",data)

        } catch (error) {
          console.error('Registration failed:', error)
        }
      },
      invalidatesTags: ['Auth'],
    }),

    updateProfile: builder.mutation<ApiResponse<string>, FormData>({
      query: (userData) => ({
        url: '/user/member-profile',
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    updateClubProfile: builder.mutation<ApiResponse<string>, FormData>({
      query: (clubProfileData) => ({
        url: '/user/club-profile',
        method: 'PATCH',
        body: clubProfileData,
      }),
      invalidatesTags: ['User'],
    }),

    getProfile: builder.query<ApiResponse<Partial<IUser>>, void>({
      query: () => '/user/profile',
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data) {
            localStorage.setItem('user', JSON.stringify(data))
          }
        } catch (error) {
          // If auth check fails, clear local storage
          localStorage.removeItem('user')
        }
      },
      providesTags: ['User'],
    }),


  }),

  

})

// Export hooks for use in components
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useCheckAuthStatusQuery,
  useVerifyOtpMutation,
  useApplyClubMutation,
  useUpdateProfileMutation,
  useGetProfileQuery,
  useUpdateClubProfileMutation,
} = authAPI