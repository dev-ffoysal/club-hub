import { baseAPI } from './baseAPI'
import { ApiResponse } from '../../types/response'
import { IUser } from '../../types/interfaces'

export const usersAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<ApiResponse<IUser[]>, { page?: number; limit?: number; search?: string }>({
      query: ({ page = 1, limit = 50, search = '' }) => ({
        url: '/users',
        params: { page, limit, search }
      }),
      providesTags: ['User'],
    }),
    getUserById: builder.query<ApiResponse<IUser>, string>({
      query: (userId) => `/users/${userId}`,
      providesTags: ['User'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
} = usersAPI