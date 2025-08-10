'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { SuperAdminLayout } from '../../../components/layout/super-admin-layout'
import { formatDate, formatCurrency } from '../../../lib/utils'

// Mock data
const mockStats = {
  totalClubs: 156,
  pendingApplications: 23,
  activeEvents: 89,
  totalMembers: 12450,
  monthlyGrowth: 15.2,
  revenueThisMonth: 125000
}

const mockApplications = [
  {
    id: '1',
    clubName: 'Robotics Club',
    university: 'BUET',
    applicantName: 'Ahmed Rahman',
    applicantEmail: 'ahmed@buet.ac.bd',
    submittedAt: new Date('2024-02-10'),
    status: 'pending' as const
  },
  {
    id: '2',
    clubName: 'Drama Society',
    university: 'University of Dhaka',
    applicantName: 'Fatima Khan',
    applicantEmail: 'fatima@du.ac.bd',
    submittedAt: new Date('2024-02-09'),
    status: 'pending' as const
  },
  {
    id: '3',
    clubName: 'Finance Club',
    university: 'North South University',
    applicantName: 'Karim Ahmed',
    applicantEmail: 'karim@nsu.edu.bd',
    submittedAt: new Date('2024-02-08'),
    status: 'approved' as const
  }
]

const mockRecentActivities = [
  {
    id: '1',
    type: 'application_approved',
    message: 'Computer Science Club application approved',
    timestamp: new Date('2024-02-10T14:30:00'),
    club: 'Computer Science Club'
  },
  {
    id: '2',
    type: 'event_created',
    message: 'New event: AI Workshop created by Business Club',
    timestamp: new Date('2024-02-10T12:15:00'),
    club: 'Business Club'
  },
  {
    id: '3',
    type: 'member_joined',
    message: '25 new members joined Photography Club',
    timestamp: new Date('2024-02-10T10:45:00'),
    club: 'Photography Club'
  }
]

export default function SuperAdminDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')

  const handleApproveApplication = (applicationId: string) => {
    // Implementation for approving application
    console.log('Approving application:', applicationId)
  }

  const handleRejectApplication = (applicationId: string) => {
    // Implementation for rejecting application
    console.log('Rejecting application:', applicationId)
  }

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage clubs, applications, and monitor platform activity</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Export Report</Button>
            <Button>Generate Analytics</Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clubs</p>
                  <p className="text-3xl font-bold text-blue-600">{mockStats.totalClubs}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🏛️</span>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600">↗ +{mockStats.monthlyGrowth}%</span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                  <p className="text-3xl font-bold text-yellow-600">{mockStats.pendingApplications}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📋</span>
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
                  <p className="text-3xl font-bold text-green-600">{mockStats.activeEvents}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Across all universities
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Members</p>
                  <p className="text-3xl font-bold text-purple-600">{mockStats.totalMembers.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Active platform users
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">Pending Applications</TabsTrigger>
            <TabsTrigger value="clubs">Club Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activities">Recent Activities</TabsTrigger>
          </TabsList>

          {/* Pending Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Club Applications</CardTitle>
                <CardDescription>
                  Review and approve new club applications from universities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockApplications.filter(app => app.status === 'pending').map((application) => (
                    <div key={application.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{application.clubName}</h3>
                          <p className="text-gray-600">{application.university}</p>
                          <div className="mt-2 space-y-1 text-sm text-gray-500">
                            <p>Applicant: {application.applicantName}</p>
                            <p>Email: {application.applicantEmail}</p>
                            <p>Submitted: {formatDate(application.submittedAt)}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRejectApplication(application.id)}
                          >
                            Reject
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleApproveApplication(application.id)}
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

          {/* Club Management Tab */}
          <TabsContent value="clubs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Club Management</CardTitle>
                <CardDescription>
                  Monitor and manage all approved clubs on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <Input placeholder="Search clubs..." className="max-w-sm" />
                  <div className="flex space-x-2">
                    <Button variant="outline">Filter by University</Button>
                    <Button variant="outline">Export List</Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Club list would go here */}
                  <div className="text-center py-8 text-gray-500">
                    Club management interface will be implemented here
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Growth chart will be implemented here
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>University Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    University distribution chart will be implemented here
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Recent Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Platform Activities</CardTitle>
                <CardDescription>
                  Monitor recent activities across all clubs and events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.message}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(activity.timestamp)} • {activity.club}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminLayout>
  )
}