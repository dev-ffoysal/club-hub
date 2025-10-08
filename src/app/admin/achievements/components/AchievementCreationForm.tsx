'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Button } from '../../../../components/ui/button'
import { Badge } from '../../../../components/ui/badge'
import { ArrowLeft, ArrowRight, Save, Send, Trophy } from 'lucide-react'
import { BasicInfoStep } from './form-steps/BasicInfoStep'

import { Progress } from '@/components/ui/progress'
import { useCreateAchievementMutation } from '../../../../store/api/achievementAPI'
import { MediaStep } from './form-steps/MediaStep'
import { OrganizerStep } from './form-steps/OrganizerStep'
import { ReviewStep } from './form-steps/ReviewStep'

interface AchievementFormData {
  // Basic Info
  title: string
  subTitle: string
  description: string
  date: Date
  isPublic: boolean
  tags: string[]
  
  // Media
  images: string[]
  imageFiles: File[]
  coverImage?: number
  
  // Organizer Info
  organizer: {
    name: string
    image?: File
    title: string
    description?: string
    email?: string
    phone?: string
    website?: string
  }
}

interface AchievementCreationFormProps {
  onClose: () => void
  onSuccess?: () => void
}

const FORM_STEPS = [
  { id: 1, title: 'Basic Info', description: 'Achievement title, description, and settings' },
  { id: 2, title: 'Media', description: 'Images and photos' },
  { id: 3, title: 'Organizer', description: 'Organizer information (optional)' },
  { id: 4, title: 'Review', description: 'Review and submit your achievement' }
]

const initialFormData: AchievementFormData = {
  title: '',
  subTitle: '',
  description: '',
  date: new Date(),
  isPublic: true,
  tags: [],
  images: [],
  imageFiles: [],
  organizer: {
    name: '',
    title: '',
    description: '',
    email: '',
    phone: '',
    website: ''
  }
}

export function AchievementCreationForm({ onClose, onSuccess }: AchievementCreationFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<AchievementFormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [createAchievement] = useCreateAchievementMutation()
  const [isDraft, setIsDraft] = useState(false)

  const updateFormData = (updates: Partial<AchievementFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
    // Clear related errors when field is updated
    const updatedFields = Object.keys(updates)
    setErrors(prev => {
      const newErrors = { ...prev }
      updatedFields.forEach(field => {
        delete newErrors[field]
      })
      return newErrors
    })
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1: // Basic Info
        if (!formData.title.trim()) newErrors.title = 'Title is required'
        if (!formData.subTitle.trim()) newErrors.subTitle = 'Subtitle is required'
        if (!formData.description.trim()) newErrors.description = 'Description is required'
        if (!formData.subDescription.trim()) newErrors.subDescription = 'Sub-description is required'
        if (!formData.date) newErrors.date = 'Date is required'
        if (formData.tags.length === 0) newErrors.tags = 'At least one tag is required'
        break
      
      case 2: // Media
        if (formData.imageFiles.length === 0) newErrors.images = 'At least one image is required'
        break
      
      case 3: // Organizer (optional step)
        // Organizer is optional, but if provided, validate required fields
        if (formData.organizedBy?.name && !formData.organizedBy?.title) {
          newErrors['organizedBy.title'] = 'Organizer title is required when name is provided'
        }
        if (formData.organizedBy?.name && !formData.organizedBy?.image) {
          newErrors['organizedBy.image'] = 'Organizer image is required when name is provided'
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, FORM_STEPS.length))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (isDraft: boolean = false) => {
    setIsSubmitting(true)
    setErrors({})

    try {
      // Validate all steps
      const allErrors = validateAllSteps()
      if (Object.keys(allErrors).length > 0) {
        setErrors(allErrors)
        setIsSubmitting(false)
        return
      }

      // Prepare form data for API
      const submitData = new FormData()
      
      // Add basic info
      submitData.append('title', formData.title)
      submitData.append('subTitle', formData.subTitle)
      submitData.append('description', formData.description)
      submitData.append('date', formData.date.toISOString())
      submitData.append('isPublic', formData.isPublic.toString())
      submitData.append('tags', JSON.stringify(formData.tags))
      
      // Add organizer info
      if (formData.organizer.name) {
        const organizerData = {
          name: formData.organizer.name,
          title: formData.organizer.title,
          description: formData.organizer.description,
          email: formData.organizer.email,
          phone: formData.organizer.phone,
          website: formData.organizer.website
        }
        submitData.append('organizer', JSON.stringify(organizerData))
        
        // Add organizer image if present
        if (formData.organizer.image) {
          submitData.append('organizerImage', formData.organizer.image)
        }
      }
      
      // Add image files
      formData.imageFiles.forEach((file, index) => {
        submitData.append('images', file)
      })
      
      if (formData.coverImage !== undefined) {
        submitData.append('coverImage', formData.coverImage.toString())
      }

      // Submit to API
      await createAchievement(submitData).unwrap()
      
      // Success
      onSuccess?.()
    } catch (error) {
      console.error('Error creating achievement:', error)
      setErrors({ submit: 'Failed to create achievement. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />
        )
      case 2:
        return (
          <MediaStep
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />
        )
      case 3:
        return (
          <OrganizerStep
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />
        )
      case 4:
        return (
          <ReviewStep
            formData={formData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isDraft={isDraft}
          />
        )
      default:
        return null
    }
  }

  const progress = (currentStep / FORM_STEPS.length) * 100

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-600" />
              <h2 className="text-2xl font-bold">
                Create New Achievement
              </h2>
            </div>
            <Button variant="ghost" onClick={onClose}>
              ×
            </Button>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Step {currentStep} of {FORM_STEPS.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Steps */}
          <div className="flex justify-between mt-4">
            {FORM_STEPS.map((step) => (
              <div
                key={step.id}
                className={`flex-1 text-center ${
                  step.id <= currentStep ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-medium ${
                    step.id < currentStep
                      ? 'bg-blue-600 text-white'
                      : step.id === currentStep
                      ? 'bg-blue-100 text-blue-600 border-2 border-blue-600'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {step.id}
                </div>
                <div className="text-xs font-medium">{step.title}</div>
                <div className="text-xs text-gray-500 hidden sm:block">{step.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {renderStepContent()}
        </div>

        {/* Footer */}
        {currentStep < FORM_STEPS.length && (
          <div className="border-t p-6 flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleSubmit(true)}
                disabled={isSubmitting}
              >
                <Save className="w-4 h-4 mr-2" />
                Save as Draft
              </Button>
              <Button onClick={handleNext} disabled={isSubmitting}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}