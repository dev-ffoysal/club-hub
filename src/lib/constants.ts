import { ClubTemplate, ColorScheme, EventCategory } from '@/types'

// Club Templates
export const CLUB_TEMPLATES: Record<ClubTemplate, { name: string; description: string; preview: string }> = {
  modern: {
    name: 'Modern',
    description: 'Clean, contemporary design with bold typography',
    preview: '/templates/modern-preview.jpg'
  },
  classic: {
    name: 'Classic',
    description: 'Traditional academic look with elegant styling',
    preview: '/templates/classic-preview.jpg'
  },
  minimal: {
    name: 'Minimal',
    description: 'Simple, focused design with lots of white space',
    preview: '/templates/minimal-preview.jpg'
  },
  vibrant: {
    name: 'Vibrant',
    description: 'Colorful, energetic design to attract students',
    preview: '/templates/vibrant-preview.jpg'
  },
  academic: {
    name: 'Academic',
    description: 'Professional, scholarly appearance',
    preview: '/templates/academic-preview.jpg'
  }
}

// Color Schemes
export const COLOR_SCHEMES: Record<string, ColorScheme> = {
  blue: {
    primary: '#3B82F6',
    secondary: '#1E40AF',
    accent: '#60A5FA',
    background: '#F8FAFC'
  },
  green: {
    primary: '#10B981',
    secondary: '#047857',
    accent: '#34D399',
    background: '#F0FDF4'
  },
  purple: {
    primary: '#8B5CF6',
    secondary: '#7C3AED',
    accent: '#A78BFA',
    background: '#FAF5FF'
  },
  red: {
    primary: '#EF4444',
    secondary: '#DC2626',
    accent: '#F87171',
    background: '#FEF2F2'
  },
  orange: {
    primary: '#F97316',
    secondary: '#EA580C',
    accent: '#FB923C',
    background: '#FFF7ED'
  },
  teal: {
    primary: '#14B8A6',
    secondary: '#0F766E',
    accent: '#5EEAD4',
    background: '#F0FDFA'
  }
}

// Event Categories
export const EVENT_CATEGORIES: Record<EventCategory, { name: string; icon: string; color: string }> = {
  seminar: {
    name: 'Seminar',
    icon: '🎓',
    color: 'bg-blue-100 text-blue-800'
  },
  workshop: {
    name: 'Workshop',
    icon: '🔧',
    color: 'bg-green-100 text-green-800'
  },
  competition: {
    name: 'Competition',
    icon: '🏆',
    color: 'bg-yellow-100 text-yellow-800'
  },
  meeting: {
    name: 'Meeting',
    icon: '👥',
    color: 'bg-gray-100 text-gray-800'
  },
  social: {
    name: 'Social',
    icon: '🎉',
    color: 'bg-pink-100 text-pink-800'
  },
  academic: {
    name: 'Academic',
    icon: '📚',
    color: 'bg-purple-100 text-purple-800'
  }
}

// Universities in Bangladesh
export const UNIVERSITIES = [
  'University of Dhaka',
  'Bangladesh University of Engineering and Technology (BUET)',
  'Chittagong University of Engineering & Technology (CUET)',
  'Rajshahi University of Engineering & Technology (RUET)',
  'Khulna University of Engineering & Technology (KUET)',
  'Shahjalal University of Science and Technology (SUST)',
  'Bangladesh Agricultural University',
  'Jahangirnagar University',
  'University of Chittagong',
  'University of Rajshahi',
  'Khulna University',
  'Islamic University, Bangladesh',
  'Comilla University',
  'Jagannath University',
  'Begum Rokeya University',
  'Patuakhali Science and Technology University',
  'Noakhali Science and Technology University',
  'Bangabandhu Sheikh Mujibur Rahman Science and Technology University',
  'Mawlana Bhashani Science and Technology University',
  'Hajee Mohammad Danesh Science and Technology University',
  'North South University',
  'BRAC University',
  'Independent University, Bangladesh (IUB)',
  'American International University-Bangladesh (AIUB)',
  'East West University',
  'United International University',
  'Ahsanullah University of Science and Technology',
  'Daffodil International University',
  'Southeast University',
  'University of Asia Pacific'
]

