'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { SuperAdminLayout } from '../../../components/layout/super-admin-layout'
import { formatDate, formatCurrency } from '../../../lib/utils'
import { Eye } from 'lucide-react'

// Mock data for events
const mockEvents = [
  {
    id: '1',
    title: 'National Programming Contest',
    club: 'Computer Science Club',
    university: 'BUET',
    date: new Date('2024-03-15'),
    participants: 150,
    maxParticipants: 200,
    promotionBudget: 25000,
    reach: 5000,
    status: 'promoted' as const,
    category: 'Competition',
    description: 'Annual programming contest for university students across Bangladesh.',
    createdAt: new Date('2024-02-01'),
    promotionStarted: new Date('2024-02-10')
  },
  {
    id: '2',
    title: 'Cultural Festival 2024',
    club: 'Cultural Society',
    university: 'University of Dhaka',
    date: new Date('2024-04-01'),
    participants: 300,
    maxParticipants: 500,
    promotionBudget: 40000,
    reach: 8000,
    status: 'promoted' as const,
    category: 'Cultural',
    description: 'Celebrating diverse cultures through music, dance, and art.',
    createdAt: new Date('2024-01-15'),
    promotionStarted: new Date('2024-02-01')
  },
  {
    id: '3',
    title: 'Startup Pitch Competition',
    club: 'Entrepreneurship Club',
    university: 'North South University',
    date: new Date('2024-03-20'),
    participants: 45,
    maxParticipants: 100,
    promotionBudget: 0,
    reach: 1200,
    status: 'pending' as const,
    category: 'Business',
    description: 'Students pitch their startup ideas to industry experts.',
    createdAt: new Date('2024-02-05'),
    promotionStarted: null
  },
  {
    id: '4',
    title: 'Environmental Awareness Workshop',
    club: 'Green Earth Club',
    university: 'BRAC University',
    date: new Date('2024-02-25'),
    participants: 80,
    maxParticipants: 120,
    promotionBudget: 15000,
    reach: 3000,
    status: 'completed' as const,
    category: 'Workshop',
    description: 'Workshop on sustainable living and environmental conservation.',
    createdAt: new Date('2024-01-20'),
    promotionStarted: new Date('2024-02-01')
  },
  {
    id: '5',
    title: 'AI & Machine Learning Symposium',
    club: 'Tech Innovation Club',
    university: 'IUT',
    date: new Date('2024-04-15'),
    participants: 0,
    maxParticipants: 300,
    promotionBudget: 0,
    reach: 0,
    status: 'rejected' as const,
    category: 'Technology',
    description: 'Exploring the latest trends in AI and machine learning.',
    createdAt: new Date('2024-02-08'),
    promotionStarted: null
  }
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const handlePromoteEvent = (eventId: string) => {
    console.log('Promoting event:', eventId)
  }

  const handleBoostPromotion = (eventId: string) => {
    console.log('Boosting event promotion:', eventId)
  }

  const handleRejectPromotion = (eventId: string) => {
    console.log('Rejecting event promotion:', eventId)
  }

  const handleViewDetails = (eventId: string) => {
    console.log('Viewing event details:', eventId)
  }

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.university.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const stats = {
    total: mockEvents.length,
    promoted: mockEvents.filter(e => e.status === 'promoted').length,
    pending: mockEvents.filter(e => e.status === 'pending').length,
    completed: mockEvents.filter(e => e.status === 'completed').length,
    totalBudget: mockEvents.reduce((sum, e) => sum + e.promotionBudget, 0),
    totalReach: mockEvents.reduce((sum, e) => sum + e.reach, 0),
    totalParticipants: mockEvents.reduce((sum, e) => sum + e.participants, 0)
  }

  return (
    <SuperAdminLayout>
      <div className="space-y-6 w-full max-w-none">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Event Promotion Management</h1>
            <p className="text-gray-600 mt-2">Manage promoted events and their performance</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">Performance Report</Button>
            <Button size="sm" className="w-full sm:w-auto">Promotion Analytics</Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Events</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{stats.promoted}</p>
                <p className="text-sm text-gray-600">Promoted</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-600">{stats.completed}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-600">{formatCurrency(stats.totalBudget)}</p>
                <p className="text-sm text-gray-600">Total Budget</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-purple-600">{stats.totalReach.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Reach</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-indigo-600">{stats.totalParticipants}</p>
                <p className="text-sm text-gray-600">Participants</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by event title, club, or university..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="promoted">Promoted</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="Competition">Competition</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Business">Business</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Technology">Technology</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📅</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <p className="text-gray-600">{event.club} • {event.university}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={
                          event.status === 'promoted' ? 'default' :
                          event.status === 'pending' ? 'secondary' :
                          event.status === 'completed' ? 'outline' : 'destructive'
                        }>
                          {event.status}
                        </Badge>
                        <Badge variant="outline">
                          {event.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Event Date</p>
                        <p className="font-medium">{formatDate(event.date)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Participants</p>
                        <p className="font-medium">{event.participants}/{event.maxParticipants}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Promotion Budget</p>
                        <p className="font-medium">{event.promotionBudget > 0 ? formatCurrency(event.promotionBudget) : 'No budget'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Reach</p>
                        <p className="font-medium">{event.reach.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Created</p>
                        <p className="font-medium">{formatDate(event.createdAt)}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Description</p>
                      <p className="text-gray-700 text-sm">{event.description}</p>
                    </div>
                    
                    {event.promotionStarted && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-500">Promotion started: {formatDate(event.promotionStarted)}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-row lg:flex-col gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 lg:flex-none"
                      onClick={() => handleViewDetails(event.id)}
                    >
                      <Eye className="w-4 h-4 mr-1" /> Details
                    </Button>
                    
                    {event.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 flex-1 lg:flex-none"
                          onClick={() => handlePromoteEvent(event.id)}
                        >
                          ✓ Promote
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-red-600 border-red-600 hover:bg-red-50 flex-1 lg:flex-none"
                          onClick={() => handleRejectPromotion(event.id)}
                        >
                          ✗ Reject
                        </Button>
                      </>
                    )}
                    
                    {event.status === 'promoted' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-blue-600 border-blue-600 hover:bg-blue-50 flex-1 lg:flex-none"
                        onClick={() => handleBoostPromotion(event.id)}
                      >
                        🚀 Boost
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-500">
                <span className="text-4xl mb-4 block">📅</span>
                <h3 className="text-lg font-medium mb-2">No events found</h3>
                <p>Try adjusting your search criteria or filters.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </SuperAdminLayout>
  )
}