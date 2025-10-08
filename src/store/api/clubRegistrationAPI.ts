import { ApiResponse } from '@/types/response'
import { baseAPI } from './baseAPI'
import { IClubregistration, CLUB_REGISTRATION_STATUS } from '@/types/interfaces'

interface ClubRegistrationFilters {
  page?: number
  limit?: number
  status?: CLUB_REGISTRATION_STATUS
  searchTerm?: string
  clubId?: string
  memberId?: string
  isPaymentRequired?: boolean
  paymentStatus?: string
  sortBy?: 'createdAt' | 'updatedAt' | 'member.name'
  sortOrder?: 'asc' | 'desc'
}

interface PaginatedRegistrationResponse {
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  data: IClubregistration[]
}

interface UpdateRegistrationStatusRequest {
  status: CLUB_REGISTRATION_STATUS
  reason?: string
}

interface RestrictAccessRequest {
  isRestricted: boolean
  reason?: string
}

interface BulkEmailRequest {
  registrationIds: string[]
  subject: string
  content: string
  isHtml?: boolean
}

// Club Registration API endpoints
export const clubRegistrationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Get all club registrations with filtering and pagination
    getClubRegistrations: builder.query<ApiResponse<PaginatedRegistrationResponse>, ClubRegistrationFilters>({
      query: (params) => ({
        url: '/club-registration',
        params,
      }),
      transformResponse: (response: ApiResponse<PaginatedRegistrationResponse>) => response,
      providesTags: (result) =>
        result
          ? [
              ...(result?.data?.data || []).map(({ _id }) => ({ type: 'ClubRegistration' as const, id: _id })),
              { type: 'ClubRegistration', id: 'LIST' },
            ]
          : [{ type: 'ClubRegistration', id: 'LIST' }],
    }),

    // Get single registration by ID
    getRegistrationById: builder.query<ApiResponse<IClubregistration>, string>({
      query: (registrationId) => `/club-registration/${registrationId}`,
      transformResponse: (response: ApiResponse<IClubregistration>) => response,
      providesTags: (result, error, id) => [{ type: 'ClubRegistration', id }],
    }),

    // Get registrations by club ID
    getRegistrationsByClub: builder.query<ApiResponse<PaginatedRegistrationResponse>, { clubId: string } & ClubRegistrationFilters>({
      query: ({ clubId, ...params }) => ({
        url: `/club-registration/club/${clubId}`,
        params,
      }),
      transformResponse: (response: ApiResponse<PaginatedRegistrationResponse>) => response,
      providesTags: (result, error, { clubId }) => [
        { type: 'ClubRegistration', id: `CLUB_${clubId}` },
        { type: 'ClubRegistration', id: 'LIST' },
      ],
    }),

    // Get registrations by member ID
    getRegistrationsByMember: builder.query<ApiResponse<IClubregistration[]>, string>({
      query: (memberId) => `/club-registration/member/${memberId}`,
      transformResponse: (response: ApiResponse<IClubregistration[]>) => response,
      providesTags: (result, error, memberId) => [
        { type: 'ClubRegistration', id: `MEMBER_${memberId}` },
      ],
    }),

    // Update registration status (approve/reject)
    updateRegistrationStatus: builder.mutation<ApiResponse<IClubregistration>, { registrationId: string; data: UpdateRegistrationStatusRequest }>({
      query: ({ registrationId, data }) => ({
        url: `/club-registration/${registrationId}/status`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response: ApiResponse<IClubregistration>) => response,
      invalidatesTags: (result, error, { registrationId }) => [
        { type: 'ClubRegistration', id: registrationId },
        { type: 'ClubRegistration', id: 'LIST' },
      ],
    }),

    // Approve registration
    approveRegistration: builder.mutation<ApiResponse<IClubregistration>, string>({
      query: (registrationId) => ({
        url: `/club-registration/${registrationId}/approve`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<IClubregistration>) => response,
      invalidatesTags: (result, error, registrationId) => [
        { type: 'ClubRegistration', id: registrationId },
        { type: 'ClubRegistration', id: 'LIST' },
      ],
    }),

    // Reject registration
    rejectRegistration: builder.mutation<ApiResponse<IClubregistration>, { registrationId: string; reason?: string }>({
      query: ({ registrationId, reason }) => ({
        url: `/club-registration/${registrationId}/reject`,
        method: 'POST',
        body: { reason },
      }),
      transformResponse: (response: ApiResponse<IClubregistration>) => response,
      invalidatesTags: (result, error, { registrationId }) => [
        { type: 'ClubRegistration', id: registrationId },
        { type: 'ClubRegistration', id: 'LIST' },
      ],
    }),

    // Restrict member access
    restrictMemberAccess: builder.mutation<ApiResponse<IClubregistration>, { registrationId: string; data: RestrictAccessRequest }>({
      query: ({ registrationId, data }) => ({
        url: `/club-registration/${registrationId}/restrict`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response: ApiResponse<IClubregistration>) => response,
      invalidatesTags: (result, error, { registrationId }) => [
        { type: 'ClubRegistration', id: registrationId },
        { type: 'ClubRegistration', id: 'LIST' },
      ],
    }),

    // Send bulk email to selected registrations
    sendBulkEmail: builder.mutation<ApiResponse<{ sent: number; failed: number }>, BulkEmailRequest>({
      query: (emailData) => ({
        url: '/club-registration/bulk-email',
        method: 'POST',
        body: emailData,
      }),
      transformResponse: (response: ApiResponse<{ sent: number; failed: number }>) => response,
    }),

    // Export registrations data
    exportRegistrations: builder.mutation<Blob, { format: 'csv' | 'pdf'; filters?: ClubRegistrationFilters }>({
      query: ({ format, filters = {} }) => ({
        url: `/club-registration/export/${format}`,
        method: 'POST',
        body: filters,
        responseHandler: (response) => response.blob(),
      }),
    }),

    // Get registration statistics
    getRegistrationStats: builder.query<ApiResponse<{
      total: number
      pending: number
      approved: number
      rejected: number
      manual: number
      recentRegistrations: number
    }>, { clubId?: string; period?: 'week' | 'month' | 'year' }>({
      query: (params) => ({
        url: '/club-registration/stats',
        params,
      }),
      providesTags: [{ type: 'ClubRegistration', id: 'STATS' }],
    }),

    // Search registrations
    searchRegistrations: builder.query<ApiResponse<IClubregistration[]>, { query: string; filters?: ClubRegistrationFilters }>({
      query: ({ query, filters = {} }) => ({
        url: '/club-registration/search',
        params: { q: query, ...filters },
      }),
      transformResponse: (response: ApiResponse<IClubregistration[]>) => response,
      providesTags: [{ type: 'ClubRegistration', id: 'SEARCH' }],
    }),

    // Bulk operations
    bulkUpdateStatus: builder.mutation<ApiResponse<{ updated: number; failed: number }>, { registrationIds: string[]; status: CLUB_REGISTRATION_STATUS; reason?: string }>({
      query: ({ registrationIds, status, reason }) => ({
        url: '/club-registration/bulk-status',
        method: 'PATCH',
        body: { registrationIds, status, reason },
      }),
      transformResponse: (response: ApiResponse<{ updated: number; failed: number }>) => response,
      invalidatesTags: [
        { type: 'ClubRegistration', id: 'LIST' },
      ],
    }),

    // Delete registration (admin only)
    deleteRegistration: builder.mutation<ApiResponse<void>, string>({
      query: (registrationId) => ({
        url: `/club-registration/${registrationId}`,
        method: 'DELETE',
      }),
      transformResponse: (response: ApiResponse<void>) => response,
      invalidatesTags: (result, error, registrationId) => [
        { type: 'ClubRegistration', id: registrationId },
        { type: 'ClubRegistration', id: 'LIST' },
      ],
    }),
  }),
})

// Export hooks for use in components
export const {
  useGetClubRegistrationsQuery,
  useGetRegistrationByIdQuery,
  useGetRegistrationsByClubQuery,
  useGetRegistrationsByMemberQuery,
  useUpdateRegistrationStatusMutation,
  useApproveRegistrationMutation,
  useRejectRegistrationMutation,
  useRestrictMemberAccessMutation,
  useSendBulkEmailMutation,
  useExportRegistrationsMutation,
  useGetRegistrationStatsQuery,
  useSearchRegistrationsQuery,
  useBulkUpdateStatusMutation,
  useDeleteRegistrationMutation,
} = clubRegistrationAPI