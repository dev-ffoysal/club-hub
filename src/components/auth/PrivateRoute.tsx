'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'

interface PrivateRouteProps {
  children: ReactNode
  requiredRoles?: string[] // Optional, empty = any logged-in user
  requireAuth?: boolean // Optional, default true
}

export function PrivateRoute({
  children,
  requiredRoles = [],
  requireAuth = true,
}: PrivateRouteProps) {

  const router = useRouter()
  const pathname = usePathname()

  const { 
    accessToken, 
    user, 
    isAuthenticated, 
    isLoading 
  } = useAppSelector((state) => state.auth)
      console.log('PrivateRoute:', { isAuthenticated, user, requiredRoles })

  useEffect(() => {
    // Skip redirects if still loading
    if (isLoading) return

    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}`
      router.push(redirectUrl)
      return
    }
    // If specific roles are required but user doesn't have the right role
    if (requiredRoles.length > 0 && user?.role && !requiredRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on user's actual role
      const dashboardMap: Record<string, string> = {
        'super-admin': '/super-admin/dashboard',
        'admin': '/admin/dashboard',
        'club': '/admin/dashboard',
        'member': '/dashboard'
      }
      
      const userDashboard = dashboardMap[user.role] || '/dashboard'
      router.push(userDashboard)
      return
    }
  }, [isAuthenticated, isLoading, user, requiredRoles, requireAuth, router, pathname])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Show loading state if authentication is required but not yet determined
  if (requireAuth && !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Show unauthorized message if user doesn't have required role
  if (requiredRoles.length > 0 && user?.role && !requiredRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <button 
            onClick={() => router.back()} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
