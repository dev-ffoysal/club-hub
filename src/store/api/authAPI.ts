import { User } from '@/types';
import api from './axiosConfig'

// Mock user data for demo purposes
const mockUser = {
  id: '1',
  name: 'Demo User',
  email: 'demo@example.com',
  role: 'member' as const,
  university: 'University of Dhaka',
  department: 'Computer Science',
  studentId: 'CS2021001',
  joinedAt: new Date().toISOString(),
  isActive: true
}

// Authentication API endpoints (using mock responses for demo)
export const authAPI = {
  // Login user
  login: (credentials: { email: string; password: string }) => {
    // Mock login - always succeed for demo
    return Promise.resolve({
      data: {
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now()
      }
    })
  },

  // Register user
  register: (userData: any) => {
    // Mock registration - always succeed for demo
    return Promise.resolve({
      data: {
        user: { ...mockUser, ...userData },
        token: 'mock-jwt-token-' + Date.now()
      }
    })
  },

  // Logout user
  logout: () => {
    // Mock logout - always succeed
    return Promise.resolve({ data: { message: 'Logged out successfully' } })
  },

  // Verify token
  verify: () => {
    // Mock verify - always succeed
    return Promise.resolve({ data: { user: mockUser } })
  },

  // Refresh token
  refresh: () => {
    // Mock refresh - always succeed
    return Promise.resolve({
      data: {
        token: 'mock-jwt-token-' + Date.now()
      }
    })
  },

  // Forgot password
  forgotPassword: async (email: string) => {
    return api.post('/auth/forgot-password', { email })
  },

  // Reset password
  resetPassword: async (token: string, password: string) => {
    return api.post('/auth/reset-password', { token, password })
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string) => {
    return api.post('/auth/change-password', { currentPassword, newPassword })
  },

  // Update profile
  updateProfile: async (userData: Partial<User>) => {
    return api.put('/auth/profile', userData)
  },

  // Get current user profile
  getProfile: async () => {
    return api.get('/auth/profile')
  },

  // Upload profile picture
  uploadProfilePicture: async (file: File) => {
    const formData = new FormData()
    formData.append('profilePicture', file)
    return api.post('/auth/upload-profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // Delete account
  deleteAccount: async (password: string) => {
    return api.delete('/auth/account', { data: { password } })
  },

  // Enable two-factor authentication
  enableTwoFactor: async () => {
    return api.post('/auth/2fa/enable')
  },

  // Disable two-factor authentication
  disableTwoFactor: async (code: string) => {
    return api.post('/auth/2fa/disable', { code })
  },

  // Verify two-factor authentication
  verifyTwoFactor: async (code: string) => {
    return api.post('/auth/2fa/verify', { code })
  },
}