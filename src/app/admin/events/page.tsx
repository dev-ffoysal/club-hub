'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { ClubAdminLayout } from '../../../components/layout/club-admin-layout'
import { EVENT_CATEGORIES } from '../../../lib/constants'
import { formatDate, formatTime, getTimeUntil, isEventUpcoming } from '../../../lib/utils'
import { EventForm } from '../../../types'

// Mock data
const mockEvents = [
  {
    id: '1',
    title: 'AI and Machine Learning Workshop',
    description: 'Learn the fundamentals of AI and ML with hands-on projects.',
    category: 'workshop' as const,
    type: 'event' as const,
    startDate: new Date('2024-02-15T14:00:00'),
    endDate: new Date('2024-02-15T17:00:00'),
    location: 'Computer Lab, Building A',
    isOnline: false,
    maxParticipants: 50,
    currentParticipants: 32,
    registrationDeadline: new Date('2024-02-13T23:59:59'),
    isPublic: true,
    commentsEnabled: true,
    tags: ['AI', 'Machine Learning', 'Technology'],
    createdAt: new Date('2024-01-15'),
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Programming Contest 2024',
    description: 'Annual programming contest with exciting prizes.',
    category: 'competition' as const,
    type: 'competition' as const,
    startDate: new Date('2024-02-20T09:00:00'),
    endDate: new Date('2024-02-20T18:00:00'),
    location: 'Main Auditorium',
    isOnline: false,
    maxParticipants: 100,
    currentParticipants: 78,
    registrationDeadline: new Date('2024-02-18T23:59:59'),
    isPublic: true,
    commentsEnabled: true,
    tags: ['Programming', 'Competition', 'Coding'],
    createdAt: new Date('2024-01-10'),
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Tech Talk: Future of Web Development',
    description: 'Industry expert discusses the latest trends in web development.',
    category: 'seminar' as const,
    type: 'event' as const,
    startDate: new Date('2024-01-25T15:00:00'),
    endDate: new Date('2024-01-25T17:00:00'),
    location: 'Online via Zoom',
    isOnline: true,
    meetingLink: 'https://zoom.us/j/123456789',
    maxParticipants: 200,
    currentParticipants: 156,
    registrationDeadline: new Date('2024-01-24T23:59:59'),
    isPublic: true,
    commentsEnabled: true,
    tags: ['Web Development', 'Technology', 'Career'],
    createdAt: new Date('2024-01-05'),
    status: 'completed'
  }
]

const mockEventReviews = [
  {
    id: '1',
    eventId: '3',
    userName: 'Ahmed Rahman',
    rating: 5,
    comment: 'Excellent session! Learned a lot about modern web frameworks.',
    createdAt: new Date('2024-01-26')
  },
  {
    id: '2',
    eventId: '3',
    userName: 'Fatima Khan',
    rating: 4,
    comment: 'Very informative. Would love to see more such sessions.',
    createdAt: new Date('2024-01-26')
  }
]

