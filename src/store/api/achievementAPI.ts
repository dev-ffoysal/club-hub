
import { ApiResponse } from '@/types/response'
import { baseAPI } from './baseAPI'
import { IAchievement } from '@/types/interfaces'

interface AchievementFilters {
  page?: number
  limit?: number
  isPublic?: boolean
  tags?: string[]
  searchTerm?: string
  clubId?: string
  event?: string
  sortBy?: 'date' | 'title' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

interface PaginatedAchievementResponse {
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  data: IAchievement[]
}

interface CreateAchievementRequest {
  title: string
  subTitle: string
  description: string
  subDescription: string
  date: string
  teams:string[]
  tags: string[]
  event?: string
  organizedBy?: {
    name: string
    image: string
    title: string
    description?: string
    email?: string
    phone?: string
    website?: string
  }
}

interface UpdateAchievementRequest extends Partial<CreateAchievementRequest> {
  _id: string
}

// Achievement API endpoints
export const achievementAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Get all achievements with filtering
    getAchievements: builder.query<ApiResponse<PaginatedAchievementResponse>, AchievementFilters>({
      query: (params) => ({
        url: '/achievement',
        params,
      }),
      transformResponse: (response: ApiResponse<PaginatedAchievementResponse>) => response,
      providesTags: (result) =>
        result
          ? [
              ...(result?.data?.data || []).map(({ _id }) => ({ type: 'Achievement' as const, id: _id })),
              { type: 'Achievement', id: 'LIST' },
            ]
          : [{ type: 'Achievement', id: 'LIST' }],
    }),

    // Get single achievement by ID
    getAchievementById: builder.query<ApiResponse<IAchievement>, string>({
      query: (achievementId) => `/achievement/${achievementId}`,
      transformResponse: (response: ApiResponse<IAchievement>) => response,
      providesTags: (result, error, id) => [{ type: 'Achievement', id }],
    }),

    // Get achievements by club ID
    getAchievementsByClub: builder.query<ApiResponse<IAchievement[]>, string>({
      query: (clubId) => ({
        url: `/achievement/club/${clubId}`,
      }),
      transformResponse: (response: ApiResponse<IAchievement[]>) => response,
      providesTags: (result, error, clubId) => [
        { type: 'Achievement', id: `CLUB_${clubId}` },
        { type: 'Achievement', id: 'LIST' },
      ],
    }),

    // Create new achievement
    createAchievement: builder.mutation<ApiResponse<IAchievement>, FormData>({
      query: (achievementData) => ({
        url: '/achievement',
        method: 'POST',
        body: achievementData,
      }),
      transformResponse: (response: ApiResponse<IAchievement>) => response,
      invalidatesTags: [
        { type: 'Achievement', id: 'LIST' },
        { type: 'Achievement', id: 'CLUB_LIST' },
      ],
    }),

    // Update achievement
    updateAchievement: builder.mutation<ApiResponse<IAchievement>, { achievementId: string; data: FormData }>({
      query: ({ achievementId, data }) => ({
        url: `/achievement/${achievementId}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response: ApiResponse<IAchievement>) => response,
      invalidatesTags: (result, error, { achievementId }) => [
        { type: 'Achievement', id: achievementId },
        { type: 'Achievement', id: 'LIST' },
        { type: 'Achievement', id: 'CLUB_LIST' },
      ],
    }),

    // Delete achievement
    deleteAchievement: builder.mutation<ApiResponse<void>, string>({
      query: (achievementId) => ({
        url: `/achievement/${achievementId}`,
        method: 'DELETE',
      }),
      transformResponse: (response: ApiResponse<void>) => response,
      invalidatesTags: (result, error, achievementId) => [
        { type: 'Achievement', id: achievementId },
        { type: 'Achievement', id: 'LIST' },
        { type: 'Achievement', id: 'CLUB_LIST' },
      ],
    }),

    // Toggle achievement visibility (public/private)
    toggleAchievementVisibility: builder.mutation<ApiResponse<IAchievement>, { achievementId: string; isPublic: boolean }>({
      query: ({ achievementId, isPublic }) => ({
        url: `/achievement/${achievementId}/visibility`,
        method: 'PATCH',
        body: { isPublic },
      }),
      transformResponse: (response: ApiResponse<IAchievement>) => response,
      invalidatesTags: (result, error, { achievementId }) => [
        { type: 'Achievement', id: achievementId },
        { type: 'Achievement', id: 'LIST' },
      ],
    }),

    // Get public achievements (for public display)
    getPublicAchievements: builder.query<ApiResponse<IAchievement[]>, AchievementFilters>({
      query: (params) => ({
        url: '/achievement/public',
        params,
      }),
      transformResponse: (response: ApiResponse<IAchievement[]>) => response,
      providesTags: [{ type: 'Achievement', id: 'PUBLIC_LIST' }],
    }),

    // Get featured achievements
    getFeaturedAchievements: builder.query<ApiResponse<IAchievement[]>, void>({
      query: () => '/achievements/featured',
      transformResponse: (response: ApiResponse<IAchievement[]>) => response,
      providesTags: [{ type: 'Achievement', id: 'FEATURED' }],
    }),

    // Search achievements
    searchAchievements: builder.query<ApiResponse<IAchievement[]>, { query: string; filters?: AchievementFilters }>({
      query: ({ query, filters = {} }) => ({
        url: '/achievement/search',
        params: { q: query, ...filters },
      }),
      transformResponse: (response: ApiResponse<IAchievement[]>) => response,
      providesTags: [{ type: 'Achievement', id: 'SEARCH' }],
    }),

    // Bulk operations
    bulkDeleteAchievements: builder.mutation<ApiResponse<void>, string[]>({
      query: (achievementIds) => ({
        url: '/achievement/bulk-delete',
        method: 'DELETE',
        body: { achievementIds },
      }),
      transformResponse: (response: ApiResponse<void>) => response,
      invalidatesTags: [
        { type: 'Achievement', id: 'LIST' },
        { type: 'Achievement', id: 'CLUB_LIST' },
      ],
    }),

    // Bulk update visibility
    bulkUpdateVisibility: builder.mutation<ApiResponse<IAchievement[]>, { achievementIds: string[]; isPublic: boolean }>({
      query: ({ achievementIds, isPublic }) => ({
        url: '/achievement/bulk-visibility',
        method: 'PATCH',
        body: { achievementIds, isPublic },
      }),
      transformResponse: (response: ApiResponse<IAchievement[]>) => response,
      invalidatesTags: [
        { type: 'Achievement', id: 'LIST' },
        { type: 'Achievement', id: 'CLUB_LIST' },
      ],
    }),
  }),
})

// Export hooks for use in components
export const {
  useGetAchievementsQuery,
  useGetAchievementByIdQuery,
  useGetAchievementsByClubQuery,
  useCreateAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,
  useToggleAchievementVisibilityMutation,
  useGetPublicAchievementsQuery,
  useGetFeaturedAchievementsQuery,
  useSearchAchievementsQuery,
  useBulkDeleteAchievementsMutation,
  useBulkUpdateVisibilityMutation,
} = achievementAPI