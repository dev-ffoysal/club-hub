'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { SuperAdminLayout } from '../../../components/layout/super-admin-layout'
import { formatDate } from '../../../lib/utils'

// Mock data for club requests
const mockClubRequests = [
  {
    id: '1',
    clubName: 'Robotics Club',
    university: 'BUET',
    applicantName: 'Ahmed Rahman',
    applicantEmail: 'ahmed@buet.ac.bd',
    submittedAt: new Date('2024-02-10'),
    status: 'pending' as const,
    category: 'Technology',
    description: 'A club focused on robotics research and competitions for engineering students.'
  },
  {
    id: '2',
    clubName: 'Drama Society',
    university: 'University of Dhaka',
    applicantName: 'Fatima Khan',
    applicantEmail: 'fatima@du.ac.bd',
    submittedAt: new Date('2024-02-09'),
    status: 'pending' as const,
    category: 'Arts & Culture',
    description: 'Promoting theatrical arts and cultural activities among university students.'
  },
  {
    id: '3',
    clubName: 'Finance Club',
    university: 'North South University',
    applicantName: 'Karim Ahmed',
    applicantEmail: 'karim@nsu.edu.bd',
    submittedAt: new Date('2024-02-08'),
    status: 'approved' as const,
    category: 'Business',
    description: 'Educational club for finance and investment knowledge sharing.'
  },
  {
    id: '4',
    clubName: 'Environmental Club',
    university: 'BRAC University',
    applicantName: 'Sarah Ahmed',
    applicantEmail: 'sarah@bracu.ac.bd',
    submittedAt: new Date('2024-02-07'),
    status: 'rejected' as const,
    category: 'Environment',
    description: 'Promoting environmental awareness and sustainability initiatives.'
  }
]

export default function ClubRequestsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const handleApproveRequest = (requestId: string) => {
    console.log('Approving club request:', requestId)
  }

  const handleRejectRequest = (requestId: string) => {
    console.log('Rejecting club request:', requestId)
  }

  const filteredRequests = mockClubRequests.filter(request => {
    const matchesSearch = request.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.university.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <SuperAdminLayout>
      <div className="space-y-6 w-full max-w-none">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Club Requests</h1>
            <p className="text-gray-600 mt-2">Review and manage club registration requests</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">Export Report</Button>
            <Button size="sm" className="w-full sm:w-auto">Bulk Actions</Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by club name or university..."
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
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Club Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🏛️</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{request.clubName}</h3>
                        <p className="text-gray-600">{request.university}</p>
                      </div>
                      <Badge variant={
                        request.status === 'approved' ? 'default' :
                        request.status === 'pending' ? 'secondary' : 'destructive'
                      }>
                        {request.status}
                      </Badge>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Submitted by</p>
                        <p className="font-medium">{request.applicantName}</p>
                        <p className="text-sm text-gray-500">{request.applicantEmail}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="font-medium">{request.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Submitted</p>
                        <p className="font-medium">{formatDate(request.submittedAt)}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Description</p>
                      <p className="text-gray-700">{request.description}</p>
                    </div>
                  </div>
                  
                  {request.status === 'pending' && (
                    <div className="flex flex-row lg:flex-col gap-2 lg:ml-6">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 flex-1 lg:flex-none"
                        onClick={() => handleApproveRequest(request.id)}
                      >
                        ✓ Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 border-red-600 hover:bg-red-50 flex-1 lg:flex-none"
                        onClick={() => handleRejectRequest(request.id)}
                      >
                        ✗ Reject
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 lg:flex-none">
                        👁️ Review
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-500">
                <span className="text-4xl mb-4 block">📋</span>
                <h3 className="text-lg font-medium mb-2">No club requests found</h3>
                <p>Try adjusting your search criteria or filters.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </SuperAdminLayout>
  )
}