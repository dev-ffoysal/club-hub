'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { ClubAdminLayout } from '../../../components/layout/club-admin-layout'
import { formatDate, formatCurrency } from '../../../lib/utils'
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Star, 
  Award, 
  Target,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'

// Mock analytics data for club admin
const mockClubAnalytics = {
  overview: {
    totalMembers: 156,
    activeMembers: 142,
    totalEvents: 24,
    upcomingEvents: 3,
    completedEvents: 21,
    totalRevenue: 125000,
    totalExpenses: 89000,
    monthlyGrowth: 8.5,
    engagementScore: 87.3
  },
  memberGrowth: [
    { month: 'Jan', members: 120, active: 108 },
    { month: 'Feb', members: 128, active: 115 },
    { month: 'Mar', members: 135, active: 122 },
    { month: 'Apr', members: 142, active: 128 },
    { month: 'May', members: 148, active: 135 },
    { month: 'Jun', members: 156, active: 142 }
  ],
  eventParticipation: [
    { eventTitle: 'AI Workshop', participantCount: 45, date: new Date('2024-01-15'), rating: 4.8 },
    { eventTitle: 'Programming Contest', participantCount: 78, date: new Date('2024-01-20'), rating: 4.6 },
    { eventTitle: 'Tech Talk', participantCount: 156, date: new Date('2024-01-25'), rating: 4.9 },
    { eventTitle: 'Coding Bootcamp', participantCount: 32, date: new Date('2024-02-01'), rating: 4.7 },
    { eventTitle: 'Hackathon 2024', participantCount: 89, date: new Date('2024-02-10'), rating: 4.5 }
  ],
  engagementMetrics: {
    averageEventAttendance: 68.2,
    activeMembers: 142,
    totalEvents: 24,
    totalCompetitions: 6,
    averageRating: 4.7,
    repeatAttendance: 73.5
  },
  financialSummary: {
    totalIncome: 125000,
    totalExpenses: 89000,
    balance: 36000,
    monthlyTrend: [
      { month: 'Jan', income: 18000, expenses: 12000 },
      { month: 'Feb', income: 22000, expenses: 15000 },
      { month: 'Mar', income: 25000, expenses: 18000 },
      { month: 'Apr', income: 20000, expenses: 16000 },
      { month: 'May', income: 23000, expenses: 14000 },
      { month: 'Jun', income: 17000, expenses: 14000 }
    ]
  },
  topPerformers: {
    events: [
      { title: 'Tech Talk: Future of AI', participants: 156, rating: 4.9, revenue: 15600 },
      { title: 'Programming Contest 2024', participants: 78, rating: 4.6, revenue: 23400 },
      { title: 'AI Workshop Series', participants: 45, rating: 4.8, revenue: 13500 }
    ],
    members: [
      { name: 'Ahmed Rahman', eventsAttended: 18, engagementScore: 95.2 },
      { name: 'Fatima Khan', eventsAttended: 16, engagementScore: 92.8 },
      { name: 'Mohammad Ali', eventsAttended: 15, engagementScore: 89.5 }
    ]
  },
  eventCategories: [
    { category: 'Workshop', count: 12, percentage: 50, avgRating: 4.7 },
    { category: 'Competition', count: 6, percentage: 25, avgRating: 4.5 },
    { category: 'Seminar', count: 4, percentage: 16.7, avgRating: 4.8 },
    { category: 'Social', count: 2, percentage: 8.3, avgRating: 4.6 }
  ]
}

