'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useGetClubByIdQuery } from '@/store/api/clubAPI'
import { IClubUser, IEvent, IAchievement, EVENT_TYPE, USER_ROLES } from '@/types/interfaces'
import { useToggleClubFollowMutation } from '@/store/api/engagementAPI'
import { useAppSelector } from '@/store/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Navbar } from '@/components/layout/navbar'
import { CalendarDays, MapPin, Users, Mail, Phone, Globe, Facebook, Instagram, Twitter, Linkedin, Clock, Trophy, Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

import ClubAchievements from './components/ClubAchievements'
import { ClubEvents } from './components/ClubEvents'
import { getImageUrl } from '@/lib/utils/imageDisplay'
import DOMPurify from 'dompurify'


interface JoinFormData {
  name: string
  email: string
  studentId: string
  department: string
  year: string
  reason: string
}

export default function ClubDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [activeTab, setActiveTab] = useState('about')
  const [showJoinForm, setShowJoinForm] = useState(false)
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0)
  const [joinForm, setJoinForm] = useState<JoinFormData>({
    name: '',
    email: '',
    studentId: '',
    department: '',
    year: '',
    reason: ''
  })

  const { data: clubData, isLoading, error } = useGetClubByIdQuery(slug)
  const [club, setClub] = useState<IClubUser | null>(null)

  // Authentication state
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  
  // Follow functionality
  const [toggleClubFollow] = useToggleClubFollowMutation()

  // Update local club state when API data changes
  useEffect(() => {
    if (clubData?.data) {
      setClub(clubData.data)
    }
  }, [clubData])

  // Auto-slideshow for cover images
  useEffect(() => {
    if (club?.clubCovers && club.clubCovers.length > 1) {
      const interval = setInterval(() => {
        setCurrentCoverIndex((prev) => 
          prev === club.clubCovers!.length - 1 ? 0 : prev + 1
        )
      }, 5000) // Change every 5 seconds

      return () => clearInterval(interval)
    }
  }, [club?.clubCovers])

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Join form submitted:', joinForm)
    setShowJoinForm(false)
    setJoinForm({
      name: '',
      email: '',
      studentId: '',
      department: '',
      year: '',
      reason: ''
    })
  }

  // Follow handler
  const handleFollow = async () => {
    if (!isAuthenticated || !club?._id) return
    
    try {
      const result = await toggleClubFollow( club._id ).unwrap()
      // Update the local club state with the new isFollowing value
      setClub(prev => prev ? { ...prev, isFollowing: result.data?.isFollowing } : null)
    } catch (error) {
      console.error('Error toggling club follow:', error)
    }
  }

  // Role-based authorization checks
  const canInteract = () => {
    if (!isAuthenticated || !club) return false
    // Only members can follow clubs - clubs cannot follow other clubs
    if (user?.role === USER_ROLES.CLUB) return false
    return true
  }

  const nextCover = () => {
    if (club?.clubCovers && club.clubCovers.length > 1) {
      setCurrentCoverIndex((prev) => 
        prev === club.clubCovers!.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevCover = () => {
    if (club?.clubCovers && club.clubCovers.length > 1) {
      setCurrentCoverIndex((prev) => 
        prev === 0 ? club.clubCovers!.length - 1 : prev - 1
      )
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading club details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Club</h1>
          <p className="text-gray-600">Failed to load club details. Please try again later.</p>
        </div>
      </div>
    )
  }

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Club Not Found</h1>
          <p className="text-gray-600">The club you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background text-foreground">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header with Back Button */}
        {/* <div className="flex justify-between items-center mb-6">
          <Link href="/clubs">
            <Button variant="outline">← Back to Clubs</Button>
          </Link>
        </div> */}

        {/* Enhanced Club Hero Banner with Cover Slideshow */}
        <Card className="mb-8 overflow-hidden border bg-card text-card-foreground">
          <div className="h-[30vw] relative">
            {/* Cover Image Slideshow */}
            {club.clubCovers && club.clubCovers.length > 0 ? (
              <div className="relative w-full h-full">
                <img 
                  src={getImageUrl(club.clubCovers[currentCoverIndex])} 
                  alt={`${club.clubName} cover ${currentCoverIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                />
                
                {/* Navigation arrows for multiple covers */}
                {club.clubCovers.length > 1 && (
                  <>
                    <button
                      onClick={prevCover}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextCover}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    {/* Dots indicator */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {club.clubCovers.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentCoverIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentCoverIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary))]/80" />
            )}
            
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Club Profile Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <div className="flex items-end space-x-6">
                {/* Rounded Profile Picture */}
                <div className="flex-shrink-0">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage 
                      src={getImageUrl(club.profile)} 
                      alt={club.clubName}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-2xl font-bold bg-white text-gray-800">
                      {club.clubName?.charAt(0) || 'C'}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Club Information */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-white font-bold text-4xl mb-2 truncate">{club.clubName}</h1>
                  {club.clubTitle && (
                    <p className="text-white/90 text-xl mb-3">{club.clubTitle}</p>
                  )}

                  {/* Prominent Information */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {club.university && (
                      <Badge className="bg-blue-600/90 text-white border-0">
                        <Globe className="w-4 h-4 mr-1" />
                        {club.university}
                      </Badge>
                    )}
                    
                    {club.categories && club.categories.length > 0 && (
                      <Badge className="bg-green-600/90 text-white border-0">
                        <Trophy className="w-4 h-4 mr-1" />
                        {club.categories.join(', ')}
                      </Badge>
                    )}
                    
                    <Badge className="bg-purple-600/90 text-white border-0">
                      <Heart className="w-4 h-4 mr-1" />
                      {club.followersCount || 0} followers
                    </Badge>
                    
                    {club.establishedYear && (
                      <Badge className="bg-orange-600/90 text-white border-0">
                        <CalendarDays className="w-4 h-4 mr-1" />
                        Est. {club.establishedYear}
                      </Badge>
                    )}
                  </div>

                  {/* Additional Info */}
                  <div className="flex items-center text-white/80 text-sm space-x-4">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {club.membersCount || 0} members
                    </span>
                    {club.rating && club.rating > 0 && (
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {club.rating} rating
                      </span>
                    )}
                    {club.address && (
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {club.address}
                      </span>
                    )}
                  </div>
                </div>

                {/* Follow/Join Button */}
                <div className="flex-shrink-0 flex space-x-3">
                  {isAuthenticated ? (
                    canInteract() ? (
                      <Button 
                        onClick={handleFollow}
                        size="lg"
                        variant={club?.isFollowing ? "outline" : "default"}
                        className="font-semibold px-8"
                      >
                        {club?.isFollowing ? 'Unfollow' : 'Follow'}
                      </Button>
                    ) : (
                       <Button 
                         size="lg"
                         disabled
                         className="font-semibold px-8"
                         title="Only members can follow clubs"
                       >
                         Follow
                       </Button>
                     )
                  ) : (
                    <Button 
                      size="lg"
                      disabled
                      className="font-semibold px-8"
                      title="Please login to follow clubs"
                    >
                      Follow
                    </Button>
                  )}
                  <Button 
                    onClick={() => setShowJoinForm(true)}
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8"
                  >
                    Join Club
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main About Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Club Description */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      About {club.clubName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="prose text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          club.clubDescription ||
                          club.description ||
                          '<p>No description available for this club.</p>'
                        ),
                      }}
/>
                  </CardContent>
                </Card>

                {/* Goals */}
                {club.clubGoal && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Star className="w-5 h-5 mr-2" />
                        Goals
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">{club.clubGoal}</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar Information */}
              <div className="space-y-6">
                {/* Club Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Club Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        Members
                      </span>
                      <span className="font-semibold">{club.membersCount || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm">
                        <Heart className="h-4 w-4 mr-2 text-gray-400" />
                        Followers
                      </span>
                      <span className="font-semibold">{club.followersCount || 0}</span>
                    </div>
                    {club.rating && club.rating > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-sm">
                          <Star className="h-4 w-4 mr-2 text-gray-400" />
                          Rating
                        </span>
                        <span className="font-semibold">{club.rating}</span>
                      </div>
                    )}
                    {club.establishedYear && (
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-sm">
                          <CalendarDays className="h-4 w-4 mr-2 text-gray-400" />
                          Established
                        </span>
                        <span className="font-semibold">{club.establishedYear}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Categories */}
                {club.categories && club.categories.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {club.categories.map((category, index) => (
                          <Badge key={index} variant="outline">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Location */}
                {club.address && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Location</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {club.address}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Combined Purpose and Working Areas Section */}
            {(club.clubPurpose || (club.clubWorkingAreas && club.clubWorkingAreas.length > 0)) && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Trophy className="w-6 h-6 mr-3 text-blue-600" />
                      Purpose & Working Areas
                    </CardTitle>
                    <CardDescription>
                      Our mission and the areas we focus on
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Purpose Section */}
                    {club.clubPurpose && (
                      <div>
                        <h4 className="font-semibold text-lg mb-3 text-gray-800">Our Purpose</h4>
                          <div
                            className="prose text-gray-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(club.clubPurpose) }}
                          />
                      </div>
                    )}

                    {/* Working Areas Section */}
                    {club.clubWorkingAreas && club.clubWorkingAreas.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-lg mb-3 text-gray-800">Working Areas</h4>
                        <div className="flex flex-wrap gap-3">
                          {club.clubWorkingAreas.map((area, index) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="text-sm px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                            >
                              <Users className="w-3 h-3 mr-1" />
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <ClubEvents clubId={club._id} />
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <ClubAchievements clubId={club._id} />
          </TabsContent>

          <TabsContent value="members" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Club Members</CardTitle>
                <CardDescription>
                  Current members of {club.clubName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Member list feature coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Primary Contact Information */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    Contact Information
                  </CardTitle>
                  <CardDescription>Get in touch with the club</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {club && (
                    <>
                      {club.email && (
                        <div className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <Mail className="h-5 w-5 text-white" />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">Email</p>
                            <a href={`mailto:${club.email}`} className="text-blue-600 hover:text-blue-800 font-medium">
                              {club.email}
                            </a>
                          </div>
                        </div>
                      )}
                      
                      {club.phone && (
                        <div className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                          <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                            <Phone className="h-5 w-5 text-white" />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">Phone</p>
                            <a href={`tel:${club.phone}`} className="text-green-600 hover:text-green-800 font-medium">
                              {club.phone}
                            </a>
                          </div>
                        </div>
                      )}
                      
                      {club.address && (
                        <div className="flex items-start p-3 bg-purple-50 rounded-lg">
                          <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-white" />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">Address</p>
                            <p className="text-purple-600 font-medium">{club.address}</p>
                          </div>
                        </div>
                      )}
                      
                      {club.university && (
                        <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                          <div className="flex-shrink-0 w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-white" />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">University</p>
                            <p className="text-orange-600 font-medium">{club.university}</p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Social Media & Online Presence */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-purple-600" />
                    Connect With Us
                  </CardTitle>
                  <CardDescription>Follow us on social media</CardDescription>
                </CardHeader>
                <CardContent>
                  {club?.socialLinks ? (
                    <div className="space-y-3">
                      {club.socialLinks.website && (
                        <a 
                          href={club.socialLinks.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                            <Globe className="h-5 w-5 text-white" />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">Website</p>
                            <p className="text-gray-600 text-sm truncate">{club.socialLinks.website}</p>
                          </div>
                        </a>
                      )}
                      
                      {club.socialLinks.facebook && (
                        <a 
                          href={club.socialLinks.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                            <Facebook className="h-5 w-5 text-white" />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">Facebook</p>
                            <p className="text-blue-600 text-sm">Follow our page</p>
                          </div>
                        </a>
                      )}
                      
                      {club.socialLinks.instagram && (
                        <a 
                          href={club.socialLinks.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors group"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center group-hover:bg-pink-700 transition-colors">
                            <Instagram className="h-5 w-5 text-white" />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">Instagram</p>
                            <p className="text-pink-600 text-sm">See our photos</p>
                          </div>
                        </a>
                      )}
                      
                      {club.socialLinks.twitter && (
                        <a 
                          href={club.socialLinks.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center p-3 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors group"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center group-hover:bg-sky-700 transition-colors">
                            <Twitter className="h-5 w-5 text-white" />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">Twitter</p>
                            <p className="text-sky-600 text-sm">Latest updates</p>
                          </div>
                        </a>
                      )}
                      
                      {club.socialLinks.linkedin && (
                        <a 
                          href={club.socialLinks.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center group-hover:bg-blue-800 transition-colors">
                            <Linkedin className="h-5 w-5 text-white" />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">LinkedIn</p>
                            <p className="text-blue-700 text-sm">Professional network</p>
                          </div>
                        </a>
                      )}
                      
                      {!club.socialLinks.website && !club.socialLinks.facebook && !club.socialLinks.instagram && !club.socialLinks.twitter && !club.socialLinks.linkedin && (
                        <div className="text-center py-8">
                          <Globe className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                          <p className="text-gray-500">No social media links available</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Globe className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500">No social media links available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Join Form Modal */}
      {showJoinForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Join {club.clubName}</CardTitle>
              <CardDescription>
                Fill out this form to request membership
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleJoinSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <Input
                    value={joinForm.name}
                    onChange={(e) => setJoinForm({...joinForm, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    type="email"
                    value={joinForm.email}
                    onChange={(e) => setJoinForm({...joinForm, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Student ID</label>
                  <Input
                    value={joinForm.studentId}
                    onChange={(e) => setJoinForm({...joinForm, studentId: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Department</label>
                  <Input
                    value={joinForm.department}
                    onChange={(e) => setJoinForm({...joinForm, department: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Year</label>
                  <Input
                    value={joinForm.year}
                    onChange={(e) => setJoinForm({...joinForm, year: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Why do you want to join?</label>
                  <Textarea
                    value={joinForm.reason}
                    onChange={(e) => setJoinForm({...joinForm, reason: e.target.value})}
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1">
                    Submit Application
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowJoinForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
