'use client'

import { usePathname } from 'next/navigation'
import { Footer } from './footer'

export function ConditionalFooter() {
  const pathname = usePathname()
  
  // Hide footer on dashboard pages
  const isDashboardPage = pathname.startsWith('/admin') || 
                         pathname.startsWith('/super-admin') || 
                         pathname.startsWith('/profile')
  
  if (isDashboardPage) {
    return null
  }
  
  return <Footer />
}