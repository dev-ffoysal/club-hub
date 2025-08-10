'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { SuperAdminLayout } from '../../../components/layout/super-admin-layout'
import { formatDate, formatCurrency } from '../../../lib/utils'

// Mock analytics data
const mockAnalytics = {
  overview: {
    totalUsers: 15420,
    activeUsers: 12350,
    totalClubs: 245,
    activeClubs: 198,
    totalEvents: 1250,
    upcomingEvents: 45,
    totalRevenue: 2450000,
    monthlyGrowth: 12.5
  },
  userGrowth: [
    { month: 'Jan', users: 8500, active: 7200 },
    { month: 'Feb', users: 9200, active: 7800 },
    { month: 'Mar', users: 10100, active: 8500 },
    { month: 'Apr', users: 11200, active: 9300 },
    { month: 'May', users: 12400, active: 10200 },
    { month: 'Jun', users: 13800, active: 11400 },
    { month: 'Jul', users: 15420, active: 12350 }
  ],
  clubStats: [
    { category: 'Technology', count: 65, percentage: 26.5 },
    { category: 'Cultural', count: 48, percentage: 19.6 },
    { category: 'Sports', count: 42, percentage: 17.1 },
    { category: 'Academic', count: 38, percentage: 15.5 },
    { category: 'Social Service', count: 32, percentage: 13.1 },
    { category: 'Business', count: 20, percentage: 8.2 }
  ],
  eventStats: [
    { type: 'Workshop', count: 420, revenue: 630000 },
    { type: 'Competition', count: 285, revenue: 855000 },
    { type: 'Cultural Event', count: 245, revenue: 490000 },
    { type: 'Seminar', count: 180, revenue: 270000 },
    { type: 'Sports Event', count: 120, revenue: 205000 }
  ],
  universityStats: [
    { name: 'BUET', users: 2850, clubs: 45, events: 180 },
    { name: 'University of Dhaka', users: 2650, clubs: 42, events: 165 },
    { name: 'BRAC University', users: 1950, clubs: 32, events: 125 },
    { name: 'North South University', users: 1750, clubs: 28, events: 110 },
    { name: 'IUT', users: 1450, clubs: 25, events: 95 },
    { name: 'Others', users: 4765, clubs: 73, events: 575 }
  ],
  revenueBreakdown: [
    { source: 'Membership Fees', amount: 980000, percentage: 40 },
    { source: 'Event Registrations', amount: 735000, percentage: 30 },
    { source: 'Advertisements', amount: 490000, percentage: 20 },
    { source: 'Promotions', amount: 245000, percentage: 10 }
  ],
  topPerformers: {
    clubs: [
      { name: 'Computer Science Club - BUET', members: 450, events: 25, revenue: 125000 },
      { name: 'Cultural Society - DU', members: 380, events: 22, revenue: 95000 },
      { name: 'Robotics Club - BRAC', members: 320, events: 18, revenue: 85000 },
      { name: 'Business Club - NSU', members: 280, events: 15, revenue: 70000 },
      { name: 'Photography Club - IUT', members: 250, events: 12, revenue: 55000 }
    ],
    events: [
      { name: 'National Programming Contest', participants: 850, revenue: 127500 },
      { name: 'Inter-University Cultural Festival', participants: 650, revenue: 97500 },
      { name: 'Tech Innovation Summit', participants: 520, revenue: 78000 },
      { name: 'Startup Pitch Competition', participants: 420, revenue: 63000 },
      { name: 'Photography Exhibition', participants: 380, revenue: 57000 }
    ]
  }
}

