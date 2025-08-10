'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { Club, Event } from '../../../types'
import Link from 'next/link'

// Mock data for user's joined clubs
const mockUserClubs: Club[] = [
  {
    id: '1',
    name: 'Computer Science Club',
    clubName: 'Computer Science Club',
    slug: 'computer-science-club',
    description: 'Fostering innovation and technical excellence in computer science',
    purpose: 'Fostering innovation and technical excellence in computer science',
    university: 'University of Dhaka',
    contactEmail: 'cs.club@du.ac.bd',
    memberCount: 156,
    category: 'Technology',
    contact: {
      email: 'cs.club@du.ac.bd',
      phone: '+880-1234-567890'
    },
    socialMedia: {
      facebook: 'https://facebook.com/csclub.du',
      instagram: 'https://instagram.com/csclub_du'
    },
    logo: '/clubs/cs-club-logo.jpg',
    coverImage: '/clubs/cs-club-cover.jpg',
    tags: ['Technology', 'Programming', 'Innovation'],
    isPublic: true,
    template: 'modern',
    colorScheme: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      accent: '#10B981',
      background: '#F8FAFC'
    },
    status: 'active',
    socialLinks: {
      facebook: 'https://facebook.com/csclub.du',
      instagram: 'https://instagram.com/csclub_du'
    },
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-15'),
    achievements: [
      { 
        id: '1',
        title: 'National Programming Contest Winner 2023', 
        description: 'Won first place in national programming contest',
        date: new Date('2023-12-15') 
      }
    ]
  },
  {
    id: '3',
    name: 'Photography Club',
    clubName: 'Photography Club',
    slug: 'photography-club',
    description: 'Capturing moments and creating visual stories',
    purpose: 'Capturing moments and creating visual stories',
    university: 'BRAC University',
    contactEmail: 'photo.club@bracu.ac.bd',
    memberCount: 67,
    category: 'Arts',
    contact: {
      email: 'photo.club@bracu.ac.bd',
      phone: '+880-1234-567892'
    },
    socialMedia: {
      facebook: 'https://facebook.com/photoclub.bracu',
      instagram: 'https://instagram.com/photoclub_bracu'
    },
    logo: '/clubs/photo-club-logo.jpg',
    coverImage: '/clubs/photo-club-cover.jpg',
    tags: ['Photography', 'Art', 'Creative'],
    isPublic: true,
    template: 'vibrant',
    colorScheme: {
      primary: '#EC4899',
      secondary: '#F59E0B',
      accent: '#8B5CF6',
      background: '#FEF3F2'
    },
    status: 'active',
    socialLinks: {
      facebook: 'https://facebook.com/photoclub.bracu',
      instagram: 'https://instagram.com/photoclub_bracu'
    },
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2024-01-10'),
    achievements: [
      { 
        id: '2',
        title: 'Inter-University Photo Exhibition 2023', 
        description: 'Organized successful inter-university photo exhibition',
        date: new Date('2023-10-10') 
      }
    ]
  }
]

// Mock data for upcoming events
const mockUpcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Programming Workshop: Advanced React',
    description: 'Learn advanced React concepts and best practices',
    category: 'workshop',
    type: 'workshop',
    startDate: new Date('2024-02-15'),
    endDate: new Date('2024-02-15'),
    location: 'CS Lab, University of Dhaka',
    isOnline: false,
    clubId: '1',
    host: 'Computer Science Club',
    maxParticipants: 50,
    currentParticipants: 32,
    registrationDeadline: new Date('2024-02-10'),
    isPublic: true,
    commentsEnabled: true,
    status: 'published',
    createdBy: 'admin',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    images: ['/events/react-workshop.jpg'],
    tags: ['Programming', 'React', 'Workshop'],
    guests: [],
    organizers: [{
      name: 'John Doe',
      designation: 'Event Coordinator'
    }, {
      name: 'Jane Smith',
      designation: 'Assistant Coordinator'
    }],
    sponsors: []
  },
  {
    id: '2',
    title: 'Photography Walk: Old Dhaka',
    description: 'Explore and capture the beauty of Old Dhaka',
    category: 'social',
    type: 'event',
    startDate: new Date('2024-02-20'),
    endDate: new Date('2024-02-20'),
    location: 'Old Dhaka',
    isOnline: false,
    clubId: '3',
    host: 'Photography Club',
    maxParticipants: 25,
    currentParticipants: 18,
    registrationDeadline: new Date('2024-02-18'),
    isPublic: true,
    commentsEnabled: true,
    status: 'published',
    createdBy: 'admin',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-20'),
    images: ['/events/photo-walk.jpg'],
    tags: ['Photography', 'Walk', 'Heritage'],
    guests: [],
    organizers: [{
      name: 'Alice Johnson',
      designation: 'Photography Lead'
    }],
    sponsors: []
  }
]

