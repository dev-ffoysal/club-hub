import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date formatting utilities
export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatTime(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// String utilities
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidStudentId(studentId: string): boolean {
  // Assuming student ID format: letters followed by numbers (e.g., CSE2021001)
  const studentIdRegex = /^[A-Z]{2,4}\d{4,8}$/i
  return studentIdRegex.test(studentId)
}

// Number formatting utilities
export function formatCurrency(amount: number, currency: string = 'BDT'): string {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: currency === 'BDT' ? 'BDT' : 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

// Color utilities
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

// Array utilities
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key])
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

export function sortBy<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })
}

// Time utilities
export function getTimeUntil(date: Date | string): string {
  const target = new Date(date)
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  
  if (diff <= 0) return 'Event has started'
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} left`
  return `${minutes} minute${minutes > 1 ? 's' : ''} left`
}

export function isEventUpcoming(date: Date | string): boolean {
  return new Date(date) > new Date()
}

export function isEventToday(date: Date | string): boolean {
  const eventDate = new Date(date)
  const today = new Date()
  return eventDate.toDateString() === today.toDateString()
}

export function isEventWithinWeek(date: Date | string): boolean {
  const eventDate = new Date(date)
  const now = new Date()
  const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  return eventDate > now && eventDate <= oneWeekFromNow
}

export function getDetailedCountdown(date: Date | string): {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
} {
  const target = new Date(date)
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  return { days, hours, minutes, seconds, isExpired: false }
}

// File utilities
export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2)
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Random utilities
export function generateRandomCode(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Local storage utilities
export function setLocalStorage(key: string, value: any): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export function getLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  }
  return defaultValue
}

export function removeLocalStorage(key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key)
  }
}

// URL utilities
export function buildUrl(base: string, params: Record<string, string | number>): string {
  const url = new URL(base, window.location.origin)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value))
  })
  return url.toString()
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}