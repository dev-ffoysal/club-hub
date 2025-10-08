'use client'

import { useState, useEffect } from 'react'
import { Button } from './button'
import { Badge } from './badge'
import { Users, ArrowUp, ArrowDown, UserPlus } from 'lucide-react'
import { useAppSelector } from '@/store/hooks'
import { 
  useToggleEventVoteMutation, 
  useToggleClubFollowMutation 
} from '@/store/api/engagementAPI'
import { USER_ROLES } from '@/types/interfaces'

interface SocialInteractionsProps {
  eventId: string
  clubId?: string
  followers?: number // Optional for events
  upvotes: number
  downvotes: number
  isLoggedIn?: boolean
  isFollowing?: boolean
  userVote?: 'upvote' | 'downvote' | null
  onFollow?: (eventId: string) => void
  onUnfollow?: (eventId: string) => void
  onUpvote?: (eventId: string) => void
  onDownvote?: (eventId: string) => void
  onRemoveVote?: (eventId: string) => void
  className?: string
  showFollowers?: boolean // Control whether to show followers
}

export function SocialInteractions({
  eventId,
  clubId,
  followers = 0,
  upvotes,
  downvotes,
  isLoggedIn = false,
  isFollowing = false,
  userVote = null,
  onFollow,
  onUnfollow,
  onUpvote,
  onDownvote,
  onRemoveVote,
  className = '',
  showFollowers = true
}: SocialInteractionsProps) {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const [localFollowers, setLocalFollowers] = useState(followers)
  const [localUpvotes, setLocalUpvotes] = useState(upvotes)
  const [localDownvotes, setLocalDownvotes] = useState(downvotes)
  const [localIsFollowing, setLocalIsFollowing] = useState(isFollowing)
  const [localUserVote, setLocalUserVote] = useState(userVote)

  // API hooks
  const [toggleEventVote] = useToggleEventVoteMutation()
  const [toggleClubFollow] = useToggleClubFollowMutation()

  // Check if user is a member (only members can vote/follow)
  const isMember = user?.role === USER_ROLES.MEMBER
  const isClub = user?.role === USER_ROLES.CLUB
  const canInteract = isAuthenticated && isMember

  // Initialize local state with backend-provided values
  useEffect(() => {
    setLocalIsFollowing(isFollowing)
    setLocalUserVote(userVote)
    setLocalFollowers(followers)
    setLocalUpvotes(upvotes)
    setLocalDownvotes(downvotes)
  }, [isFollowing, userVote, followers, upvotes, downvotes])

  const handleFollow = async () => {
    if (!canInteract || !clubId) return
    
    try {
      const result = await toggleClubFollow(clubId).unwrap()
      
      if (result?.data?.isFollowing) {
        setLocalFollowers(result.data.followerCount)
        setLocalIsFollowing(true)
        onFollow?.(eventId)
      } else {
        setLocalFollowers(result?.data?.followerCount || 0)
        setLocalIsFollowing(false)
        onUnfollow?.(eventId)
      }
    } catch (error) {
      console.error('Failed to toggle follow status:', error)
      // Optionally show error toast/notification
    }
  }

  const handleUpvote = async () => {
    if (!canInteract) return
    
    try {
      const result = await toggleEventVote({ eventId, voteType: 'upvote' }).unwrap()
      
      // Update local state based on API response
      if (result?.data?.isVoted) {
        // Added upvote
        if (localUserVote === 'downvote') {
          setLocalDownvotes(prev => prev - 1)
        }
        setLocalUpvotes(result.data.voteCount)
        setLocalUserVote('upvote')
        onUpvote?.(eventId)
      } else {
        // Removed upvote
        setLocalUpvotes(result?.data?.voteCount || 0)
        setLocalUserVote(null)
        onRemoveVote?.(eventId)
      }
    } catch (error) {
      console.error('Failed to toggle upvote:', error)
      // Optionally show error toast/notification
    }
  }

  const handleDownvote = async () => {
    if (!canInteract) return
    
    try {
      const result = await toggleEventVote({ eventId, voteType: 'downvote' }).unwrap()
      
      // Update local state based on API response
      if (result?.data?.isVoted) {
        // Added downvote
        if (localUserVote === 'upvote') {
          setLocalUpvotes(prev => prev - 1)
        }
        setLocalDownvotes(result?.data?.voteCount || 0)
        setLocalUserVote('downvote')
        onDownvote?.(eventId)
      } else {
        // Removed downvote
        setLocalDownvotes(result?.data?.voteCount || 0)
        setLocalUserVote(null)
        onRemoveVote?.(eventId)
      }
    } catch (error) {
      console.error('Failed to toggle downvote:', error)
      // Optionally show error toast/notification
    }
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Social Stats */}
      <div className="flex items-center space-x-4 text-sm ">
        {/* Followers - only show if showFollowers is true */}
        {showFollowers && (
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{localFollowers} followers</span>
          </div>
        )}
        <div className="flex items-center space-x-1">
          <ArrowUp className={`w-4 h-4 ${localUserVote === 'upvote' ? 'text-blue-600' : ''}`} />
          <span>{localUpvotes}</span>
        </div>
        <div className="flex items-center space-x-1">
          <ArrowDown className={`w-4 h-4 ${localUserVote === 'downvote' ? 'text-red-600' : ''}`} />
          <span>{localDownvotes}</span>
        </div>
      </div>

      {/* Action Buttons - Role-based rendering */}
      {isAuthenticated ? (
        <div className="flex items-center space-x-2">
          {/* Follow Button - Only for members and only if clubId is provided and showFollowers is true */}
          {clubId && showFollowers && (
            <Button
              variant={localIsFollowing ? "default" : "outline"}
              size="sm"
              onClick={handleFollow}
              disabled={!canInteract}
              className="text-xs"
              title={!canInteract ? "Only members can follow clubs" : ""}
            >
              {localIsFollowing ? (
                <>
                  <UserPlus className="w-4 h-4 mr-1" />
                  Following
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-1" />
                  Follow
                </>
              )}
            </Button>
          )}
          
          {/* Vote Buttons - Only for members */}
          <Button
            variant={localUserVote === 'upvote' ? "default" : "outline"}
            size="sm"
            onClick={handleUpvote}
            disabled={!canInteract}
            className={`text-xs ${localUserVote === 'upvote' ? 'bg-blue-600 hover:bg-blue-700 border-blue-600' : 'hover:bg-blue-50 hover:border-blue-300'}`}
            title={!canInteract ? "Only members can vote on events" : ""}
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
          
          <Button
            variant={localUserVote === 'downvote' ? "default" : "outline"}
            size="sm"
            onClick={handleDownvote}
            disabled={!canInteract}
            className={`text-xs ${localUserVote === 'downvote' ? 'bg-red-600 hover:bg-red-700 border-red-600' : 'hover:bg-red-50 hover:border-red-300'}`}
            title={!canInteract ? "Only members can vote on events" : ""}
          >
            <ArrowDown className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        /* Login prompt for non-authenticated users */
        <Badge variant="outline" className="text-xs text-gray-500">
          Login to interact
        </Badge>
      )}

      {/* Role-based messaging for clubs */}
      {isAuthenticated && isClub && (
        <Badge variant="outline" className="text-xs text-blue-500">
          Club account - View only
        </Badge>
      )}
    </div>
  )
}