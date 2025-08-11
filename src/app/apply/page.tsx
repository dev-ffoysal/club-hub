'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'
import { Navbar } from '../../components/layout/navbar'
import { UNIVERSITIES } from '../../lib/constants'
import { ClubApplicationForm } from '../../types'
import { CheckCircle, ClipboardList, HelpCircle, Lightbulb } from 'lucide-react'

export default function ApplyPage() {
  const [formData, setFormData] = useState<ClubApplicationForm>({
    clubName: '',
    purpose: '',
    university: '',
    contactEmail: '',
    contactPhone: '',
    applicantName: '',
    applicantEmail: '',
    description: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (field: keyof ClubApplicationForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="p-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Application Submitted Successfully!
              </h1>
              <p className="text-gray-600 mb-6">
                Thank you for applying to join the Club Management Hub. Our team will review your application and get back to you within 2-3 business days.
              </p>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
                  <ul className="text-sm text-blue-800 space-y-1 text-left">
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Apply for Your Club
          </h1>
          <p className="mt-4 text-lg text-gray-600">
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
                <h4 className="font-semibold text-gray-900 mb-2">Club Information</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Official club name</li>
                  <li>• Clear purpose and objectives</li>
                  <li>• University affiliation</li>
                  <li>• Contact details</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Applicant Details</h4>
                <ul className="text-sm text-gray-600 space-y-1">
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Club Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Club Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Club Name *
                    </label>
                    <Input
                      required
                      value={formData.clubName}
                      onChange={(e) => handleInputChange('clubName', e.target.value)}
                      placeholder="e.g., Computer Science Club"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      University *
                    </label>
                    <select
                      required
                      value={formData.university}
                      onChange={(e) => handleInputChange('university', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select your university</option>
                      {UNIVERSITIES.map((university) => (
                        <option key={university} value={university}>
                          {university}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Club Purpose *
                  </label>
                  <textarea
                    required
                    value={formData.purpose}
                    onChange={(e) => handleInputChange('purpose', e.target.value)}
                    placeholder="Describe the main purpose and objectives of your club"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    rows={3}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Provide a detailed description of your club's activities, history, and goals"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    rows={5}
                  />
                </div>
              </div>

              {/* Contact Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Club Contact Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      placeholder="club@university.edu.bd"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Club Contact Phone
                    </label>
                    <Input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      placeholder="+880 1XXX-XXXXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Applicant Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Applicant Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Full Name *
                    </label>
                    <Input
                      required
                      value={formData.applicantName}
                      onChange={(e) => handleInputChange('applicantName', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.applicantEmail}
                      onChange={(e) => handleInputChange('applicantEmail', e.target.value)}
                      placeholder="john.doe@university.edu.bd"
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="text-sm text-gray-600">
                    <p>
                      I confirm that I am authorized to represent this club and that all information provided is accurate. 
                      I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
                      <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="gradient-bg"
                >
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
                <h4 className="font-semibold text-gray-900 mb-2">Application Tips</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Be specific about your club's purpose and goals</li>
                  <li>• Use your official university email address</li>
                  <li>• Provide accurate contact information</li>
                  <li>• Review all information before submitting</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Contact Support</h4>
                <p className="text-sm text-gray-600 mb-2">
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