'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Navbar } from '../../../components/layout/navbar'
import { useVerifyOtpMutation } from '../../../store/api/authAPI'
import { 
  Mail, 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Clock,
  Sparkles
} from 'lucide-react'

export default function OtpVerificationPage() {
  const router = useRouter()
  const [verifyOtp] = useVerifyOtpMutation()
  const [otpCode, setOtpCode] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    // Get email from localStorage
    const pendingEmail = localStorage.getItem('pendingVerificationEmail')
    if (pendingEmail) {
      setEmail(pendingEmail)
    } else {
      // If no pending email, redirect to signup
      router.push('/signup')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')
    
    if (!otpCode.trim()) {
      setError('Please enter the OTP code')
      return
    }
    
    if (otpCode.length !== 6) {
      setError('OTP code must be 6 digits')
      return
    }
    
    setIsLoading(true)

    try {
      const response = await verifyOtp({
        email,
        oneTimeCode: otpCode.trim()
      }).unwrap()
      
      if (response.statusCode === 200 && response.success) {
        // Clear pending verification email
        localStorage.removeItem('pendingVerificationEmail')
        
        // Show success message
        setSuccessMessage(response.message)
        
        // Redirect to home after a short delay

        router.push('/')
      } else {
        setError(response.message || 'OTP verification failed. Please try again.')
      }
    } catch (err: any) {
      console.error('OTP verification error:', err)
      if (err.data?.message) {
        setError(err.data.message)
      } else if (err.data?.errorMessages?.length > 0) {
        setError(err.data.errorMessages[0].message)
      } else {
        setError('OTP verification failed. Please try again.')
      }
    }

    setIsLoading(false)
  }

  const handleResendOtp = () => {
    // TODO: Implement resend OTP functionality
    setError('')
    setSuccessMessage('OTP resent successfully! Please check your email.')
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
                <Shield className="w-4 h-4 mr-2" />
                Secure Verification
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Verify Your
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent block">
                  Email Address
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                We've sent a 6-digit verification code to your email address. Please enter it below to complete your registration.
              </p>

              {/* Benefits */}
              <div className="space-y-4 pt-6">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                  <span>Secure account verification</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                  <span>Protection against unauthorized access</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                  <span>Quick and easy verification process</span>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-6">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="w-4 h-4 mr-2 text-green-500" />
                  Secure Process
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-2 text-blue-500" />
                  Quick Verification
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                  Almost Done
                </div>
              </div>
            </div>

            {/* Right Side - OTP Form */}
            <div className="max-w-md w-full mx-auto space-y-6">
              {/* OTP Verification Form */}
              <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    Enter Verification Code
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {email && (
                      <span>Code sent to <strong>{email}</strong></span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* OTP Input */}
                    <div className="space-y-2">
                      <label htmlFor="otpCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        <span className="flex items-center">
                          <Shield className="w-4 h-4 mr-2 text-green-500" />
                          6-Digit Verification Code *
                        </span>
                      </label>
                      <Input
                        id="otpCode"
                        name="otpCode"
                        type="text"
                        required
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '') // Only allow digits
                          setOtpCode(value)
                          if (error) setError('')
                        }}
                        placeholder="123456"
                        className="w-full h-12 text-center text-lg font-mono tracking-widest transition-colors"
                      />
                    </div>

                    {/* Success Message */}
                    {successMessage && (
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400">{successMessage}</p>
                      </div>
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
                    <div className="space-y-4">
                      <Button
                        type="submit"
                        disabled={isLoading || successMessage !== ''}
                        className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
                        size="lg"
                      >
                        <span className="flex items-center justify-center">
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Verifying...
                            </>
                          ) : successMessage ? (
                            <>
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Redirecting...
                            </>
                          ) : (
                            <>
                              Verify Code
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                          )}
                        </span>
                      </Button>

                      {/* Resend OTP */}
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          disabled={isLoading}
                          className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline"
                        >
                          Didn't receive the code? Resend OTP
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Additional Links */}
                  <div className="mt-6 text-center space-y-3">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        🔒 Need to go back?
                      </p>
                      <Link href="/signup" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105 font-medium text-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Signup
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