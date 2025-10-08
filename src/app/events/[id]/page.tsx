'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Navbar } from '../../../components/layout/navbar'
import { Countdown } from '../../../components/ui/countdown'
import { SocialInteractions } from '../../../components/ui/social-interactions'
import { EVENT_CATEGORIES } from '../../../lib/constants'
import { formatDate, formatTime, isEventUpcoming, isEventWithinWeek } from '../../../lib/utils'
import { getImageUrl } from '../../../lib/utils/imageDisplay'
import { useGetSingleEventQuery } from '../../../store/api/eventAPI'
import Link from 'next/link'
import { User as UserIcon, Lock, Trophy, Building2, Users, Calendar, MapPin, Clock, Loader2 } from 'lucide-react'
import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  
  const [isRegistered, setIsRegistered] = useState(false)
  


  // Fetch event data from API
  const { data: eventResponse, isLoading, error } = useGetSingleEventQuery(eventId)
  const event = eventResponse?.data

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading event details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Event Not Found</h1>
            <p className="mt-2 text-gray-600">The event you're looking for doesn't exist or couldn't be loaded.</p>
            <Link href="/events">
              <Button className="mt-4">Back to Events</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Get category info - fallback to default if category not found
  const categoryKey = event.type || 'workshop'
  const categoryInfo = EVENT_CATEGORIES[categoryKey as keyof typeof EVENT_CATEGORIES] || EVENT_CATEGORIES.workshop
  
  const isUpcoming = isEventUpcoming(new Date(event.startDate))
  const isWithinWeek = isEventWithinWeek(new Date(event.startDate))
  const spotsLeft = event.maxParticipants ? event.maxParticipants - (event.currentParticipants || 0) : null



  const handleRegister = () => {
    if (!user) {
      alert('Please login to register for events')
      return
    }
    setIsRegistered(!isRegistered)
  }

  // Get creator info
  const creator = typeof event.createdBy === 'object' ? event.createdBy : null
  const organizedBy = typeof event.organizedBy === 'object' ? event.organizedBy : null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background  text-foreground">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Event Hero Section */}
        <Card className="mb-8 overflow-hidden border bg-card text-card-foreground">
          <div className="h-[30vw] relative overflow-hidden">
            {/* Background Image or Gradient */}
            {event.cover ? (
              <>
                <img 
                  src={getImageUrl(event.cover)} 
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </>
            ) : event.images && event.images.length > 0 ? (
              <>
                <img 
                  src={getImageUrl(event.images[0])} 
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </>
            ) : (
              <>
                <div className="absolute inset-0  bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary))]/80"></div>
                <div className="absolute inset-0 bg-black/20"></div>
              </>
            )}

            {/* Countdown Timer for events within a week */}
            {isUpcoming && isWithinWeek && (
              <div className="absolute top-4 right-4">
                <Countdown targetDate={new Date(event.startDate)} />
              </div>
            )}

            <div className="absolute bottom-6 left-6 right-6">
              <div className="backdrop-blur-sm bg-black/30 rounded-lg p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={categoryInfo.color}>
                    <categoryInfo.icon className="w-4 h-4 mr-1" /> {categoryInfo.name}
                  </Badge>
                  {event.type === 'competition' && (
                    <Badge variant="warning">
                      <Trophy className="w-4 h-4 mr-1" />
                      Competition
                    </Badge>
                  )}
                  {event.isOnline && <Badge variant="info">🌐 Online</Badge>}
                  {isUpcoming && !isWithinWeek && (
                    <Badge variant="success">{formatDate(new Date(event.startDate))}</Badge>
                  )}
                </div>

                <h1 className="text-white font-bold text-3xl mb-2">{event.title}</h1>
                {event.slogan && (
                  <p className="text-white/90 text-lg mb-2">{event.slogan}</p>
                )}

                <div className="flex items-center text-white/90 text-sm">
                  {organizedBy && (
                    <>
                      <span className="mr-4">
                        <Building2 className="w-4 h-4 inline mr-1" />
                        {organizedBy.university || 'University'}
                      </span>
                      <span className="mr-4">
                        <Users className="w-4 h-4 inline mr-1" />
                        {organizedBy.clubName || organizedBy.name}
                      </span>
                    </>
                  )}
                  {creator && (
                    <span>
                      <UserIcon className="w-4 h-4 inline mr-1" />
                      {creator.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: event.description ||'<p class="text-gray-500">Nothing to preview...</p>'}}
                />
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            {event.instructions && event.instructions.length > 0 && (
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {event.instructions.map((instruction, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2">{instruction.title}</h4>
                        {instruction.description && (
                          <p className="text-sm text-muted-foreground mb-2">{instruction.description}</p>
                        )}
                        {instruction.criteria && instruction.criteria.length > 0 && (
                          <ul className="space-y-1">
                            {instruction.criteria.map((criterion, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start space-x-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{criterion}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Requirements & Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {event.requirements && event.requirements.length > 0 && (
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle className="text-lg">Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {event.requirements.map((requirement, index) => (
                        <div key={index} className="p-3 bg-muted/50 rounded-lg">
                          <h4 className="font-semibold text-sm mb-2">{requirement.title}</h4>
                          {requirement.description && (
                            <p className="text-sm text-muted-foreground mb-2">{requirement.description}</p>
                          )}
                          {requirement.criteria && requirement.criteria.length > 0 && (
                            <ul className="space-y-1">
                              {requirement.criteria.map((criterion, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start space-x-2">
                                  <span className="text-destructive mt-1">•</span>
                                  <span>{criterion}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {event.benefits && event.benefits.length > 0 && (
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle className="text-lg">What You'll Get</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {event.benefits.map((benefit, index) => (
                        <div key={index} className="p-3 bg-muted/50 rounded-lg">
                          <h4 className="font-semibold text-sm mb-2">{benefit.title}</h4>
                          {benefit.description && (
                            <p className="text-sm text-muted-foreground mb-2">{benefit.description}</p>
                          )}
                          {benefit.criteria && benefit.criteria.length > 0 && (
                            <ul className="space-y-1">
                              {benefit.criteria.map((criterion, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start space-x-2">
                                  <span className="text-primary mt-1">✓</span>
                                  <span>{criterion}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* FAQs */}
            {event.faqs && event.faqs.length > 0 && (
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {event.faqs.map((faq, index) => (
                      <div key={index} className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2">{faq.question}</h4>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Details */}
            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <div>
                    <div className="font-semibold">{formatDate(new Date(event.startDate))}</div>
                    <div className="text-muted-foreground">
                      {event.time || `${formatTime(new Date(event.startDate))} - ${formatTime(new Date(event.endDate))}`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-muted-foreground">{event.location}</span>
                </div>

                {event.meetingLink && (
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    <a 
                      href={event.meetingLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Join Meeting
                    </a>
                  </div>
                )}

                {event.maxParticipants && (
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-muted-foreground">
                      {event.currentParticipants || 0}/{event.maxParticipants} participants
                      {spotsLeft && spotsLeft > 0 && (
                        <span className="text-green-600 dark:text-green-400 ml-1">({spotsLeft} spots left)</span>
                      )}
                    </span>
                  </div>
                )}

                <div className="flex items-center text-sm">
                  <Trophy className="w-4 h-4 mr-2" />
                  <span className="text-muted-foreground">
                    {event.registrationFee && event.registrationFee > 0 
                      ? `Registration Fee: BDT ${event.registrationFee}`
                      : 'Free Event'
                    }
                  </span>
                </div>

                {event.registrationDeadline && isEventUpcoming(new Date(event.registrationDeadline)) && (
                  <div className="flex items-center text-sm text-orange-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Registration closes: {formatDate(new Date(event.registrationDeadline))}</span>
                  </div>
                )}

                {creator && (
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-sm mb-2">Created By</h4>
                    <div className="text-sm">
                      <div className="font-medium">{creator.name}</div>
                      <div className="text-primary">{creator.email}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Registration Progress */}
            {event.maxParticipants && (
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle>Registration Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Registered</span>
                      <span>
                        {Math.round(((event.currentParticipants || 0) / event.maxParticipants) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-primary h-3 rounded-full transition-all duration-300"
                        style={{
                          width: `${((event.currentParticipants || 0) / event.maxParticipants) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Social Interactions */}
            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <SocialInteractions
                  eventId={event._id}
                  clubId={typeof event.organizedBy === 'object' ? event.organizedBy?._id : event.organizedBy}
                  followers={event.followersCount || 0}
                  upvotes={event.upVotesCount || 0}
                  downvotes={event.downVotesCount || 0}
                  isLoggedIn={isAuthenticated}
                  isFollowing={false} // Events don't have following functionality
                  userVote={event.voteType}
                  className="flex-col space-y-4"
                  showFollowers={false} // Hide followers for events
                />
              </CardContent>
            </Card>

            {/* Registration Button */}
            <Card className="bg-card text-card-foreground">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button
                    onClick={handleRegister}
                    className="w-full"
                    size="lg"
                    disabled={!isUpcoming || spotsLeft === 0}
                  >
                    {!isUpcoming
                      ? 'Event Ended'
                      : spotsLeft === 0
                      ? 'Event Full'
                      : isRegistered
                      ? '✓ Registered'
                      : 'Register Now'}
                  </Button>

                  {!user && (
                    <p className="text-xs text-muted-foreground text-center">
                      Please login to register for this event
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Winning Prizes */}
            {event.winningPrize && event.winningPrize.length > 0 && (
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle>Prizes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {event.winningPrize.map((prize, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm">{prize.title}</h4>
                          {prize.amount && (
                            <span className="text-primary font-bold">BDT {prize.amount}</span>
                          )}
                        </div>
                        {prize.description && (
                          <p className="text-sm text-muted-foreground">{prize.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}