'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Badge } from '../../../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { ClubAdminLayout } from '../../../components/layout/club-admin-layout'
import { formatDate } from '../../../lib/utils'
import { User } from '../../../types'

// Mock admin user data
const mockAdminUser: User = {
  id: '2',
  firstName: 'Sarah',
  lastName: 'Ahmed',
  name: 'Sarah Ahmed',
  email: 'sarah.ahmed@du.ac.bd',
  studentId: 'CSE2020015',
  department: 'Computer Science',
  university: 'University of Dhaka',
  verified: true,
  bloodGroup: 'A+',
  gender: 'female',
  contact: '+880-1987-654321',
  address: {
    city: 'Dhaka',
    line: '456 Campus Road, Dhaka 1000'
  },
  role: 'club_admin',
  avatar: '/avatars/sarah.jpg',
  profileVisibility: 'public',
  interestedIn: ['Leadership', 'Event Management', 'Community Building', 'Technology'],
  createdAt: new Date('2023-08-01'),
  updatedAt: new Date('2024-02-10')
}

const mockAdminClubs = [
  {
    id: '1',
    clubName: 'Computer Science Club',
    role: 'admin',
    joinedAt: new Date('2023-08-01'),
    isActive: true,
    membersManaged: 156,
    eventsOrganized: 24,
    totalMembers: 200,
    clubStatus: 'active'
  },
  {
    id: '2',
    clubName: 'Women in Tech',
    role: 'founder',
    joinedAt: new Date('2023-09-15'),
    isActive: true,
    membersManaged: 89,
    eventsOrganized: 18,
    totalMembers: 95,
    clubStatus: 'active'
  },
  {
    id: '3',
    clubName: 'Innovation Hub',
    role: 'co-admin',
    joinedAt: new Date('2023-10-01'),
    isActive: true,
    membersManaged: 67,
    eventsOrganized: 12,
    totalMembers: 120,
    clubStatus: 'active'
  }
]

const mockAdminAchievements = [
  {
    id: '1',
    title: 'Outstanding Club Leadership',
    description: 'Recognized for exceptional leadership in growing CS Club membership by 300%',
    date: new Date('2023-12-20'),
    club: 'Computer Science Club',
    type: 'leadership'
  },
  {
    id: '2',
    title: 'Best Event Organizer 2023',
    description: 'Awarded for organizing the most successful tech conference in university history',
    date: new Date('2023-11-15'),
    club: 'Computer Science Club',
    type: 'event'
  },
  {
    id: '3',
    title: 'Community Impact Award',
    description: 'Founded Women in Tech club, creating opportunities for 95+ female students',
    date: new Date('2023-10-30'),
    club: 'Women in Tech',
    type: 'community'
  }
]

