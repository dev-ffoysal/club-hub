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
  revenueThisMonth: 125000,
  totalUsers: 8750,
  activeAds: 12,
  pendingPayments: 45
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

const mockUsers = [
  {
    id: '1',
    name: 'Ahmed Rahman',
    email: 'ahmed@student.du.ac.bd',
    university: 'University of Dhaka',
    joinedAt: new Date('2024-01-15'),
    status: 'active' as const,
    clubsJoined: 3
  },
  {
    id: '2',
    name: 'Fatima Khan',
    email: 'fatima@buet.ac.bd',
    university: 'BUET',
    joinedAt: new Date('2024-01-20'),
    status: 'active' as const,
    clubsJoined: 2
  },
  {
    id: '3',
    name: 'Karim Ahmed',
    email: 'karim@nsu.edu.bd',
    university: 'North South University',
    joinedAt: new Date('2024-02-01'),
    status: 'suspended' as const,
    clubsJoined: 1
  }
]

const mockAdvertisements = [
  {
    id: '1',
    title: 'Programming Bootcamp 2024',
    advertiser: 'TechCorp Bangladesh',
    budget: 50000,
    startDate: new Date('2024-02-15'),
    endDate: new Date('2024-03-15'),
    status: 'active' as const,
    clicks: 1250,
    impressions: 15000
  },
  {
    id: '2',
    title: 'University Fair 2024',
    advertiser: 'Education Ministry',
    budget: 75000,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-31'),
    status: 'pending' as const,
    clicks: 0,
    impressions: 0
  }
]

const mockPayments = [
  {
    id: '1',
    clubName: 'Computer Science Club',
    amount: 5000,
    type: 'membership_fee' as const,
    status: 'completed' as const,
    date: new Date('2024-02-10'),
    transactionId: 'TXN001'
  },
  {
    id: '2',
    clubName: 'Business Club',
    amount: 15000,
    type: 'event_fee' as const,
    status: 'pending' as const,
    date: new Date('2024-02-11'),
    transactionId: 'TXN002'
  },
  {
    id: '3',
    clubName: 'Drama Society',
    amount: 8000,
    type: 'advertisement' as const,
    status: 'failed' as const,
    date: new Date('2024-02-09'),
    transactionId: 'TXN003'
  }
]

const mockPromotedEvents = [
  {
    id: '1',
    title: 'National Programming Contest',
    club: 'Computer Science Club',
    date: new Date('2024-03-15'),
    participants: 150,
    promotionBudget: 25000,
    reach: 5000,
    status: 'promoted' as const
  },
  {
    id: '2',
    title: 'Cultural Festival 2024',
    club: 'Cultural Society',
    date: new Date('2024-04-01'),
    participants: 300,
    promotionBudget: 40000,
    reach: 8000,
    status: 'promoted' as const
  }
]

