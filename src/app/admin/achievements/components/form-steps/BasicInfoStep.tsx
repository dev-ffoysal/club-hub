'use client'

import { Input } from '../../../../../components/ui/input'
import { Label } from '../../../../../components/ui/label'
import { Textarea } from '../../../../../components/ui/textarea'
import { Badge } from '../../../../../components/ui/badge'
import { Button } from '../../../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card'
import { X, Calendar, Tag } from 'lucide-react'

interface BasicInfoStepProps {
  formData: any
  errors?: Record<string, string>
  updateFormData: (updates: any) => void
  showPublicToggle?: boolean
}

export function BasicInfoStep({ formData, errors = {}, updateFormData, showPublicToggle = true }: BasicInfoStepProps) {
  const handleTagAdd = (tag: string) => {
    if (tag.trim() && !formData.tags.includes(tag.trim())) {
      updateFormData({
        tags: [...formData.tags, tag.trim()]
      })
    }
  }

  const handleTagRemove = (tagToRemove: string) => {
    updateFormData({
      tags: formData.tags.filter((tag: string) => tag !== tagToRemove)
    })
  }

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const tags = target.value.split(/[\s,]+/).filter(tag => tag.trim())
      
      tags.forEach(tag => {
        if (tag.trim() && !formData.tags.includes(tag.trim())) {
          handleTagAdd(tag.trim())
        }
      })
      
      target.value = ''
    }
  }

  const handleTagPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text')
    const tags = pastedText.split(/[\s,]+/).filter(tag => tag.trim())
    
    tags.forEach(tag => {
      if (tag.trim() && !formData.tags.includes(tag.trim())) {
        handleTagAdd(tag.trim())
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Basic Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Achievement Title */}
          <div>
            <Label htmlFor="title">Achievement Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateFormData({ title: e.target.value })}
              placeholder="Enter achievement title"
              className={errors?.title ? 'border-red-500' : ''}
          />
          {errors?.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
          </div>

          {/* Achievement Subtitle */}
          <div>
            <Label htmlFor="subTitle">Achievement Subtitle *</Label>
            <Input
              id="subTitle"
              value={formData.subTitle}
              onChange={(e) => updateFormData({ subTitle: e.target.value })}
              placeholder="Enter achievement subtitle"
              className={errors?.subTitle ? 'border-red-500' : ''}
          />
          {errors?.subTitle && <p className="text-sm text-red-600 mt-1">{errors.subTitle}</p>}
          </div>

          {/* Achievement Date */}
          <div>
            <Label htmlFor="date">Achievement Date *</Label>
            <div className="relative">
              <Input
            id="date"
            type="date"
            value={formData.date instanceof Date ? formData.date.toISOString().split('T')[0] : formData.date}
            onChange={(e) => updateFormData({ date: new Date(e.target.value) })}
            className={errors?.date ? 'border-red-500' : ''}
            required
          />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {errors?.date && <p className="text-sm text-red-600 mt-1">{errors.date}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Description Card */}
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Description */}
          <div>
            <Label htmlFor="description">Main Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateFormData({ description: e.target.value })}
              placeholder="Describe the achievement in detail..."
              rows={4}
              className={errors?.description ? 'border-red-500' : ''}
          />
          {errors?.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
            <p className="text-sm text-gray-500 mt-1">
              Provide a detailed description of what this achievement represents
            </p>
          </div>

          {/* Sub Description */}
          <div>
            <Label htmlFor="subDescription">Sub Description *</Label>
            <Textarea
              id="subDescription"
              value={formData.subDescription}
              onChange={(e) => updateFormData({ subDescription: e.target.value })}
              placeholder="Additional details about the achievement..."
              rows={3}
              className={errors?.subDescription ? 'border-red-500' : ''}
          />
          {errors?.subDescription && <p className="text-sm text-red-600 mt-1">{errors.subDescription}</p>}
            <p className="text-sm text-gray-500 mt-1">
              Additional context or details about the achievement
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tags and Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle>Tags and Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tags */}
          <div>
            <Label htmlFor="tags">Tags *</Label>
            <Input
              id="tags"
              placeholder="Type tags separated by space or press Enter (e.g., programming contest first-place)"
              onKeyDown={handleTagInput}
              onPaste={handleTagPaste}
              className={errors?.tags ? 'border-red-500' : ''}
          />
          {errors?.tags && <p className="text-sm text-red-600 mt-1">{errors.tags}</p>}
            <p className="text-sm text-gray-500 mt-1">
              Add relevant tags separated by space or Enter. Tags help categorize and search achievements.
            </p>
            
            {/* Selected Tags */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-gray-500 hover:text-red-600"
                      onClick={() => handleTagRemove(tag)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>



          {/* Optional Event Association */}
          <div>
            <Label htmlFor="event">Associated Event (Optional)</Label>
            <Input
              id="event"
              value={formData.event || ''}
              onChange={(e) => updateFormData({ event: e.target.value })}
              placeholder="Enter event ID or name if this achievement is related to an event"
            />
            <p className="text-sm text-gray-500 mt-1">
              Link this achievement to a specific event if applicable
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Achievement Guidelines:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Title:</strong> Keep it concise and descriptive (e.g., "First Place in Coding Competition")</li>
          <li>• <strong>Subtitle:</strong> Add context or category (e.g., "Technical Excellence Award")</li>
          <li>• <strong>Description:</strong> Explain what was accomplished and why it's significant</li>
          <li>• <strong>Tags:</strong> Use relevant keywords for easy discovery and categorization</li>
          <li>• <strong>Visibility:</strong> Public achievements showcase club success to the community</li>
        </ul>
      </div>
    </div>
  )
}