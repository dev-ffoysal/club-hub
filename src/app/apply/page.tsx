'use client'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClubApplicationForm } from '../../types'
import { clubApplicationSchema } from '@/validation/validation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Navbar } from '../../components/layout/navbar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { CheckCircle, ClipboardList, HelpCircle } from 'lucide-react'
import { useApplyClubMutation } from '@/store/api/authAPI'
import { useGetUniversitiesQuery } from '@/store/api/universityAPI'
import { IUniversity } from '@/types/interfaces'

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false)
  const [applyClub, { isLoading, error }] = useApplyClubMutation()
  const { data } = useGetUniversitiesQuery()
  const universities = data?.data || []
  // React Hook Form
  const { 
    register, 
    handleSubmit, 
    watch, 
    control,
    formState: { errors, isSubmitting } 
  } = useForm<ClubApplicationForm & {terms:boolean}>({
    resolver: zodResolver(clubApplicationSchema),
    mode: 'onTouched'
  })

  const onSubmit = async (data: ClubApplicationForm) => {
    console.log('Form Data:', data)
    // Remove the terms field from the data
    const { terms, ...formData } = data
    // Apply club mutation
    const {data:response} = await applyClub(formData)
    // Handle success response
    if (response?.success) {
      setSubmitted(true)
    }


    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="p-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Application Submitted Successfully!
              </h1>
              <p className="text-muted-foreground mb-6">
                Thank you for applying to join the Club Management Hub. Our team will review your application and get back to you within 2-3 business days.
              </p>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">What happens next?</h3>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 text-left">
                    <li>• Our team will review your application</li>
                    <li>• We may contact you for additional information</li>
                    <li>• Upon approval, you'll receive login credentials via email</li>
                    <li>• You can then start setting up your club profile</li>
                  </ul>
                </div>
                <Button asChild>
                  <a href="/">Return to Home</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Apply for Your Club
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Join the Club Management Hub and start building your university community
          </p>
        </div>

        {/* Requirements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ClipboardList className="w-5 h-5" />
              <span>Application Requirements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Club Information</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Official club name</li>
                  <li>• Clear clubPurpose and objectives</li>
                  <li>• University affiliation</li>
                  <li>• Contact details</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Applicant Details</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Must be a current student or faculty</li>
                  <li>• Valid university email address</li>
                  <li>• Authorization to represent the club</li>
                  <li>• Contact information</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Form */}
        <Card>
          <CardHeader>
            <CardTitle>Club Application Form</CardTitle>
            <CardDescription>
              Please fill out all required fields to submit your club application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* Club Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Club Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Club Name *
                    </label>
                    <Input
                      placeholder="e.g., Computer Science Club"
                      {...register('clubName')}
                    />
                    {errors.clubName && <p className="text-red-500 text-sm mt-1">{errors.clubName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      University *
                    </label>
                   <Controller
                    name="university"
                    control={control} // get control from useForm hook
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your university" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* @ts-expect-error */}
                          {universities.length > 0 && universities.map((u:IUniversity) => (
                            <SelectItem key={u._id} value={u._id}>{u.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.university && <p className="text-red-500 text-sm mt-1">{errors.university.message}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Club Purpose *
                  </label>
                  <textarea
                    placeholder="Describe the main clubPurpose and objectives of your club"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register('clubPurpose')}
                  />
                  {errors.clubPurpose && <p className="text-red-500 text-sm mt-1">{errors.clubPurpose.message}</p>}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    placeholder="Provide a detailed description of your club's activities, history, and goals"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register('description')}
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Club Contact Email *
                    </label>
                    <Input
                      type="email"
                      placeholder="club@university.edu.bd"
                      {...register('clubEmail')}
                    />
                    {errors.clubEmail && <p className="text-red-500 text-sm mt-1">{errors.clubEmail.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Club Contact Phone *
                    </label>
                    <Input
                      type="tel"
                      placeholder="+880 1XXXXXXXXX"
                      {...register('clubPhone')}
                    />
                    {errors.clubPhone && <p className="text-red-500 text-sm mt-1">{errors.clubPhone.message}</p>}
                  </div>
                </div>
              </div>

              {/* Applicant Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Applicant Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Full Name *
                    </label>
                    <Input placeholder="John Doe" {...register('applicantName')} />
                    {errors.applicantName && <p className="text-red-500 text-sm mt-1">{errors.applicantName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Email Address *
                    </label>
                    <Input type="email" placeholder="john.doe@university.edu.bd" {...register('applicantEmail')} />
                    {errors.applicantEmail && <p className="text-red-500 text-sm mt-1">{errors.applicantEmail.message}</p>}
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-muted/30 dark:bg-muted/20 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <input type="checkbox" {...register('terms')} className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <div className="text-sm text-muted-foreground">
                    <p>
                      I confirm that I am authorized to represent this club and that all information provided is accurate. 
                      I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
                      <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
                    </p>
                  </div>
                </div>
                {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>}
              </div>

              {/* Submit */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">Save as Draft</Button>
                <Button type="submit" disabled={isSubmitting} className="gradient-bg">
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5" />
              <span>Need Help?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Application Tips</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Be specific about your club's clubPurpose and goals</li>
                  <li>• Use your official university email address</li>
                  <li>• Provide accurate contact information</li>
                  <li>• Review all information before submitting</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Contact Support</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Have questions about the application process?
                </p>
                <div className="space-y-1 text-sm">
                  <p>📧 support@clubhub.edu.bd</p>
                  <p>📞 +880 1XXX-XXXXXX</p>
                  <p>🕒 Mon-Fri, 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
