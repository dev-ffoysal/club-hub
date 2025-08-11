import axios from 'axios'

// Create axios instance with base configuration
// Note: API calls are disabled for demo purposes
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Mock API responses for demo purposes
const mockResponse = (data: any) => Promise.resolve({ data })
const mockError = (status: number, message: string) => 
  Promise.reject({ response: { status, data: { message } } })

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    
    if (error.response?.status === 403) {
      // Forbidden - insufficient permissions
      console.error('Access denied: Insufficient permissions')
    }
    
    if (error.response?.status >= 500) {
      // Server error
      console.error('Server error:', error.response.data?.message || 'Internal server error')
    }
    
    return Promise.reject(error)
  }
)

export default api