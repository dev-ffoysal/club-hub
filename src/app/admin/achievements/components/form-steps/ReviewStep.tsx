'use client'

import { Button } from '../../../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card'
import { Badge } from '../../../../../components/ui/badge'
import { Separator } from '../../../../../components/ui/separator'
import { 
  Trophy, 
  Calendar, 
  Tag, 
  Eye, 
  EyeOff, 
  Image as ImageIcon, 
  User, 
  Mail, 
  Phone, 
  Globe,
  Save,
  Send,
  Loader2
} from 'lucide-react'

interface ReviewStepProps {
  formData: any
  onSubmit?: (asDraft?: boolean) => void
  isSubmitting?: boolean
  isDraft?: boolean
  updateFormData?: (updates: any) => void
}

export function ReviewStep({ formData, onSubmit, isSubmitting = false, isDraft = false, updateFormData }: ReviewStepProps) {
  const formatDate = (date: string | Date) => {
    if (!date) return 'Not specified'
    const dateObj = date instanceof Date ? date : new Date(date)
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const hasOrganizerData = formData.organizedBy.name || formData.organizedBy.title

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Your Achievement</h3>
        <p className="text-gray-600">
          Please review all the information before submitting your achievement
        </p>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-lg text-gray-900">{formData.title}</h4>
            <p className="text-gray-600">{formData.subTitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Achievement Date</Label>
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4" />
                {formatDate(formData.date)}
              </div>
            </div>
            
            <div>
              <Label>Visibility</Label>
              <div className="flex items-center gap-2 text-gray-700">
                {formData.isPublic ? (
                  <>
                    <Eye className="w-4 h-4 text-green-600" />
                    <span>Public</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4 text-gray-600" />
                    <span>Private</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <p className="text-gray-700 mt-1">{formData.description}</p>
          </div>

          <div>
            <Label>Additional Details</Label>
            <p className="text-gray-700 mt-1">{formData.subDescription}</p>
          </div>

          {formData.event && (
            <div>
              <Label>Associated Event</Label>
              <p className="text-gray-700 mt-1">{formData.event}</p>
            </div>
          )}

          {formData.tags.length > 0 && (
            <div>
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Media */}
      {formData.imageFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Images ({formData.imageFiles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.imageFiles.map((file: File, index: number) => (
                <div key={`${file.name}-${index}`} className="relative">
                  <div className="aspect-square rounded-lg overflow-hidden border">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Achievement image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {formData.coverImage === index && (
                    <Badge className="absolute top-2 left-2 bg-blue-500 text-xs">
                      Cover
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Organizer Information */}
      {hasOrganizerData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Organizer Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              {formData.organizedBy.image && (
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
                  <img
                    src={formData.organizedBy.image}
                    alt="Organizer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{formData.organizedBy.name}</h4>
                {formData.organizedBy.title && (
                  <p className="text-sm text-gray-600 mb-2">{formData.organizedBy.title}</p>
                )}
                {formData.organizedBy.description && (
                  <p className="text-sm text-gray-700 mb-2">{formData.organizedBy.description}</p>
                )}
                <div className="flex flex-wrap gap-2 text-xs">
                  {formData.organizedBy.email && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {formData.organizedBy.email}
                    </Badge>
                  )}
                  {formData.organizedBy.phone && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {formData.organizedBy.phone}
                    </Badge>
                  )}
                  {formData.organizedBy.website && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      <a href={formData.organizedBy.website} target="_blank" rel="noopener noreferrer">
                        Website
                      </a>
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{formData.imageFiles.length}</div>
              <div className="text-sm text-blue-800">Images</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{formData.tags.length}</div>
              <div className="text-sm text-green-800">Tags</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {formData.isPublic ? 'Public' : 'Private'}
              </div>
              <div className="text-sm text-purple-800">Visibility</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {hasOrganizerData ? 'Yes' : 'No'}
              </div>
              <div className="text-sm text-yellow-800">Organizer</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons - Only show when onSubmit is provided */}
      {onSubmit && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => onSubmit(true)}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                {isSubmitting && isDraft ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save as Draft
              </Button>
              
              <Button
                onClick={() => onSubmit(false)}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                {isSubmitting && !isDraft ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Publish Achievement
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 text-center mt-4">
              You can save as draft to continue editing later, or publish to make it live immediately.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Final Guidelines */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Before You Submit:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Double-check all information for accuracy</li>
          <li>• Ensure images are high quality and relevant</li>
          <li>• Verify that the achievement date is correct</li>
          <li>• Review visibility settings (public vs private)</li>
          <li>• Confirm organizer information if provided</li>
        </ul>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-medium text-gray-700 mb-1">{children}</div>
}