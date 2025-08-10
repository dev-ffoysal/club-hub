'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { ClubAdminLayout } from '../../../components/layout/club-admin-layout'
import { formatDate, generateRandomCode } from '../../../lib/utils'

// Mock data
const mockMembers = [
  {
    id: '1',
    name: 'Ahmed Rahman',
    email: 'ahmed@student.du.ac.bd',
    studentId: 'CSE2021001',
    department: 'Computer Science',
    year: '3rd Year',
    joinedAt: new Date('2023-09-15'),
    role: 'member',
    isActive: true,
    activityData: {
      eventsAttended: 12,
      competitionsParticipated: 3,
      lastActive: new Date('2024-02-10'),
      engagementScore: 85
    }
  },
  {
    id: '2',
    name: 'Fatima Khan',
    email: 'fatima@student.du.ac.bd',
    studentId: 'CSE2021002',
    department: 'Computer Science',
    year: '3rd Year',
    joinedAt: new Date('2023-09-20'),
    role: 'admin',
    isActive: true,
    activityData: {
      eventsAttended: 18,
      competitionsParticipated: 5,
      lastActive: new Date('2024-02-11'),
      engagementScore: 92
    }
  },
  {
    id: '3',
    name: 'Karim Ahmed',
    email: 'karim@student.du.ac.bd',
    studentId: 'CSE2020045',
    department: 'Computer Science',
    year: '4th Year',
    joinedAt: new Date('2023-08-10'),
    role: 'member',
    isActive: false,
    activityData: {
      eventsAttended: 5,
      competitionsParticipated: 1,
      lastActive: new Date('2024-01-15'),
      engagementScore: 45
    }
  }
]

const mockPendingMembers = [
  {
    id: '4',
    name: 'Rashida Begum',
    email: 'rashida@student.du.ac.bd',
    studentId: 'CSE2022001',
    department: 'Computer Science',
    year: '2nd Year',
    appliedAt: new Date('2024-02-10'),
    joiningCode: 'ABC123XY'
  },
  {
    id: '5',
    name: 'Mohammad Ali',
    email: 'ali@student.du.ac.bd',
    studentId: 'CSE2022002',
    department: 'Computer Science',
    year: '2nd Year',
    appliedAt: new Date('2024-02-09'),
    joiningCode: 'DEF456ZW'
  }
]

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [showQRCode, setShowQRCode] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')

  const handleGenerateJoiningCode = () => {
    const code = generateRandomCode(8)
    setGeneratedCode(code)
    console.log('Generated joining code:', code)
  }

  const handleGenerateQRCode = () => {
    setShowQRCode(true)
    console.log('Generating QR code for club joining')
  }

  const handleApproveMember = (memberId: string) => {
    console.log('Approving member:', memberId)
  }

  const handleRejectMember = (memberId: string) => {
    console.log('Rejecting member:', memberId)
  }

  const handleRemoveMember = (memberId: string) => {
    console.log('Removing member:', memberId)
  }

  const handlePromoteToAdmin = (memberId: string) => {
    console.log('Promoting member to admin:', memberId)
  }

  const handleSendEmail = () => {
    console.log('Sending email to selected members:', selectedMembers)
  }

  const filteredMembers = mockMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <ClubAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Member Management</h1>
            <p className="text-gray-600 mt-2">Manage club members, applications, and communications</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleGenerateJoiningCode}>
              Generate Joining Code
            </Button>
            <Button onClick={handleGenerateQRCode}>
              Generate QR Code
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Members</p>
                  <p className="text-3xl font-bold text-blue-600">{mockMembers.length}</p>
                </div>
                <span className="text-2xl">👥</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Members</p>
                  <p className="text-3xl font-bold text-green-600">
                    {mockMembers.filter(m => m.isActive).length}
                  </p>
                </div>
                <span className="text-2xl">✅</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                  <p className="text-3xl font-bold text-yellow-600">{mockPendingMembers.length}</p>
                </div>
                <span className="text-2xl">⏳</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Club Admins</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {mockMembers.filter(m => m.role === 'admin').length}
                  </p>
                </div>
                <span className="text-2xl">👑</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generated Code Display */}
        {generatedCode && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-green-800">New Joining Code Generated</h3>
                  <p className="text-2xl font-mono font-bold text-green-600 mt-2">{generatedCode}</p>
                  <p className="text-sm text-green-700 mt-1">Share this code with prospective members</p>
                </div>
                <Button variant="outline" size="sm">
                  Copy Code
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* QR Code Display */}
        {showQRCode && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-800">Club Joining QR Code</h3>
                  <p className="text-sm text-blue-700 mt-1">Members can scan this code to join the club</p>
                </div>
                <div className="w-32 h-32 bg-white border-2 border-blue-300 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-xs text-center">QR Code<br/>Placeholder</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="members">Current Members</TabsTrigger>
            <TabsTrigger value="pending">Pending Applications</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
          </TabsList>

          {/* Current Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Club Members</CardTitle>
                <CardDescription>
                  Manage current club members and their roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search and Actions */}
                <div className="flex justify-between items-center mb-6">
                  <Input
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={handleSendEmail}>
                      Send Email to Selected
                    </Button>
                    <Button variant="outline">Export List</Button>
                  </div>
                </div>

                {/* Members List */}
                <div className="space-y-4">
                  {filteredMembers.map((member) => (
                    <div key={member.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedMembers([...selectedMembers, member.id])
                              } else {
                                setSelectedMembers(selectedMembers.filter(id => id !== member.id))
                              }
                            }}
                          />
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="font-medium text-gray-600">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{member.name}</h3>
                              {member.role === 'admin' && (
                                <Badge variant="secondary">Admin</Badge>
                              )}
                              <Badge variant={member.isActive ? 'success' : 'outline'}>
                                {member.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>{member.email} • {member.studentId}</p>
                              <p>{member.department} • {member.year}</p>
                              <p>Joined: {formatDate(member.joinedAt)}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          {/* Activity Stats */}
                          <div className="text-right text-sm">
                            <div className="font-medium">Engagement: {member.activityData.engagementScore}%</div>
                            <div className="text-gray-500">
                              {member.activityData.eventsAttended} events • {member.activityData.competitionsParticipated} competitions
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-2">
                            {member.role !== 'admin' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handlePromoteToAdmin(member.id)}
                              >
                                Promote
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRemoveMember(member.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Applications Tab */}
          <TabsContent value="pending" className="space-y-6">
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
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span className="font-medium text-yellow-600">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{member.name}</h3>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>{member.email} • {member.studentId}</p>
                              <p>{member.department} • {member.year}</p>
                              <p>Applied: {formatDate(member.appliedAt)}</p>
                              <p>Joining Code: <span className="font-mono">{member.joiningCode}</span></p>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
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

          {/* Communications Tab */}
          <TabsContent value="communications" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Send Email Campaign</CardTitle>
                  <CardDescription>
                    Send emails to club members or specific groups
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipients
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>All Members</option>
                      <option>Active Members Only</option>
                      <option>Club Admins</option>
                      <option>Selected Members</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <Input placeholder="Email subject..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md"
                      rows={6}
                      placeholder="Email message..."
                    />
                  </div>
                  <Button className="w-full">Send Email</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Push Notifications</CardTitle>
                  <CardDescription>
                    Send instant notifications to club members
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notification Title
                    </label>
                    <Input placeholder="Notification title..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md"
                      rows={4}
                      placeholder="Notification message..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Normal</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                  <Button className="w-full">Send Notification</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ClubAdminLayout>
  )
}