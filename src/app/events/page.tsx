'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Navbar } from '../../components/layout/navbar'
import { Countdown } from '../../components/ui/countdown'
import { SocialInteractions } from '../../components/ui/social-interactions'
import { EVENT_CATEGORIES } from '../../lib/constants'
import { formatDate, formatTime, getTimeUntil, isEventUpcoming, isEventWithinWeek } from '../../lib/utils'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { User } from '../../types'
import { User as UserIcon, Lock, Trophy, Globe, Building2, Users, Calendar, MapPin, Clock } from 'lucide-react'

// Mock data - replace with actual API calls
const mockEvents = [
  {
    id: '1',
    title: 'AI and Machine Learning Workshop',
    description: 'Learn the fundamentals of AI and ML with hands-on projects and real-world applications.',
    category: 'workshop' as const,
    type: 'event' as const,
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // 3 hours later
    location: 'Computer Lab, Building A',
    isOnline: false,
    maxParticipants: 50,
    currentParticipants: 32,
    registrationDeadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    isPublic: true,
    commentsEnabled: true,
    tags: ['AI', 'Machine Learning', 'Technology'],
    club: {
      id: '1',
      name: 'Computer Science Club',
      university: 'University of Dhaka'
    },
    image: '/events/ai-workshop.jpg',
    followers: 127,
    upvotes: 89,
    downvotes: 12
  },
  {
    id: '2',
    title: 'National Business Plan Competition',
    description: 'Present your innovative business ideas and compete for prizes worth BDT 50,000.',
    category: 'competition' as const,
    type: 'competition' as const,
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000), // 9 hours later
    location: 'Main Auditorium',
    isOnline: false,
    maxParticipants: 100,
    currentParticipants: 78,
    registrationDeadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    isPublic: true,
    commentsEnabled: true,
    tags: ['Business', 'Competition', 'Entrepreneurship'],
    club: {
      id: '2',
      name: 'Business Club',
      university: 'North South University'
    },
    image: '/events/business-competition.jpg',
    followers: 234,
    upvotes: 156,
    downvotes: 23
  },
  {
    id: '3',
    title: 'Photography Exhibition: "Moments of Bangladesh"',
    description: 'Showcase the beauty of Bangladesh through the lens of talented student photographers.',
    category: 'social' as const,
    type: 'event' as const,
    startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    location: 'Art Gallery, Student Center',
    isOnline: false,
    maxParticipants: 200,
    currentParticipants: 145,
    registrationDeadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    isPublic: true,
    commentsEnabled: true,
    tags: ['Photography', 'Art', 'Culture'],
    club: {
      id: '3',
      name: 'Photography Club',
      university: 'BRAC University'
    },
    image: '/events/photo-exhibition.jpg',
    followers: 89,
    upvotes: 67,
    downvotes: 8
  },
  {
    id: '4',
    title: 'Climate Change Seminar',
    description: 'Understanding the impact of climate change on Bangladesh and sustainable solutions.',
    category: 'seminar' as const,
    type: 'event' as const,
    startDate: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    endDate: new Date(Date.now() + 8.5 * 60 * 60 * 1000), // 8.5 hours from now
    location: 'Online via Zoom',
    isOnline: true,
    meetingLink: 'https://zoom.us/j/123456789',
    maxParticipants: 300,
    currentParticipants: 156,
    registrationDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    isPublic: true,
    commentsEnabled: true,
    tags: ['Environment', 'Climate', 'Sustainability'],
    club: {
      id: '5',
      name: 'Environmental Club',
      university: 'Jahangirnagar University'
    },
    image: '/events/climate-seminar.jpg',
    followers: 312,
    upvotes: 245,
    downvotes: 34
  },
  {
    id: '5',
    title: 'Inter-University Debate Championship',
    description: 'The biggest debate competition bringing together the best debaters from across Bangladesh.',
    category: 'competition' as const,
    type: 'competition' as const,
    startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    endDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
    location: 'Main Campus Auditorium',
    isOnline: false,
    maxParticipants: 80,
    currentParticipants: 64,
    registrationDeadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
    isPublic: true,
    commentsEnabled: true,
    tags: ['Debate', 'Competition', 'Public Speaking'],
    club: {
      id: '4',
      name: 'Debate Society',
      university: 'BUET'
    },
    image: '/events/debate-championship.jpg',
    followers: 178,
    upvotes: 134,
    downvotes: 19
  },
  {
    id: '6',
    title: 'Cultural Night: "Harmony of Traditions"',
    description: 'A celebration of diverse cultures through music, dance, and traditional performances.',
    category: 'social' as const,
    type: 'event' as const,
    startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // 4 hours later
    location: 'Open Air Theater',
    isOnline: false,
    maxParticipants: 500,
    currentParticipants: 287,
    registrationDeadline: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000), // 13 days from now
    isPublic: true,
    commentsEnabled: true,
    tags: ['Culture', 'Music', 'Performance'],
    club: {
      id: '6',
      name: 'Music Club',
      university: 'East West University'
    },
    image: '/events/cultural-night.jpg',
    followers: 456,
    upvotes: 321,
    downvotes: 45
  }
]

