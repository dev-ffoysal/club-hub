'use client'

import { Input } from '../../../../../components/ui/input'
import { Label } from '../../../../../components/ui/label'
import { RichTextEditor } from '../../../../../components/ui/rich-text-editor'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../components/ui/select'
import { Badge } from '../../../../../components/ui/badge'
import { Button } from '../../../../../components/ui/button'
import { X } from 'lucide-react'
import { EVENT_TYPE, ICategory } from '../../../../../types/interfaces'

interface BasicInfoStepProps {
  formData: any
  errors: Record<string, string>
  updateFormData: (updates: any) => void
  categories: ICategory[]
  isLoadingCategories: boolean
}

export function BasicInfoStep({ formData, errors, updateFormData, categories, isLoadingCategories }: BasicInfoStepProps) {
  const getCategoryTitle = (categoryId: string) => {
    const category = categories.find(cat => cat._id === categoryId)
    return category ? category.title : categoryId
  }

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

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const target = e.target as HTMLInputElement
      handleTagAdd(target.value)
      target.value = ''
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event Title */}
        <div className="md:col-span-2">
          <Label htmlFor="title">Event Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
            placeholder="Enter event title"
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
        </div>

        {/* Event Slogan */}
        <div className="md:col-span-2">
          <Label htmlFor="slogan">Event Slogan</Label>
          <Input
            id="slogan"
            value={formData.slogan}
            onChange={(e) => updateFormData({ slogan: e.target.value })}
            placeholder="Enter a catchy slogan for your event"
          />
          <p className="text-sm text-gray-500 mt-1">Optional: A short, memorable phrase for your event</p>
        </div>

        {/* Event Type */}
        <div>
          <Label htmlFor="type">Event Type *</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => updateFormData({ type: value as EVENT_TYPE })}
          >
            <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(EVENT_TYPE).map((type) => (
                <SelectItem key={type} value={type}>
                  <span className="capitalize">{type.replace('_', ' ')}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.type && <p className="text-sm text-red-600 mt-1">{errors.type}</p>}
        </div>

        {/* Categories */}
        <div>
          <Label htmlFor="categories">Categories</Label>
          <Select
            value=""
            onValueChange={(value) => {
              if (!formData.categories.includes(value)) {
                updateFormData({
                  categories: [...formData.categories, value]
                })
              }
            }}
            disabled={isLoadingCategories}
          >
            <SelectTrigger>
              <SelectValue placeholder={isLoadingCategories ? "Loading categories..." : "Add categories"} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Selected Categories */}
          {formData.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.categories.map((categoryId: string, index: number) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  <span className="capitalize">{getCategoryTitle(categoryId)}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-gray-500 hover:text-red-600"
                    onClick={() => {
                      updateFormData({
                        categories: formData.categories.filter((_: string, i: number) => i !== index)
                      })
                    }}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Event Description */}
      <div>
        <Label htmlFor="description">Event Description *</Label>
        <RichTextEditor
          value={formData.description}
          onChange={(value) => updateFormData({ description: value })}
          placeholder="Describe your event in detail..."
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
        <p className="text-sm text-gray-500 mt-1">
          Provide a detailed description of your event, including what attendees can expect. You can use formatting options to make your description more engaging.
        </p>
      </div>

      {/* Tags */}
      <div>
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          placeholder="Type a tag and press Enter"
          onKeyPress={handleTagKeyPress}
        />
        <p className="text-sm text-gray-500 mt-1">
          Add relevant tags to help people discover your event
        </p>
        
        {/* Display Tags */}
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                #{tag}
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

      {/* Help Text */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Tips for a great event listing:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use a clear, descriptive title that tells people what to expect</li>
          <li>• Write a compelling description that highlights the value and benefits</li>
          <li>• Choose the most appropriate event type and categories</li>
          <li>• Add relevant tags to improve discoverability</li>
        </ul>
      </div>
    </div>
  )
}