export default function AnalyticsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('6m')
  const [selectedTab, setSelectedTab] = useState('overview')

  const { overview, memberGrowth, eventParticipation, engagementMetrics, financialSummary, topPerformers, eventCategories } = mockClubAnalytics

  return (
    <ClubAdminLayout>
      <div className="space-y-6 sm:space-y-8 w-full max-w-none">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-2">
              Track your club's performance and member engagement
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant={selectedTimeRange === '1m' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedTimeRange('1m')}
            >
              1M
            </Button>
            <Button 
              variant={selectedTimeRange === '3m' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedTimeRange('3m')}
            >
              3M
            </Button>
            <Button 
              variant={selectedTimeRange === '6m' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedTimeRange('6m')}
            >
              6M
            </Button>
            <Button 
              variant={selectedTimeRange === '1y' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedTimeRange('1y')}
            >
              1Y
            </Button>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overview.totalMembers}</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{overview.monthlyGrowth}% from last month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Members</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overview.activeMembers}</div>
                  <div className="text-xs text-muted-foreground">
                    {((overview.activeMembers / overview.totalMembers) * 100).toFixed(1)}% engagement rate
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overview.totalEvents}</div>
                  <div className="text-xs text-muted-foreground">
                    {overview.upcomingEvents} upcoming
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Net Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">৳{(overview.totalRevenue - overview.totalExpenses).toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">
                    ৳{overview.totalRevenue.toLocaleString()} income
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Engagement Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Club Engagement Score
                </CardTitle>
                <CardDescription>
                  Overall club performance based on member activity and event participation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="text-4xl font-bold text-blue-600">{overview.engagementScore}</div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${overview.engagementScore}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Poor</span>
                      <span>Good</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Top Performing Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.events.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {event.participants} participants
                          </span>
                          <span className="flex items-center">
                            <Star className="h-3 w-3 mr-1" />
                            {event.rating} rating
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">৳{event.revenue.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            {/* Member Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Member Growth Trend
                </CardTitle>
                <CardDescription>
                  Track your club's member acquisition over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {memberGrowth.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="w-12 text-sm font-medium">{data.month}</div>
                      <div className="flex-1 mx-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(data.members / 200) * 100}%` }}
                            ></div>
                          </div>
                          <div className="w-16 text-sm text-right">{data.members}</div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {data.active} active ({((data.active / data.members) * 100).toFixed(1)}%)
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Active Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Most Active Members
                </CardTitle>
                <CardDescription>
                  Members with highest engagement scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.members.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.eventsAttended} events attended</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-blue-600">{member.engagementScore}%</div>
                        <div className="text-xs text-muted-foreground">engagement</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Member Engagement Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Event Attendance</span>
                    <span className="font-medium">{engagementMetrics.averageEventAttendance}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Repeat Attendance Rate</span>
                    <span className="font-medium">{engagementMetrics.repeatAttendance}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Event Rating</span>
                    <span className="font-medium flex items-center">
                      <Star className="h-3 w-3 mr-1 text-yellow-500" />
                      {engagementMetrics.averageRating}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Activity Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Events Organized</span>
                    <span className="font-medium">{engagementMetrics.totalEvents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Competitions Held</span>
                    <span className="font-medium">{engagementMetrics.totalCompetitions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Members</span>
                    <span className="font-medium">{engagementMetrics.activeMembers}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            {/* Event Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Event Categories Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{category.category}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{category.count} events</span>
                          <span className="text-xs text-muted-foreground">({category.percentage}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Avg Rating: {category.avgRating}</span>
                        <Star className="h-3 w-3 text-yellow-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Event Participation History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Recent Event Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventParticipation.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{event.eventTitle}</h4>
                        <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="font-medium">{event.participantCount}</div>
                          <div className="text-xs text-muted-foreground">participants</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium flex items-center">
                            <Star className="h-3 w-3 mr-1 text-yellow-500" />
                            {event.rating}
                          </div>
                          <div className="text-xs text-muted-foreground">rating</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            {/* Financial Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">৳{financialSummary.totalIncome.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">৳{financialSummary.totalExpenses.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">৳{financialSummary.balance.toLocaleString()}</div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Financial Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Monthly Financial Trend
                </CardTitle>
                <CardDescription>
                  Track income and expenses over the past 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {financialSummary.monthlyTrend.map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{data.month}</span>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-green-600">৳{data.income.toLocaleString()} income</span>
                          <span className="text-red-600">৳{data.expenses.toLocaleString()} expenses</span>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(data.income / 30000) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full" 
                            style={{ width: `${(data.expenses / 30000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        Net: ৳{(data.income - data.expenses).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClubAdminLayout>
  )
}