export default function EventsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [eventForm, setEventForm] = useState<EventForm>({
    title: '',
    description: '',
    category: 'seminar',
    type: 'event',
    startDate: '',
    endDate: '',
    location: '',
    isOnline: false,
    maxParticipants: 50,
    registrationDeadline: '',
    isPublic: true,
    commentsEnabled: true,
    tags: []
  })

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating event:', eventForm)
    setShowCreateForm(false)
    // Reset form
    setEventForm({
      title: '',
      description: '',
      category: 'seminar',
      type: 'event',
      startDate: '',
      endDate: '',
      location: '',
      isOnline: false,
      maxParticipants: 50,
      registrationDeadline: '',
      isPublic: true,
      commentsEnabled: true,
      tags: []
    })
  }

  const handleDeleteEvent = (eventId: string) => {
    console.log('Deleting event:', eventId)
  }

  const handleToggleComments = (eventId: string) => {
    console.log('Toggling comments for event:', eventId)
  }

  const upcomingEvents = mockEvents.filter(event => isEventUpcoming(event.startDate))
  const pastEvents = mockEvents.filter(event => !isEventUpcoming(event.startDate))

  return (
    <ClubAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
            <p className="text-gray-600 mt-2">Create and manage club events, competitions, and seminars</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            Create New Event
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Events</p>
                  <p className="text-3xl font-bold text-blue-600">{mockEvents.length}</p>
                </div>
                <span className="text-2xl">📅</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                  <p className="text-3xl font-bold text-green-600">{upcomingEvents.length}</p>
                </div>
                <span className="text-2xl">🚀</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Participants</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {mockEvents.reduce((sum, event) => sum + event.currentParticipants, 0)}
                  </p>
                </div>
                <span className="text-2xl">👥</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Competitions</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {mockEvents.filter(event => event.type === 'competition').length}
                  </p>
                </div>
                <span className="text-2xl">🏆</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Event Form Modal */}
        {showCreateForm && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle>Create New Event</CardTitle>
              <CardDescription>Fill in the details to create a new event</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Title *
                    </label>
                    <Input
                      required
                      value={eventForm.title}
                      onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                      placeholder="Enter event title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={eventForm.category}
                      onChange={(e) => setEventForm({...eventForm, category: e.target.value as any})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {Object.entries(EVENT_CATEGORIES).map(([key, category]) => (
                        <option key={key} value={key}>
                          {category.icon} {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    value={eventForm.description}
                    onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows={3}
                    placeholder="Describe your event"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date & Time *
                    </label>
                    <Input
                      type="datetime-local"
                      required
                      value={eventForm.startDate}
                      onChange={(e) => setEventForm({...eventForm, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date & Time *
                    </label>
                    <Input
                      type="datetime-local"
                      required
                      value={eventForm.endDate}
                      onChange={(e) => setEventForm({...eventForm, endDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <Input
                      required
                      value={eventForm.location}
                      onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                      placeholder="Event location or online link"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Participants
                    </label>
                    <Input
                      type="number"
                      value={eventForm.maxParticipants}
                      onChange={(e) => setEventForm({...eventForm, maxParticipants: parseInt(e.target.value)})}
                      placeholder="Maximum participants"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={eventForm.isOnline}
                      onChange={(e) => setEventForm({...eventForm, isOnline: e.target.checked})}
                      className="mr-2"
                    />
                    Online Event
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={eventForm.isPublic}
                      onChange={(e) => setEventForm({...eventForm, isPublic: e.target.checked})}
                      className="mr-2"
                    />
                    Public Event
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={eventForm.commentsEnabled}
                      onChange={(e) => setEventForm({...eventForm, commentsEnabled: e.target.checked})}
                      className="mr-2"
                    />
                    Enable Comments
                  </label>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Create Event
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Upcoming Events Tab */}
          <TabsContent value="upcoming" className="space-y-6">
            <div className="space-y-4">
              {upcomingEvents.map((event) => {
                const categoryInfo = EVENT_CATEGORIES[event.category]
                const spotsLeft = event.maxParticipants ? event.maxParticipants - event.currentParticipants : null
                
                return (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={categoryInfo.color}>
                              {categoryInfo.icon} {categoryInfo.name}
                            </Badge>
                            {event.type === 'competition' && (
                              <Badge variant="warning">🏆 Competition</Badge>
                            )}
                            {event.isOnline && (
                              <Badge variant="info">🌐 Online</Badge>
                            )}
                            <Badge variant="success">
                              {getTimeUntil(event.startDate)}
                            </Badge>
                          </div>
                          
                          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                          <p className="text-gray-600 mb-4">{event.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <p><strong>Date:</strong> {formatDate(event.startDate)}</p>
                              <p><strong>Time:</strong> {formatTime(event.startDate)} - {formatTime(event.endDate)}</p>
                              <p><strong>Location:</strong> {event.location}</p>
                            </div>
                            <div>
                              <p><strong>Participants:</strong> {event.currentParticipants}/{event.maxParticipants || '∞'}</p>
                              <p><strong>Registration Deadline:</strong> {event.registrationDeadline ? formatDate(event.registrationDeadline) : 'No deadline'}</p>
                              <p><strong>Status:</strong> {event.isPublic ? 'Public' : 'Private'}</p>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          {event.maxParticipants && (
                            <div className="mt-4">
                              <div className="flex justify-between text-xs text-gray-600 mb-1">
                                <span>Registration Progress</span>
                                <span>{Math.round((event.currentParticipants / event.maxParticipants) * 100)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col space-y-2 ml-6">
                          <Button size="sm" variant="outline">
                            Edit Event
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleToggleComments(event.id)}
                          >
                            {event.commentsEnabled ? 'Disable Comments' : 'Enable Comments'}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Past Events Tab */}
          <TabsContent value="past" className="space-y-6">
            <div className="space-y-4">
              {pastEvents.map((event) => {
                const categoryInfo = EVENT_CATEGORIES[event.category]
                
                return (
                  <Card key={event.id} className="opacity-75">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={categoryInfo.color}>
                              {categoryInfo.icon} {categoryInfo.name}
                            </Badge>
                            <Badge variant="outline">Completed</Badge>
                          </div>
                          
                          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                          <p className="text-gray-600 mb-4">{event.description}</p>
                          
                          <div className="text-sm text-gray-600">
                            <p><strong>Date:</strong> {formatDate(event.startDate)}</p>
                            <p><strong>Participants:</strong> {event.currentParticipants}</p>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 ml-6">
                          <Button size="sm" variant="outline">
                            View Analytics
                          </Button>
                          <Button size="sm" variant="outline">
                            Export Data
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Reviews</CardTitle>
                <CardDescription>
                  Member feedback and reviews for your events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEventReviews.map((review) => {
                    const event = mockEvents.find(e => e.id === review.eventId)
                    return (
                      <div key={review.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{event?.title}</h4>
                            <p className="text-sm text-gray-600">by {review.userName}</p>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                ⭐
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Event performance chart will be implemented here
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Participation Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Participation trends chart will be implemented here
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ClubAdminLayout>
  )
}