'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { Navbar } from '../../../components/layout/navbar'
import { formatDate, formatTime, getTimeUntil, isEventUpcoming } from '../../../lib/utils'
import { Users, Calendar, Trophy, Building2, MapPin, Mail, Phone } from 'lucide-react'

// Mock data unchanged…
// Mock data for individual club page
const mockClub = {
  id: '1',
  name: 'Computer Science Club',
  slug: 'computer-science-club',
  description: 'Fostering innovation and technical excellence in computer science education and research.',
  purpose: 'To create a community of passionate computer science students and professionals who collaborate on projects, share knowledge, and advance the field through learning and innovation.',
  university: 'University of Dhaka',
  contactEmail: 'contact@csclub.du.ac.bd',
  contactPhone: '+880 1XXX-XXXXXX',
  logo: '/clubs/cs-club-logo.jpg',
  coverImage: '/clubs/cs-club-cover.jpg',
  template: 'modern' as const,
  colorScheme: {
    primary: '#3B82F6',
    secondary: '#1E40AF',
    accent: '#60A5FA',
    background: '#F8FAFC'
  },
  isPublic: true,
  memberCount: 156,
  foundedYear: 2018,
  socialLinks: {
    facebook: 'https://facebook.com/csclub.du',
    instagram: 'https://instagram.com/csclub_du',
    website: 'https://csclub.du.ac.bd'
  },
  achievements: [
    {
      id: '1',
      title: 'National Programming Contest Winner 2023',
      description: 'Our team secured first place in the National Collegiate Programming Contest',
      date: new Date('2023-12-15'),
      image: '/achievements/programming-contest.jpg'
    },
    {
      id: '2',
      title: 'Best Tech Innovation Award',
      description: 'Recognized for outstanding contribution to technology innovation in education',
      date: new Date('2023-10-20'),
      image: '/achievements/innovation-award.jpg'
    },
    {
      id: '3',
      title: 'Community Impact Recognition',
      description: 'Awarded for significant impact on local tech community development',
      date: new Date('2023-08-10'),
      image: '/achievements/community-impact.jpg'
    }
  ],
  createdAt: new Date('2018-09-01'),
  updatedAt: new Date('2024-02-10')
}

const mockClubEvents = [
  {
    id: '1',
    title: 'AI and Machine Learning Workshop',
    description: 'Learn the fundamentals of AI and ML with hands-on projects and real-world applications.',
    category: 'workshop' as const,
    type: 'event' as const,
    startDate: new Date('2024-02-15T14:00:00'),
    endDate: new Date('2024-02-15T17:00:00'),
    location: 'Computer Lab, Building A',
    isOnline: false,
    maxParticipants: 50,
    currentParticipants: 32,
    registrationDeadline: new Date('2024-02-13T23:59:59'),
    isPublic: true,
    commentsEnabled: true,
    tags: ['AI', 'Machine Learning', 'Technology'],
    image: '/events/ai-workshop.jpg'
  },
  {
    id: '2',
    title: 'Programming Contest 2024',
    description: 'Annual programming contest with exciting prizes worth BDT 50,000.',
    category: 'competition' as const,
    type: 'competition' as const,
    startDate: new Date('2024-02-20T09:00:00'),
    endDate: new Date('2024-02-20T18:00:00'),
    location: 'Main Auditorium',
    isOnline: false,
    maxParticipants: 100,
    currentParticipants: 78,
    registrationDeadline: new Date('2024-02-18T23:59:59'),
    isPublic: true,
    commentsEnabled: true,
    tags: ['Programming', 'Competition', 'Coding'],
    image: '/events/programming-contest.jpg'
  }
]

const mockClubMembers = [
  {
    id: '1',
    name: 'Ahmed Rahman',
    role: 'President',
    department: 'Computer Science',
    year: '4th Year',
    joinedAt: new Date('2022-09-01'),
    avatar: '/members/ahmed.jpg'
  },
  {
    id: '2',
    name: 'Fatima Khan',
    role: 'Vice President',
    department: 'Computer Science',
    year: '3rd Year',
    joinedAt: new Date('2022-10-15'),
    avatar: '/members/fatima.jpg'
  },
  {
    id: '3',
    name: 'Karim Ahmed',
    role: 'Secretary',
    department: 'Computer Science',
    year: '3rd Year',
    joinedAt: new Date('2023-01-20'),
    avatar: '/members/karim.jpg'
  }
]

