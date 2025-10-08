'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Button } from '../../../../components/ui/button'

import { Badge } from '../../../../components/ui/badge'
import { ArrowLeft, ArrowRight, Save, Send, FileText } from 'lucide-react'
import { EVENT_TYPE } from '../../../../types/interfaces'
import { BasicInfoStep } from './form-steps/BasicInfoStep'
import { DetailsStep } from './form-steps/DetailsStep'
import { MediaStep } from './form-steps/MediaStep'
import { AdditionalInfoStep } from './form-steps/AdditionalInfoStep'
import { ReviewStep } from './form-steps/ReviewStep'
import { LoadingProgress } from './LoadingProgress'
import { Progress } from '@/components/ui/progress'
import { useCreateEventMutation, useUpdateEventMutation, useGetSingleEventQuery } from '../../../../store/api/eventAPI'
import { useGetCategoriesQuery } from '../../../../store/api/categoriesAPI'

interface EventFormData {
  // Basic Info
  title: string
  slogan: string
  description: string
  type: EVENT_TYPE
  categories: string[]
  
  // Date & Time
  startDate: string
  endDate: string
  time: string
  
  // Location
  location: string
  isOnline: boolean
  meetingLink: string
  
  // Registration
  isFixedSeat: boolean
  maxParticipants: number
  registrationFee: number
  registrationDeadline: string
  
  // Settings
  isPublic: boolean
  commentsEnabled: boolean
  isActive: boolean
  
  // Media
  images: { [key: string]: File }
  imageFiles: Array<{
    key: string
    file: File
    preview: string
    isCover?: boolean
  }>
  cover: string
  
  // Additional Info
  tags: string[]
  host: Array<{
    name: string
    designation?: string
    position?: string
    image?: string
  }>
  guests: Array<{
    name: string
    designation?: string
    position?: string
    image?: string
  }>
  sponsors: Array<{
    name: string
    image?: string
    website?: string
    sponsorType?: string
  }>
  winningPrize: Array<{
    title: string
    description?: string
    amount?: number
    position?: number
  }>
  benefits: Array<{
    title: string
    description?: string
    criteria?: string[]
  }>
  requirements: Array<{
    title: string
    description?: string
    criteria?: string[]
  }>
  rules: Array<{
    title: string
    description?: string
    criteria?: string[]
  }>
  eligibility: Array<{
    title: string
    description?: string
    criteria?: string[]
  }>
  instructions: Array<{
    title: string
    description?: string
    criteria?: string[]
  }>
  faqs: Array<{
    question: string
    answer: string
  }>
}

interface EventCreationFormProps {
  onClose: () => void
  draftId?: string
  eventId?: string // For editing existing events
}

const FORM_STEPS = [
  { id: 1, title: 'Basic Info', description: 'Event title, type, and description' },
  { id: 2, title: 'Details', description: 'Date, time, location, and registration' },
  { id: 3, title: 'Media', description: 'Images and cover photo' },
  { id: 4, title: 'Additional Info', description: 'Hosts, prizes, rules, and FAQs' },
  { id: 5, title: 'Review', description: 'Review and submit your event' }
]

const initialFormData: EventFormData = {
  title: '',
  slogan: '',
  description: '',
  type: EVENT_TYPE.SEMINAR,
  categories: [],
  startDate: '',
  endDate: '',
  time: '',
  location: '',
  isOnline: false,
  meetingLink: '',
  isFixedSeat: false,
  maxParticipants: 0,
  registrationFee: 0,
  registrationDeadline: '',
  isPublic: true,
  commentsEnabled: true,
  isActive: true,
  images: {},
  imageFiles: [],
  cover: '',
  tags: [],
  host: [],
  guests: [],
  sponsors: [],
  winningPrize: [],
  benefits: [],
  requirements: [],
  rules: [],
  eligibility: [],
  instructions: [],
  faqs: []
}

