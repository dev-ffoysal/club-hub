'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { MemberLayout } from '../../components/layout/member-layout'
import { formatDate, formatTime, getTimeUntil, isEventUpcoming } from '../../lib/utils'
import { Bell, Building2, Calendar, Rocket, Search, User, Users, CheckCircle, AlertTriangle, Info, Star } from 'lucide-react'

// Mock data for member dashboard
const mockMemberData = {
  id: '1',
  name: 'Ahmed Rahman',
  email: 'ahmed@student.du.ac.bd',
  studentId: 'CSE2021001',
  joinedClubs: 3,
  eventsAttended: 12,
  upcomingEvents: 4,
  engagementScore: 85
}

const mockMemberClubs = [
  {
    id: '1',
    name: 'Computer Science Club',
    university: 'University of Dhaka',
    role: 'member',
    joinedAt: new Date('2023-09-15'),
    isActive: true,
    memberCount: 156,
    upcomingEvents: 2
  },
  {
    id: '2',
    name: 'Photography Club',
    university: 'University of Dhaka',
    role: 'member',
    joinedAt: new Date('2023-10-20'),
    isActive: true,
    memberCount: 89,
    upcomingEvents: 1
  },
  {
    id: '3',
    name: 'Debate Society',
    university: 'University of Dhaka',
    role: 'admin',
    joinedAt: new Date('2023-08-10'),
    isActive: true,
    memberCount: 134,
    upcomingEvents: 1
  }
]

const mockUpcomingEvents = [
  {
    id: '1',
    title: 'AI Workshop',
    clubName: 'Computer Science Club',
    date: new Date('2024-02-15T14:00:00'),
    location: 'Computer Lab, Building A',
    isRegistered: true,
    category: 'workshop'
  },
  {
    id: '2',
    title: 'Photography Exhibition',
    clubName: 'Photography Club',
    date: new Date('2024-02-18T10:00:00'),
    location: 'Art Gallery',
    isRegistered: false,
    category: 'social'
  },
  {
    id: '3',
    title: 'Debate Championship',
    clubName: 'Debate Society',
    date: new Date('2024-02-20T09:00:00'),
    location: 'Main Auditorium',
    isRegistered: true,
    category: 'competition'
  }
]

const mockRecentActivities = [
  {
    id: '1',
    type: 'event_attended',
    message: 'Attended "Web Development Bootcamp" by Computer Science Club',
    timestamp: new Date('2024-02-08T16:00:00'),
    club: 'Computer Science Club'
  },
  {
    id: '2',
    type: 'club_joined',
    message: 'Joined Photography Club',
    timestamp: new Date('2024-02-05T10:30:00'),
    club: 'Photography Club'
  },
  {
    id: '3',
    type: 'review_submitted',
    message: 'Submitted review for "Programming Contest 2024"',
    timestamp: new Date('2024-02-03T14:15:00'),
    club: 'Computer Science Club'
  }
]

