'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Button } from '../../../../components/ui/button'
import { Badge } from '../../../../components/ui/badge'
import { ArrowLeft, ArrowRight, Save, Send, Trophy, Loader2 } from 'lucide-react'
import { BasicInfoStep } from './form-steps/BasicInfoStep'
import { MediaStep } from './form-steps/MediaStep'
import { OrganizerStep } from './form-steps/OrganizerStep'
import { ReviewStep } from './form-steps/ReviewStep'
import { Progress } from '@/components/ui/progress'
import { IAchievement } from '../../../../types/interfaces'
import { useUpdateAchievementMutation } from '../../../../store/api/achievementAPI'

interface AchievementFormData {
  // Basic Info
  title: string
  subTitle: string
  description: string
  subDescription: string
  date: string
  isPublic: boolean
  tags: string[]
  event?: string
  
  // Media
  images: { [key: string]: File }
  imageFiles: Array<{
    key: string
    file: File
    preview: string
    isCover?: boolean
  }>
  
  // Organizer Info
  organizedBy?: {
    name: string
    image: string
    title: string
    description?: string
    email?: string
    phone?: string
    website?: string
  }
}

interface AchievementEditFormProps {
  onClose: () => void
  achievement: IAchievement
  onUpdate?: (updatedAchievement: IAchievement) => void
}

const FORM_STEPS = [
  { id: 1, title: 'Basic Info', description: 'Achievement title, description, and settings' },
  { id: 2, title: 'Media', description: 'Images and photos' },
  { id: 3, title: 'Organizer', description: 'Organizer information (optional)' },
  { id: 4, title: 'Review', description: 'Review and update your achievement' }
]

export function AchievementEditForm({ onClose, achievement, onUpdate }: AchievementEditFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<AchievementFormData>({
    title: '',
    subTitle: '',
    description: '',
    subDescription: '',
    date: '',
    isPublic: true,
    tags: [],
    event: '',
    images: {},
    imageFiles: [],
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
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDraft, setIsDraft] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const [updateAchievement] = useUpdateAchievementMutation()

  // Populate form data with existing achievement data
  useEffect(() => {
    const populateFormData = async () => {
      try {
        setIsLoading(true)
        
        // Convert existing images to imageFiles format
        const imageFiles = achievement.images.map((imageUrl, index) => ({
          key: `existing_image_${index}`,
          file: new File([], `image_${index}.jpg`), // Placeholder file for existing images
          preview: imageUrl,
          isCover: index === 0
        }))

        const populatedData: AchievementFormData = {
          title: achievement.title,
          subTitle: achievement.subTitle,
          description: achievement.description,
          subDescription: achievement.subDescription,
          date: new Date(achievement.date).toISOString().split('T')[0], // Convert to YYYY-MM-DD format
          isPublic: achievement.isPublic,
          tags: achievement.tags,
          event: achievement.event || '',
          images: {},
          imageFiles: imageFiles,
          organizedBy: achievement.organizedBy || {
            name: '',
            image: '',
            title: '',
            description: '',
            email: '',
            phone: '',
            website: ''
          }
        }

        setFormData(populatedData)
      } catch (error) {
        console.error('Error populating form data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    populateFormData()
  }, [achievement])

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

  const handleSubmit = async (asDraft = false) => {
    if (!validateStep(currentStep) && !asDraft) return

    setIsSubmitting(true)
    setIsDraft(asDraft)

    try {
      // Prepare form data for submission
      const submitData = new FormData()
      
      // Add basic fields
      submitData.append('title', formData.title)
      submitData.append('subTitle', formData.subTitle)
      submitData.append('description', formData.description)
      submitData.append('subDescription', formData.subDescription)
      submitData.append('date', formData.date)
      submitData.append('isPublic', formData.isPublic.toString())
      submitData.append('tags', JSON.stringify(formData.tags))
      
      if (formData.event) {
        submitData.append('event', formData.event)
      }

      // Add organizer info if provided
      if (formData.organizedBy?.name) {
        submitData.append('organizedBy', JSON.stringify(formData.organizedBy))
      }

      // Add new image files (skip existing images that weren't changed)
      formData.imageFiles.forEach((imageFile, index) => {
        if (!imageFile.key.startsWith('existing_image_')) {
          submitData.append(`images`, imageFile.file)
        }
      })

      // Add existing image keys to preserve
      const existingImages = formData.imageFiles
        .filter(img => img.key.startsWith('existing_image_'))
        .map(img => img.preview)
      if (existingImages.length > 0) {
        submitData.append('existingImages', JSON.stringify(existingImages))
      }

      // Submit to API
      await updateAchievement({
        id: achievement._id,
        data: submitData
      }).unwrap()

      // Create updated achievement object for callback
      const updatedAchievement: IAchievement = {
        ...achievement,
        title: formData.title,
        subTitle: formData.subTitle,
        description: formData.description,
        subDescription: formData.subDescription,
        date: new Date(formData.date),
        isPublic: formData.isPublic,
        tags: formData.tags,
        event: formData.event,
        images: formData.imageFiles.map(img => img.preview),
        organizedBy: formData.organizedBy?.name ? formData.organizedBy : undefined
      }

      if (onUpdate) {
        onUpdate(updatedAchievement)
      }

      onClose()
    } catch (error) {
      console.error('Error updating achievement:', error)
      setErrors({ submit: 'Failed to update achievement. Please try again.' })
    } finally {
      setIsSubmitting(false)
      setIsDraft(false)
    }
  }

  const renderStepContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Loading achievement data...</p>
          </div>
        </div>
      )
    }

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
              <div>
                <h2 className="text-2xl font-bold">Edit Achievement</h2>
                <p className="text-gray-600 text-sm">Updating: {achievement.title}</p>
              </div>
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
        {currentStep < FORM_STEPS.length && !isLoading && (
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
                Save Changes
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