const mockAdminStats = {
  totalClubsManaged: 3,
  totalMembersManaged: 312,
  totalEventsOrganized: 54,
  averageEventAttendance: 87,
  memberSatisfactionScore: 4.8,
  clubGrowthRate: 45
}

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: mockAdminUser.firstName,
    lastName: mockAdminUser.lastName || '',
    email: mockAdminUser.email,
    studentId: mockAdminUser.studentId || '',
    department: mockAdminUser.department || '',
    university: mockAdminUser.university || '',
    contact: mockAdminUser.contact || '',
    bloodGroup: mockAdminUser.bloodGroup || '',
    gender: mockAdminUser.gender || '',
    city: mockAdminUser.address?.city || '',
    addressLine: mockAdminUser.address?.line || '',
    profileVisibility: mockAdminUser.profileVisibility || 'public'
  })

  const handleSave = () => {
    console.log('Saving admin profile:', formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      firstName: mockAdminUser.firstName,
      lastName: mockAdminUser.lastName || '',
      email: mockAdminUser.email,
      studentId: mockAdminUser.studentId || '',
      department: mockAdminUser.department || '',
      university: mockAdminUser.university || '',
      contact: mockAdminUser.contact || '',
      bloodGroup: mockAdminUser.bloodGroup || '',
      gender: mockAdminUser.gender || '',
      city: mockAdminUser.address?.city || '',
      addressLine: mockAdminUser.address?.line || '',
      profileVisibility: mockAdminUser.profileVisibility || 'public'
    })
    setIsEditing(false)
  }

  return (
    <ClubAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {mockAdminUser.firstName.charAt(0)}{mockAdminUser.lastName?.charAt(0) || ''}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{mockAdminUser.name}</h1>
              <p className="text-gray-600">{mockAdminUser.studentId} • {mockAdminUser.department}</p>
              <p className="text-gray-600">{mockAdminUser.university}</p>
              <div className="flex items-center space-x-2 mt-2">
                {mockAdminUser.verified && (
                  <Badge variant="success" className="text-xs">
                    ✓ Verified
                  </Badge>
                )}
                <Badge variant="default" className="text-xs">
                  Club Administrator
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {mockAdminUser.profileVisibility}
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

        {/* Admin Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{mockAdminStats.totalClubsManaged}</div>
              <div className="text-sm text-gray-600">Clubs Managed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{mockAdminStats.totalMembersManaged}</div>
              <div className="text-sm text-gray-600">Members Managed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{mockAdminStats.totalEventsOrganized}</div>
              <div className="text-sm text-gray-600">Events Organized</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{mockAdminStats.averageEventAttendance}%</div>
              <div className="text-sm text-gray-600">Avg Attendance</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{mockAdminStats.memberSatisfactionScore}/5</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">+{mockAdminStats.clubGrowthRate}%</div>
              <div className="text-sm text-gray-600">Growth Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="clubs">My Clubs</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
                        <p className="mt-1 text-gray-900">{mockAdminUser.firstName}</p>
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
                        <p className="mt-1 text-gray-900">{mockAdminUser.lastName}</p>
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
                      <p className="mt-1 text-gray-900">{mockAdminUser.email}</p>
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
                        <p className="mt-1 text-gray-900">{mockAdminUser.studentId}</p>
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
                        <p className="mt-1 text-gray-900">{mockAdminUser.department}</p>
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
                      <p className="mt-1 text-gray-900">{mockAdminUser.university}</p>
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
                        <p className="mt-1 text-gray-900">{mockAdminUser.contact}</p>
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
                        <p className="mt-1 text-gray-900">{mockAdminUser.bloodGroup}</p>
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
                      <p className="mt-1 text-gray-900">{mockAdminUser.address?.city}</p>
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
                      <p className="mt-1 text-gray-900">{mockAdminUser.address?.line}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Interests */}
            <Card>
              <CardHeader>
                <CardTitle>Areas of Expertise</CardTitle>
                <CardDescription>Your leadership skills and areas of interest</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockAdminUser.interestedIn?.map((interest, index) => (
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
              {mockAdminClubs.map((club) => (
                <Card key={club.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-purple-600">{club.clubName.charAt(0)}</span>
                      </div>
                      <Badge variant={club.role === 'founder' ? 'default' : club.role === 'admin' ? 'secondary' : 'outline'}>
                        {club.role}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{club.clubName}</h3>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p>📅 Since {formatDate(club.joinedAt)}</p>
                      <p>👥 Managing {club.membersManaged}/{club.totalMembers} members</p>
                      <p>🎯 Events Organized: {club.eventsOrganized}</p>
                      <p>📊 Status: <span className="text-green-600 font-medium">{club.clubStatus}</span></p>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Club
                      </Button>
                      <Button size="sm" className="flex-1">
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="space-y-4">
              {mockAdminAchievements.map((achievement) => (
                <Card key={achievement.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">
                            {achievement.type === 'leadership' ? '👑' : 
                             achievement.type === 'event' ? '🎉' : '🌟'}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{achievement.title}</h3>
                          <p className="text-gray-600 mt-1">{achievement.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>📅 {formatDate(achievement.date)}</span>
                            <span>🏛️ {achievement.club}</span>
                            <Badge variant="outline" className="text-xs">
                              {achievement.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Your administrative performance overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Member Satisfaction</span>
                    <span className="text-lg font-bold text-green-600">{mockAdminStats.memberSatisfactionScore}/5.0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Club Growth Rate</span>
                    <span className="text-lg font-bold text-blue-600">+{mockAdminStats.clubGrowthRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Event Success Rate</span>
                    <span className="text-lg font-bold text-purple-600">{mockAdminStats.averageEventAttendance}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest administrative actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Approved 5 new member applications</span>
                      <span className="text-gray-500 text-xs">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Created new event: Tech Workshop 2024</span>
                      <span className="text-gray-500 text-xs">1 day ago</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Updated club policies and guidelines</span>
                      <span className="text-gray-500 text-xs">3 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Admin Preferences</CardTitle>
                <CardDescription>Configure your administrative settings</CardDescription>
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
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Notification Preferences</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Email notifications for new member applications</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">SMS alerts for urgent club matters</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Weekly performance reports</span>
                    </label>
                  </div>
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
                  <Button variant="outline">Download Admin Data</Button>
                  <Button variant="outline">Transfer Admin Rights</Button>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClubAdminLayout>
  )
}