export default function SuperAdminDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')
  const [selectedTab, setSelectedTab] = useState('overview')

  const handleApproveApplication = (applicationId: string) => {
    console.log('Approving application:', applicationId)
  }

  const handleRejectApplication = (applicationId: string) => {
    console.log('Rejecting application:', applicationId)
  }

  const handleSuspendUser = (userId: string) => {
    console.log('Suspending user:', userId)
  }

  const handleActivateUser = (userId: string) => {
    console.log('Activating user:', userId)
  }

  const handleApproveAd = (adId: string) => {
    console.log('Approving advertisement:', adId)
  }

  const handlePromoteEvent = (eventId: string) => {
    console.log('Promoting event:', eventId)
  }

  const handleProcessPayment = (paymentId: string) => {
    console.log('Processing payment:', paymentId)
  }

  return (
      <SuperAdminLayout>
        <div className="space-y-6 sm:space-y-8 w-full max-w-none">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage clubs, users, advertisements, and monitor platform activity</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">Export Report</Button>
              <Button size="sm" className="w-full sm:w-auto">Generate Analytics</Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clubs</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">{mockStats.totalClubs}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">🏛️</span>
                </div>
              </div>
              <div className="mt-2 sm:mt-4 flex items-center text-sm">
                <span className="text-green-600">↗ +{mockStats.monthlyGrowth}%</span>
                <span className="text-gray-500 ml-2">growth</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Club Requests</p>
                  <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{mockStats.pendingApplications}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">📋</span>
                </div>
              </div>
              <div className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-500">
                Pending review
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-600">{mockStats.totalUsers.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">👥</span>
                </div>
              </div>
              <div className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-500">
                Platform users
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Events</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">{mockStats.activeEvents}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">📅</span>
                </div>
              </div>
              <div className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-500">
                All universities
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Advertisements</p>
                  <p className="text-2xl sm:text-3xl font-bold text-indigo-600">{mockStats.activeAds}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">📢</span>
                </div>
              </div>
              <div className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-500">
                Currently active
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-600">৳{(mockStats.revenueThisMonth / 1000).toFixed(0)}K</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">💳</span>
                </div>
              </div>
              <div className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-500">
                This month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            <TabsTrigger value="requests">Club Requests</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="advertisements">Advertisements</TabsTrigger>
            <TabsTrigger value="events">Event Promotion</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* Club Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Club Registration Requests</CardTitle>
                <CardDescription>
                  Review and approve new club applications from universities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockApplications.filter(app => app.status === 'pending').map((application) => (
                    <div key={application.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-xl">🏛️</span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{application.clubName}</h3>
                              <p className="text-gray-600">{application.university}</p>
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Applicant</p>
                              <p className="font-medium">{application.applicantName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Email</p>
                              <p className="font-medium">{application.applicantEmail}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Submitted</p>
                              <p className="font-medium">{formatDate(application.submittedAt)}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row lg:flex-col gap-2">
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700 flex-1 lg:flex-none"
                            onClick={() => handleApproveApplication(application.id)}
                          >
                            ✓ Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50 flex-1 lg:flex-none"
                            onClick={() => handleRejectApplication(application.id)}
                          >
                            ✗ Reject
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 lg:flex-none">
                            👁️ Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Monitor and manage all platform users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <Input placeholder="Search users..." className="max-w-sm" />
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">Filter by Status</Button>
                    <Button variant="outline" size="sm">Export List</Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-lg">👤</span>
                            </div>
                            <div>
                              <h4 className="font-semibold">{user.name}</h4>
                              <p className="text-gray-600 text-sm">{user.email}</p>
                            </div>
                          </div>
                          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">University</p>
                              <p className="font-medium">{user.university}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Joined</p>
                              <p className="font-medium">{formatDate(user.joinedAt)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Clubs Joined</p>
                              <p className="font-medium">{user.clubsJoined}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                            {user.status}
                          </Badge>
                          {user.status === 'active' ? (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => handleSuspendUser(user.id)}
                            >
                              Suspend
                            </Button>
                          ) : (
                            <Button 
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleActivateUser(user.id)}
                            >
                              Activate
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advertisements Tab */}
          <TabsContent value="advertisements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Advertisement Management</CardTitle>
                <CardDescription>
                  Review and manage platform advertisements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAdvertisements.map((ad) => (
                    <div key={ad.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                              <span className="text-xl">📢</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">{ad.title}</h4>
                              <p className="text-gray-600">{ad.advertiser}</p>
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Budget</p>
                              <p className="font-medium">{formatCurrency(ad.budget)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Duration</p>
                              <p className="font-medium">{formatDate(ad.startDate)} - {formatDate(ad.endDate)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Clicks</p>
                              <p className="font-medium">{ad.clicks.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Impressions</p>
                              <p className="font-medium">{ad.impressions.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={ad.status === 'active' ? 'default' : 'secondary'}>
                            {ad.status}
                          </Badge>
                          {ad.status === 'pending' && (
                            <Button 
                              size="sm"
                              onClick={() => handleApproveAd(ad.id)}
                            >
                              Approve
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Event Promotion Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Promotion Management</CardTitle>
                <CardDescription>
                  Manage promoted events and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPromotedEvents.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                              <span className="text-xl">📅</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">{event.title}</h4>
                              <p className="text-gray-600">{event.club}</p>
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Date</p>
                              <p className="font-medium">{formatDate(event.date)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Participants</p>
                              <p className="font-medium">{event.participants}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Budget</p>
                              <p className="font-medium">{formatCurrency(event.promotionBudget)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Reach</p>
                              <p className="font-medium">{event.reach.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="default">
                            {event.status}
                          </Badge>
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => handlePromoteEvent(event.id)}
                          >
                            Boost
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Management</CardTitle>
                <CardDescription>
                  Monitor and manage platform payments and transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPayments.map((payment) => (
                    <div key={payment.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                              <span className="text-xl">💳</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">{payment.clubName}</h4>
                              <p className="text-gray-600">{payment.type.replace('_', ' ').toUpperCase()}</p>
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Amount</p>
                              <p className="font-medium text-lg">{formatCurrency(payment.amount)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Date</p>
                              <p className="font-medium">{formatDate(payment.date)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Transaction ID</p>
                              <p className="font-medium">{payment.transactionId}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            payment.status === 'completed' ? 'default' : 
                            payment.status === 'pending' ? 'secondary' : 'destructive'
                          }>
                            {payment.status}
                          </Badge>
                          {payment.status === 'pending' && (
                            <Button 
                              size="sm"
                              onClick={() => handleProcessPayment(payment.id)}
                            >
                              Process
                            </Button>
                          )}
                        </div>
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