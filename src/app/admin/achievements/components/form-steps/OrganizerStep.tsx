'use client'

import { useState } from 'react'
import { Input } from '../../../../../components/ui/input'
import { Label } from '../../../../../components/ui/label'
import { Textarea } from '../../../../../components/ui/textarea'
import { Button } from '../../../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card'
import { Badge } from '../../../../../components/ui/badge'
import { Upload, X, User, Mail, Phone, Globe, Image as ImageIcon } from 'lucide-react'
import { getImageUrl } from '../../../../../lib/utils/imageDisplay'

interface OrganizerStepProps {
  formData: any
  errors?: Record<string, string>
  updateFormData: (updates: any) => void
}

export function OrganizerStep({ formData, errors, updateFormData }: OrganizerStepProps) {
  const [organizerImagePreview, setOrganizerImagePreview] = useState<string | null>(null)

  const handleOrganizerImageSelect = (file: File | null) => {
    if (!file) return

    if (file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file)
      setOrganizerImagePreview(imageUrl)
      updateFormData({
        organizedBy: {
          ...formData.organizedBy,
          image: file
        }
      })
    }
  }

  const removeOrganizerImage = () => {
    setOrganizerImagePreview(null)
    updateFormData({
      organizedBy: {
        ...formData.organizedBy,
        image: ''
      }
    })
  }

  const updateOrganizerField = (field: string, value: string) => {
    updateFormData({
      organizedBy: {
        ...formData.organizedBy,
        [field]: value
      }
    })
  }

  const clearOrganizerData = () => {
    setOrganizerImagePreview(null)
    updateFormData({
      organizedBy: {
        name: '',
        image: '',
        title: '',
        description: '',
        email: '',
        phone: '',
        website: ''
      }
    })
  }

  const hasOrganizerData = formData.organizedBy.name || formData.organizedBy.title || formData.organizedBy.description

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Organizer Information</h3>
        <p className="text-gray-600">
          Add information about who organized or is responsible for this achievement (optional)
        </p>
      </div>

      {/* Organizer Details Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Organizer Details
            </CardTitle>
            {hasOrganizerData && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={clearOrganizerData}
                className="text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Organizer Image */}
          <div>
            <Label htmlFor="organizerImage">Organizer Photo</Label>
            <div className="mt-2">
              {organizerImagePreview || formData.organizedBy.image ? (
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                    <img
                      src={organizerImagePreview || getImageUrl(formData.organizedBy.image)}
                      alt="Organizer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 rounded-full p-1 h-auto"
                    onClick={removeOrganizerImage}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
              )}
              
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleOrganizerImageSelect(e.target.files?.[0] || null)}
                className="hidden"
                id="organizer-image-upload"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  const input = document.getElementById('organizer-image-upload') as HTMLInputElement;
                  if (input) {
                    input.click();
                  }
                }}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
            </div>
            {errors?.['organizedBy.image'] && (
              <p className="text-sm text-red-600 mt-1">{errors['organizedBy.image']}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Organizer Name */}
            <div>
              <Label htmlFor="organizerName">Name</Label>
              <Input
                id="organizerName"
                value={formData.organizedBy.name || ''}
                 onChange={(e) => updateOrganizerField('name', e.target.value)}
                 placeholder="Enter organizer name"
                 className={errors?.['organizedBy.name'] ? 'border-red-500' : ''}
               />
               {errors?.['organizedBy.name'] && (
                 <p className="text-sm text-red-600 mt-1">{errors['organizedBy.name']}</p>
               )}
             </div>

             {/* Organizer Title */}
             <div>
               <Label htmlFor="organizerTitle">Title/Position</Label>
               <Input
                 id="organizerTitle"
                 value={formData.organizedBy.title || ''}
                 onChange={(e) => updateOrganizerField('title', e.target.value)}
                 placeholder="e.g., Club President, Event Coordinator"
                 className={errors?.['organizedBy.title'] ? 'border-red-500' : ''}
               />
               {errors?.['organizedBy.title'] && (
                 <p className="text-sm text-red-600 mt-1">{errors['organizedBy.title']}</p>
               )}
             </div>
           </div>

           {/* Organizer Description */}
           <div>
             <Label htmlFor="organizerDescription">Description</Label>
             <Textarea
               id="organizerDescription"
               value={formData.organizedBy.description || ''}
              onChange={(e) => updateOrganizerField('description', e.target.value)}
              placeholder="Brief description about the organizer..."
              rows={3}
            />
            <p className="text-sm text-gray-500 mt-1">
              Optional: Add a brief description about the organizer's role or background
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <Label htmlFor="organizerEmail">Email</Label>
              <div className="relative">
                <Input
                  id="organizerEmail"
                  type="email"
                  value={formData.organizedBy.email || ''}
                   onChange={(e) => updateOrganizerField('email', e.target.value)}
                   placeholder="organizer@example.com"
                   className="pl-10"
                 />
                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
               </div>
             </div>

             {/* Phone */}
             <div>
               <Label htmlFor="organizerPhone">Phone</Label>
               <div className="relative">
                 <Input
                   id="organizerPhone"
                   type="tel"
                   value={formData.organizedBy.phone || ''}
                   onChange={(e) => updateOrganizerField('phone', e.target.value)}
                   placeholder="+1 (555) 123-4567"
                   className="pl-10"
                 />
                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
               </div>
             </div>
           </div>

           {/* Website */}
           <div>
             <Label htmlFor="organizerWebsite">Website</Label>
             <div className="relative">
               <Input
                 id="organizerWebsite"
                 type="url"
                 value={formData.organizedBy.website || ''}
                onChange={(e) => updateOrganizerField('website', e.target.value)}
                placeholder="https://example.com"
                className="pl-10"
              />
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <div className="bg-purple-50 p-4 rounded-lg">
        <h4 className="font-medium text-purple-900 mb-2">Organizer Information Guidelines:</h4>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• <strong>Optional Section:</strong> You can skip this section if no specific organizer needs to be credited</li>
          <li>• <strong>Name & Title:</strong> If you add a name, the title/position is required</li>
          <li>• <strong>Photo:</strong> Use a professional headshot or appropriate profile picture</li>
          <li>• <strong>Contact Info:</strong> Only add contact information if the organizer wants to be reachable</li>
          <li>• <strong>Use Cases:</strong> Event coordinators, club officers, external partners, or achievement sponsors</li>
        </ul>
      </div>

      {/* Preview */}
      {hasOrganizerData && (
        <Card>
          <CardHeader>
            <CardTitle>Organizer Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              {(organizerImagePreview || formData.organizedBy.image) && (
                 <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
                   <img
                     src={organizerImagePreview || getImageUrl(formData.organizedBy.image)}
                     alt="Organizer"
                     className="w-full h-full object-cover"
                   />
                 </div>
               )}
               <div className="flex-1">
                 <h4 className="font-semibold text-gray-900 mt-2">
                   {formData.organizedBy.name || 'Organizer Name'}
                 </h4>
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
                       Website
                     </Badge>
                   )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}