'use client'

import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Badge } from '../ui/badge'
import { ProfileImageUpload, CoverImageUpload } from '../ui/image-upload'
import { RichTextEditor } from '../ui/rich-text-editor'
import { ExpandableText } from '../ui/expandable-text'
import { Calendar, MapPin, Users, Star, Eye } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type SocialLinks = {
  facebook?: string
  twitter?: string
  instagram?: string
  linkedin?: string
  website?: string
}

export type IClubProfileForm = {

  categories?: string[]
  clubName?: string
  clubTitle?: string
  clubPurpose?: string
  clubGoal?: string
  clubRegistration?: string
  clubPhone?: string
  clubFoundedAt?: Date
  clubCovers?: (string | File)[]
  clubDescription?: string
  clubWorkingAreas?: string[]
  establishedYear?: string
  socialLinks?: SocialLinks
  profile?: File | string | null
}

interface ClubProfileFormProps {
  form: UseFormReturn<IClubProfileForm>
  isEditing: boolean
  isUpdating: boolean
  onProfileImageChange: (file: File | null) => void
  onCoverImagesChange: (files: (string | File)[]) => void
  profileImage?: File | string | null
  clubStats?: {
    rating: number
    followers: number
    totalMembers: number
    totalEvents: number
    views: number
  }
}

const clubCategories = [
  'Technology',
  'Sports',
  'Arts & Culture',
  'Academic',
  'Social Service',
  'Business',
  'Science',
  'Literature',
  'Music',
  'Photography',
  'Gaming',
  'Environment'
]

const workingAreas = [
  'Campus Events',
  'Community Outreach',
  'Workshops & Training',
  'Competitions',
  'Networking',
  'Research',
  'Mentorship',
  'Career Development'
]



