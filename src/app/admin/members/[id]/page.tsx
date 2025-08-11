'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Button } from '../../../../components/ui/button'
import { Badge } from '../../../../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs'
import { ClubAdminLayout } from '../../../../components/layout/club-admin-layout'
import { formatDate } from '../../../../lib/utils'
import { 
  ArrowLeft, 
  User, 
  Mail, 
  GraduationCap, 
  Calendar, 
  Activity, 
  Trophy, 
  Target,
  Phone,
  MapPin,
  Clock
} from 'lucide-react'

// Mock data - in real app, this would come from API
const mockMemberDetails = {
  '4': {
    id: '4',
    name: 'Rashida Begum',
    email: 'rashida@student.du.ac.bd',
    phone: '+880 1712-345678',
    studentId: 'CSE2022001',
    department: 'Computer Science',
    year: '2nd Year',
    appliedAt: new Date('2024-02-10'),
    joiningCode: 'ABC123XY',
    address: 'Dhaka, Bangladesh',
    cgpa: '3.75',
    skills: ['JavaScript', 'React', 'Python', 'Machine Learning'],
    interests: ['Web Development', 'AI/ML', 'Competitive Programming'],
    previousExperience: [
      {
        title: 'Frontend Developer Intern',
        company: 'Tech Solutions Ltd',
        duration: '3 months',
        description: 'Worked on React-based web applications'
      }
    ],
    motivation: 'I am passionate about technology and want to contribute to the programming community. I believe joining this club will help me grow my skills and collaborate with like-minded individuals.',
    references: [
      {
        name: 'Dr. Ahmed Hassan',
        designation: 'Assistant Professor',
        department: 'Computer Science',
        email: 'ahmed.hassan@du.ac.bd'
      }
    ],
    socialLinks: {
      github: 'https://github.com/rashida-begum',
      linkedin: 'https://linkedin.com/in/rashida-begum'
    }
  },
  '5': {
    id: '5',
    name: 'Mohammad Ali',
    email: 'ali@student.du.ac.bd',
    phone: '+880 1812-345679',
    studentId: 'CSE2022002',
    department: 'Computer Science',
    year: '2nd Year',
    appliedAt: new Date('2024-02-09'),
    joiningCode: 'DEF456ZW',
    address: 'Chittagong, Bangladesh',
    cgpa: '3.85',
    skills: ['Java', 'Spring Boot', 'MySQL', 'Android Development'],
    interests: ['Mobile Development', 'Backend Systems', 'Database Design'],
    previousExperience: [
      {
        title: 'Android Developer',
        company: 'Mobile Apps Co',
        duration: '6 months',
        description: 'Developed native Android applications'
      }
    ],
    motivation: 'I want to enhance my programming skills and participate in competitive programming contests. This club seems like the perfect platform to achieve my goals.',
    references: [
      {
        name: 'Prof. Fatima Rahman',
        designation: 'Professor',
        department: 'Computer Science',
        email: 'fatima.rahman@du.ac.bd'
      }
    ],
    socialLinks: {
      github: 'https://github.com/mohammad-ali',
      linkedin: 'https://linkedin.com/in/mohammad-ali-dev'
    }
  }
}

export default function MemberDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const memberId = params.id as string
  const [selectedTab, setSelectedTab] = useState('overview')

  const member = mockMemberDetails[memberId as keyof typeof mockMemberDetails]

  if (!member) {
    return (
      <ClubAdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Member Not Found</h2>
            <p className="text-gray-600 mb-4">The requested member details could not be found.</p>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </ClubAdminLayout>
    )
  }

  const handleApproveMember = () => {
    console.log('Approving member:', memberId)
    // In real app, make API call
    router.push('/admin/members')
  }

  const handleRejectMember = () => {
    console.log('Rejecting member:', memberId)
    // In real app, make API call
    router.push('/admin/members')
  }

  return (
    <ClubAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Member Application Details</h1>
              <p className="text-gray-600 mt-1">Review application for {member.name}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleRejectMember}>
              Reject Application
            </Button>
            <Button onClick={handleApproveMember}>
              Approve Member
            </Button>
          </div>
        </div>

        {/* Member Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">
                  {member.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
                  <Badge variant="outline">Pending Application</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{member.studentId}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>{member.department} • {member.year}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{member.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Applied: {formatDate(member.appliedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="references">References</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Skills & Interests
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Areas of Interest</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.interests.map((interest, index) => (
                        <Badge key={index} variant="outline">{interest}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Application Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Joining Code:</span>
                      <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{member.joiningCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Application Date:</span>
                      <span className="text-sm">{formatDate(member.appliedAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge variant="outline">Pending Review</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Social Links</h4>
                    <div className="space-y-1">
                      <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" 
                         className="text-sm text-blue-600 hover:underline block">
                        GitHub: {member.socialLinks.github}
                      </a>
                      <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                         className="text-sm text-blue-600 hover:underline block">
                        LinkedIn: {member.socialLinks.linkedin}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Motivation Statement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{member.motivation}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Student ID</label>
                      <p className="text-lg font-mono">{member.studentId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Department</label>
                      <p className="text-lg">{member.department}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Current Year</label>
                      <p className="text-lg">{member.year}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">CGPA</label>
                      <p className="text-lg font-semibold text-green-600">{member.cgpa}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Address</label>
                      <p className="text-lg">{member.address}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  Previous Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {member.previousExperience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                      <p className="text-sm text-gray-600">{exp.company} • {exp.duration}</p>
                      <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="references" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  References
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {member.references.map((ref, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <h4 className="font-semibold text-gray-900">{ref.name}</h4>
                      <p className="text-sm text-gray-600">{ref.designation}</p>
                      <p className="text-sm text-gray-600">{ref.department}</p>
                      <p className="text-sm text-blue-600 mt-1">{ref.email}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <Button variant="outline" onClick={handleRejectMember}>
            Reject Application
          </Button>
          <Button onClick={handleApproveMember}>
            Approve Member
          </Button>
        </div>
      </div>
    </ClubAdminLayout>
  )
}