interface JoinForm {
  name: string
  email: string
  studentId: string
  department: string
  year: string
  motivation: string
}

interface JoinForm {
  name: string
  email: string
  studentId: string
  department: string
  year: string
  motivation: string
}

export default function ClubDetailPage({ params }: { params: { slug: string } }) {
  const [showJoinForm, setShowJoinForm] = useState(false)
  const [joinForm, setJoinForm] = useState<JoinForm>({
    name: '',
    email: '',
    studentId: '',
    department: '',
    year: '',
    motivation: ''
  })

  const handleJoinClub = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Joining club with data:', joinForm)
    setShowJoinForm(false)
    setJoinForm({
      name: '',
      email: '',
      studentId: '',
      department: '',
      year: '',
      motivation: ''
    })
  }

  const handleRegisterEvent = (eventId: string) => {
    console.log('Registering for event:', eventId)
  }

  const upcomingEvents = mockClubEvents.filter(event => isEventUpcoming(event.startDate))

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Club Header */}
        <div className="relative overflow-hidden rounded-2xl mb-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary))]/80">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative px-8 py-12">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-background rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-primary">
                  {mockClub.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">{mockClub.name}</h1>
                <p className="text-white/80 text-lg mb-4">{mockClub.university}</p>
                <div className="flex items-center space-x-6 text-white/80">
                  <span><Users className="w-4 h-4 inline mr-1" />{mockClub.memberCount} members</span>
                  <span><Calendar className="w-4 h-4 inline mr-1" />Founded {mockClub.foundedYear}</span>
                  <span><Trophy className="w-4 h-4 inline mr-1" />{mockClub.achievements.length} achievements</span>
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Button
                  size="lg"
                  className="bg-background text-primary hover:bg-muted"
                  onClick={() => setShowJoinForm(true)}
                >
                  Join Club
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-primary"
                >
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Join Form Modal */}
        {showJoinForm && (
          <Card className="mb-8 border-[hsl(var(--primary))]/20 bg-[hsl(var(--primary))]/5">
            <CardHeader>
              <CardTitle>Join {mockClub.name}</CardTitle>
              <CardDescription>
                Fill out the form below to request membership to this club
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleJoinClub} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <Input
                      required
                      value={joinForm.name}
                      onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={joinForm.email}
                      onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                      placeholder="your.email@university.edu.bd"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Student ID *
                    </label>
                    <Input
                      required
                      value={joinForm.studentId}
                      onChange={(e) => setJoinForm({ ...joinForm, studentId: e.target.value })}
                      placeholder="CSE2021001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Department *
                    </label>
                    <Input
                      required
                      value={joinForm.department}
                      onChange={(e) => setJoinForm({ ...joinForm, department: e.target.value })}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Year *
                    </label>
                    <select
                      required
                      value={joinForm.year}
                      onChange={(e) => setJoinForm({ ...joinForm, year: e.target.value })}
                      className="w-full p-2 border rounded-md bg-background"
                    >
                      <option value="">Select year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Masters">Masters</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Why do you want to join this club? *
                  </label>
                  <textarea
                    required
                    value={joinForm.motivation}
                    onChange={(e) => setJoinForm({ ...joinForm, motivation: e.target.value })}
                    className="w-full p-3 border rounded-md bg-background"
                    rows={4}
                    placeholder="Tell us about your interest and what you hope to contribute..."
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowJoinForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Submit Application
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <Tabs defaultValue="about" className="space-y-6 ">
          <TabsList className="grid w-full grid-cols-5 bg-card">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle>About Our Club</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Description</h3>
                      <p className="text-muted-foreground">{mockClub.description}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Our Purpose</h3>
                      <p className="text-muted-foreground">{mockClub.purpose}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">What We Do</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Organize technical workshops and seminars</li>
                        <li>Host programming contests and hackathons</li>
                        <li>Facilitate networking with industry professionals</li>
                        <li>Provide mentorship for academic and career development</li>
                        <li>Collaborate on open-source projects</li>
                        <li>Organize study groups and peer learning sessions</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Quick Stats */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle>Club Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Members</span>
                      <span className="font-semibold">{mockClub.memberCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Founded</span>
                      <span className="font-semibold">{mockClub.foundedYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Events</span>
                      <span className="font-semibold">{upcomingEvents.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Achievements</span>
                      <span className="font-semibold">{mockClub.achievements.length}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle>Connect With Us</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockClub.socialLinks.facebook && (
                      <a
                        href={mockClub.socialLinks.facebook}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <span className="text-primary">📘</span>
                        <span>Facebook</span>
                      </a>
                    )}
                    {mockClub.socialLinks.instagram && (
                      <a
                        href={mockClub.socialLinks.instagram}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <span className="text-primary">📷</span>
                        <span>Instagram</span>
                      </a>
                    )}
                    {mockClub.socialLinks.website && (
                      <a
                        href={mockClub.socialLinks.website}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <span className="text-muted-foreground">🌐</span>
                        <span>Website</span>
                      </a>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Club Events</h2>
              <Badge variant="info">{upcomingEvents.length} upcoming events</Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockClubEvents.map((event) => {
                const isUpcoming = isEventUpcoming(event.startDate)
                const spotsLeft = event.maxParticipants ? event.maxParticipants - event.currentParticipants : null

                return (
                  <Card key={event.id} className="relative flex h-full flex-col hover:shadow-lg transition-shadow bg-card">
                    <CardContent className="p-6 pb-20">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex space-x-2">
                          <Badge variant="outline">{event.category}</Badge>
                          {event.type === 'competition' && (
                            <Badge variant="warning"><Trophy className="w-4 h-4 mr-1" />Competition</Badge>
                          )}
                          {isUpcoming && (
                            <Badge variant="success">
                              {getTimeUntil(event.startDate)}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground mb-4">{event.description}</p>

                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <p><Calendar className="w-4 h-4 inline mr-1" />{formatDate(event.startDate)} at {formatTime(event.startDate)}</p>
                        <p><MapPin className="w-4 h-4 inline mr-1" />{event.location}</p>
                        {event.maxParticipants && (
                          <p><Users className="w-4 h-4 inline mr-1" />{event.currentParticipants}/{event.maxParticipants} registered</p>
                        )}
                      </div>

                      {/* Progress Bar */}
                      {event.maxParticipants && (
                        <div className="mb-4">
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </CardContent>

                    {/* Actions pinned to bottom */}
                    {isUpcoming && (
                      <div className="absolute bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur p-4">
                        <div className="flex space-x-2">
                          <Button
                            className="flex-1"
                            disabled={spotsLeft === 0}
                            onClick={() => handleRegisterEvent(event.id)}
                          >
                            {spotsLeft === 0 ? 'Event Full' : 'Register Now'}
                          </Button>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Club Members</h2>
              <Badge variant="info">{mockClub.memberCount} total members</Badge>
            </div>

            {/* Leadership Team */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Leadership Team</CardTitle>
                <CardDescription>Meet the people leading our club</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockClubMembers.map((member) => (
                    <div key={member.id} className="text-center">
                      <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-xl font-semibold text-muted-foreground">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.department}</p>
                      <p className="text-sm text-muted-foreground">{member.year}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Member since {formatDate(member.joinedAt)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Member Benefits */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Member Benefits</CardTitle>
                <CardDescription>What you get as a club member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Learning & Development</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Access to exclusive workshops and seminars</li>
                      <li>• Mentorship from senior members and alumni</li>
                      <li>• Skill development programs</li>
                      <li>• Technical project collaboration</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Networking & Opportunities</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Industry connections and job opportunities</li>
                      <li>• Alumni network access</li>
                      <li>• Competition participation</li>
                      <li>• Leadership development opportunities</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Our Achievements</h2>
              <Badge variant="info">{mockClub.achievements.length} achievements</Badge>
            </div>

            <div className="space-y-6">
              {mockClub.achievements.map((achievement) => (
                <Card key={achievement.id} className="hover:shadow-lg transition-shadow bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Trophy className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                        <p className="text-muted-foreground mb-3">{achievement.description}</p>
                        <p className="text-sm text-muted-foreground">
                          Achieved on {formatDate(achievement.date)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>Contact us for any questions or inquiries</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">{mockClub.contactEmail}</p>
                    </div>
                  </div>
                  {mockClub.contactPhone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-muted-foreground">{mockClub.contactPhone}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">University</p>
                      <p className="text-muted-foreground">{mockClub.university}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>We'd love to hear from you</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <Input placeholder="Enter your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input type="email" placeholder="your.email@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        className="w-full p-3 border rounded-md bg-background"
                        rows={4}
                        placeholder="Your message..."
                      />
                    </div>
                    <Button className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
