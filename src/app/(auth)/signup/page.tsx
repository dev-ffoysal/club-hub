'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Navbar } from '../../../components/layout/navbar'
import { UNIVERSITIES } from '../../../lib/constants'

import { 
  User as UserIcon, 
  Mail, 
  Lock, 
  GraduationCap, 
  Building2, 
  Phone, 
  MapPin, 
  Sparkles, 
  Shield, 
  Globe, 
  Award, 
  Heart, 
  ArrowRight, 
  CheckCircle,
  UserPlus,
  BookOpen,
  Users
} from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRegisterMutation } from '@/store/api/authAPI'
import { IMemberRegistration } from '@/types/request'
import { useAppDispatch } from '@/store/hooks'




export default function SignupPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [memberSignup] = useRegisterMutation()
  const [formData, setFormData] = useState<
    IMemberRegistration
  >({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    department: '',
    university: '',
    phone: '',
    // bloodGroup: '',
    // gender: '',
    address: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name.includes('address.')) {
      const addressField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        address: value
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user makes a selection
    if (error) setError('')
  }

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setError('First name is required')
      return false
    }
    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }
    if (!formData.password) {
      setError('Password is required')
      return false
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (!formData.university) {
      setError('Please select your university')
      return false
    }
    if (!formData.studentId.trim()) {
      setError('Student ID is required')
      return false
    }
    return true
  }

  const handleNextStep = () => {
    setError('')
    if (step === 1 && validateStep1()) {
      setStep(2)
    }
  }

  const handlePrevStep = () => {
    setError('')
    setStep(1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!validateStep2()) {
      return
    }
    
    setIsLoading(true)

    try {
      // Prepare signup data
      const signupData = {
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        
        studentId: formData.studentId,
        department: formData.department || undefined,
        university: formData.university,
        phone: formData.phone || undefined,
        address: formData.address || undefined,
      }

      // Call member signup API
      const response = await memberSignup(signupData).unwrap()
      
      if (response.statusCode === 200 && response.success) {
        // Store email for OTP verification
        localStorage.setItem('pendingVerificationEmail', formData.email)
        
        // Redirect to OTP verification page
        router.push('/otp-verification')
      } else {
        setError(response.message || 'Registration failed. Please try again.')
      }
    } catch (err: any) {
      console.error('Signup error:', err)
      if (err.data?.message) {
        setError(err.data.message)
      } else if (err.data?.errorMessages?.length > 0) {
        setError(err.data.errorMessages[0].message)
      } else {
        setError('Registration failed. Please try again.')
      }
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <Navbar />
      
      <div className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Welcome Content */}
            <div className="text-center lg:text-left space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-full text-sm font-medium text-green-700 dark:text-green-300 mb-4">
                <UserPlus className="w-4 h-4 mr-2" />
                Join Club Hub Today
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Start Your
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent block">
                  Club Journey
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                Create your account and unlock access to hundreds of clubs, events, and opportunities at your university.
              </p>

              {/* Benefits */}
              <div className="space-y-4 pt-6">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                  <span>Join multiple clubs and communities</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                  <span>Discover and register for exciting events</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                  <span>Connect with like-minded students</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                  <span>Track your involvement and achievements</span>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-6">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="w-4 h-4 mr-2 text-green-500" />
                  Secure Registration
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Globe className="w-4 h-4 mr-2 text-blue-500" />
                  Multi-University
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Award className="w-4 h-4 mr-2 text-purple-500" />
                  Trusted Platform
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="max-w-md w-full mx-auto space-y-6">
              {/* Progress Indicator */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <div className={`h-1 w-12 ${
                  step >= 2 ? 'bg-green-500' : 'bg-gray-200'
                }`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
              </div>

              {/* Signup Form */}
              <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {step === 1 ? 'Create Account' : 'Academic Details'}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {step === 1 
                      ? 'Enter your basic information to get started'
                      : 'Tell us about your academic background'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNextStep(); }} className="space-y-6">
                    {step === 1 && (
                      <>
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              <span className="flex items-center">
                                <UserIcon className="w-4 h-4 mr-2 text-green-500" />
                                First Name *
                              </span>
                            </label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="John"
                              className="w-full h-12  transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Last Name
                            </label>
                            <Input
                              id="lastName"
                              name="lastName"
                              type="text"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Doe"
                              className="w-full h-12  transition-colors"
                            />
                          </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            <span className="flex items-center">
                              <Mail className="w-4 h-4 mr-2 text-blue-500" />
                              Email Address *
                            </span>
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john.doe@university.edu"
                            className="w-full h-12  transition-colors"
                          />
                        </div>

                        {/* Password Fields */}
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              <span className="flex items-center">
                                <Lock className="w-4 h-4 mr-2 text-purple-500" />
                                Password *
                              </span>
                            </label>
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              required
                              value={formData.password}
                              onChange={handleInputChange}
                              placeholder="Create a secure password"
                              className="w-full h-12  transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              <span className="flex items-center">
                                <Lock className="w-4 h-4 mr-2 text-purple-500" />
                                Confirm Password *
                              </span>
                            </label>
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              required
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              placeholder="Confirm your password"
                              className="w-full h-12  transition-colors"
                            />
                          </div>
                        </div>

                        {/* phone & Gender */}
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              <span className="flex items-center">
                                <Phone className="w-4 h-4 mr-2 text-orange-500" />
                                Phone
                              </span>
                            </label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="01XXXXXXXXX"
                              className="w-full h-12  transition-colors"
                            />
                          </div>
                          {/* <div className="space-y-2">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Gender
                            </label>
                            <Select
                              id="gender"
                              name="gender"
                              value={formData.gender}
                              onChange={handleInputChange}
                              className="w-full h-12 border-2 rounded-md px-3 bg-background focus:border-pink-500 transition-colors"
                            >
                            <SelectTrigger className="w-[180px] h-12 ">
                              <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                             <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                             </SelectContent>
                            </Select>
                          </div> */}
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        {/* University & Student ID */}
                        <div className="space-y-4 ">
                          <div className="space-y-2">
                            <label htmlFor="university" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              <span className="flex items-center">
                                <Building2 className="w-4 h-4 mr-2 text-blue-500" />
                                University *
                              </span>
                            </label>
                            <Select
                              value={formData.university}
                              onValueChange={(value) => handleSelectChange('university', value)}
                            >
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Select University" />
                                </SelectTrigger>
                                <SelectContent>
                                  {UNIVERSITIES.map((uni) => (
                                    <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                                  ))}
                                </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              <span className="flex items-center">
                                <GraduationCap className="w-4 h-4 mr-2 text-green-500" />
                                Student ID *
                              </span>
                            </label>
                            <Input
                              id="studentId"
                              name="studentId"
                              type="text"
                              required
                              value={formData.studentId}
                              onChange={handleInputChange}
                              placeholder="Your student ID"
                              className="w-full h-12  transition-colors"
                            />
                          </div>
                        </div>

                        {/* Department & Blood Group */}
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              <span className="flex items-center">
                                <BookOpen className="w-4 h-4 mr-2 text-purple-500" />
                                Department
                              </span>
                            </label>
                            <Input
                              id="department"
                              name="department"
                              type="text"
                              value={formData.department}
                              onChange={handleInputChange}
                              placeholder="Computer Science"
                              className="w-full h-12  transition-colors"
                            />
                          </div>
                          {/* <div className="space-y-2">
                            <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Blood Group
                            </label>
                            <Select
                              id="bloodGroup"
                              name="bloodGroup"
                              value={formData.bloodGroup}
                              onChange={handleInputChange}
                              className="w-full h-12 border-2 rounded-md px-3 bg-background focus:border-red-500 transition-colors"
                            >
                              <option value="">Select</option>
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                            </Select>
                          </div> */}
                        </div>

                        {/* Address */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                                City
                              </span>
                            </label>
                            <Input
                              id="address"
                              name="address"
                              type="text"
                              value={formData.address}
                              onChange={handleInputChange}
                              placeholder="Street, Disctrict, city"
                              className="w-full h-12  transition-colors"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Error Message */}
                    {error && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center">
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-white text-xs font-bold">!</span>
                        </div>
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      {step === 2 && (
                        <Button
                          type="button"
                          onClick={handlePrevStep}
                          variant="outline"
                          className="flex-1 h-12 border-2 border-gray-300 hover:border-gray-400 transition-colors"
                        >
                          Previous
                        </Button>
                      )}
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className={`${step === 1 ? 'w-full' : 'flex-1'} h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none`}
                        size="lg"
                      >
                        <span className="flex items-center justify-center">
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Creating Account...
                            </>
                          ) : (
                            <>
                              {step === 1 ? 'Continue' : 'Create Account'}
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                          )}
                        </span>
                      </Button>
                    </div>
                  </form>

                  {/* Additional Links */}
                  <div className="mt-6 text-center space-y-3">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        🎓 Already have an account?
                      </p>
                      <Link href="/login" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200 transform hover:scale-105 font-medium text-sm">
                        <Users className="w-4 h-4 mr-2" />
                        Sign In Instead
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <Link href="/" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                        ← Back to Home
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}