export default function EventsPage() {
  const { user, isLoggedIn, login, logout } = useAuth()

  const [userInteractions, setUserInteractions] = useState<{
    [eventId: string]: { isFollowing: boolean; vote: 'up' | 'down' | null }
  }>({})

  const handleFollow = (eventId: string) => {
    setUserInteractions(prev => ({
      ...prev,
      [eventId]: { ...(prev[eventId] || { vote: null }), isFollowing: true }
    }))
  }

  const handleUnfollow = (eventId: string) => {
    setUserInteractions(prev => ({
      ...prev,
      [eventId]: { ...(prev[eventId] || { vote: null }), isFollowing: false }
    }))
  }

  const handleUpvote = (eventId: string) => {
    setUserInteractions(prev => ({
      ...prev,
      [eventId]: { ...(prev[eventId] || { isFollowing: false }), vote: 'up' }
    }))
  }

  const handleDownvote = (eventId: string) => {
    setUserInteractions(prev => ({
      ...prev,
      [eventId]: { ...(prev[eventId] || { isFollowing: false }), vote: 'down' }
    }))
  }

  const handleRemoveVote = (eventId: string) => {
    setUserInteractions(prev => ({
      ...prev,
      [eventId]: { ...(prev[eventId] || { isFollowing: false }), vote: null }
    }))
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-6">
            <div />
            <Button
              onClick={() =>
                isLoggedIn
                  ? logout()
                  : login({ email: 'demo@example.com', password: 'password123' })
              }
              variant={isLoggedIn ? 'default' : 'outline'}
              className="ml-auto"
            >
              {isLoggedIn ? (
                <>
                  <UserIcon className="w-4 h-4 mr-1" />
                  {user?.name || 'User'}
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-1" />
                  Login
                </>
              )}
            </Button>
          </div>

          {/* Gradient uses theme primary */}
          <div className="mx-auto mb-6  ">
            <div className="rounded-xl bg-background px-6 py-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">University Events</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Discover exciting events, workshops, and competitions happening across universities
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search events by title, club, or tags..."
              className="w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline">All Categories</Button>
            <Button variant="outline">Upcoming</Button>
            <Button variant="outline">This Week</Button>
            <Button variant="outline">Online</Button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            All Events
          </Badge>
          {Object.entries(EVENT_CATEGORIES).map(([key, category]) => (
            <Badge
              key={key}
              variant="outline"
              className="cursor-pointer hover:bg-muted"
            >
              <category.icon className="w-3 h-3 mr-1" />
              {category.name}
            </Badge>
          ))}
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="bg-card text-card-foreground">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">{mockEvents.length}</div>
              <div className="text-sm text-muted-foreground">Total Events</div>
            </CardContent>
          </Card>
          <Card className="bg-card text-card-foreground">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">
                {mockEvents.filter(event => isEventUpcoming(event.startDate)).length}
              </div>
              <div className="text-sm text-muted-foreground">Upcoming</div>
            </CardContent>
          </Card>
          <Card className="bg-card text-card-foreground">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">
                {mockEvents.filter(event => event.isOnline).length}
              </div>
              <div className="text-sm text-muted-foreground">Online Events</div>
            </CardContent>
          </Card>
          <Card className="bg-card text-card-foreground">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">
                {mockEvents.filter(event => event.type === 'competition').length}
              </div>
              <div className="text-sm text-muted-foreground">Competitions</div>
            </CardContent>
          </Card>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockEvents.map((event) => {
            const categoryInfo = EVENT_CATEGORIES[event.category]
            const isUpcoming = isEventUpcoming(event.startDate)
            const isWithinWeek = isEventWithinWeek(event.startDate)
            const spotsLeft = event.maxParticipants
              ? event.maxParticipants - event.currentParticipants
              : null
            const userInteraction = userInteractions[event.id] || { isFollowing: false, vote: null }

            return (
              <Card
                key={event.id}
                className="relative flex h-full flex-col overflow-hidden border bg-card text-card-foreground hover:shadow-lg transition-shadow"
              >
                {/* Event Header */}
                <div className="h-48 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary))]/80 relative">
                  <div className="absolute inset-0 bg-black/20"></div>

                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <div className="flex space-x-2">
                      <Badge className={categoryInfo.color}>
                        <categoryInfo.icon className="w-3 h-3 mr-1" />
                        {categoryInfo.name}
                      </Badge>
                      {event.type === 'competition' && (
                        <Badge variant="warning">
                          <Trophy className="w-3 h-3 mr-1" />
                          Competition
                        </Badge>
                      )}
                      {event.isOnline && (
                        <Badge variant="info">
                          <Globe className="w-3 h-3 mr-1" />
                          Online
                        </Badge>
                      )}
                    </div>

                    {isUpcoming && !isWithinWeek && (
                      <Badge variant="success">
                        {getTimeUntil(event.startDate)}
                      </Badge>
                    )}
                  </div>

                  {isUpcoming && isWithinWeek && (
                    <div className="absolute top-4 right-4">
                      <Countdown targetDate={event.startDate} />
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-white/80 text-sm">
                      <span className="mr-4 flex items-center">
                        <Building2 className="w-4 h-4 mr-1" />
                        {event.club.university}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {event.club.name}
                      </span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 pb-24">
                  <CardDescription className="mb-4 line-clamp-3 text-muted-foreground">
                    {event.description}
                  </CardDescription>

                  {/* Event Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        {formatDate(event.startDate)} at {formatTime(event.startDate)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    {event.maxParticipants && (
                      <div className="flex items-center text-sm ">
                        <Users className="w-4 h-4 mr-2" />
                        <span>
                          {event.currentParticipants}/{event.maxParticipants} participants
                          {typeof spotsLeft === 'number' && spotsLeft > 0 && (
                            <span className="ml-1 dark:text-green-400 text-green-600">
                              ({spotsLeft} spots left)
                            </span>
                          )}
                        </span>
                      </div>
                    )}
                    {event.registrationDeadline &&
                      isEventUpcoming(event.registrationDeadline) && (
                        <div className="flex items-center text-sm  dark:text-orange-400 text-orange-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className=''>
                            Registration closes: {formatDate(event.registrationDeadline)}
                          </span>
                        </div>
                      )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  {event.maxParticipants && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Registration Progress</span>
                        <span>
                          {Math.round(
                            (event.currentParticipants / event.maxParticipants) * 100
                          )}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              (event.currentParticipants / event.maxParticipants) * 100
                            }%`
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Social Interactions */}
                  <div className="mb-2">
                    <SocialInteractions
                      eventId={event.id}
                      followers={event.followers}
                      upvotes={event.upvotes}
                      downvotes={event.downvotes}
                      isLoggedIn={isLoggedIn}
                      isFollowing={userInteraction.isFollowing}
                      userVote={userInteraction.vote}
                      onFollow={handleFollow}
                      onUnfollow={handleUnfollow}
                      onUpvote={handleUpvote}
                      onDownvote={handleDownvote}
                      onRemoveVote={handleRemoveVote}
                    />
                  </div>
                </CardContent>

                {/* Actions pinned to bottom */}
                <div className="absolute bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur p-4">
                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/events/${event.id}`}>View Details</Link>
                    </Button>

                    {isUpcoming ? (
                      <Button
                        variant={typeof spotsLeft === 'number' && spotsLeft > 0 ? 'default' : 'outline'}
                        size="sm"
                        disabled={spotsLeft === 0}
                      >
                        {spotsLeft === 0 ? 'Full' : 'Register'}
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" disabled>
                        Past
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Load More Events
          </Button>
        </div>

        {/* CTA Section (token-based gradient) */}
        <div className="mt-16 rounded-2xl p-8 text-center text-primary-foreground bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))]/80">
          <h2 className="text-2xl font-bold mb-4">Want to organize an event?</h2>
          <p className="text-sm md:text-base opacity-90 mb-6">
            Join our platform as a club admin and start creating amazing events for your university community.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/apply">Apply for Your Club</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}