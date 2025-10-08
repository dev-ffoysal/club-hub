import { ApiResponse } from "@/types/response";
import baseAPI from "./baseAPI";
import { IEvent, IEventFilterables } from "@/types/interfaces";

interface IEventQueryParams extends IEventFilterables {
  page?: number;
  limit?: number;
}

export const eventAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<ApiResponse<IEvent[]>, IEventFilterables>({
      query: (params) => ({
        url: '/event/',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...(result?.data || []).map(({ _id }) => ({ type: 'Event' as const, id: _id })),
              { type: 'Event', id: 'LIST' },
            ]
          : [{ type: 'Event', id: 'LIST' }],
    }),
     getClubEvents: builder.query<ApiResponse<IEvent[]>, IEventFilterables>({
      query: (params) => ({
        url: '/event/club',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...(result?.data || []).map(({ _id }) => ({ type: 'Event' as const, id: _id })),
              { type: 'Event', id: 'LIST' },
            ]
          : [{ type: 'Event', id: 'LIST' }],
    }),
    getSingleEvent: builder.query<ApiResponse<IEvent>, string>({
      query: (id) => ({
        url: `/event/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Event', id }],
    }),
    createEvent: builder.mutation<ApiResponse<IEvent>, FormData>({
      query: (data) => ({
        url: '/event/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Event', id: 'LIST' }],
    }),
    updateEvent: builder.mutation<ApiResponse<IEvent>, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/event/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Event', id },
        { type: 'Event', id: 'LIST' },
      ],
    }),
  }),
})

export const { useGetEventsQuery, useGetClubEventsQuery, useGetSingleEventQuery, useCreateEventMutation, useUpdateEventMutation } = eventAPI
