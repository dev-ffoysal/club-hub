'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { MemberLayout } from '../../components/layout/member-layout'
import { formatDate } from '../../lib/utils'
import { User } from '../../types'
import { Mail, Phone, MapPin, Calendar, Building2, Trophy, Users, Star } from 'lucide-react'

// Mock user data
const mockUser: User = {
  id: '1',
  firstName: 'Ahmed',
  lastName: 'Rahman',
  name: 'Ahmed Rahman',
  email: 'ahmed@student.du.ac.bd',
  studentId: 'CSE2021001',
  department: 'Computer Science',
  university: 'University of Dhaka',
  verified: true,
  bloodGroup: 'B+',
  gender: 'male',
  contact: '+880-1234-567890',
  address: {
    city: 'Dhaka',
    line: '123 University Road, Dhaka 1000'
  },
  role: 'member',
  avatar: '/avatars/ahmed.jpg',
  profileVisibility: 'public',
  interestedIn: ['Technology', 'Programming', 'AI/ML', 'Web Development'],
  createdAt: new Date('2023-09-15'),
  updatedAt: new Date('2024-02-10')
}

const mockClubMemberships = [
  {
    id: '1',
    clubName: 'Computer Science Club',
    role: 'member',
    joinedAt: new Date('2023-09-15'),
    isActive: true,
    eventsAttended: 12,
    engagementScore: 85
  },
  {
    id: '2',
    clubName: 'Photography Club',
    role: 'member',
    joinedAt: new Date('2023-10-20'),
    isActive: true,
    eventsAttended: 8,
    engagementScore: 72
  },
  {
    id: '3',
    clubName: 'Debate Society',
    role: 'admin',
    joinedAt: new Date('2023-08-10'),
    isActive: true,
    eventsAttended: 15,
    engagementScore: 92
  }
]

const mockAchievements = [
  {
    id: '1',
    title: 'Programming Contest Winner',
    description: 'Won 1st place in National Programming Contest 2023',
    date: new Date('2023-12-15'),
    club: 'Computer Science Club'
  },
  {
    id: '2',
    title: 'Best Debater Award',
    description: 'Awarded Best Debater in Inter-University Debate Championship',
    date: new Date('2023-11-20'),
    club: 'Debate Society'
  },
  {
    id: '3',
    title: 'Photography Exhibition',
    description: 'Featured photographer in Annual Photography Exhibition',
    date: new Date('2023-10-10'),
    club: 'Photography Club'
  }
]

export default function MemberProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: mockUser.firstName,
    lastName: mockUser.lastName || '',
    email: mockUser.email,
    studentId: mockUser.studentId || '',
    department: mockUser.department || '',
    university: mockUser.university || '',
    contact: mockUser.contact || '',
    bloodGroup: mockUser.bloodGroup || '',
    gender: mockUser.gender || '',
    city: mockUser.address?.city || '',
    addressLine: mockUser.address?.line || '',
    profileVisibility: mockUser.profileVisibility || 'public'
  })

  const handleSave = () => {
    console.log('Saving profile:', formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      firstName: mockUser.firstName,
      lastName: mockUser.lastName || '',
      email: mockUser.email,
      studentId: mockUser.studentId || '',
      department: mockUser.department || '',
      university: mockUser.university || '',
      contact: mockUser.contact || '',
      bloodGroup: mockUser.bloodGroup || '',
      gender: mockUser.gender || '',
      city: mockUser.address?.city || '',
      addressLine: mockUser.address?.line || '',
      profileVisibility: mockUser.profileVisibility || 'public'
    })
    setIsEditing(false)
  }

  return (
    <MemberLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {mockUser.firstName.charAt(0)}{mockUser.lastName?.charAt(0) || ''}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{mockUser.name}</h1>
              <p className="text-gray-600">{mockUser.studentId} • {mockUser.department}</p>
              <p className="text-gray-600">{mockUser.university}</p>
              <div className="flex items-center space-x-2 mt-2">
                {mockUser.verified && (
                  <Badge variant="success" className="text-xs">
                    ✓ Verified
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {mockUser.role}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {mockUser.profileVisibility}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            ) : (
              <>
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="clubs">My Clubs</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">First Name</label>
                      {isEditing ? (
                        <Input
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{mockUser.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Last Name</label>
                      {isEditing ? (
                        <Input
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{mockUser.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    {isEditing ? (
                      <Input
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="mt-1"
                        type="email"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{mockUser.email}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Student ID</label>
                      {isEditing ? (
                        <Input
                          value={formData.studentId}
                          onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{mockUser.studentId}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Department</label>
                      {isEditing ? (
                        <Input
                          value={formData.department}
                          onChange={(e) => setFormData({...formData, department: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{mockUser.department}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">University</label>
                    {isEditing ? (
                      <Input
                        value={formData.university}
                        onChange={(e) => setFormData({...formData, university: e.target.value})}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{mockUser.university}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Contact</label>
                      {isEditing ? (
                        <Input
                          value={formData.contact}
                          onChange={(e) => setFormData({...formData, contact: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{mockUser.contact}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Blood Group</label>
                      {isEditing ? (
                        <Input
                          value={formData.bloodGroup}
                          onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{mockUser.bloodGroup}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Address Information</CardTitle>
                  <CardDescription>Your location and address details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">City</label>
                    {isEditing ? (
                      <Input
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{mockUser.address?.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Address Line</label>
                    {isEditing ? (
                      <Input
                        value={formData.addressLine}
                        onChange={(e) => setFormData({...formData, addressLine: e.target.value})}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{mockUser.address?.line}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Interests */}
            <Card>
              <CardHeader>
                <CardTitle>Interests</CardTitle>
                <CardDescription>Your areas of interest and expertise</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockUser.interestedIn?.map((interest, index) => (
                    <Badge key={index} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Clubs Tab */}
          <TabsContent value="clubs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockClubMemberships.map((membership) => (
                <Card key={membership.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-blue-600">{membership.clubName.charAt(0)}</span>
                      </div>
                      <Badge variant={membership.role === 'admin' ? 'default' : 'secondary'}>
                        {membership.role}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{membership.clubName}</h3>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p><Calendar className="w-4 h-4 inline mr-1" />Joined {formatDate(membership.joinedAt)}</p>
                      <p><Trophy className="w-4 h-4 inline mr-1" />Events Attended: {membership.eventsAttended}</p>
                      <p><Star className="w-4 h-4 inline mr-1" />Engagement Score: {membership.engagementScore}%</p>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Club
                      </Button>
                      {membership.role === 'admin' && (
                        <Button size="sm" className="flex-1">
                          Manage
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="space-y-4">
              {mockAchievements.map((achievement) => (
                <Card key={achievement.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{achievement.title}</h3>
                          <p className="text-gray-600 mt-1">{achievement.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span><Calendar className="w-4 h-4 inline mr-1" />{formatDate(achievement.date)}</span>
                            <span><Building2 className="w-4 h-4 inline mr-1" />{achievement.club}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control who can see your profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Profile Visibility</label>
                  <select 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.profileVisibility}
                    onChange={(e) => setFormData({...formData, profileVisibility: e.target.value as 'public' | 'private'})}
                  >
                    <option value="public">Public - Anyone can view</option>
                    <option value="private">Private - Only club members can view</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-4">
                  <Button variant="outline">Change Password</Button>
                  <Button variant="outline">Download Data</Button>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MemberLayout>
  )
}