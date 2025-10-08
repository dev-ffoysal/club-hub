'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Button } from '../../../../components/ui/button'
import { ArrowLeft, ArrowRight, Save, X, Users } from 'lucide-react'
import { ClubAdminLayout } from '../../../../components/layout/club-admin-layout'
import { Progress } from '@/components/ui/progress'
import { useCreateAchievementMutation, useGetAchievementByIdQuery, useUpdateAchievementMutation } from '../../../../store/api/achievementAPI'
import { BasicInfoStep } from '../components/form-steps/BasicInfoStep'
import { MediaStep } from '../components/form-steps/MediaStep'
import { OrganizerStep } from '../components/form-steps/OrganizerStep'
import { ReviewStep } from '../components/form-steps/ReviewStep'

interface AchievementFormData {
  // Basic Info
  title: string
  subTitle: string
  description: string
  subDescription: string
  date: Date
  tags: string[]
  event?: string // Optional event ID
  
  // Media
  images: string[]
  imageFiles: File[]
  coverImage?: number
  
  // Team members (optional) - matches 'teams' field in IAchievement
  teams: string[] // Array of user IDs
  
  // Organizer Info - matches 'organizedBy' field in IAchievement
  organizedBy: {
    name: string
    image: string
    title: string
    description: string
    email: string
    phone: string
    website: string
  }
}

const FORM_STEPS = [
  { id: 1, title: 'Basic Info', description: 'Achievement title, description, and settings' },
  { id: 2, title: 'Media', description: 'Images and photos' },
  { id: 3, title: 'Team', description: 'Team members who participated (optional)' },
  { id: 4, title: 'Organizer', description: 'Organizer information (optional)' },
  { id: 5, title: 'Review', description: 'Review and submit your achievement' }
]

const initialFormData: AchievementFormData = {
  title: '',
  subTitle: '',
  description: '',
  subDescription: '',
  date: new Date(),
  tags: [],
  images: [],
  imageFiles: [],
  teams: [],
  organizedBy: {
    name: '',
    image: '',
    title: '',
    description: '',
    email: '',
    phone: '',
    website: ''
  }
}

