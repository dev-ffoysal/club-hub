'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { ClubAdminLayout } from '../../../components/layout/club-admin-layout'
import { formatDate, formatTime, getTimeUntil } from '../../../lib/utils'

// Mock data for club admin
const mockClubData = {
  id: '1',
  name: 'Computer Science Club',
  university: 'University of Dhaka',
  memberCount: 156,
  activeEvents: 8,
  pendingMembers: 12,
  monthlyGrowth: 18.5,
  totalRevenue: 45000
}

const mockUpcomingEvents = [
  {
    id: '1',
    title: 'AI Workshop',
    date: new Date('2024-02-15T14:00:00'),
    participants: 32,
    maxParticipants: 50,
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Programming Contest',
    date: new Date('2024-02-20T09:00:00'),
    participants: 78,
    maxParticipants: 100,
    status: 'upcoming'
  }
]

const mockPendingMembers = [
  {
    id: '1',
    name: 'Ahmed Rahman',
    email: 'ahmed@student.du.ac.bd',
    studentId: 'CSE2021001',
    appliedAt: new Date('2024-02-10'),
    department: 'Computer Science'
  },
  {
    id: '2',
    name: 'Fatima Khan',
    email: 'fatima@student.du.ac.bd',
    studentId: 'CSE2021002',
    appliedAt: new Date('2024-02-09'),
    department: 'Computer Science'
  }
]

const mockRecentActivities = [
  {
    id: '1',
    type: 'member_joined',
    message: 'Ahmed Rahman joined the club',
    timestamp: new Date('2024-02-10T14:30:00')
  },
  {
    id: '2',
    type: 'event_registered',
    message: '5 new registrations for AI Workshop',
    timestamp: new Date('2024-02-10T12:15:00')
  },
  {
    id: '3',
    type: 'review_submitted',
    message: 'New review submitted for Programming Bootcamp',
    timestamp: new Date('2024-02-10T10:45:00')
  }
]

export default function ClubAdminDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')

  const handleApproveMember = (memberId: string) => {
    console.log('Approving member:', memberId)
  }

  const handleRejectMember = (memberId: string) => {
    console.log('Rejecting member:', memberId)
  }

  return (
    <ClubAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{mockClubData.name}</h1>
            <p className="text-gray-600 mt-2">{mockClubData.university} • Club Admin Dashboard</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Generate QR Code</Button>
            <Button>Create Event</Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Members</p>
                  <p className="text-3xl font-bold text-blue-600">{mockClubData.memberCount}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600">↗ +{mockClubData.monthlyGrowth}%</span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Members</p>
                  <p className="text-3xl font-bold text-yellow-600">{mockClubData.pendingMembers}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⏳</span>
                </div>
              </div>
              <div className="mt-4">
                <Button size="sm" variant="outline">Review Applications</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Events</p>
                  <p className="text-3xl font-bold text-green-600">{mockClubData.activeEvents}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                This month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Club Revenue</p>
                  <p className="text-3xl font-bold text-purple-600">৳{mockClubData.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Total collected
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="finances">Finances</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Events scheduled for this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUpcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-gray-500">
                            {formatDate(event.date)} at {formatTime(event.date)}
                          </p>
                          <p className="text-xs text-blue-600">
                            {event.participants}/{event.maxParticipants} registered
                          </p>
                        </div>
                        <Badge variant="success">
                          {getTimeUntil(event.date)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest club activities and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">{activity.message}</p>
                          <p className="text-xs text-gray-500">
                            {formatDate(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Member Applications</CardTitle>
                <CardDescription>
                  Review and approve new member applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPendingMembers.map((member) => (
                    <div key={member.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold">{member.name}</h3>
                          <div className="mt-1 space-y-1 text-sm text-gray-600">
                            <p>Email: {member.email}</p>
                            <p>Student ID: {member.studentId}</p>
                            <p>Department: {member.department}</p>
                            <p>Applied: {formatDate(member.appliedAt)}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRejectMember(member.id)}
                          >
                            Reject
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleApproveMember(member.id)}
                          >
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Event Management</h2>
              <Button>Create New Event</Button>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8 text-gray-500">
                  Event management interface will be implemented here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Finances Tab */}
          <TabsContent value="finances" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Financial Management</h2>
              <Button>Add Transaction</Button>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8 text-gray-500">
                  Financial management interface will be implemented here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Club Settings</h2>
              <Button variant="outline">Save Changes</Button>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8 text-gray-500">
                  Club settings interface will be implemented here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClubAdminLayout>
  )
}