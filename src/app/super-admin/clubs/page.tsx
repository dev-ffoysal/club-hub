'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { SuperAdminLayout } from '../../../components/layout/super-admin-layout'
import { formatDate } from '../../../lib/utils'

// Mock data for clubs
const mockClubs = [
  {
    id: '1',
    name: 'Computer Science Club',
    university: 'BUET',
    category: 'Technology',
    description: 'A club dedicated to promoting computer science education and innovation among students.',
    status: 'active' as const,
    memberCount: 450,
    maxMembers: 500,
    eventsCount: 25,
    revenue: 125000,
    president: {
      name: 'Ahmed Rahman',
      email: 'ahmed.rahman@student.buet.ac.bd'
    },
    advisor: {
      name: 'Dr. Mahmud Hassan',
      email: 'mahmud.hassan@buet.ac.bd'
    },
    createdAt: new Date('2023-09-01'),
    lastActivity: new Date('2024-02-18'),
    website: 'https://csc.buet.ac.bd',
    socialMedia: {
      facebook: 'https://facebook.com/csc.buet',
      instagram: '@csc_buet'
    }
  },
  {
    id: '2',
    name: 'Cultural Society',
    university: 'University of Dhaka',
    category: 'Cultural',
    description: 'Celebrating diverse cultures through music, dance, art, and literary events.',
    status: 'active' as const,
    memberCount: 380,
    maxMembers: 400,
    eventsCount: 22,
    revenue: 95000,
    president: {
      name: 'Fatima Khan',
      email: 'fatima.khan@du.ac.bd'
    },
    advisor: {
      name: 'Prof. Rashida Begum',
      email: 'rashida.begum@du.ac.bd'
    },
    createdAt: new Date('2023-08-15'),
    lastActivity: new Date('2024-02-17'),
    website: 'https://culturalsociety.du.ac.bd',
    socialMedia: {
      facebook: 'https://facebook.com/du.cultural',
      instagram: '@du_cultural'
    }
  },
  {
    id: '3',
    name: 'Robotics Club',
    university: 'BRAC University',
    category: 'Technology',
    description: 'Building the future through robotics, automation, and artificial intelligence.',
    status: 'suspended' as const,
    memberCount: 320,
    maxMembers: 350,
    eventsCount: 18,
    revenue: 85000,
    president: {
      name: 'Rashid Ahmed',
      email: 'rashid.ahmed@bracu.ac.bd'
    },
    advisor: {
      name: 'Dr. Tanvir Islam',
      email: 'tanvir.islam@bracu.ac.bd'
    },
    createdAt: new Date('2023-10-01'),
    lastActivity: new Date('2024-01-15'),
    website: 'https://robotics.bracu.ac.bd',
    socialMedia: {
      facebook: 'https://facebook.com/bracu.robotics',
      instagram: '@bracu_robotics'
    }
  },
  {
    id: '4',
    name: 'Business Club',
    university: 'North South University',
    category: 'Business',
    description: 'Fostering entrepreneurship and business acumen among future leaders.',
    status: 'pending' as const,
    memberCount: 280,
    maxMembers: 300,
    eventsCount: 15,
    revenue: 70000,
    president: {
      name: 'Sadia Islam',
      email: 'sadia.islam@nsu.edu.bd'
    },
    advisor: {
      name: 'Prof. Karim Ahmed',
      email: 'karim.ahmed@nsu.edu.bd'
    },
    createdAt: new Date('2024-01-10'),
    lastActivity: new Date('2024-02-16'),
    website: 'https://business.nsu.edu.bd',
    socialMedia: {
      facebook: 'https://facebook.com/nsu.business',
      instagram: '@nsu_business'
    }
  },
  {
    id: '5',
    name: 'Photography Club',
    university: 'IUT',
    category: 'Arts',
    description: 'Capturing moments and telling stories through the lens of creativity.',
    status: 'active' as const,
    memberCount: 250,
    maxMembers: 280,
    eventsCount: 12,
    revenue: 55000,
    president: {
      name: 'Nadia Rahman',
      email: 'nadia.rahman@iut.ac.bd'
    },
    advisor: {
      name: 'Dr. Aminul Haque',
      email: 'aminul.haque@iut.ac.bd'
    },
    createdAt: new Date('2023-11-20'),
    lastActivity: new Date('2024-02-18'),
    website: 'https://photography.iut.ac.bd',
    socialMedia: {
      facebook: 'https://facebook.com/iut.photography',
      instagram: '@iut_photography'
    }
  },
  {
    id: '6',
    name: 'Environmental Club',
    university: 'BRAC University',
    category: 'Social Service',
    description: 'Working towards a sustainable future through environmental awareness and action.',
    status: 'inactive' as const,
    memberCount: 180,
    maxMembers: 200,
    eventsCount: 8,
    revenue: 35000,
    president: {
      name: 'Mahmud Hassan',
      email: 'mahmud.hassan@bracu.ac.bd'
    },
    advisor: {
      name: 'Dr. Salma Khatun',
      email: 'salma.khatun@bracu.ac.bd'
    },
    createdAt: new Date('2023-07-01'),
    lastActivity: new Date('2023-12-20'),
    website: null,
    socialMedia: {
      facebook: 'https://facebook.com/bracu.environment',
      instagram: null
    }
  }
]

