'use client'

import { useState, useEffect } from 'react'
import { Resolver, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Badge } from '../../../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Textarea } from '../../../components/ui/textarea'

import { MemberLayout } from '../../../components/layout/member-layout'

import {  Loader2 } from 'lucide-react'

import { useGetProfileQuery, useUpdateProfileMutation } from '@/store/api/authAPI'


import { 
  zodSchemas,
} from '@/schemas/profileSchema'
import { IMemberProfileFormData } from '@/types/request'

export default function MemberProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState<File | string | null>(null)

  const { data, isLoading, error } = useGetProfileQuery()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  
  const profile = data?.data
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<IMemberProfileFormData>({
    resolver: zodResolver(zodSchemas.memberProfileUpdateZodSchema) as Resolver<IMemberProfileFormData>,
    defaultValues: {
      name: profile?.name || '',
      lastName: profile?.lastName || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      studentId: profile?.studentId || '',
      department: profile?.department || '',
      university: profile?.university || '',
      bloodGroup: profile?.bloodGroup || '',
      gender: profile?.gender || '',
      address: profile?.address || '',
      year: profile?.year || '',
      semester: profile?.semester || '',
      interestedIn: profile?.interestedIn || [],
      profile: '',
    },
  })

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        studentId: profile.studentId || '',
        department: profile.department || '',
        university: profile.university || '',
        bloodGroup: profile.bloodGroup || '',
        gender: profile.gender || '',
      address: profile.address || '',
      year: profile.year || '',
      semester: profile.semester || '',  
      interestedIn: profile.interestedIn || [],
      profile: profile.profile || '',
    })
    setProfileImage(profile.profile || null)
  }
}, [profile, reset])

  const onSubmit = async (data: IMemberProfileFormData) => {
    try {
      const formData = new FormData();
      

      Object.keys(data).forEach(key => {
        if (key === 'profile') return; // Skip profile as it's handled separately
        if (key === 'interestedIn' && Array.isArray(data[key])) {
          data[key].forEach(item => formData.append('interestedIn', item));
        } else if (data[key as keyof IMemberProfileFormData]) {
          formData.append(key, data[key as keyof IMemberProfileFormData] as string);
        }
      });
      
      // Handle profile image upload
      if (profileImage instanceof File) {
        formData.append('images', profileImage);
      } else if (profileImage === null) {
        // If profile image was removed
        formData.append('removeProfile', 'true');
      }
      
      await updateProfile(formData).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };
  
  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    if (profile) {
      reset({
        name: profile.name || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        studentId: profile.studentId || '',
        department: profile.department || '',
        university: profile.university || '',
        bloodGroup: profile.bloodGroup || '',
        gender: profile.gender || '',
        address: profile.address || '',
        year: profile.year || '',
        semester: profile.semester || '',
        interestedIn: profile.interestedIn || [],
        profile: profile.profile || ''
      })
      
      // Reset the profile image
      setProfileImage(profile.profile || null);
    }
  }

  const handleImageChange = (file: File | null) => {
    setProfileImage(file);
  };

  const getProfileImageUrl = () => {
    if (!profileImage) return '';
    
    if (typeof profileImage === 'string') {
      return `${process.env.NEXT_PUBLIC_IMAGE_URL}${profileImage}`;
    } else if (profileImage instanceof File) {
      return URL.createObjectURL(profileImage);
    }
    
    return '';
  };

  if (isLoading) {
    return (
      <MemberLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </MemberLayout>
    )
  }

  if (error) {
    return (
      <MemberLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Profile</h2>
            <p className="text-gray-600">Please try refreshing the page.</p>
          </div>
        </div>
      </MemberLayout>
    )
  }

  return (
    <MemberLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-6">
            <div className="relative w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden group">
              {getProfileImageUrl() ? (
                <img
                  src={getProfileImageUrl()}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-2xl">
                  {profile?.name?.charAt(0)}{profile?.lastName?.charAt(0) || ''}
                </span>
              )}
              {isEditing && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => document.getElementById('profile-image-input')?.click()}>
                  <span className="text-white text-xs font-medium">Edit</span>
                </div>
              )}
              {isEditing && (
                <input
                  id="profile-image-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleImageChange(file)
                    }
                  }}
                />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{profile?.name} {profile?.lastName}</h1>
              <p className="text-muted-foreground">{profile?.studentId} • {profile?.department}</p>
              <p className="text-muted-foreground">{profile?.university}</p>
              <div className="flex items-center space-x-2 mt-2">
                {profile?.verified && (
                  <Badge variant="success" className="text-xs">
                    ✓ Verified
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {profile?.role}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {profile?.interestedIn?.join(', ')}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            {!isEditing ? (
              <Button onClick={handleEdit}>Edit Profile</Button>
            ) : (
              <>
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)} disabled={isUpdating}>
                  {isUpdating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="clubs">My Clubs</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your basic information and contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">First Name</label>
                      {isEditing ? (
                        <Input
                          {...register('name')}
                          placeholder="Enter your first name"
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground mt-1">{watch('name') || 'Not provided'}</p>
                      )}
                      {errors.name && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Last Name</label>
                      {isEditing ? (
                        <Input
                          {...register('lastName')}
                          placeholder="Enter your last name"
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground mt-1">{watch('lastName') || 'Not provided'}</p>
                      )}
                      {errors.lastName && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    {isEditing ? (
                      <Input
                        type="email"
                        {...register('email')}
                        placeholder="Enter your email"
                        className="mt-1"
                        disabled // Email is typically not editable
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">{watch('email') || 'Not provided'}</p>
                    )}
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    {isEditing ? (
                      <Input
                        {...register('phone')}
                        placeholder="Enter your phone number"
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">{watch('phone') || 'Not provided'}</p>
                    )}
                    {errors.phone && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
              

              
              {/* Academic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                  <CardDescription>Your academic details and university information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Student ID</label>
                      {isEditing ? (
                        <Input
                          {...register('studentId')}
                          placeholder="Enter your student ID"
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground mt-1">{watch('studentId') || 'Not provided'}</p>
                      )}
                      {errors.studentId && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.studentId.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Department</label>
                      {isEditing ? (
                        <Input
                          {...register('department')}
                          placeholder="Enter your department"
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground mt-1">{watch('department') || 'Not provided'}</p>
                      )}
                      {errors.department && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.department.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">University</label>
                    {isEditing ? (
                      <Input
                        {...register('university')}
                        placeholder="Enter your university"
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">{watch('university') || 'Not provided'}</p>
                    )}
                    {errors.university && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.university.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Year</label>
                      {isEditing ? (
                        <Input
                          {...register('year')}
                          placeholder="e.g., 3rd Year"
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground mt-1">{watch('year') || 'Not provided'}</p>
                      )}
                      {errors.year && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.year.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Semester</label>
                      {isEditing ? (
                        <Input
                          {...register('semester')}
                          placeholder="e.g., Fall 2024"
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground mt-1">{watch('semester') || 'Not provided'}</p>
                      )}
                      {errors.semester && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.semester.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Blood Group</label>
                      {isEditing ? (
                        <Select 
                          value={watch('bloodGroup')} 
                          onValueChange={(value) => setValue('bloodGroup', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select blood group" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-sm text-muted-foreground mt-1">{watch('bloodGroup') || 'Not provided'}</p>
                      )}
                      {errors.bloodGroup && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.bloodGroup.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Gender</label>
                      {isEditing ? (
                        <Select 
                          value={watch('gender')} 
                          onValueChange={(value) => setValue('gender', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-sm text-muted-foreground mt-1">{watch('gender') || 'Not provided'}</p>
                      )}
                      {errors.gender && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.gender.message}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Address Information</CardTitle>
                  <CardDescription>Your location and address details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                     <label className="text-sm font-medium text-foreground">Address</label>
                     {isEditing ? (
                       <Textarea
                         {...register('address')}
                         placeholder="Enter your address"
                         className="mt-1"
                         rows={3}
                       />
                     ) : (
                       <p className="text-sm text-muted-foreground mt-1">{watch('address') || 'Not provided'}</p>
                     )}
                     {errors.address && (
                       <p className="text-sm text-red-600 mt-1">
                         {errors.address.message}
                       </p>
                     )}
                   </div>
                </CardContent>
              </Card>
            </div>

            {/* Interests */}
            <Card>
              <CardHeader>
                <CardTitle>Interests</CardTitle>
                <CardDescription>Your areas of interest and expertise</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  {/* <label className="text-sm font-medium text-foreground">Interests</label> */}
                  {isEditing ? (
                    <div className="mt-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {(watch('interestedIn') ?? []).map((interest: string, index: number) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            {interest}
                            <button
                              type="button"
                              onClick={() => {
                                const currentInterests = watch('interestedIn') ?? [];
                                const updatedInterests = currentInterests.filter((_, i) => i !== index);
                                setValue('interestedIn', updatedInterests);
                              }}
                              className="ml-1 text-xs hover:text-red-500"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <Input
                        placeholder="Type an interest and press Enter or comma"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ',') {
                            e.preventDefault()
                            const value = e.currentTarget.value.trim()
                            if (value) {
                              const currentInterests = watch('interestedIn') || []
                              if (!currentInterests.includes(value)) {
                                setValue('interestedIn', [...currentInterests, value])
                              }
                              e.currentTarget.value = ''
                            }
                          }
                        }}
                        onBlur={(e) => {
                          const value = e.target.value.trim()
                          if (value) {
                            const currentInterests = watch('interestedIn') || []
                            if (!currentInterests.includes(value)) {
                              setValue('interestedIn', [...currentInterests, value])
                            }
                            e.target.value = ''
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {Array.isArray(profile?.interestedIn) && profile?.interestedIn.length > 0 ? (
                        profile?.interestedIn.map((interest:string, index:number) => (
                          <Badge key={index} variant="outline">
                            {interest}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">No interests specified</span>
                      )}
                    </div>
                  )}
                  {errors.interestedIn && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.interestedIn.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs remain the same */}
          <TabsContent value="clubs" className="space-y-6">
            {/* My Clubs content */}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            {/* Achievements content */}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {/* Settings content */}
          </TabsContent>
        </Tabs>
      </div>
    </MemberLayout>
  )
}