const mockNotifications = [
  {
    id: '1',
    title: 'Workshop Reminder',
    message: 'AI Workshop starts tomorrow at 2 PM. Don\'t forget to bring your laptop!',
    type: 'info' as const,
    isRead: false,
    createdAt: new Date('2024-02-10T09:00:00'),
    club: 'Computer Science Club'
  },
  {
    id: '2',
    title: 'New Event Available',
    message: 'Photography Exhibition registration is now open. Limited spots available!',
    type: 'success' as const,
    isRead: false,
    createdAt: new Date('2024-02-09T15:30:00'),
    club: 'Photography Club'
  },
  {
    id: '3',
    title: 'Meeting Update',
    message: 'This week\'s debate society meeting has been moved to Friday 3 PM.',
    type: 'warning' as const,
    isRead: true,
    createdAt: new Date('2024-02-08T11:00:00'),
    club: 'Debate Society'
  }
]

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

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'bg-red-100 text-red-800'
    case 'high': return 'bg-orange-100 text-orange-800'
    case 'normal': return 'bg-blue-100 text-blue-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function MemberDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview')

  const handleRegisterEvent = (eventId: string) => {
    console.log('Registering for event:', eventId)
  }

  const handleLeaveClub = (clubId: string) => {
    console.log('Leaving club:', clubId)
  }

  const handleMarkNotificationRead = (notificationId: string) => {
    console.log('Marking notification as read:', notificationId)
  }

  const unreadNotifications = mockNotifications.filter(n => !n.isRead).length

  return (
    <MemberLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {mockMemberData.name}!</h1>
            <p className="text-gray-600 mt-2">Here's what's happening in your clubs</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Bell className="w-4 h-4 mr-2" />Notifications {unreadNotifications > 0 && (
                <Badge variant="destructive" className="ml-2">{unreadNotifications}</Badge>
              )}
            </Button>
            <Button>Explore Clubs</Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">My Clubs</p>
                  <p className="text-3xl font-bold text-blue-600">{mockMemberData.joinedClubs}</p>
                </div>
                <Building2 className="w-8 h-8" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Events Attended</p>
                  <p className="text-3xl font-bold text-green-600">{mockMemberData.eventsAttended}</p>
                </div>
                <Calendar className="w-8 h-8" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                  <p className="text-3xl font-bold text-purple-600">{mockMemberData.upcomingEvents}</p>
                </div>
                <Rocket className="w-8 h-8" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Engagement Score</p>
                  <p className="text-3xl font-bold text-orange-600">{mockMemberData.engagementScore}%</p>
                </div>
                <Star className="w-8 h-8" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clubs">My Clubs</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="notifications">
              Notifications
              {unreadNotifications > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">{unreadNotifications}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Events you're registered for or might be interested in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUpcomingEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-gray-600">{event.clubName}</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(event.date)} at {formatTime(event.date)}
                          </p>
                          <p className="text-xs text-gray-500">{event.location}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge variant={event.isRegistered ? 'success' : 'outline'}>
                            {event.isRegistered ? 'Registered' : 'Available'}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {getTimeUntil(event.date)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Your recent club activities and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">{activity.message}</p>
                          <p className="text-xs text-gray-500">
                            {formatDate(activity.timestamp)} • {activity.club}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Announcements */}
              <Card>
                <CardHeader>
                  <CardTitle>Club Announcements</CardTitle>
                  <CardDescription>Latest announcements from your clubs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnnouncements.map((announcement) => (
                      <div key={announcement.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm">{announcement.title}</h4>
                          <Badge className={`text-xs ${getPriorityColor(announcement.priority)}`}>
                            {announcement.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{announcement.content}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{announcement.clubName}</span>
                          <span>{formatDate(announcement.date)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common actions you might want to take</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Search className="w-8 h-8 mb-2" />
                    <span>Explore New Clubs</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Calendar className="w-8 h-8 mb-2" />
                    <span>Browse Events</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <User className="w-8 h-8 mb-2" />
                    <span>Update Profile</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Clubs Tab */}
          <TabsContent value="clubs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockMemberClubs.map((club) => (
                <Card key={club.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-blue-600">{club.name.charAt(0)}</span>
                      </div>
                      <Badge variant={club.role === 'admin' ? 'default' : 'secondary'}>
                        {club.role}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{club.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{club.university}</p>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p><Users className="w-4 h-4 inline mr-1" />{club.memberCount} members</p>
                      <p><Calendar className="w-4 h-4 inline mr-1" />{club.upcomingEvents} upcoming events</p>
                      <p><Calendar className="w-4 h-4 inline mr-1" />Joined {formatDate(club.joinedAt)}</p>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        View Club
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleLeaveClub(club.id)}
                      >
                        Leave
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Events</h2>
              <div className="flex space-x-2">
                <Button variant="outline">Filter</Button>
                <Button>Browse All Events</Button>
              </div>
            </div>

            <div className="space-y-4">
              {mockUpcomingEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{event.category}</Badge>
                          <Badge variant={event.isRegistered ? 'success' : 'outline'}>
                            {event.isRegistered ? 'Registered' : 'Available'}
                          </Badge>
                          <Badge variant="info">
                            {getTimeUntil(event.date)}
                          </Badge>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-4">Organized by {event.clubName}</p>
                        
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><Calendar className="w-4 h-4 inline mr-1" />{formatDate(event.date)} at {formatTime(event.date)}</p>
                          <p className="flex items-center"><span className="w-4 h-4 mr-1">📍</span>{event.location}</p>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-6">
                        {!event.isRegistered ? (
                          <Button 
                            size="sm"
                            onClick={() => handleRegisterEvent(event.id)}
                          >
                            Register
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Notifications</h2>
              <Button variant="outline" size="sm">
                Mark All as Read
              </Button>
            </div>

            <div className="space-y-4">
              {mockNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`hover:shadow-lg transition-shadow ${!notification.isRead ? 'border-blue-200 bg-blue-50' : ''}`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant={notification.type}>
                            {notification.type === 'info' && <><Info className="w-4 h-4 inline mr-1" />Info</>}
                            {notification.type === 'success' && <><CheckCircle className="w-4 h-4 inline mr-1" />Success</>}
                            {notification.type === 'warning' && <><AlertTriangle className="w-4 h-4 inline mr-1" />Warning</>}
                          </Badge>
                          {!notification.isRead && (
                            <Badge variant="destructive" className="text-xs">New</Badge>
                          )}
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-2">{notification.title}</h3>
                        <p className="text-gray-600 mb-4">{notification.message}</p>
                        
                        <div className="text-sm text-gray-500">
                          <p>{notification.club} • {formatDate(notification.createdAt)}</p>
                        </div>
                      </div>

                      {!notification.isRead && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleMarkNotificationRead(notification.id)}
                        >
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MemberLayout>
  )
}