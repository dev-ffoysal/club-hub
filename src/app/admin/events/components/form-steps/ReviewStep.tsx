'use client'

import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card'
import { Badge } from '../../../../../components/ui/badge'
import { Separator } from '../../../../../components/ui/separator'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  DollarSign, 
  Globe, 
  Star,
  Image as ImageIcon,
  Award,
  Building,
  HelpCircle,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { EVENT_TYPE } from '../../../../../types/interfaces'

interface ReviewStepProps {
  formData: any
  errors: Record<string, string>
}

export function ReviewStep({ formData, errors }: ReviewStepProps) {
  const hasErrors = Object.keys(errors).length > 0

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not set'
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getEventTypeLabel = (type: EVENT_TYPE) => {
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
  }

  const getCompletionStats = () => {
    const sections = [
      { name: 'Basic Info', completed: !!(formData.title && formData.description && formData.type) },
      { name: 'Date & Time', completed: !!(formData.startDate && formData.endDate && formData.location) },
      { name: 'Media', completed: formData.imageFiles?.length > 0 },
      { name: 'Hosts', completed: formData.host?.length > 0 },
      { name: 'Prizes', completed: formData.winningPrize?.length > 0 },
      { name: 'Sponsors', completed: formData.sponsors?.length > 0 },
      { name: 'FAQs', completed: formData.faqs?.length > 0 }
    ]

    const completedCount = sections.filter(s => s.completed).length
    const totalCount = sections.length
    const percentage = Math.round((completedCount / totalCount) * 100)

    return { sections, completedCount, totalCount, percentage }
  }

  const stats = getCompletionStats()

  return (
    <div className="space-y-6">
      {/* Validation Status */}
      {hasErrors && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-medium">Please fix the following errors:</h3>
            </div>
            <ul className="mt-2 space-y-1 text-sm text-red-700">
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>• {error}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Completion Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Event Completion Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <Badge variant={stats.percentage >= 70 ? 'default' : 'secondary'}>
                {stats.percentage}% Complete
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {stats.sections.map((section) => (
                <div key={section.name} className="flex items-center gap-2 text-sm">
                  <div className={`w-3 h-3 rounded-full ${
                    section.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                  <span className={section.completed ? 'text-green-700' : 'text-gray-500'}>
                    {section.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{formData.title || 'Untitled Event'}</h3>
            {formData.slogan && (
              <p className="text-gray-600 italic">{formData.slogan}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Event Type</label>
              <p className="text-gray-900">{getEventTypeLabel(formData.type)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Categories</label>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.categories?.length > 0 ? (
                  formData.categories.map((category: string, index: number) => (
                    <Badge key={index} variant="outline">{category}</Badge>
                  ))
                ) : (
                  <span className="text-gray-400">No categories selected</span>
                )}
              </div>
            </div>
          </div>

          {formData.description && (
            <div>
              <label className="text-sm font-medium text-gray-500">Description</label>
              {/* <p className="text-gray-900 mt-1">{formData.description}</p> */}
               <div 
                  className="text-gray-600 mb-4 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: formData.description || '<p class="text-gray-500">Nothing to preview...</p>' }}
                />
            </div>
          )}

          {formData.tags?.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-500">Tags</label>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary">#{tag}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Date, Time & Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Date, Time & Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Start Date & Time
              </label>
              <p className="text-gray-900">{formatDate(formData.startDate)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                End Date & Time
              </label>
              <p className="text-gray-900">{formatDate(formData.endDate)}</p>
            </div>
          </div>

          {formData.time && (
            <div>
              <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Custom Time Display
              </label>
              <p className="text-gray-900">{formData.time}</p>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
              {formData.isOnline ? <Globe className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
              {formData.isOnline ? 'Online Platform' : 'Venue'}
            </label>
            <p className="text-gray-900">{formData.location || 'Not specified'}</p>
            {formData.isOnline && formData.meetingLink && (
              <p className="text-blue-600 text-sm mt-1">Meeting Link: {formData.meetingLink}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Registration Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Registration Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Registration Fee</label>
              <p className="text-gray-900 flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                {formData.registrationFee ? `$${formData.registrationFee}` : 'Free'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Seat Limit</label>
              <p className="text-gray-900">
                {formData.isFixedSeat ? `${formData.maxParticipants} seats` : 'Unlimited'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Registration Deadline</label>
              <p className="text-gray-900">
                {formData.registrationDeadline ? formatDate(formData.registrationDeadline) : 'No deadline'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.isPublic && <Badge variant="outline">Public Event</Badge>}
            {formData.commentsEnabled && <Badge variant="outline">Comments Enabled</Badge>}
            {formData.isActive && <Badge variant="outline">Active</Badge>}
            {formData.isOnline && <Badge variant="outline">Online Event</Badge>}
          </div>
        </CardContent>
      </Card>

      {/* Media */}
      {formData.imageFiles?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Event Images ({formData.imageFiles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.imageFiles.slice(0, 4).map((image: any, index: number) => (
                <div key={image.key} className="relative">
                  <img
                    src={image.preview}
                    alt={`Event image ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  {image.isCover && (
                    <Badge className="absolute top-1 left-1 text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      Cover
                    </Badge>
                  )}
                </div>
              ))}
              {formData.imageFiles.length > 4 && (
                <div className="flex items-center justify-center h-24 bg-gray-100 rounded-lg">
                  <span className="text-sm text-gray-500">+{formData.imageFiles.length - 4} more</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Information Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* People */}
        {(formData.host?.length > 0 || formData.guests?.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                People
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.host?.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Hosts ({formData.host.length})</label>
                  <div className="space-y-1">
                    {formData.host.slice(0, 3).map((host: any, index: number) => (
                      <p key={index} className="text-sm text-gray-900">{host.name}</p>
                    ))}
                    {formData.host.length > 3 && (
                      <p className="text-sm text-gray-500">+{formData.host.length - 3} more</p>
                    )}
                  </div>
                </div>
              )}
              {formData.guests?.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Guests ({formData.guests.length})</label>
                  <div className="space-y-1">
                    {formData.guests.slice(0, 3).map((guest: any, index: number) => (
                      <p key={index} className="text-sm text-gray-900">{guest.name}</p>
                    ))}
                    {formData.guests.length > 3 && (
                      <p className="text-sm text-gray-500">+{formData.guests.length - 3} more</p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Prizes & Sponsors */}
        {(formData.winningPrize?.length > 0 || formData.sponsors?.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Prizes & Sponsors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.winningPrize?.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Prizes ({formData.winningPrize.length})</label>
                  <div className="space-y-1">
                    {formData.winningPrize.slice(0, 3).map((prize: any, index: number) => (
                      <p key={index} className="text-sm text-gray-900">
                        {prize.title} {prize.amount && `- $${prize.amount}`}
                      </p>
                    ))}
                    {formData.winningPrize.length > 3 && (
                      <p className="text-sm text-gray-500">+{formData.winningPrize.length - 3} more</p>
                    )}
                  </div>
                </div>
              )}
              {formData.sponsors?.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Sponsors ({formData.sponsors.length})</label>
                  <div className="space-y-1">
                    {formData.sponsors.slice(0, 3).map((sponsor: any, index: number) => (
                      <p key={index} className="text-sm text-gray-900">{sponsor.name}</p>
                    ))}
                    {formData.sponsors.length > 3 && (
                      <p className="text-sm text-gray-500">+{formData.sponsors.length - 3} more</p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Additional Information Details */}
      <div className="space-y-6">
        {/* Benefits */}
        {formData.benefits?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Benefits ({formData.benefits.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.benefits.map((benefit: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{benefit.title}</h4>
                  {benefit.description && (
                    <p className="text-sm text-gray-600 mb-3">{benefit.description}</p>
                  )}
                  {benefit.criteria?.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Details:</p>
                      <ul className="space-y-1">
                        {benefit.criteria.map((criterion: string, criterionIndex: number) => (
                          <li key={criterionIndex} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-900">{criterion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Requirements */}
        {formData.requirements?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Requirements ({formData.requirements.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.requirements.map((requirement: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{requirement.title}</h4>
                  {requirement.description && (
                    <p className="text-sm text-gray-600 mb-3">{requirement.description}</p>
                  )}
                  {requirement.criteria?.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Details:</p>
                      <ol className="space-y-1">
                        {requirement.criteria.map((criterion: string, criterionIndex: number) => (
                          <li key={criterionIndex} className="flex items-start gap-2">
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5 flex-shrink-0">
                              {criterionIndex + 1}
                            </span>
                            <span className="text-sm text-gray-900">{criterion}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Rules */}
        {formData.rules?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Rules ({formData.rules.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.rules.map((rule: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{rule.title}</h4>
                  {rule.description && (
                    <p className="text-sm text-gray-600 mb-3">{rule.description}</p>
                  )}
                  {rule.criteria?.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Details:</p>
                      <ol className="space-y-1">
                        {rule.criteria.map((criterion: string, criterionIndex: number) => (
                          <li key={criterionIndex} className="flex items-start gap-2">
                            <span className="w-4 h-4 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5 flex-shrink-0">
                              {criterionIndex + 1}
                            </span>
                            <span className="text-sm text-gray-900">{criterion}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Eligibility */}
        {formData.eligibility?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Eligibility Criteria ({formData.eligibility.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.eligibility.map((eligibility: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{eligibility.title}</h4>
                  {eligibility.description && (
                    <p className="text-sm text-gray-600 mb-3">{eligibility.description}</p>
                  )}
                  {eligibility.criteria?.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Details:</p>
                      <ul className="space-y-1">
                        {eligibility.criteria.map((criterion: string, criterionIndex: number) => (
                          <li key={criterionIndex} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-900">{criterion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        {formData.instructions?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Instructions ({formData.instructions.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.instructions.map((instruction: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{instruction.title}</h4>
                  {instruction.description && (
                    <p className="text-sm text-gray-600 mb-3">{instruction.description}</p>
                  )}
                  {instruction.criteria?.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Steps:</p>
                      <ol className="space-y-1">
                        {instruction.criteria.map((step: string, stepIndex: number) => (
                          <li key={stepIndex} className="flex items-start gap-2">
                            <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5 flex-shrink-0">
                              {stepIndex + 1}
                            </span>
                            <span className="text-sm text-gray-900">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* FAQs */}
        {formData.faqs?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Frequently Asked Questions ({formData.faqs.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.faqs.map((faq: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Q: {faq.question}</h4>
                  <p className="text-sm text-gray-600">A: {faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Final Check */}
      <Card className={hasErrors ? 'border-red-200' : 'border-green-200'}>
        <CardContent className="p-4">
          <div className={`flex items-center gap-2 ${hasErrors ? 'text-red-800' : 'text-green-800'}`}>
            {hasErrors ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <CheckCircle className="w-5 h-5" />
            )}
            <h3 className="font-medium">
              {hasErrors 
                ? 'Please review and fix the errors above before submitting' 
                : 'Your event is ready to be submitted!'
              }
            </h3>
          </div>
          {!hasErrors && (
            <p className="text-sm text-green-700 mt-1">
              All required fields are completed. You can now submit your event for review.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}