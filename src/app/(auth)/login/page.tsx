'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'


import { Calendar, Users, BarChart3, Trophy, Sparkles, Shield, Zap, Heart, Star, ArrowRight, CheckCircle, Globe, Award } from 'lucide-react'
import { useLoginMutation } from '@/store/api/authAPI'
import { Navbar } from '@/components/layout/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'



export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || null
  
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await loginMutation({
        email: formData.email,
        password: formData.password
      }).unwrap()

      const { accessToken, refreshToken, role } = response.data || {}
      
      if (accessToken && role) {
        // Determine redirect destination
        let redirectPath = '/dashboard' // Default redirect

        // If there's a specific redirect parameter, use it
        if (redirectTo) {
          redirectPath = redirectTo
        } else {
          // Otherwise, redirect based on user role
          const roleRedirects: Record<string, string> = {
            'super-admin': '/super-admin/dashboard',
            'admin': '/admin/dashboard',
            'club': '/admin/dashboard',
            'member': '/dashboard'
          }
          redirectPath = roleRedirects[role] || '/dashboard'
        }

        console.log('Login successful, redirecting to:', redirectPath)
        
        // Use router.push for better UX (allows back navigation)
        router.push(redirectPath)
      } else {
        setError('Login response is missing required data. Please try again.')
      }
     
    } catch (error: any) {
      // Handle login error
      const errorMessage = error?.data?.message || error?.message || 'Login failed. Please try again.'
      setError(errorMessage)
      console.error('Login error:', error)
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
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Welcome to Club Hub
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Your Gateway to
                <span className="text-blue-600 dark:text-blue-400 block">
                  Amazing Experiences
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                Join thousands of students connecting, learning, and growing through university clubs and events.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Clubs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">10K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">1K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Events</div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-6">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="w-4 h-4 mr-2 text-green-500" />
                  Secure Platform
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Globe className="w-4 h-4 mr-2 text-blue-500" />
                  Multi-University
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Award className="w-4 h-4 mr-2 text-purple-500" />
                  Award Winning
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="max-w-md w-full mx-auto space-y-6">

              {/* Login Form */}
              <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back!</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Ready to dive into your club activities? Let's get you signed in.
                  </CardDescription>
                </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      <span className="flex items-center">
                        <Globe className="w-4 h-4 mr-2 text-blue-500" />
                        Email Address
                      </span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@university.edu"
                      className="w-full h-12  transition-colors"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      <span className="flex items-center">
                        <Shield className="w-4 h-4 mr-2 text-blue-500" />
                        Password
                      </span>
                    </label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your secure password"
                      className="w-full h-12  transition-colors"
                    />
                  </div>

                {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center">
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white text-xs font-bold">!</span>
                      </div>
                      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading || isLoginLoading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
                    size="lg"
                  >
                    <span className="flex items-center justify-center">
                      {isLoading || isLoginLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Signing In...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </span>
                  </Button>
              </form>


              {/* Additional Links */}
              <div className="mt-6 text-center space-y-3">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    🎓 New to Club Hub?
                  </p>
                  <Link href="/apply" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 font-medium text-sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Apply for Your Club
                  </Link>
                  
                </div>
                 <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        🎓 Don't have an account?
                      </p>
                      <Link href="/signup" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200 transform hover:scale-105 font-medium text-sm">
                        <Users className="w-4 h-4 mr-2" />
                        Sign Up Instead
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

          {/* Enhanced Features Info */}
          {/* <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Why Choose Club Hub?
                </div>
                <h3 className="text-2xl font-bold mb-2">Everything Your Club Needs</h3>
                <p className="text-blue-100 max-w-md mx-auto">
                  From event planning to member engagement, we've got you covered with powerful tools and insights.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Smart Event Management</h4>
                      <p className="text-blue-100 text-sm">Plan, promote & track events effortlessly</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-blue-100">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-300" />Automated reminders</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-300" />RSVP tracking</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-300" />Real-time analytics</li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Member Engagement</h4>
                      <p className="text-blue-100 text-sm">Build stronger club communities</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-blue-100">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-300" />Member profiles</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-300" />Communication tools</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-300" />Achievement tracking</li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Powerful Analytics</h4>
                      <p className="text-blue-100 text-sm">Data-driven club insights</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-blue-100">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-300" />Attendance reports</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-300" />Engagement metrics</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-300" />Growth tracking</li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Competitions & Awards</h4>
                      <p className="text-blue-100 text-sm">Gamify your club experience</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-blue-100">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-300" />Contest hosting</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-300" />Leaderboards</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-300" />Digital badges</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <p className="text-blue-100 text-sm mb-4">
                  Join thousands of clubs already using Club Hub to create amazing experiences
                </p>
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-300" />
                    <span>4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1 text-green-300" />
                    <span>99.9% Uptime</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-1 text-red-300" />
                    <span>Loved by Students</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
            </div>
          </div>
        </div>
 
      </div>
    </div>
  )
}