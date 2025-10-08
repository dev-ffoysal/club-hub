'use client'

import { useState, useEffect } from 'react'
import { Resolver, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { ClubAdminLayout } from '../../../components/layout/club-admin-layout'
import { formatDate } from '../../../lib/utils'
import { Building, Calendar, Loader2, Edit, Save, X } from 'lucide-react'
import { CoverImageUpload } from '../../../components/ui/image-upload'
import { CoverCarousel } from '../../../components/ui/cover-carousel'
import { ClubProfileForm, IClubProfileForm } from '../../../components/forms/club-profile-form'
import { ClubSettingsForm, IClubSettingForm } from '../../../components/forms/club-settings-form'
import { useGetProfileQuery, useUpdateClubProfileMutation } from '../../../store/api/authAPI'
import { zodSchemas } from '@/schemas/profileSchema'
import { getImageUrl } from '@/lib/utils/imageDisplay'

export default function AdminProfile() {
  const [profileImage, setProfileImage] = useState<File | string | null>(null)
  const [coverImages, setCoverImages] = useState<(string | File)[]>([])
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingSettings, setIsEditingSettings] = useState(false)
  
  // API hooks with destructuring
  const { 
    data: profileResponse, 
    isLoading: isLoadingProfile, 
    error: profileError,
    refetch: refetchProfile 
  } = useGetProfileQuery()
  
  const [updateClubProfile, { 
    isLoading: isUpdating, 
    error: updateError 
  }] = useUpdateClubProfileMutation()
  
  // Extract user data
  const userData = profileResponse?.data
  const userRole = userData?.role || 'club_admin'

  // Club Profile Form
  const clubProfileForm = useForm<IClubProfileForm>({
    resolver: zodResolver(zodSchemas.clubBasicInformationZodSchema) as  Resolver<IClubProfileForm>,
    defaultValues: {
      clubName: '',
      clubTitle: '',
      clubPurpose: '',
      clubDescription: '',
      clubPhone: '',
      establishedYear: undefined,
      categories: [],
      clubWorkingAreas: [],
      socialLinks: {}
    }
  })
  
  // Club Settings Form
  const clubSettingsForm = useForm<IClubSettingForm>({
    defaultValues: {
      clubRegistrationEnabled: false,
      feeCollectionMethod: 'free',
      clubRegistrationFees: undefined,
      clubRegistrationStartsAt: undefined,
      clubRegistrationEndsAt: undefined
    }
  })
  
  // Mock club stats data
  const clubStats = {
    rating: 4.8,
    followers: 1250,
    totalMembers: 156,
    totalEvents: 24,
    views: 8900
  }
  
  // Update forms when profile data is loaded
  useEffect(() => {
    if (userData) {
      // Update club profile form
      clubProfileForm.reset({
        clubName: userData.clubName || '',
        clubTitle: userData.clubTitle || '',
        clubPurpose: userData.clubPurpose || '',
        clubDescription: userData.clubDescription || '',
        clubPhone: userData.clubPhone || '',
        establishedYear: userData.establishedYear || undefined,
        categories: userData.categories || [],
        clubWorkingAreas: userData.clubWorkingAreas || [],
        socialLinks: userData.socialLinks || {}
      })
      
      // Update club settings form
      clubSettingsForm.reset({
        clubRegistrationEnabled: userData.clubRegistrationEnabled || false,
        feeCollectionMethod: userData.feeCollectionMethod || 'free',
        clubRegistrationFees: userData.clubRegistrationFees || undefined,
        clubRegistrationStartsAt: userData.clubRegistrationStartsAt ? new Date(userData.clubRegistrationStartsAt) : undefined,
        clubRegistrationEndsAt: userData.clubRegistrationEndsAt ? new Date(userData.clubRegistrationEndsAt) : undefined
      })
      
      // Set profile image
      if (userData.profile) {
        setProfileImage(userData.profile)
      }
      
      // Set cover images
      if (userData.clubCovers && userData.clubCovers.length > 0) {
        setCoverImages(userData.clubCovers)
      }
    }
  }, [userData, clubProfileForm, clubSettingsForm])
  
  // Handle profile image upload
  const handleProfileImageChange = (file: File) => {
    setProfileImage(file)
  }
  
  // Handle cover images upload
  const handleCoverImagesChange = (files: (string | File)[]) => {
    setCoverImages(files)
  }

  const handleEditProfile = () => {
    setIsEditingProfile(true)
  }

  const handleCancelProfile = () => {
    setIsEditingProfile(false)
    // Reset profile form to original values
    if (userData) {
      clubProfileForm.reset({
        clubName: userData.clubName || '',
        clubTitle: userData.clubTitle || '',
        clubPurpose: userData.clubPurpose || '',
        clubDescription: userData.clubDescription || '',
        clubPhone: userData.clubPhone || '',
        establishedYear: userData.establishedYear || undefined,
        categories: userData.categories || [],
        clubWorkingAreas: userData.clubWorkingAreas || [],
        socialLinks: userData.socialLinks || {}
      })
      setProfileImage(userData.profile || null)
      setCoverImages(userData.clubCovers || [])
    }
  }

  const handleEditSettings = () => {
    setIsEditingSettings(true)
  }

  const handleCancelSettings = () => {
    setIsEditingSettings(false)
    // Reset settings form to original values
    if (userData) {
      clubSettingsForm.reset({
        clubRegistrationEnabled: userData.clubRegistrationEnabled || false,
        feeCollectionMethod: userData.feeCollectionMethod || 'free',
        clubRegistrationFees: userData.clubRegistrationFees || undefined,
        clubRegistrationStartsAt: userData.clubRegistrationStartsAt ? new Date(userData.clubRegistrationStartsAt) : undefined,
        clubRegistrationEndsAt: userData.clubRegistrationEndsAt ? new Date(userData.clubRegistrationEndsAt) : undefined
      })
    }
  }
  
  // Handle club profile form submission
  const onSubmitProfile = async (data: IClubProfileForm) => {
    try {
      const formData = new FormData()

      // Add all form fields to FormData
      Object.keys(data).forEach(key => {
        const value = data[key as keyof IClubProfileForm]
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            value.forEach(item => formData.append(`${key}[]`, item))
          } else if (typeof value === 'object') {
            Object.entries(value).forEach(([subKey, subVal]) => {
            formData.append(`${key}[${subKey}]`, subVal as string);
          });
          } else {
            formData.append(key, value.toString())
          }
        }
      })
      
      // Add profile image
      if (profileImage instanceof File) {
        formData.append('images', profileImage)
      } else if (profileImage === null) {
        formData.append('removeProfile', 'true')
      }
      
      // Add cover images
      coverImages.forEach((cover, index) => {
        if (cover instanceof File) {
          formData.append(`covers`, cover)
        }
      })
      
      // Add existing cover URLs
      const existingCovers = coverImages.filter(img => typeof img === 'string')
      if (existingCovers.length > 0) {
        formData.append('existingCovers', JSON.stringify(existingCovers))
      }

      console.log('formData', formData, data)
      
      await updateClubProfile(formData).unwrap()
      setIsEditingProfile(false)
      refetchProfile() // Refresh the profile data
    } catch (error) {
      console.error('Failed to update club profile:', error)
    }
  }
  
  // Handle club settings form submission
  const onSubmitSettings = async (data: IClubSettingForm) => {
    try {
      const formData = new FormData()
      
      // Add all form fields to FormData
      Object.keys(data).forEach(key => {
        const value = data[key as keyof IClubSettingForm]
        if (value !== undefined && value !== null && value !== '') {
          if (value instanceof Date) {
            formData.append(key, value.toISOString())
          } else if (typeof value === 'boolean' || typeof value === 'string' || typeof value === 'number') {
            formData.append(key, value.toString())
          }
        }
      })
      
      await updateClubProfile(formData).unwrap()
      setIsEditingSettings(false)
      refetchProfile() // Refresh the profile data
    } catch (error) {
      console.error('Failed to update club settings:', error)
    }
  }
  
  // Loading state
  if (isLoadingProfile) {
    return (
      <ClubAdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading profile...</span>
        </div>
      </ClubAdminLayout>
    )
  }
  
  // Error state
  if (profileError) {
    return (
      <ClubAdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-500 mb-4">Failed to load profile</p>
            <Button onClick={() => refetchProfile()}>Retry</Button>
          </div>
        </div>
      </ClubAdminLayout>
    )
  }

  return (
    <ClubAdminLayout>
      <div className="space-y-8">
        {/* Header Section with Cover Carousel */}
        <div className="relative bg-blue-600 text-white rounded-lg mb-6 overflow-hidden">
          {/* Cover Carousel Background */}
          {coverImages.length > 0 && (
            <div className="absolute inset-0">
              <CoverCarousel
                images={coverImages.map(img => typeof img === 'string' ? img : URL.createObjectURL(img))}
                isEditing={isEditingProfile}
                onEdit={() => {
                  // Handle cover image edit
                  console.log('Edit cover images')
                }}
              />
            </div>
          )}
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Content */}
          <div className="relative z-10 p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-6">
                <div className="relative w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden group border-4 border-white shadow-lg">
                  {profileImage ? (
                    <img
                      src={getImageUrl(profileImage)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-2xl">
                      {userData?.name?.charAt(0) || userData?.clubName?.charAt(0) || 'C'}{userData?.lastName?.charAt(0) || ''}
                    </span>
                  )}
                  {isEditingProfile && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => document.getElementById('admin-profile-image-input')?.click()}>
                      <span className="text-white text-xs font-medium">Edit</span>
                    </div>
                  )}
                  {isEditingProfile && (
                    <input
                      id="admin-profile-image-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleProfileImageChange(file)
                        }
                      }}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white">{userData?.clubName || userData?.name || 'Club'}</h1>
                  <p className="text-blue-100">{userData?.clubTitle || userData?.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    {userData?.verified && (
                      <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                        ✓ Verified
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                      <Building className="w-3 h-3 mr-1" />
                      {userRole === 'club_admin' ? 'Club Administrator' : 
                       userRole === 'super_admin' ? 'Super Administrator' : 'Member'}
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                      <Calendar className="w-3 h-3 mr-1" />
                      Joined {formatDate(userData?.createdAt!)}
                    </Badge>
                  </div>
                  
                  {/* Club Stats - Non-editable */}
                  <div className="flex items-center space-x-6 mt-3 text-sm">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-300">★</span>
                      <span>{clubStats.rating}</span>
                    </div>
                    <div>
                      <span className="font-medium">{clubStats.followers.toLocaleString()}</span>
                      <span className="text-blue-100 ml-1">followers</span>
                    </div>
                    <div>
                      <span className="font-medium">{clubStats.totalMembers}</span>
                      <span className="text-blue-100 ml-1">members</span>
                    </div>
                    <div>
                      <span className="font-medium">{clubStats.totalEvents}</span>
                      <span className="text-blue-100 ml-1">events</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Cover Image Upload Section */}
        {(isEditingProfile && !isEditingSettings ) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Cover Images</CardTitle>
              <CardDescription>Upload cover images for your club profile</CardDescription>
            </CardHeader>
            <CardContent>
              <CoverImageUpload
                value={coverImages}
                onChange={handleCoverImagesChange}
                disabled={!isEditingProfile}
              />
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Club Profile</TabsTrigger>
            <TabsTrigger value="settings">Club Settings</TabsTrigger>
          </TabsList>

          {/* Club Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Club Profile</CardTitle>
                    <CardDescription>Manage your club's basic information and settings</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {!isEditingProfile ? (
                      <Button onClick={handleEditProfile} variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button onClick={handleCancelProfile} variant="outline" size="sm">
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button onClick={clubProfileForm.handleSubmit(onSubmitProfile)} size="sm" disabled={isUpdating}>
                          {isUpdating ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4 mr-2" />
                          )}
                          Save Changes
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ClubProfileForm
                  form={clubProfileForm}
                  isEditing={isEditingProfile}
                  isUpdating={isUpdating}
                  onProfileImageChange={(file: File | null) => {
                    if (file) {
                      handleProfileImageChange(file)
                    }
                  }}
                  onCoverImagesChange={handleCoverImagesChange}
                  profileImage={profileImage}
                  clubStats={clubStats}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Club Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Club Settings</CardTitle>
                    <CardDescription>Configure registration settings and fees</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {!isEditingSettings ? (
                      <Button onClick={handleEditSettings} variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Settings
                      </Button>
                    ) : (
                      <>
                        <Button onClick={handleCancelSettings} variant="outline" size="sm">
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button onClick={clubSettingsForm.handleSubmit(onSubmitSettings)} size="sm" disabled={isUpdating}>
                          {isUpdating ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4 mr-2" />
                          )}
                          Save Changes
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ClubSettingsForm
                  form={clubSettingsForm}
                  isEditing={isEditingSettings}
                  isUpdating={isUpdating}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClubAdminLayout>
  )
}