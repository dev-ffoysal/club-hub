'use client'

import { Card, CardContent } from '../../../../components/ui/card'
import { Button } from '../../../../components/ui/button'
import { Badge } from '../../../../components/ui/badge'
import { formatDate, formatTime, getTimeUntil, isEventUpcoming } from '../../../../lib/utils'
import { Calendar, MapPin, Users, Globe, Trophy, Edit, Trash2, MessageSquare, Eye, Clock } from 'lucide-react'
import { IEvent, EVENT_TYPE } from '../../../../types/interfaces'

interface EventsListProps {
  events: IEvent[]
  isLoading: boolean
  error: any
  onEdit: (eventId: string) => void
  onDelete: (eventId: string) => void
  onViewDetails: (eventId: string) => void
}

const getEventTypeIcon = (type: EVENT_TYPE) => {
  switch (type) {
    case EVENT_TYPE.CONFERENCE:
      return <Users className="w-4 h-4" />
    case EVENT_TYPE.WORKSHOP:
      return <Trophy className="w-4 h-4" />
    case EVENT_TYPE.SEMINAR:
      return <Calendar className="w-4 h-4" />
    case EVENT_TYPE.HACKATHON:
      return <Trophy className="w-4 h-4" />
    case EVENT_TYPE.COMPETITION:
      return <Trophy className="w-4 h-4" />
    case EVENT_TYPE.MEETING:
      return <Users className="w-4 h-4" />
    case EVENT_TYPE.EXHIBITION:
      return <Eye className="w-4 h-4" />
    case EVENT_TYPE.FESTIVAL:
      return <Calendar className="w-4 h-4" />
    case EVENT_TYPE.CONCERT:
      return <Calendar className="w-4 h-4" />
    default:
      return <Calendar className="w-4 h-4" />
  }
}

const getEventTypeColor = (type: EVENT_TYPE) => {
  switch (type) {
    case EVENT_TYPE.CONFERENCE:
      return 'bg-blue-100 text-blue-800'
    case EVENT_TYPE.WORKSHOP:
      return 'bg-green-100 text-green-800'
    case EVENT_TYPE.SEMINAR:
      return 'bg-purple-100 text-purple-800'
    case EVENT_TYPE.HACKATHON:
      return 'bg-red-100 text-red-800'
    case EVENT_TYPE.COMPETITION:
      return 'bg-orange-100 text-orange-800'
    case EVENT_TYPE.MEETING:
      return 'bg-gray-100 text-gray-800'
    case EVENT_TYPE.EXHIBITION:
      return 'bg-indigo-100 text-indigo-800'
    case EVENT_TYPE.FESTIVAL:
      return 'bg-pink-100 text-pink-800'
    case EVENT_TYPE.CONCERT:
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function EventsList({ events, isLoading, error, onEdit, onDelete, onViewDetails }: EventsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-red-600 mb-2">Error loading events</div>
          <p className="text-gray-600">Please try again later</p>
        </CardContent>
      </Card>
    )
  }

  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">Create your first event to get started</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {events.map((event) => {
        const isUpcoming = isEventUpcoming(event.startDate)
        const participationPercentage = event.maxParticipants 
          ? Math.round(((event.currentParticipants || 0) / event.maxParticipants) * 100)
          : 0

        return (
          <Card key={event._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {/* Event Badges */}
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className={getEventTypeColor(event.type)}>
                      {getEventTypeIcon(event.type)}
                      <span className="ml-1 capitalize">{event.type}</span>
                    </Badge>
                    
                    {event.isOnline && (
                      <Badge variant="secondary">
                        <Globe className="w-4 h-4 mr-1" />
                        Online
                      </Badge>
                    )}
                    
                    {isUpcoming && (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <Clock className="w-4 h-4 mr-1" />
                        {getTimeUntil(event.startDate)}
                      </Badge>
                    )}
                    
                    {!isUpcoming && (
                      <Badge variant="outline">
                        Completed
                      </Badge>
                    )}

                    {!event.isPublic && (
                      <Badge variant="secondary">
                        Private
                      </Badge>
                    )}
                  </div>

                  {/* Event Title and Description */}
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{event.title}</h3>
                  {event.slogan && (
                    <p className="text-sm text-blue-600 font-medium mb-2">{event.slogan}</p>
                  )}
                  {event.description && (
                    <div 
                      className="text-gray-600 mb-4 line-clamp-2 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: event.description }}
                    />
                  )}

                  {/* Event Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span><strong>Date:</strong> {formatDate(event.startDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        <span><strong>Time:</strong> {event.time || `${formatTime(event.startDate)} - ${formatTime(event.endDate)}`}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span><strong>Location:</strong> {event.location}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-gray-400" />
                        <span><strong>Participants:</strong> {event.currentParticipants || 0}/{event.maxParticipants || '∞'}</span>
                      </div>
                      {event.registrationDeadline && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          <span><strong>Deadline:</strong> {formatDate(event.registrationDeadline)}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-2 text-gray-400" />
                        <span><strong>Comments:</strong> {event.commentsEnabled ? 'Enabled' : 'Disabled'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Registration Progress Bar */}
                  {event.maxParticipants && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Registration Progress</span>
                        <span>{participationPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            participationPercentage >= 90 ? 'bg-red-500' : 
                            participationPercentage >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${participationPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {event.tags && event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {event.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2 ml-6">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onEdit(event._id)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onViewDetails(event._id)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onDelete(event._id)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}