'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { SuperAdminLayout } from '../../../components/layout/super-admin-layout'
import { formatDate } from '../../../lib/utils'
import { Eye } from 'lucide-react'

// Mock data for users
const mockUsers = [
  {
    id: '1',
    name: 'Ahmed Rahman',
    email: 'ahmed@student.du.ac.bd',
    university: 'University of Dhaka',
    joinedAt: new Date('2024-01-15'),
    status: 'active' as const,
    clubsJoined: 3,
    role: 'student' as const,
    lastActive: new Date('2024-02-10')
  },
  {
    id: '2',
    name: 'Fatima Khan',
    email: 'fatima@buet.ac.bd',
    university: 'BUET',
    joinedAt: new Date('2024-01-20'),
    status: 'active' as const,
    clubsJoined: 2,
    role: 'club_admin' as const,
    lastActive: new Date('2024-02-09')
  },
  {
    id: '3',
    name: 'Karim Ahmed',
    email: 'karim@nsu.edu.bd',
    university: 'North South University',
    joinedAt: new Date('2024-02-01'),
    status: 'suspended' as const,
    clubsJoined: 1,
    role: 'student' as const,
    lastActive: new Date('2024-02-05')
  },
  {
    id: '4',
    name: 'Sarah Ahmed',
    email: 'sarah@bracu.ac.bd',
    university: 'BRAC University',
    joinedAt: new Date('2024-01-10'),
    status: 'active' as const,
    clubsJoined: 5,
    role: 'student' as const,
    lastActive: new Date('2024-02-11')
  },
  {
    id: '5',
    name: 'Dr. Rahman',
    email: 'rahman@faculty.du.ac.bd',
    university: 'University of Dhaka',
    joinedAt: new Date('2023-12-01'),
    status: 'active' as const,
    clubsJoined: 0,
    role: 'faculty' as const,
    lastActive: new Date('2024-02-10')
  }
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')

  const handleSuspendUser = (userId: string) => {
    console.log('Suspending user:', userId)
  }

  const handleActivateUser = (userId: string) => {
    console.log('Activating user:', userId)
  }

  const handleViewProfile = (userId: string) => {
    console.log('Viewing user profile:', userId)
  }

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.university.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesStatus && matchesRole
  })

  const stats = {
    total: mockUsers.length,
    active: mockUsers.filter(u => u.status === 'active').length,
    suspended: mockUsers.filter(u => u.status === 'suspended').length,
    students: mockUsers.filter(u => u.role === 'student').length,
    clubAdmins: mockUsers.filter(u => u.role === 'club_admin').length,
    faculty: mockUsers.filter(u => u.role === 'faculty').length
  }

  return (
    <SuperAdminLayout>
      <div className="space-y-6 w-full max-w-none">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">Monitor and manage all platform users</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">Export Users</Button>
            <Button size="sm" className="w-full sm:w-auto">Bulk Actions</Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Users</p>
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
                <p className="text-2xl font-bold text-red-600">{stats.suspended}</p>
                <p className="text-sm text-gray-600">Suspended</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{stats.students}</p>
                <p className="text-sm text-gray-600">Students</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">{stats.clubAdmins}</p>
                <p className="text-sm text-gray-600">Club Admins</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{stats.faculty}</p>
                <p className="text-sm text-gray-600">Faculty</p>
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
                  placeholder="Search by name, email, or university..."
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
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Roles</option>
                  <option value="student">Student</option>
                  <option value="club_admin">Club Admin</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <Card key={user.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-xl">👤</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={
                          user.status === 'active' ? 'default' : 'destructive'
                        }>
                          {user.status}
                        </Badge>
                        <Badge variant="outline">
                          {user.role.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      <div>
                        <p className="text-sm text-gray-500">Last Active</p>
                        <p className="font-medium">{formatDate(user.lastActive)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row lg:flex-col gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 lg:flex-none"
                      onClick={() => handleViewProfile(user.id)}
                    >
                      <Eye className="w-4 h-4 mr-1" /> View Profile
                    </Button>
                    {user.status === 'active' ? (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50 flex-1 lg:flex-none"
                        onClick={() => handleSuspendUser(user.id)}
                      >
                        Suspend
                      </Button>
                    ) : (
                      <Button 
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 flex-1 lg:flex-none"
                        onClick={() => handleActivateUser(user.id)}
                      >
                        Activate
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-500">
                <span className="text-4xl mb-4 block">👥</span>
                <h3 className="text-lg font-medium mb-2">No users found</h3>
                <p>Try adjusting your search criteria or filters.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </SuperAdminLayout>
  )
}