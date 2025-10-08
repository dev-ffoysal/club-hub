import { ApiResponse } from '@/types'
import { baseAPI } from './baseAPI'
import { IClubUser } from '@/types/interfaces'


interface ClubFilters {
  page?: number
  limit?: number
  status?: string
  categories?: string[]
  universities?: string[]
  searchTerm?: string
  tags?: string[]
}

// Club API endpoints
export const clubAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getClubs: builder.query<ApiResponse<IClubUser[]>, ClubFilters>({
      query: (params) => ({
        url: '/user/all-club',
        params,
      }),
      transformResponse: (response: ApiResponse<IClubUser[]>) => response,
      providesTags: (result) =>
        result
          ? [
              ...(result?.data || []).map(({ _id }) => ({ type: 'Club' as const, id: _id })),
              { type: 'Club', id: 'LIST' },
            ]
          : [{ type: 'Club', id: 'LIST' }],
    }),

    getClubById: builder.query<ApiResponse<IClubUser>, string>({
      query: (clubId) => `/user/${clubId}`,
      providesTags: (result, error, id) => [{ type: 'Club', id }],
    }),

    createClub: builder.mutation<IClubUser, Partial<IClubUser>>({
      query: (clubData) => ({
        url: '/clubs',
        method: 'POST',
        body: clubData,
      }),
      invalidatesTags: [{ type: 'Club', id: 'LIST' }],
    }),

    updateClub: builder.mutation<IClubUser, { clubId: string; clubData: Partial<IClubUser> }>({
      query: ({ clubId, clubData }) => ({
        url: `/clubs/${clubId}`,
        method: 'PUT',
        body: clubData,
      }),
      invalidatesTags: (result, error, { clubId }) => [
        { type: 'Club', id: clubId },
        { type: 'Club', id: 'LIST' },
      ],
    }),

    deleteClub: builder.mutation<void, string>({
      query: (clubId) => ({
        url: `/clubs/${clubId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, clubId) => [
        { type: 'Club', id: clubId },
        { type: 'Club', id: 'LIST' },
      ],
    }),

    approveClub: builder.mutation<IClubUser, string>({
      query: (clubId) => ({
        url: `/clubs/${clubId}/approve`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, clubId) => [
        { type: 'Club', id: clubId },
        { type: 'Club', id: 'LIST' },
      ],
    }),

    rejectClub: builder.mutation<IClubUser, { clubId: string; reason?: string }>({
      query: ({ clubId, reason }) => ({
        url: `/clubs/${clubId}/reject`,
        method: 'POST',
        body: { reason },
      }),
      invalidatesTags: (result, error, { clubId }) => [
        { type: 'Club', id: clubId },
        { type: 'Club', id: 'LIST' },
      ],
    }),

    suspendClub: builder.mutation<IClubUser, { clubId: string; reason?: string }>({
      query: ({ clubId, reason }) => ({
        url: `/clubs/${clubId}/suspend`,
        method: 'POST',
        body: { reason },
      }),
      invalidatesTags: (result, error, { clubId }) => [
        { type: 'Club', id: clubId },
        { type: 'Club', id: 'LIST' },
      ],
    }),

    activateClub: builder.mutation<IClubUser, string>({
      query: (clubId) => ({
        url: `/clubs/${clubId}/activate`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, clubId) => [
        { type: 'Club', id: clubId },
        { type: 'Club', id: 'LIST' },
      ],
    }),

    getClubMembers: builder.query<any, { clubId: string; page?: number; limit?: number }>({
      query: ({ clubId, ...params }) => ({
        url: `/clubs/${clubId}/members`,
        params,
      }),
      providesTags: (result, error, { clubId }) => [
        { type: 'Club', id: `${clubId}-members` },
      ],
    }),

    joinClub: builder.mutation<void, string>({
      query: (clubId) => ({
        url: `/clubs/${clubId}/join`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, clubId) => [
        { type: 'Club', id: clubId },
        { type: 'Club', id: `${clubId}-members` },
      ],
    }),

    leaveClub: builder.mutation<void, string>({
      query: (clubId) => ({
        url: `/clubs/${clubId}/leave`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, clubId) => [
        { type: 'Club', id: clubId },
        { type: 'Club', id: `${clubId}-members` },
      ],
    }),





    searchClubs: builder.query<IClubUser[], { query: string; filters?: any }>({
      query: ({ query, filters }) => ({
        url: '/clubs/search',
        params: { q: query, ...filters },
      }),
      providesTags: [{ type: 'Club', id: 'SEARCH' }],
    }),

    getFeaturedClubs: builder.query<IClubUser[], void>({
      query: () => '/clubs/featured',
      providesTags: [{ type: 'Club', id: 'FEATURED' }],
    }),

    getPopularClubs: builder.query<IClubUser[], void>({
      query: () => '/clubs/popular',
      providesTags: [{ type: 'Club', id: 'POPULAR' }],
    }),

    getRecentClubs: builder.query<IClubUser[], void>({
      query: () => '/clubs/recent',
      providesTags: [{ type: 'Club', id: 'RECENT' }],
    }),
  }),
})

// Export hooks for use in components
export const {
  useGetClubsQuery,
  useGetClubByIdQuery,
  useCreateClubMutation,
  useUpdateClubMutation,
  useDeleteClubMutation,
  useApproveClubMutation,
  useRejectClubMutation,
  useSuspendClubMutation,
  useActivateClubMutation,
  useGetClubMembersQuery,
  useJoinClubMutation,
  useLeaveClubMutation,
  useSearchClubsQuery,
  useGetFeaturedClubsQuery,
  useGetPopularClubsQuery,
  useGetRecentClubsQuery,
} = clubAPI