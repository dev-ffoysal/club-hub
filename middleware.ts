import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  console.log("req",req,"DHUKE GECHI HEHE!💕💕💕💕💕💕💕💕")
  const { pathname } = req.nextUrl

  const accessToken = req.cookies.get('accessToken')?.value
  const role = req.cookies.get('role')?.value

  console.log("🤦‍♂️🤦‍♂️🤦‍♂️ role, token, path",role,accessToken,pathname)


  // Public paths that don't require authentication
  const publicPaths = [
    '/',                    // Home page
    '/login',               // Login page
    '/signup',              // Signup page
    '/otp-verification',    // OTP verification
    '/clubs',               // Public clubs listing
    '/events',              // Public events listing
    '/about',               // About page
    '/apply',               // Club application page
    '/test-css',            // Test CSS page
    // Dynamic routes (handled with startsWith)
    '/clubs/',              // Individual club pages
    '/events/',             // Individual event pages
  ]

  // Check if the current path is public
  const isPublicPath = publicPaths.some(path => {
    if (path.endsWith('/')) {
      return pathname.startsWith(path)
    }
    return pathname === path || pathname.startsWith(path + '/')
  })

  if (isPublicPath) {
    return NextResponse.next()
  }

  // If no token → redirect to login
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', req.url))
  }



  // Role-based route restrictions
  const roleRoutes: Record<string, string[]> = {
    'super-admin': ['/super-admin'],
    'club': ['/admin'],
    'member': ['/dashboard'],
  }
  // Check role-based access
  if (role) {
    // Check if user is trying to access a role-specific route
    for (const [requiredRole, paths] of Object.entries(roleRoutes)) {
      const isAccessingRoleRoute = paths.some(path => pathname.startsWith(path))
      
      if (isAccessingRoleRoute && role !== requiredRole) {
        // User is trying to access a route they don't have permission for
        // Redirect them to their appropriate dashboard
        switch (role) {
          case 'super-admin':
            return NextResponse.redirect(new URL('/super-admin/dashboard', req.url))
          case 'club':
            return NextResponse.redirect(new URL('/admin/dashboard', req.url))
          case 'member':
            return NextResponse.redirect(new URL('/dashboard', req.url))
          default:
            // Unknown role, redirect to login
            return NextResponse.redirect(new URL('/login', req.url))
        }
      }
    }
  } else {

    const isAccessingProtectedRoute = Object.values(roleRoutes)
      .flat()
      .some(path => pathname.startsWith(path))
    
    if (isAccessingProtectedRoute) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

// Apply middleware to all routes except static files and API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