export function EventCreationForm({ onClose, draftId, eventId }: EventCreationFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<EventFormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitProgress, setSubmitProgress] = useState(0)
  const [currentDraftId, setCurrentDraftId] = useState<string>(draftId || `draft_${Date.now()}`)

  // API hooks
  const [createEvent] = useCreateEventMutation()
  const [updateEvent] = useUpdateEventMutation()
  const { data: existingEvent, isLoading: isLoadingEvent } = useGetSingleEventQuery(eventId!, {
    skip: !eventId
  })
  const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesQuery()

  const isEditMode = !!eventId

  useEffect(() => {
    if (draftId) {
      setCurrentDraftId(draftId)
      loadDraft(draftId)
    } else {
      // Generate a new draft ID for new events
      setCurrentDraftId(`draft_${Date.now()}`)
    }
  }, [draftId])

  // Load existing event data when in edit mode
  useEffect(() => {
    if (isEditMode && existingEvent?.data) {
      const event = existingEvent.data
      setFormData({
        title: event.title || '',
        slogan: event.slogan || '',
        description: event.description || '',
        type: event.type || EVENT_TYPE.SEMINAR,
        categories: Array.isArray(event.categories) 
          ? event.categories.map(cat => typeof cat === 'string' ? cat : (cat._id || ''))
          : [],
        startDate: event.startDate ? new Date(event.startDate).toISOString().slice(0, 16) : '',
        endDate: event.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : '',
        time: event.time || '',
        location: event.location || '',
        isOnline: event.isOnline || false,
        meetingLink: event.meetingLink || '',
        isFixedSeat: event.isFixedSeat || false,
        maxParticipants: event.maxParticipants || 0,
        registrationFee: event.registrationFee || 0,
        registrationDeadline: event.registrationDeadline ? new Date(event.registrationDeadline).toISOString().slice(0, 16) : '',
        isPublic: event.isPublic !== undefined ? event.isPublic : true,
        commentsEnabled: event.commentsEnabled !== undefined ? event.commentsEnabled : true,
        isActive: event.isActive !== undefined ? event.isActive : true,
        images: {},
        imageFiles: [],
        cover: event.cover || '',
        tags: event.tags || [],
        host: event.host || [],
        guests: event.guests || [],
        sponsors: event.sponsors || [],
        winningPrize: event.winningPrize || [],
        benefits: event.benefits || [],
        requirements: event.requirements || [],
        rules: event.rules || [],
        eligibility: event.eligibility || [],
        instructions: event.instructions || [],
        faqs: event.faqs || []
      })
    }
  }, [isEditMode, existingEvent])

  const loadDraft = (id: string) => {
    try {
      const savedDrafts = localStorage.getItem('eventDrafts')
      if (savedDrafts) {
        const drafts = JSON.parse(savedDrafts)
        const draft = drafts.find((d: any) => d.id === id)
        if (draft && draft.formData) {
          setFormData(draft.formData)
          setCurrentStep(draft.step || 1)
        }
      }
    } catch (error) {
      console.error('Error loading draft:', error)
    }
  }

  const saveDraft = () => {
    try {
      const draftData = {
        id: currentDraftId,
        title: formData.title || 'Untitled Event',
        type: formData.type,
        description: formData.description,
        startDate: formData.startDate,
        location: formData.location,
        lastModified: new Date().toISOString(),
        step: currentStep,
        totalSteps: FORM_STEPS.length,
        completionPercentage: Math.round((currentStep / FORM_STEPS.length) * 100),
        formData
      }

      const savedDrafts = localStorage.getItem('eventDrafts')
      let drafts = savedDrafts ? JSON.parse(savedDrafts) : []
      
      const existingIndex = drafts.findIndex((d: any) => d.id === draftData.id)
      if (existingIndex >= 0) {
        drafts[existingIndex] = draftData
      } else {
        drafts.push(draftData)
      }

      localStorage.setItem('eventDrafts', JSON.stringify(drafts))
      
      // Show success message
      console.log('Draft saved successfully')
    } catch (error) {
      console.error('Error saving draft:', error)
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.title.trim()) newErrors.title = 'Event title is required'
        if (!formData.description.trim()) newErrors.description = 'Event description is required'
        if (!formData.type) newErrors.type = 'Event type is required'
        break
      case 2:
        if (!formData.startDate) newErrors.startDate = 'Start date is required'
        if (!formData.endDate) newErrors.endDate = 'End date is required'
        if (!formData.location.trim()) newErrors.location = 'Location is required'
        if (formData.isOnline && !formData.meetingLink.trim()) {
          newErrors.meetingLink = 'Meeting link is required for online events'
        }
        if (new Date(formData.startDate) >= new Date(formData.endDate)) {
          newErrors.endDate = 'End date must be after start date'
        }
        break
      case 3:
        // Media validation is optional
        break
      case 4:
        // Additional info validation is optional
        break
      case 5:
        // Final validation
        if (!formData.title.trim()) newErrors.title = 'Event title is required'
        if (!formData.description.trim()) newErrors.description = 'Event description is required'
        if (!formData.startDate) newErrors.startDate = 'Start date is required'
        if (!formData.endDate) newErrors.endDate = 'End date is required'
        if (!formData.location.trim()) newErrors.location = 'Location is required'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, FORM_STEPS.length))
      saveDraft() // Auto-save when moving to next step
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(5)) return

    setIsSubmitting(true)
    setSubmitProgress(0)

    try {
      // Progress tracking
      const progressInterval = setInterval(() => {
        setSubmitProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Prepare FormData
      const formDataToSend = new FormData()

      // Prepare data object (excluding images and files)
      const data = {
        title: formData.title,
        slogan: formData.slogan,
        description: formData.description,
        type: formData.type,
        categories: formData.categories, // Array of categories
        startDate: formData.startDate,
        endDate: formData.endDate,
        time: formData.time,
        location: formData.location,
        isOnline: formData.isOnline,
        meetingLink: formData.meetingLink,
        isFixedSeat: formData.isFixedSeat,
        maxParticipants: formData.maxParticipants,
        registrationFee: formData.registrationFee,
        registrationDeadline: formData.registrationDeadline,
        isPublic: formData.isPublic,
        commentsEnabled: formData.commentsEnabled,
        tags: formData.tags,
        host: formData.host,
        guests: formData.guests,
        sponsors: formData.sponsors,
        winningPrize: formData.winningPrize,
        benefits: formData.benefits,
        requirements: formData.requirements,
        rules: formData.rules,
        eligibility: formData.eligibility,
        instructions: formData.instructions,
        faqs: formData.faqs
      }

      // Add data as JSON string
      formDataToSend.append('data', JSON.stringify(data))

      // Add images to FormData
      formData.imageFiles.forEach((imageFile) => {
        formDataToSend.append('images', imageFile.file)
      })

      // Find and add cover image
      const coverImage = formData.imageFiles.find(img => img.isCover)
      if (coverImage) {
        formDataToSend.append('covers', coverImage.file)
      }

      let result
      if (isEditMode && eventId) {
        // Update existing event
        result = await updateEvent({ id: eventId, data: formDataToSend }).unwrap()
      } else {
        // Create new event
        result = await createEvent(formDataToSend).unwrap()
      }

      clearInterval(progressInterval)
      setSubmitProgress(100)
      
      // Clear draft after successful submission
      if (currentDraftId) {
        const savedDrafts = localStorage.getItem('eventDrafts')
        if (savedDrafts) {
          const drafts = JSON.parse(savedDrafts)
          const updatedDrafts = drafts.filter((d: any) => d.id !== currentDraftId)
          localStorage.setItem('eventDrafts', JSON.stringify(updatedDrafts))
        }
      }

      setTimeout(() => {
        onClose()
      }, 1000)

    } catch (error: any) {
      console.error('Error submitting event:', error)
      
      // Handle validation errors
      if (error?.data?.errors) {
        const apiErrors: Record<string, string> = {}
        error.data.errors.forEach((err: any) => {
          if (err.path && err.message) {
            apiErrors[err.path] = err.message
          }
        })
        setErrors(apiErrors)
      }
      
      setIsSubmitting(false)
      setSubmitProgress(0)
    }
  }

  const updateFormData = (updates: Partial<EventFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
            categories={categoriesData?.data || []}
            isLoadingCategories={isLoadingCategories}
          />
        )
      case 2:
        return (
          <DetailsStep
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />
        )
      case 3:
        return (
          <MediaStep
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />
        )
      case 4:
        return (
          <AdditionalInfoStep
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />
        )
      case 5:
        return (
          <ReviewStep
            formData={formData}
            errors={errors}
          />
        )
      default:
        return null
    }
  }

  if (isSubmitting) {
    return <LoadingProgress progress={submitProgress} />
  }

  return (
    <div className="w-full space-y-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onClose}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditMode ? 'Edit Event' : draftId ? 'Edit Draft Event' : 'Create New Event'}
            </h1>
            <p className="text-gray-600">Step {currentStep} of {FORM_STEPS.length}</p>
          </div>
        </div>
        <Button variant="outline" onClick={saveDraft}>
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Progress value={(currentStep / FORM_STEPS.length) * 100} className="w-full" />
            <div className="flex justify-between">
              {FORM_STEPS.map((step) => (
                <div key={step.id} className="flex flex-col items-center space-y-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.id === currentStep 
                      ? 'bg-blue-600 text-white' 
                      : step.id < currentStep 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.id}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-600 hidden md:block">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>{FORM_STEPS[currentStep - 1].title}</span>
            <Badge variant="outline">{currentStep}/{FORM_STEPS.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={saveDraft}>
            <FileText className="w-4 h-4 mr-2" />
            Save as Draft
          </Button>
          
          {currentStep === FORM_STEPS.length ? (
            <Button onClick={handleSubmit}>
              <Send className="w-4 h-4 mr-2" />
              Submit Event
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}