export function ClubProfileForm({
  form,
  isEditing,
  isUpdating,
  profileImage,

}: ClubProfileFormProps) {
  const [newCategory, setNewCategory] = useState('')
  const [newWorkingArea, setNewWorkingArea] = useState('')

  const getProfileImageUrl = () => {
    if (!profileImage) return ''
    
    if (typeof profileImage === 'string') {
      return `${process.env.NEXT_PUBLIC_IMAGE_URL}${profileImage}`
    } else if (profileImage instanceof File) {
      return URL.createObjectURL(profileImage)
    }
    
    return ''
  }

  const addCategory = (category: string) => {
    const currentCategories = form.getValues('categories') || []
    if (!currentCategories.includes(category)) {
      form.setValue('categories', [...currentCategories, category])
    }
  }

  const removeCategory = (category: string) => {
    const currentCategories = form.getValues('categories') || []
    form.setValue('categories', currentCategories.filter(c => c !== category))
  }

  const addWorkingArea = (area: string) => {
    const currentAreas = form.getValues('clubWorkingAreas') || []
    if (!currentAreas.includes(area)) {
      form.setValue('clubWorkingAreas', [...currentAreas, area])
    }
  }

  const removeWorkingArea = (area: string) => {
    const currentAreas = form.getValues('clubWorkingAreas') || []
    form.setValue('clubWorkingAreas', currentAreas.filter(a => a !== area))
  }

  return (
    <Form {...form}>
      <div className="space-y-6">


      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Essential details about your club</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="clubName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Club Name *</FormLabel>
                  {isEditing ? (
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isUpdating}
                        placeholder="Enter club name"
                      />
                    </FormControl>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">{field.value || 'Not provided'}</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="clubTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Club Title</FormLabel>
                  {isEditing ? (
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isUpdating}
                        placeholder="Enter club title/tagline"
                      />
                    </FormControl>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">{field.value || 'Not provided'}</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="clubPurpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Club Purpose</FormLabel>
                {isEditing ? (
                  <FormControl>
                    <RichTextEditor
                      value={field.value || ''}
                      onChange={field.onChange}
                      placeholder="Describe the main purpose of your club"
                      disabled={isUpdating}
                    />
                  </FormControl>
                ) : (
                  <ExpandableText 
                    text={field.value || 'Not provided'}
                    wordLimit={100}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clubDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Club Description</FormLabel>
                {isEditing ? (
                  <FormControl>
                    <RichTextEditor
                      value={field.value || ''}
                      onChange={field.onChange}
                      placeholder="Provide a detailed description of your club"
                      disabled={isUpdating}
                    />
                  </FormControl>
                ) : (
                  <ExpandableText 
                    text={field.value || 'Not provided'}
                    wordLimit={100}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="establishedYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Established Year</FormLabel>
                  {isEditing ? (
                    <FormControl>
                      <Input
                        {...field}
                        type="string"
                        disabled={isUpdating}
                        placeholder="2023"
                        min="1900"
                        max={new Date().getFullYear()}
                        onChange={(e) => field.onChange(e.target.value || undefined)}
                      />
                    </FormControl>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">{field.value || 'Not provided'}</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clubPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  {isEditing ? (
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isUpdating}
                        placeholder="+1 (555) 123-4567"
                      />
                    </FormControl>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">{field.value || 'Not provided'}</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Select categories that best describe your club</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(form.watch('categories') || []).map((category) => (
              <Badge key={category} variant="default" className="flex items-center gap-1">
                {category}
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => removeCategory(category)}
                    className="ml-1 text-xs hover:text-red-500"
                    disabled={isUpdating}
                  >
                    ×
                  </button>
                )}
              </Badge>
            ))}
          </div>
          
          {isEditing && (
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newCategory.trim()) {
                      addCategory(newCategory.trim())
                      setNewCategory('')
                    }
                  }}
                  disabled={isUpdating}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {clubCategories.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addCategory(category)}
                    disabled={isUpdating || (form.watch('categories') || []).includes(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Working Areas */}
      <Card>
        <CardHeader>
          <CardTitle>Working Areas</CardTitle>
          <CardDescription>Areas where your club is active</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(form.watch('clubWorkingAreas') || []).map((area) => (
              <Badge key={area} variant="secondary" className="flex items-center gap-1">
                {area}
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => removeWorkingArea(area)}
                    className="ml-1 text-xs hover:text-red-500"
                    disabled={isUpdating}
                  >
                    ×
                  </button>
                )}
              </Badge>
            ))}
          </div>
          
          {isEditing && (
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom working area"
                  value={newWorkingArea}
                  onChange={(e) => setNewWorkingArea(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newWorkingArea.trim()) {
                      addWorkingArea(newWorkingArea.trim())
                      setNewWorkingArea('')
                    }
                  }}
                  disabled={isUpdating}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {workingAreas.map((area) => (
                  <Button
                    key={area}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addWorkingArea(area)}
                    disabled={isUpdating || (form.watch('clubWorkingAreas') || []).includes(area)}
                  >
                    {area}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>Connect your social media profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="socialLinks.facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  {isEditing ? (
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isUpdating}
                        placeholder="https://facebook.com/yourclub"
                      />
                    </FormControl>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">{field.value || 'Not provided'}</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="socialLinks.instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  {isEditing ? (
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isUpdating}
                        placeholder="https://instagram.com/yourclub"
                      />
                    </FormControl>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">{field.value || 'Not provided'}</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="socialLinks.twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  {isEditing ? (
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isUpdating}
                        placeholder="https://twitter.com/yourclub"
                      />
                    </FormControl>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">{field.value || 'Not provided'}</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="socialLinks.linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  {isEditing ? (
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isUpdating}
                        placeholder="https://linkedin.com/company/yourclub"
                      />
                    </FormControl>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">{field.value || 'Not provided'}</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="socialLinks.website"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Website</FormLabel>
                  {isEditing ? (
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isUpdating}
                        placeholder="https://yourclub.com"
                      />
                    </FormControl>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">{field.value || 'Not provided'}</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
      </div>
    </Form>
  )
}