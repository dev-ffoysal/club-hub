'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../../components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Badge } from '../../../../components/ui/badge'
import { Button } from '../../../../components/ui/button'
import { Separator } from '../../../../components/ui/separator'
import { useGetSingleEventQuery } from '../../../../store/api/eventAPI'
import { formatDate, formatTime } from '../../../../lib/utils'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Globe, 
  Trophy, 
  DollarSign, 
  MessageSquare,
  Eye,
  EyeOff,
  Loader2,
  X
} from 'lucide-react'

interface EventDetailsModalProps {
  eventId: string | null
  isOpen: boolean
  onClose: () => void
}

export function EventDetailsModal({ eventId, isOpen, onClose }: EventDetailsModalProps) {
  const { data: eventResponse, isLoading, error } = useGetSingleEventQuery(eventId!, {
    skip: !eventId
  })
  
  const event = eventResponse?.data

  if (!eventId) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Event Details
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-2">Loading event details...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600">Failed to load event details</p>
          </div>
        )}

        {event && (
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{event.title}</span>
                  <div className="flex gap-2">
                    <Badge variant={event.type === 'competition' ? 'default' : 'secondary'}>
                      {event.type}
                    </Badge>
                    {event.isOnline && (
                      <Badge variant="outline">
                        <Globe className="w-4 h-4 mr-1" />
                        Online
                      </Badge>
                    )}
                  </div>
                </CardTitle>
                {event.slogan && (
                  <p className="text-blue-600 font-medium">{event.slogan}</p>
                )}
              </CardHeader>
              <CardContent>
                <div 
                  className="text-gray-600 mb-4 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: event.description || '<p class="text-gray-500">Nothing to preview...</p>' }}
                />
                
                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Date & Time</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span><strong>Start:</strong> {formatDate(event.startDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span><strong>End:</strong> {formatDate(event.endDate)}</span>
                  </div>
                  {event.time && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      <span><strong>Time:</strong> {event.time}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{event.location}</span>
                  </div>
                  {event.meetingLink && (
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-gray-500" />
                      <a 
                        href={event.meetingLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Meeting Link
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Registration Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Registration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gray-500" />
                    <span>
                      <strong>Participants:</strong> {event.currentParticipants || 0}
                      {event.maxParticipants && ` / ${event.maxParticipants}`}
                    </span>
                  </div>
                  
                  {event.registrationFee !== undefined && (
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                      <span>
                        <strong>Fee:</strong> {event.registrationFee === 0 ? 'Free' : `$${event.registrationFee}`}
                      </span>
                    </div>
                  )}
                  
                  {event.registrationDeadline && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      <span>
                        <strong>Deadline:</strong> {formatDate(event.registrationDeadline)}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    {event.isPublic ? (
                      <Eye className="w-4 h-4 mr-2 text-green-500" />
                    ) : (
                      <EyeOff className="w-4 h-4 mr-2 text-gray-500" />
                    )}
                    <span>{event.isPublic ? 'Public Event' : 'Private Event'}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Comments {event.commentsEnabled ? 'Enabled' : 'Disabled'}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${event.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                    <span>{event.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            {(event.host && event.host.length > 0 || event.guests && event.guests.length > 0 || event.sponsors && event.sponsors.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {event.host && event.host.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Hosts</h4>
                      <div className="space-y-2">
                        {event.host.map((host, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <span className="font-medium">{host.name}</span>
                            {host.designation && (
                              <span className="text-gray-600">- {host.designation}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {event.guests && event.guests.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Guests</h4>
                      <div className="space-y-2">
                        {event.guests.map((guest, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <span className="font-medium">{guest.name}</span>
                            {guest.designation && (
                              <span className="text-gray-600">- {guest.designation}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {event.sponsors && event.sponsors.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Sponsors</h4>
                      <div className="space-y-2">
                        {event.sponsors.map((sponsor, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <span className="font-medium">{sponsor.name}</span>
                            {sponsor.sponsorType && (
                              <Badge variant="outline">{sponsor.sponsorType}</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Rules, Benefits, Requirements */}
            {(event.rules && event.rules.length > 0 || event.benefits && event.benefits.length > 0 || event.requirements && event.requirements.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Event Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {event.benefits && event.benefits.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Benefits</h4>
                      <div className="space-y-2">
                        {event.benefits.map((benefit, index) => (
                          <div key={index} className="border-l-4 border-green-500 pl-4">
                            <h5 className="font-medium">{benefit.title}</h5>
                            {benefit.description && (
                              <p className="text-gray-600 text-sm">{benefit.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {event.requirements && event.requirements.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Requirements</h4>
                      <div className="space-y-2">
                        {event.requirements.map((requirement, index) => (
                          <div key={index} className="border-l-4 border-blue-500 pl-4">
                            <h5 className="font-medium">{requirement.title}</h5>
                            {requirement.description && (
                              <p className="text-gray-600 text-sm">{requirement.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {event.rules && event.rules.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Rules</h4>
                      <div className="space-y-2">
                        {event.rules.map((rule, index) => (
                          <div key={index} className="border-l-4 border-red-500 pl-4">
                            <h5 className="font-medium">{rule.title}</h5>
                            {rule.description && (
                              <p className="text-gray-600 text-sm">{rule.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* FAQs */}
            {event.faqs && event.faqs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {event.faqs.map((faq, index) => (
                      <div key={index}>
                        <h5 className="font-medium mb-1">{faq.question}</h5>
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                        {index < event.faqs!.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}