export default function CreateAchievementPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const achievementId = searchParams.get('id')
  const isEditMode = !!achievementId
  
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<AchievementFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [createAchievement] = useCreateAchievementMutation()
  const [updateAchievement] = useUpdateAchievementMutation()
  const { data: existingAchievement, isLoading: isLoadingAchievement } = useGetAchievementByIdQuery(
    achievementId!,
    { skip: !achievementId }
  )

  // Populate form data when editing existing achievement
  useEffect(() => {
    if (isEditMode && existingAchievement?.data) {
      const achievement = existingAchievement.data
      setFormData({
        title: achievement.title || '',
        subTitle: achievement.subTitle || '',
        description: achievement.description || '',
        subDescription: achievement.subDescription || '',
        date: new Date(achievement.date),
        tags: achievement.tags || [],
        event: achievement.event || '',
        images: achievement.images || [],
        imageFiles: [], // Will be empty for existing images
        teams: (achievement.teams || []).map(team => typeof team === 'string' ? team : team._id),
        organizedBy: {
          name: achievement.organizedBy?.name || '',
          image: achievement.organizedBy?.image || '',
          title: achievement.organizedBy?.title || '',
          description: achievement.organizedBy?.description || '',
          email: achievement.organizedBy?.email || '',
          phone: achievement.organizedBy?.phone || '',
          website: achievement.organizedBy?.website || ''
        }
      })
    }
  }, [isEditMode, existingAchievement])

  const handleNext = () => {
    if (currentStep < FORM_STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCancel = () => {
    router.push('/admin/achievements')
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const submitData = new FormData()
      
      // Append images
      formData.imageFiles.forEach((file, index) => {
        submitData.append('images', file)
      })
      
      // Append organizedBy image if exists
      if (formData.organizedBy.image) {
        submitData.append('images', formData.organizedBy.image)
      }

     
      
      // Prepare data object (excluding files)
      const dataToSubmit = {
        title: formData.title,
        subTitle: formData.subTitle,
        description: formData.description,
        subDescription: formData.subDescription,
        date: formData.date instanceof Date ? formData.date.toISOString() : new Date(formData.date).toISOString(),
        tags: formData.tags,
        teams: formData.teams,
        event: formData.event,
        organizedBy: (formData.organizedBy.name || formData.organizedBy.title || formData.organizedBy.description) ? {
          name: formData.organizedBy.name,
          title: formData.organizedBy.title,
          description: formData.organizedBy.description,
          email: formData.organizedBy.email,
          phone: formData.organizedBy.phone,
          website: formData.organizedBy.website
        } : undefined
      }
      
      submitData.append('data', JSON.stringify(dataToSubmit))
      console.log('Submitting data:', dataToSubmit)
      
      if (isEditMode && achievementId) {
        // Update existing achievement
        await updateAchievement({ achievementId: achievementId!, data: submitData }).unwrap()
      } else {
        // Create new achievement
        await createAchievement(submitData).unwrap()
      }
      
      router.push('/admin/achievements')
    } catch (error) {
      console.error('Failed to create achievement:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = (updates: Partial<AchievementFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const progress = (currentStep / FORM_STEPS.length) * 100

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            formData={formData}
            updateFormData={updateFormData}
            showPublicToggle={false} // Remove isPublic field
          />
        )
      case 2:
        return (
          <MediaStep
            formData={formData}
            updateFormData={updateFormData}
          />
        )
      case 3:
        return (
          <TeamSelectionStep
            formData={formData}
            updateFormData={updateFormData}
          />
        )
      case 4:
        return (
          <OrganizerStep
            formData={formData}
            updateFormData={updateFormData}
          />
        )
      case 5:
        return (
          <ReviewStep
            formData={formData}
          />
        )
      default:
        return null
    }
  }

  // Show loading state when fetching existing achievement data
  if (isEditMode && isLoadingAchievement) {
    return (
      <ClubAdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading achievement data...</p>
          </div>
        </div>
      </ClubAdminLayout>
    )
  }

  return (
    <ClubAdminLayout>
      <div className="w-full space-y-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Achievements
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditMode ? 'Edit Achievement' : 'Create Achievement'}
              </h1>
              <p className="text-gray-600 mt-1">
                {isEditMode 
                  ? 'Update your achievement details' 
                  : 'Add a new achievement to showcase your club\'s success'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Step {currentStep} of {FORM_STEPS.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="w-full" />
              <div className="flex justify-between">
                {FORM_STEPS.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center text-center ${
                      index + 1 <= currentStep ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        index + 1 <= currentStep
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step.id}
                    </div>
                    <span className="text-xs mt-1 hidden sm:block">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle>{FORM_STEPS[currentStep - 1]?.title}</CardTitle>
            <p className="text-gray-600">{FORM_STEPS[currentStep - 1]?.description}</p>
          </CardHeader>
          <CardContent className="p-6">
            {renderCurrentStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
            
            {currentStep < FORM_STEPS.length ? (
              <Button
                onClick={handleNext}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4" />
                {isSubmitting 
                  ? (isEditMode ? 'Updating...' : 'Creating...') 
                  : (isEditMode ? 'Update Achievement' : 'Create Achievement')
                }
              </Button>
            )}
          </div>
        </div>
      </div>
    </ClubAdminLayout>
  )
}

// Team Selection Step Component
interface TeamSelectionStepProps {
  formData: AchievementFormData
  updateFormData: (updates: Partial<AchievementFormData>) => void
}

function TeamSelectionStep({ formData, updateFormData }: TeamSelectionStepProps) {
  const [showMemberSelector, setShowMemberSelector] = useState(false)
  
  // Mock club members - replace with actual API call
  const mockClubMembers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'President' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Vice President' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Secretary' },
    { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Treasurer' },
    { id: '5', name: 'David Brown', email: 'david@example.com', role: 'Member' },
  ]

  const selectedMembers = mockClubMembers.filter(member => 
    formData.teams.includes(member.id)
  )

  const handleMemberToggle = (memberId: string) => {
    const updatedMembers = formData.teams.includes(memberId)
      ? formData.teams.filter(id => id !== memberId)
      : [...formData.teams, memberId]
    
    updateFormData({ teams: updatedMembers })
  }

  const handleRemoveMember = (memberId: string) => {
    const updatedMembers = formData.teams.filter(id => id !== memberId)
    updateFormData({ teams: updatedMembers })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Team Members</h3>
        <p className="text-gray-600 mb-4">
          Select club members who participated in this achievement (optional)
        </p>
      </div>

      {/* Selected Members */}
      {selectedMembers.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Selected Members ({selectedMembers.length})</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedMembers.map(member => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border"
              >
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveMember(member.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Members Button */}
      <Button
        variant="outline"
        onClick={() => setShowMemberSelector(!showMemberSelector)}
        className="flex items-center gap-2"
      >
        <Users className="w-4 h-4" />
        {showMemberSelector ? 'Hide Member List' : 'Add Team Members'}
      </Button>

      {/* Member Selector */}
      {showMemberSelector && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Club Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {mockClubMembers.map(member => (
                <div
                  key={member.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    formData.teams.includes(member.id)
                      ? 'bg-blue-50 border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleMemberToggle(member.id)}
                >
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.email} • {member.role}</p>
                  </div>
                  <div className={`w-4 h-4 rounded border-2 ${
                    formData.teams.includes(member.id)
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {formData.teams.includes(member.id) && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}