// Mock data for announcements
const mockAnnouncements = [
  {
    id: '1',
    clubId: '1',
    clubName: 'Computer Science Club',
    title: 'New Study Group Formation',
    content: 'We are forming study groups for competitive programming. Join us every Saturday at 2 PM.',
    date: new Date('2024-01-25'),
    priority: 'normal' as const
  },
  {
    id: '2',
    clubId: '3',
    clubName: 'Photography Club',
    title: 'Equipment Available for Rent',
    content: 'Professional cameras and lenses are now available for rent to club members at discounted rates.',
    date: new Date('2024-01-23'),
    priority: 'high' as const
  },
  {
    id: '3',
    clubId: '1',
    clubName: 'Computer Science Club',
    title: 'Hackathon Registration Open',
    content: 'Registration is now open for our annual hackathon. Limited seats available!',
    date: new Date('2024-01-20'),
    priority: 'urgent' as const
  }
]

export default function MyClubsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredClubs, setFilteredClubs] = useState(mockUserClubs)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = mockUserClubs.filter(club =>
      club.clubName.toLowerCase().includes(term.toLowerCase()) ||
      club.description.toLowerCase().includes(term.toLowerCase()) ||
      (club.tags && club.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase())))
    )
    setFilteredClubs(filtered)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 border-red-200 text-red-800'
      case 'high': return 'bg-orange-100 border-orange-200 text-orange-800'
      default: return 'bg-blue-100 border-blue-200 text-blue-800'
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent': return <Badge variant="destructive" className="text-xs">Urgent</Badge>
      case 'high': return <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">High</Badge>
      default: return <Badge variant="secondary" className="text-xs">Normal</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Clubs</h1>
        <p className="text-gray-600 mt-2">
          Manage your club memberships and stay updated with activities.
        </p>
      </div>

      <Tabs defaultValue="clubs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="clubs">My Clubs ({mockUserClubs.length})</TabsTrigger>
          <TabsTrigger value="events">Upcoming Events ({mockUpcomingEvents.length})</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="clubs" className="space-y-6">
          {/* Search */}
          <div className="mb-6">
            <Input
              placeholder="Search your clubs..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="max-w-md"
            />
          </div>

          {/* Clubs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredClubs.map((club) => (
              <Card key={club.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{club.clubName}</CardTitle>
                      <CardDescription className="mt-2">{club.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {club.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>👥 {club.memberCount} members</span>
                      <span>🏫 {club.university}</span>
                    </div>
                    
                    {club.tags && (
                      <div className="flex flex-wrap gap-2">
                        {club.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-4">
                      <div className="text-sm text-gray-500">
                        Member since {club.createdAt.getFullYear()}
                      </div>
                      <Button size="sm" asChild>
                        <Link href={`/clubs/${club.slug}`}>View Club</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredClubs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No clubs found matching your search.</p>
              <Button asChild variant="outline">
                <Link href="/discover">Discover Clubs</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockUpcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription className="mt-2">{event.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>📅 {event.startDate.toLocaleDateString()}</span>
                      <span>📍 {event.location}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>🏢 {event.host}</span>
                      <span>👥 {event.currentParticipants}/{event.maxParticipants}</span>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div className="text-sm text-gray-500">
                        Registration deadline: {event.registrationDeadline?.toLocaleDateString()}
                      </div>
                      <Button size="sm" asChild>
                        <Link href={`/events/${event.id}`}>View Event</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {mockUpcomingEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No upcoming events in your clubs.</p>
              <Button asChild variant="outline">
                <Link href="/events">Browse All Events</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="announcements" className="space-y-6">
          <div className="space-y-4">
            {mockAnnouncements.map((announcement) => (
              <Card key={announcement.id} className={`border-l-4 ${getPriorityColor(announcement.priority)}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-3">
                        <h3 className="text-lg font-semibold">{announcement.title}</h3>
                        {getPriorityBadge(announcement.priority)}
                      </div>
                      <p className="text-gray-600 mb-4">{announcement.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="font-medium">{announcement.clubName}</span>
                        <span>{announcement.date.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {mockAnnouncements.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No announcements from your clubs.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}