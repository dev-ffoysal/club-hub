'use client'

import { IEvent, EVENT_TYPE } from '@/types/interfaces'
import { useGetEventsQuery } from '@/store/api/eventAPI'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, MapPin, Users, Clock, Calendar } from 'lucide-react'

interface ClubEventsProps {
  clubId: string
}

export const ClubEvents = ({ clubId }: ClubEventsProps) => {
  // Fetch events organized by this club
  const { data: eventsData, isLoading, error } = useGetEventsQuery({
    organizedBy: clubId,
    limit: 10,
    page: 1
  })

  const events = eventsData?.data || []

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Club Events</h3>
        </div>
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="flex">
                <div className="w-48 h-32 bg-gray-200 animate-pulse flex-shrink-0"></div>
                <div className="flex-1 p-6">
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Club Events</h3>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Failed to load events. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Club Events</h3>
          <Badge variant="secondary">0 Events</Badge>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No Events Yet</h4>
            <p className="text-gray-600">This club hasn't organized any events yet. Check back later!</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatDate = (date: string | Date) => {
    const eventDate = new Date(date)
    return eventDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (date: string | Date) => {
    const eventDate = new Date(date)
    return eventDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isUpcoming = (date: string | Date) => {
    return new Date(date) > new Date()
  }

  const isPast = (date: string | Date) => {
    return new Date(date) < new Date()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Club Events</h3>
        <Badge variant="secondary">{events.length} Event{events.length !== 1 ? 's' : ''}</Badge>
      </div>
      
      <div className="grid gap-6">
        {events.map((event: IEvent) => (
          <Card key={event._id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex">
              {event.cover && (
                <div className="w-48 h-32 bg-gray-200 flex-shrink-0 relative">
                  <img 
                    src={event.cover} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  {isUpcoming(event.startDate) && (
                    <Badge className="absolute top-2 left-2 bg-green-600 text-white">
                      Upcoming
                    </Badge>
                  )}
                  {isPast(event.endDate) && (
                    <Badge className="absolute top-2 left-2 bg-gray-600 text-white">
                      Past
                    </Badge>
                  )}
                </div>
              )}
              <div className="flex-1 p-6">
                <CardHeader className="p-0 pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{event.title}</CardTitle>
                      {event.slogan && (
                        <CardDescription className="text-sm text-blue-600 font-medium">
                          {event.slogan}
                        </CardDescription>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Badge variant={event.type === EVENT_TYPE.CONFERENCE ? 'default' : 'secondary'}>
                        {event.type}
                      </Badge>
                      {event.isOnline && (
                        <Badge variant="outline" className="text-xs">
                          Online
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-gray-500" />
                      <span>
                        {formatDate(event.startDate)}
                        {event.endDate && new Date(event.startDate).toDateString() !== new Date(event.endDate).toDateString() && 
                          ` - ${formatDate(event.endDate)}`
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>
                        {formatTime(event.startDate)}
                        {event.endDate && ` - ${formatTime(event.endDate)}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{event.isOnline ? 'Online Event' : event.location || 'TBA'}</span>
                    </div>
                    {event.maxParticipants && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>
                          {event.currentParticipants || 0}/{event.maxParticipants} participants
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {event.tags && event.tags.length > 0 && (
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {event.tags.slice(0, 4).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {event.tags.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{event.tags.length - 4} more
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mt-4">
                    {event.registrationFee ? (
                      <div className="text-sm">
                        <span className="font-medium">Registration Fee: </span>
                        <span className="text-green-600 font-semibold">${event.registrationFee}</span>
                      </div>
                    ) : (
                      <div className="text-sm">
                        <span className="text-green-600 font-semibold">Free Event</span>
                      </div>
                    )}
                    
                    {event.followersCount && event.followersCount > 0 && (
                      <div className="text-sm text-gray-500">
                        {event.followersCount} interested
                      </div>
                    )}
                  </div>

                  {event.registrationDeadline && isUpcoming(event.registrationDeadline) && (
                    <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                      <span className="font-medium text-yellow-800">Registration Deadline: </span>
                      <span className="text-yellow-700">{formatDate(event.registrationDeadline)}</span>
                    </div>
                  )}
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}