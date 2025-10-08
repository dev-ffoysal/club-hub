import { ApiResponse } from '@/types/response'
import { baseAPI } from './baseAPI'
import { ICommitte, ICommitteFilterables, MembersItem } from '@/types/commite'

interface CommitteeFilters extends ICommitteFilterables {
  page?: number
  limit?: number
  searchTerm?: string
  clubId?: string
  sortBy?: 'createdAt' | 'updatedAt' | 'from' | 'to'
  sortOrder?: 'asc' | 'desc'
}

interface PaginatedCommitteeResponse {
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  data: ICommitte[]
}

interface CreateCommitteeRequest {
  from: string
  to: string
  members: MembersItem[]
}

interface UpdateCommitteeRequest {
  from?: string
  to?: string
  members: MembersItem[]
}

// Committee API endpoints
export const committeeAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Get all committees with filtering and pagination
    getCommittees: builder.query<ApiResponse<ICommitte[]>, CommitteeFilters>({
      query: (params) => ({
        url: '/committe',
        params,
      }),
      transformResponse: (response: ApiResponse<ICommitte[]>) => response,
      providesTags: (result) =>
        result
          ? [
              ...(result?.data || []).map(({ _id }) => ({ type: 'Committee' as const, id: _id })),
              { type: 'Committee', id: 'LIST' },
            ]
          : [{ type: 'Committee', id: 'LIST' }],
    }),

    // Get committee by ID
    getCommitteeById: builder.query<ApiResponse<ICommitte>, string>({
      query: (committeeId) => ({
        url: `/committe/${committeeId}`,
        params: { populate: 'members.member' }
      }),
      transformResponse: (response: ApiResponse<ICommitte>) => response,
      providesTags: (result, error, id) => [{ type: 'Committee', id }],
    }),

    // Create new committee
    createCommittee: builder.mutation<ApiResponse<ICommitte>, CreateCommitteeRequest>({
      query: (data) => ({
        url: '/committe',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: ApiResponse<ICommitte>) => response,
      invalidatesTags: [
        { type: 'Committee', id: 'LIST' },
      ],
    }),

    // Update committee
    updateCommittee: builder.mutation<ApiResponse<ICommitte>, { committeeId: string; data: UpdateCommitteeRequest }>({
      query: ({ committeeId, data }) => ({
        url: `/committe/${committeeId}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response: ApiResponse<ICommitte>) => response,
      invalidatesTags: (result, error, { committeeId }) => [
        { type: 'Committee', id: committeeId },
        { type: 'Committee', id: 'LIST' },
      ],
    }),

    // Toggle committee status (activate/deactivate)
    toggleCommitteeStatus: builder.mutation<ApiResponse<ICommitte>, string>({
      query: (committeeId) => ({
        url: `/committe/${committeeId}`,
        method: 'DELETE',
      }),
      transformResponse: (response: ApiResponse<ICommitte>) => response,
      invalidatesTags: (result, error, committeeId) => [
        { type: 'Committee', id: committeeId },
        { type: 'Committee', id: 'LIST' },
      ],
    }),
  }),
})

// Export hooks for use in components
export const {
  useGetCommitteesQuery,
  useGetCommitteeByIdQuery,
  useCreateCommitteeMutation,
  useUpdateCommitteeMutation,
  useToggleCommitteeStatusMutation,
} = committeeAPI