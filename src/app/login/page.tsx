'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Navbar } from '../../components/layout/navbar'
import { useAuth } from '../../hooks/useAuth'
import { User } from '../../types'
import { Calendar, Users, BarChart3, Trophy } from 'lucide-react'

// Dummy user data for testing
const DUMMY_USERS = [
  {
    id: '1',
    email: 'admin@du.ac.bd',
    password: 'admin123',
    firstName: 'Dr. Sarah',
    lastName: 'Ahmed',
    name: 'Dr. Sarah Ahmed',
    role: 'club_admin' as const,
    university: 'University of Dhaka',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    email: 'student@nsu.ac.bd',
    password: 'student123',
    firstName: 'Mohammad',
    lastName: 'Rahman',
    name: 'Mohammad Rahman',
    role: 'member' as const,
    university: 'North South University',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    email: 'organizer@brac.ac.bd',
    password: 'organizer123',
    firstName: 'Fatima',
    lastName: 'Khan',
    name: 'Fatima Khan',
    role: 'club_admin' as const,
    university: 'BRAC University',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    email: 'superadmin@clubhub.com',
    password: 'super123',
    firstName: 'System',
    lastName: 'Administrator',
    name: 'System Administrator',
    role: 'super_admin' as const,
    university: 'Club Hub Platform',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export default function LoginPage() {
  const router = useRouter()
  const { login, setUser } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showDemoCredentials, setShowDemoCredentials] = useState(false)

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

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check credentials against dummy data
    const user = DUMMY_USERS.find(
      u => u.email === formData.email && u.password === formData.password
    )

    if (user) {
      // For dummy authentication, directly set user and store in localStorage
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', 'dummy-token-' + user.id)
      setUser(user)
      
      // Redirect based on user role
      switch (user.role) {
        case 'super_admin':
          router.push('/super-admin/dashboard')
          break
        case 'club_admin':
          router.push('/admin/dashboard')
          break
        case 'member':
          router.push('/dashboard')
          break
        default:
          router.push('/dashboard')
      }
    } else {
      setError('Invalid email or password. Please try again.')
    }

    setIsLoading(false)
  }

  const handleDemoLogin = (user: typeof DUMMY_USERS[0]) => {
    setFormData({
      email: user.email,
      password: user.password
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <Navbar />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to your Club Hub account
            </p>
          </div>

          {/* Login Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              {/* Demo Credentials Toggle */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                  className="w-full mb-4"
                >
                  {showDemoCredentials ? 'Hide' : 'Show'} Demo Credentials
                </Button>

                {showDemoCredentials && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 font-medium mb-3">
                      Click any demo account to auto-fill credentials:
                    </p>
                    
                    {DUMMY_USERS.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => handleDemoLogin(user)}
                        className="p-3 bg-gray-50 dark:bg-background rounded-lg cursor-pointer hover:bg-gray-100 transition-colors border"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-600">{user.email}</p>
                            <p className="text-xs text-blue-600 capitalize">{user.role}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">{user.university}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mt-4">
                      <p className="text-xs text-blue-700">
                        <strong>Note:</strong> These are demo accounts for testing purposes. 
                        In a real application, passwords would be securely hashed and stored.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Links */}
              <div className="mt-6 text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/apply" className="text-blue-600 hover:text-blue-500 font-medium">
                    Apply for your club
                  </Link>
                </p>
                <p className="text-sm text-gray-600">
                  <Link href="/" className="text-blue-600 hover:text-blue-500">
                    Back to Home
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features Info */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white text-center">
            <h3 className="font-semibold mb-2">Club Hub Features</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium flex items-center"><Calendar className="w-4 h-4 mr-2" />Event Management</p>
                <p className="text-blue-100">Create & manage events</p>
              </div>
              <div>
                <p className="font-medium flex items-center"><Users className="w-4 h-4 mr-2" />Member Management</p>
                <p className="text-blue-100">Track club members</p>
              </div>
              <div>
                <p className="font-medium flex items-center"><BarChart3 className="w-4 h-4 mr-2" />Analytics</p>
                <p className="text-blue-100">Event insights</p>
              </div>
              <div>
                <p className="font-medium flex items-center"><Trophy className="w-4 h-4 mr-2" />Competitions</p>
                <p className="text-blue-100">Host competitions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}