// Navigation Links
export const NAVIGATION_LINKS = {
  public: [
    { name: 'Home', href: '/' },
    { name: 'Clubs', href: '/clubs' },
    { name: 'Events', href: '/events' },
    { name: 'About', href: '/about' }
  ],
  member: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'My Clubs', href: '/my-clubs' },
    { name: 'Events', href: '/events' },
    { name: 'Profile', href: '/profile' }
  ],
  clubAdmin: [
    { name: 'Dashboard', href: '/admin/dashboard' },
    { name: 'Members', href: '/admin/members' },
    { name: 'Events', href: '/admin/events' },
    { name: 'Analytics', href: '/admin/analytics' },
    { name: 'Settings', href: '/admin/settings' }
  ],
  superAdmin: [
    { name: 'Dashboard', href: '/super-admin/dashboard' },
    { name: 'Applications', href: '/super-admin/applications' },
    { name: 'Clubs', href: '/super-admin/clubs' },
    { name: 'Analytics', href: '/super-admin/analytics' },
    { name: 'Settings', href: '/super-admin/settings' }
  ]
}

// File Upload Limits
export const FILE_UPLOAD_LIMITS = {
  image: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
  },
  document: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  }
}

// Pagination
export const PAGINATION_LIMITS = {
  clubs: 12,
  events: 10,
  members: 20,
  applications: 15,
  notifications: 25,
  comments: 10,
  reviews: 15
}

// Status Colors
export const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800'
}

// Social Media Platforms
export const SOCIAL_PLATFORMS = [
  { name: 'Facebook', key: 'facebook', icon: 'facebook', baseUrl: 'https://facebook.com/' },
  { name: 'Instagram', key: 'instagram', icon: 'instagram', baseUrl: 'https://instagram.com/' },
  { name: 'Twitter', key: 'twitter', icon: 'twitter', baseUrl: 'https://twitter.com/' },
  { name: 'LinkedIn', key: 'linkedin', icon: 'linkedin', baseUrl: 'https://linkedin.com/in/' },
  { name: 'Website', key: 'website', icon: 'globe', baseUrl: '' }
]

// Default Values
export const DEFAULT_VALUES = {
  club: {
    template: 'modern' as ClubTemplate,
    colorScheme: COLOR_SCHEMES.blue,
    isPublic: true,
    commentsEnabled: true
  },
  event: {
    category: 'seminar' as EventCategory,
    isPublic: true,
    commentsEnabled: true,
    maxParticipants: 100
  },
  pagination: {
    page: 1,
    limit: 10
  }
}

// API Endpoints (for future backend integration)
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh'
  },
  clubs: {
    list: '/api/clubs',
    create: '/api/clubs',
    get: (id: string) => `/api/clubs/${id}`,
    update: (id: string) => `/api/clubs/${id}`,
    delete: (id: string) => `/api/clubs/${id}`,
    members: (id: string) => `/api/clubs/${id}/members`,
    events: (id: string) => `/api/clubs/${id}/events`
  },
  events: {
    list: '/api/events',
    create: '/api/events',
    get: (id: string) => `/api/events/${id}`,
    update: (id: string) => `/api/events/${id}`,
    delete: (id: string) => `/api/events/${id}`,
    join: (id: string) => `/api/events/${id}/join`,
    leave: (id: string) => `/api/events/${id}/leave`
  },
  applications: {
    list: '/api/applications',
    create: '/api/applications',
    get: (id: string) => `/api/applications/${id}`,
    approve: (id: string) => `/api/applications/${id}/approve`,
    reject: (id: string) => `/api/applications/${id}/reject`
  }
}

// Error Messages
export const ERROR_MESSAGES = {
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  invalidStudentId: 'Please enter a valid student ID',
  passwordTooShort: 'Password must be at least 8 characters',
  passwordMismatch: 'Passwords do not match',
  fileTooLarge: 'File size is too large',
  invalidFileType: 'Invalid file type',
  networkError: 'Network error. Please try again.',
  unauthorized: 'You are not authorized to perform this action',
  notFound: 'The requested resource was not found',
  serverError: 'Server error. Please try again later.'
}