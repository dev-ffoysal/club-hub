'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Navbar } from '../../../components/layout/navbar'
import { Countdown } from '../../../components/ui/countdown'
import { SocialInteractions } from '../../../components/ui/social-interactions'
import { EVENT_CATEGORIES } from '../../../lib/constants'
import { formatDate, formatTime, formatDateTime, isEventUpcoming, isEventWithinWeek } from '../../../lib/utils'
import { useAuth } from '../../../contexts/auth-context'
import { User } from '../../../types'
import Link from 'next/link'

// Mock data - same as events page (in real app, this would be fetched from API)
const mockEvents = [
  {
    id: '1',
    title: 'AI and Machine Learning Workshop',
    description: 'Learn the fundamentals of AI and ML with hands-on projects and real-world applications. This comprehensive workshop will cover machine learning algorithms, neural networks, and practical implementation using Python and popular ML libraries.',
    longDescription: 'Join us for an intensive AI and Machine Learning workshop designed for students who want to dive deep into the world of artificial intelligence. This hands-on workshop will cover fundamental concepts including supervised and unsupervised learning, neural networks, deep learning, and practical applications in various domains.\n\nWhat you\'ll learn:\n• Introduction to Machine Learning concepts\n• Python programming for ML\n• Working with popular libraries (TensorFlow, PyTorch, Scikit-learn)\n• Building and training neural networks\n• Real-world project implementation\n• Best practices in ML development\n\nPrerequisites:\n• Basic programming knowledge (preferably Python)\n• Understanding of mathematics and statistics\n• Laptop with Python installed\n\nWhat to bring:\n• Laptop with Python 3.7+ installed\n• Notebook and pen for taking notes\n• Enthusiasm to learn!',
    category: 'workshop' as const,
    type: 'event' as const,
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
    location: 'Computer Lab, Building A',
    isOnline: false,
    maxParticipants: 50,
    currentParticipants: 32,
    registrationDeadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
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
    downvotes: 12,
    organizer: {
      name: 'Dr. Sarah Ahmed',
      title: 'Professor of Computer Science',
      email: 'sarah.ahmed@du.ac.bd'
    },
    agenda: [
      { time: '14:00 - 14:30', activity: 'Registration and Welcome' },
      { time: '14:30 - 15:30', activity: 'Introduction to AI and ML Concepts' },
      { time: '15:30 - 15:45', activity: 'Coffee Break' },
      { time: '15:45 - 16:45', activity: 'Hands-on Python Programming' },
      { time: '16:45 - 17:00', activity: 'Q&A and Closing Remarks' }
    ],
    requirements: ['Laptop with Python 3.7+', 'Basic programming knowledge', 'Notebook and pen'],
    benefits: ['Certificate of participation', 'Workshop materials', 'Networking opportunities', 'Project source code']
  },
  {
    id: '2',
    title: 'National Business Plan Competition',
    description: 'Present your innovative business ideas and compete for prizes worth BDT 50,000.',
    longDescription: 'The National Business Plan Competition is the premier entrepreneurship event bringing together the brightest minds from universities across Bangladesh. This competition provides a platform for students to showcase their innovative business ideas and compete for substantial prizes.\n\nCompetition Format:\n• Initial pitch submission (5 minutes)\n• Semi-final presentations (10 minutes + Q&A)\n• Final presentations (15 minutes + Q&A)\n\nPrizes:\n• 1st Place: BDT 30,000 + Incubation opportunity\n• 2nd Place: BDT 15,000 + Mentorship program\n• 3rd Place: BDT 5,000 + Business development resources\n\nJudging Criteria:\n• Innovation and originality (25%)\n• Market potential (25%)\n• Financial viability (25%)\n• Presentation quality (25%)',
    category: 'competition' as const,
    type: 'competition' as const,
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000),
    location: 'Main Auditorium',
    isOnline: false,
    maxParticipants: 100,
    currentParticipants: 78,
    registrationDeadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
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
    downvotes: 23,
    organizer: {
      name: 'Prof. Mohammad Rahman',
      title: 'Dean of Business School',
      email: 'mohammad.rahman@northsouth.edu'
    },
    agenda: [
      { time: '09:00 - 09:30', activity: 'Registration and Networking' },
      { time: '09:30 - 12:00', activity: 'Semi-final Presentations' },
      { time: '12:00 - 13:00', activity: 'Lunch Break' },
      { time: '13:00 - 16:00', activity: 'Final Presentations' },
      { time: '16:00 - 17:00', activity: 'Judging and Deliberation' },
      { time: '17:00 - 18:00', activity: 'Award Ceremony' }
    ],
    requirements: ['Business plan document', 'Presentation slides', 'Team of 2-4 members'],
    benefits: ['Cash prizes', 'Incubation opportunities', 'Mentorship', 'Networking']
  }
  // Add more events as needed...
]

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params.id as string
  const { user, login, logout } = useAuth()
  
  const [isRegistered, setIsRegistered] = useState(false)
  
  // Mock user interactions
  const [userInteractions, setUserInteractions] = useState<{
    isFollowing: boolean
    vote: 'up' | 'down' | null
  }>({ isFollowing: false, vote: null })

  // Find the event
  const event = mockEvents.find(e => e.id === eventId)

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Event Not Found</h1>
            <p className="mt-2 text-gray-600">The event you're looking for doesn't exist.</p>
            <Link href="/events">
              <Button className="mt-4">Back to Events</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const categoryInfo = EVENT_CATEGORIES[event.category]
  const isUpcoming = isEventUpcoming(event.startDate)
  const isWithinWeek = isEventWithinWeek(event.startDate)
  const spotsLeft = event.maxParticipants ? event.maxParticipants - event.currentParticipants : null

  const handleFollow = () => {
    setUserInteractions(prev => ({ ...prev, isFollowing: !prev.isFollowing }))
  }

  const handleUnfollow = () => {
    setUserInteractions(prev => ({ ...prev, isFollowing: false }))
  }

  const handleUpvote = () => {
    setUserInteractions(prev => ({
      ...prev,
      vote: prev.vote === 'up' ? null : 'up'
    }))
  }

  const handleDownvote = () => {
    setUserInteractions(prev => ({
      ...prev,
      vote: prev.vote === 'down' ? null : 'down'
    }))
  }

  const handleRemoveVote = () => {
    setUserInteractions(prev => ({ ...prev, vote: null }))
  }

  const handleRegister = () => {
    if (!user) {
      alert('Please login to register for events')
      return
    }
    setIsRegistered(!isRegistered)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header with Login Toggle */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/events">
            <Button variant="outline">← Back to Events</Button>
          </Link>
          <Button
            onClick={() => user ? logout() : login({
              id: 'demo-user',
              firstName: 'Demo',
              lastName: 'User',
              name: 'Demo User',
              email: 'demo@example.com',
              role: 'member',
              createdAt: new Date(),
              updatedAt: new Date()
            })}
            variant={user ? "default" : "outline"}
          >
            {user ? `👤 ${user.name} (Demo)` : '🔐 Login (Demo)'}
          </Button>
        </div>

        {/* Event Hero Section */}
        <Card className="mb-8 overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 relative">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            
            {/* Countdown Timer for events within a week */}
            {isUpcoming && isWithinWeek && (
              <div className="absolute top-4 right-4">
                <Countdown targetDate={event.startDate} />
              </div>
            )}
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={categoryInfo.color}>
                  {categoryInfo.icon} {categoryInfo.name}
                </Badge>
                {event.type === 'competition' && (
                  <Badge variant="warning">🏆 Competition</Badge>
                )}
                {event.isOnline && (
                  <Badge variant="info">🌐 Online</Badge>
                )}
                {isUpcoming && !isWithinWeek && (
                  <Badge variant="success" className="bg-green-500 text-white">
                    {formatDate(event.startDate)}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-white font-bold text-3xl mb-2">
                {event.title}
              </h1>
              
              <div className="flex items-center text-blue-100 text-sm">
                <span className="mr-4">🏛️ {event.club.university}</span>
                <span className="mr-4">👥 {event.club.name}</span>
                {event.organizer && (
                  <span>👨‍🏫 {event.organizer.name}</span>
                )}
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {event.longDescription ? (
                    <div className="whitespace-pre-line text-gray-700">
                      {event.longDescription}
                    </div>
                  ) : (
                    <p className="text-gray-700">{event.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Agenda */}
            {event.agenda && (
              <Card>
                <CardHeader>
                  <CardTitle>Event Agenda</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {event.agenda.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-semibold text-blue-600 min-w-[100px]">
                          {item.time}
                        </div>
                        <div className="text-sm text-gray-700">
                          {item.activity}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Requirements & Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {event.requirements && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {event.requirements.map((req, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span className="text-sm text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {event.benefits && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What You'll Get</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {event.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm">
                  <span className="mr-2">📅</span>
                  <div>
                    <div className="font-semibold">{formatDate(event.startDate)}</div>
                    <div className="text-gray-600">
                      {formatTime(event.startDate)} - {formatTime(event.endDate)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <span className="mr-2">📍</span>
                  <span>{event.location}</span>
                </div>
                
                {event.maxParticipants && (
                  <div className="flex items-center text-sm">
                    <span className="mr-2">👥</span>
                    <span>
                      {event.currentParticipants}/{event.maxParticipants} participants
                      {spotsLeft && spotsLeft > 0 && (
                        <span className="text-green-600 ml-1">
                          ({spotsLeft} spots left)
                        </span>
                      )}
                    </span>
                  </div>
                )}
                
                {event.registrationDeadline && isEventUpcoming(event.registrationDeadline) && (
                  <div className="flex items-center text-sm text-orange-600">
                    <span className="mr-2">⏰</span>
                    <span>Registration closes: {formatDate(event.registrationDeadline)}</span>
                  </div>
                )}

                {event.organizer && (
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-sm mb-2">Organizer</h4>
                    <div className="text-sm">
                      <div className="font-medium">{event.organizer.name}</div>
                      <div className="text-gray-600">{event.organizer.title}</div>
                      <div className="text-blue-600">{event.organizer.email}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Registration Progress */}
            {event.maxParticipants && (
              <Card>
                <CardHeader>
                  <CardTitle>Registration Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Registered</span>
                      <span>{Math.round((event.currentParticipants / event.maxParticipants) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Social Interactions */}
            <Card>
              <CardHeader>
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <SocialInteractions
                  eventId={event.id}
                  followers={event.followers}
                  upvotes={event.upvotes}
                  downvotes={event.downvotes}
                  isLoggedIn={!!user}
                  isFollowing={userInteractions.isFollowing}
                  userVote={userInteractions.vote}
                  onFollow={handleFollow}
                  onUnfollow={handleUnfollow}
                  onUpvote={handleUpvote}
                  onDownvote={handleDownvote}
                  onRemoveVote={handleRemoveVote}
                  className="flex-col space-y-4"
                />
              </CardContent>
            </Card>

            {/* Registration Button */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button 
                    onClick={handleRegister}
                    className="w-full"
                    size="lg"
                    disabled={!isUpcoming || spotsLeft === 0}
                  >
                    {!isUpcoming ? 'Event Ended' : 
                     spotsLeft === 0 ? 'Event Full' :
                     isRegistered ? '✓ Registered' : 'Register Now'}
                  </Button>
                  
                  {!user && (
                    <p className="text-xs text-gray-500 text-center">
                      Please login to register for this event
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}