export default function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [universityFilter, setUniversityFilter] = useState('all')

  const handleApproveClub = (clubId: string) => {
    console.log('Approving club:', clubId)
  }

  const handleSuspendClub = (clubId: string) => {
    console.log('Suspending club:', clubId)
  }

  const handleActivateClub = (clubId: string) => {
    console.log('Activating club:', clubId)
  }

  const handleDeleteClub = (clubId: string) => {
    console.log('Deleting club:', clubId)
  }

  const handleViewDetails = (clubId: string) => {
    console.log('Viewing club details:', clubId)
  }

  const handleContactClub = (clubId: string) => {
    console.log('Contacting club:', clubId)
  }

  const filteredClubs = mockClubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.president.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || club.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || club.category === categoryFilter
    const matchesUniversity = universityFilter === 'all' || club.university === universityFilter
    return matchesSearch && matchesStatus && matchesCategory && matchesUniversity
  })

  const stats = {
    total: mockClubs.length,
    active: mockClubs.filter(c => c.status === 'active').length,
    pending: mockClubs.filter(c => c.status === 'pending').length,
    suspended: mockClubs.filter(c => c.status === 'suspended').length,
    inactive: mockClubs.filter(c => c.status === 'inactive').length,
    totalMembers: mockClubs.reduce((sum, c) => sum + c.memberCount, 0),
    totalRevenue: mockClubs.reduce((sum, c) => sum + c.revenue, 0),
    totalEvents: mockClubs.reduce((sum, c) => sum + c.eventsCount, 0)
  }

  const universities = Array.from(new Set(mockClubs.map(club => club.university)))
  const categories = Array.from(new Set(mockClubs.map(club => club.category)))

  return (
    <SuperAdminLayout>
      <div className="space-y-6 w-full max-w-none">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Club Management</h1>
            <p className="text-gray-600 mt-2">Manage all university clubs and their activities</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">📊 Export Data</Button>
            <Button size="sm" className="w-full sm:w-auto">+ Add Club</Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Clubs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                <p className="text-sm text-gray-600">Active</p>
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
                <p className="text-2xl font-bold text-red-600">{stats.suspended}</p>
                <p className="text-sm text-gray-600">Suspended</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
                <p className="text-sm text-gray-600">Inactive</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-purple-600">{stats.totalMembers.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Members</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-600">{stats.totalEvents}</p>
                <p className="text-sm text-gray-600">Total Events</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-indigo-600">৳{(stats.totalRevenue / 1000).toFixed(0)}K</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by club name, university, category, or president..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                  <option value="inactive">Inactive</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select
                  value={universityFilter}
                  onChange={(e) => setUniversityFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Universities</option>
                  {universities.map(university => (
                    <option key={university} value={university}>{university}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clubs List */}
        <div className="space-y-4">
          {filteredClubs.map((club) => (
            <Card key={club.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">
                          {club.category === 'Technology' ? '💻' :
                           club.category === 'Cultural' ? '🎭' :
                           club.category === 'Business' ? '💼' :
                           club.category === 'Arts' ? '🎨' :
                           club.category === 'Social Service' ? '🌱' : '🏛️'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{club.name}</h3>
                        <p className="text-gray-600">{club.university} • {club.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={
                          club.status === 'active' ? 'default' :
                          club.status === 'pending' ? 'secondary' :
                          club.status === 'suspended' ? 'destructive' : 'outline'
                        }>
                          {club.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Members</p>
                        <p className="font-medium">{club.memberCount}/{club.maxMembers}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(club.memberCount / club.maxMembers) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Events</p>
                        <p className="font-medium">{club.eventsCount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Revenue</p>
                        <p className="font-medium">৳{(club.revenue / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Created</p>
                        <p className="font-medium">{formatDate(club.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Activity</p>
                        <p className="font-medium">{formatDate(club.lastActivity)}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Description</p>
                      <p className="text-gray-700 text-sm">{club.description}</p>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">President</p>
                        <p className="text-sm font-medium">{club.president.name}</p>
                        <p className="text-xs text-gray-600">{club.president.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Advisor</p>
                        <p className="text-sm font-medium">{club.advisor.name}</p>
                        <p className="text-xs text-gray-600">{club.advisor.email}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Links</p>
                      <div className="flex flex-wrap gap-2">
                        {club.website && (
                          <a href={club.website} target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            🌐 Website
                          </a>
                        )}
                        {club.socialMedia.facebook && (
                          <a href={club.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            📘 Facebook
                          </a>
                        )}
                        {club.socialMedia.instagram && (
                          <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">
                            📷 {club.socialMedia.instagram}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row lg:flex-col gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 lg:flex-none"
                      onClick={() => handleViewDetails(club.id)}
                    >
                      👁️ Details
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 lg:flex-none"
                      onClick={() => handleContactClub(club.id)}
                    >
                      📧 Contact
                    </Button>
                    
                    {club.status === 'pending' && (
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 flex-1 lg:flex-none"
                        onClick={() => handleApproveClub(club.id)}
                      >
                        ✓ Approve
                      </Button>
                    )}
                    
                    {club.status === 'active' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-orange-600 border-orange-600 hover:bg-orange-50 flex-1 lg:flex-none"
                        onClick={() => handleSuspendClub(club.id)}
                      >
                        ⏸️ Suspend
                      </Button>
                    )}
                    
                    {(club.status === 'suspended' || club.status === 'inactive') && (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 flex-1 lg:flex-none"
                        onClick={() => handleActivateClub(club.id)}
                      >
                        ▶️ Activate
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50 flex-1 lg:flex-none"
                      onClick={() => handleDeleteClub(club.id)}
                    >
                      🗑️ Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClubs.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-500">
                <span className="text-4xl mb-4 block">🏛️</span>
                <h3 className="text-lg font-medium mb-2">No clubs found</h3>
                <p>Try adjusting your search criteria or filters.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </SuperAdminLayout>
  )
}