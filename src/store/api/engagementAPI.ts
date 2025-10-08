import { ApiResponse } from "@/types/response";
import baseAPI from "./baseAPI";

// Types for engagement API
export interface VoteResponse {
  eventId: string;
  isVoted: boolean;
  voteCount: number;
}

export interface FollowResponse {
  clubId: string;
  isFollowing: boolean;
  followerCount: number;
}



export const engagementAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Toggle vote/unvote status for an event
    toggleEventVote: builder.mutation<ApiResponse<VoteResponse>, { eventId: string; voteType: 'upvote' | 'downvote' }>({
      query: ({ eventId, voteType }) => ({
        url: `/engagement/vote/${eventId}`,
        method: 'PATCH',
        body: { voteType },
      }),
      invalidatesTags: (result, error, { eventId }) => [
        { type: 'Event', id: eventId },
        { type: 'Event', id: 'LIST' },
      ],
    }),

    // Create or remove a follow relationship
    toggleClubFollow: builder.mutation<ApiResponse<FollowResponse>, string>({
      query: (clubId) => ({
        url: `/follow/${clubId}`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, clubId) => [
        { type: 'Club', id: clubId },
        { type: 'Club', id: 'LIST' },
        { type: 'User', id: 'CURRENT' },
      ],
    }),
  }),
});

export const {
  useToggleEventVoteMutation,
  useToggleClubFollowMutation,
} = engagementAPI;