export default function AnalyticsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')
  const [selectedTab, setSelectedTab] = useState('overview')

  const handleExportReport = () => {
    console.log('Exporting analytics report')
  }

  const handleGenerateInsights = () => {
    console.log('Generating AI insights')
  }

  return (
    <SuperAdminLayout>
      <div className="space-y-6 w-full max-w-none">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-2">Comprehensive insights and performance metrics</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 3 months</option>
              <option value="1y">Last year</option>
            </select>
            <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={handleExportReport}>
              📊 Export Report
            </Button>
            <Button size="sm" className="w-full sm:w-auto" onClick={handleGenerateInsights}>
              🤖 AI Insights
            </Button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{mockAnalytics.overview.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-xs text-green-600 mt-1">+{mockAnalytics.overview.monthlyGrowth}%</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{mockAnalytics.overview.activeUsers.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-xs text-gray-500 mt-1">{((mockAnalytics.overview.activeUsers / mockAnalytics.overview.totalUsers) * 100).toFixed(1)}% active</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{mockAnalytics.overview.totalClubs}</p>
                <p className="text-sm text-gray-600">Total Clubs</p>
                <p className="text-xs text-gray-500 mt-1">{mockAnalytics.overview.activeClubs} active</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{mockAnalytics.overview.totalEvents.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-xs text-gray-500 mt-1">{mockAnalytics.overview.upcomingEvents} upcoming</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-600">{formatCurrency(mockAnalytics.overview.totalRevenue)}</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-xs text-green-600 mt-1">+15.2% this month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-indigo-600">{((mockAnalytics.overview.activeClubs / mockAnalytics.overview.totalClubs) * 100).toFixed(1)}%</p>
                <p className="text-sm text-gray-600">Club Activity</p>
                <p className="text-xs text-gray-500 mt-1">Engagement rate</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-pink-600">{(mockAnalytics.overview.totalRevenue / mockAnalytics.overview.totalUsers).toFixed(0)}</p>
                <p className="text-sm text-gray-600">ARPU (BDT)</p>
                <p className="text-xs text-gray-500 mt-1">Avg revenue/user</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-teal-600">{(mockAnalytics.overview.totalEvents / mockAnalytics.overview.totalClubs).toFixed(1)}</p>
                <p className="text-sm text-gray-600">Events/Club</p>
                <p className="text-xs text-gray-500 mt-1">Average ratio</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="clubs">Clubs</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>User Growth Trend</CardTitle>
                  <CardDescription>Monthly user registration and activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.userGrowth.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{data.month}</span>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">{data.users.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Total</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-green-600">{data.active.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Active</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Universities */}
              <Card>
                <CardHeader>
                  <CardTitle>University Distribution</CardTitle>
                  <CardDescription>User and club distribution by university</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.universityStats.map((uni, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{uni.name}</p>
                          <p className="text-sm text-gray-500">{uni.clubs} clubs • {uni.events} events</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{uni.users.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">users</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>User Activity Metrics</CardTitle>
                  <CardDescription>Detailed user engagement statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Daily Active Users</span>
                      <span className="font-medium">{(mockAnalytics.overview.activeUsers * 0.3).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Weekly Active Users</span>
                      <span className="font-medium">{(mockAnalytics.overview.activeUsers * 0.7).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Monthly Active Users</span>
                      <span className="font-medium">{mockAnalytics.overview.activeUsers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>User Retention Rate</span>
                      <span className="font-medium text-green-600">78.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Avg. Session Duration</span>
                      <span className="font-medium">24 minutes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Demographics */}
              <Card>
                <CardHeader>
                  <CardTitle>User Demographics</CardTitle>
                  <CardDescription>User distribution by various factors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">By Academic Year</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">1st Year</span>
                          <span className="text-sm font-medium">28%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">2nd Year</span>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">3rd Year</span>
                          <span className="text-sm font-medium">23%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">4th Year</span>
                          <span className="text-sm font-medium">24%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clubs" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Club Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Club Categories</CardTitle>
                  <CardDescription>Distribution of clubs by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.clubStats.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category.category}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{category.count}</span>
                          <Badge variant="outline">{category.percentage}%</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Clubs */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Clubs</CardTitle>
                  <CardDescription>Clubs with highest engagement and revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.topPerformers.clubs.map((club, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{club.name}</p>
                          <p className="text-xs text-gray-500">{club.members} members • {club.events} events</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{formatCurrency(club.revenue)}</p>
                          <p className="text-xs text-gray-500">revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Event Types */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Types Performance</CardTitle>
                  <CardDescription>Events by type and their revenue generation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.eventStats.map((event, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{event.type}</p>
                          <p className="text-sm text-gray-500">{event.count} events</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(event.revenue)}</p>
                          <p className="text-sm text-gray-500">{formatCurrency(event.revenue / event.count)}/event</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Events</CardTitle>
                  <CardDescription>Events with highest participation and revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.topPerformers.events.map((event, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{event.name}</p>
                          <p className="text-xs text-gray-500">{event.participants} participants</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{formatCurrency(event.revenue)}</p>
                          <p className="text-xs text-gray-500">revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Sources</CardTitle>
                  <CardDescription>Breakdown of revenue by source</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.revenueBreakdown.map((source, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{source.source}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{formatCurrency(source.amount)}</span>
                          <Badge variant="outline">{source.percentage}%</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Metrics</CardTitle>
                  <CardDescription>Key revenue performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Monthly Recurring Revenue</span>
                      <span className="font-medium">{formatCurrency(mockAnalytics.overview.totalRevenue * 0.4)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Order Value</span>
                      <span className="font-medium">{formatCurrency(2850)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Revenue Growth Rate</span>
                      <span className="font-medium text-green-600">+18.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Customer Lifetime Value</span>
                      <span className="font-medium">{formatCurrency(12500)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Revenue per User</span>
                      <span className="font-medium">{formatCurrency(mockAnalytics.overview.totalRevenue / mockAnalytics.overview.totalUsers)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminLayout>
  )
}