'use client'

import { useState } from 'react'
import { Button } from './button'
import { Badge } from './badge'
import { Users, ThumbsUp, ThumbsDown, UserPlus } from 'lucide-react'

interface SocialInteractionsProps {
  eventId: string
  followers: number
  upvotes: number
  downvotes: number
  isLoggedIn?: boolean
  isFollowing?: boolean
  userVote?: 'up' | 'down' | null
  onFollow?: (eventId: string) => void
  onUnfollow?: (eventId: string) => void
  onUpvote?: (eventId: string) => void
  onDownvote?: (eventId: string) => void
  onRemoveVote?: (eventId: string) => void
  className?: string
}

export function SocialInteractions({
  eventId,
  followers,
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
  className = ''
}: SocialInteractionsProps) {
  const [localFollowers, setLocalFollowers] = useState(followers)
  const [localUpvotes, setLocalUpvotes] = useState(upvotes)
  const [localDownvotes, setLocalDownvotes] = useState(downvotes)
  const [localIsFollowing, setLocalIsFollowing] = useState(isFollowing)
  const [localUserVote, setLocalUserVote] = useState(userVote)

  const handleFollow = () => {
    if (!isLoggedIn) return
    
    if (localIsFollowing) {
      setLocalFollowers(prev => prev - 1)
      setLocalIsFollowing(false)
      onUnfollow?.(eventId)
    } else {
      setLocalFollowers(prev => prev + 1)
      setLocalIsFollowing(true)
      onFollow?.(eventId)
    }
  }

  const handleUpvote = () => {
    if (!isLoggedIn) return
    
    if (localUserVote === 'up') {
      // Remove upvote
      setLocalUpvotes(prev => prev - 1)
      setLocalUserVote(null)
      onRemoveVote?.(eventId)
    } else {
      // Add upvote
      if (localUserVote === 'down') {
        setLocalDownvotes(prev => prev - 1)
      }
      setLocalUpvotes(prev => prev + 1)
      setLocalUserVote('up')
      onUpvote?.(eventId)
    }
  }

  const handleDownvote = () => {
    if (!isLoggedIn) return
    
    if (localUserVote === 'down') {
      // Remove downvote
      setLocalDownvotes(prev => prev - 1)
      setLocalUserVote(null)
      onRemoveVote?.(eventId)
    } else {
      // Add downvote
      if (localUserVote === 'up') {
        setLocalUpvotes(prev => prev - 1)
      }
      setLocalDownvotes(prev => prev + 1)
      setLocalUserVote('down')
      onDownvote?.(eventId)
    }
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Social Stats */}
      <div className="flex items-center space-x-4 text-sm ">
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4" />
          <span>{localFollowers} followers</span>
        </div>
        <div className="flex items-center space-x-1">
          <ThumbsUp className="w-4 h-4" />
          <span>{localUpvotes}</span>
        </div>
        <div className="flex items-center space-x-1">
          <ThumbsDown className="w-4 h-4" />
          <span>{localDownvotes}</span>
        </div>
      </div>

      {/* Action Buttons - Only for logged in users */}
      {isLoggedIn && (
        <div className="flex items-center space-x-2">
          <Button
            variant={localIsFollowing ? "default" : "outline"}
            size="sm"
            onClick={handleFollow}
            className="text-xs"
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
          
          <Button
            variant={localUserVote === 'up' ? "default" : "outline"}
            size="sm"
            onClick={handleUpvote}
            className={`text-xs ${localUserVote === 'up' ? 'bg-green-600 hover:bg-green-700' : ''}`}
          >
            <ThumbsUp className="w-4 h-4" />
          </Button>
          
          <Button
            variant={localUserVote === 'down' ? "default" : "outline"}
            size="sm"
            onClick={handleDownvote}
            className={`text-xs ${localUserVote === 'down' ? 'bg-red-600 hover:bg-red-700' : ''}`}
          >
            <ThumbsDown className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Login prompt for non-logged in users */}
      {!isLoggedIn && (
        <Badge variant="outline" className="text-xs text-gray-500">
          Login to interact
        </Badge>
      )}
    </div>
  )
}