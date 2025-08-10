'use client'

import { useState } from 'react'
import Link from 'next/link'
// import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { cn } from '../../lib/utils'



interface ClubAdminLayoutProps {
  children: React.ReactNode
}

const sidebarNavigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: '📊',
    description: 'Overview and statistics'
  },
  {
    name: 'Members',
    href: '/admin/members',
    icon: '👥',
    description: 'Manage club members',
    badge: 12
  },
  {
    name: 'Events',
    href: '/admin/events',
    icon: '📅',
    description: 'Create and manage events'
  },
  {
    name: 'Communications',
    href: '/admin/communications',
    icon: '💬',
    description: 'Group chat and notifications'
  },
  {
    name: 'Finances',
    href: '/admin/finances',
    icon: '💰',
    description: 'Financial management'
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: '📈',
    description: 'Club performance metrics'
  },
  {
    name: 'Profile',
    href: '/admin/profile',
    icon: '🏛️',
    description: 'Club profile settings'
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: '⚙️',
    description: 'Club configuration'
  }
]

export function ClubAdminLayout({ children }: ClubAdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // const pathname = usePathname()
  const pathname = '/admin/dashboard' // Mock for now

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <Link href="/admin/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <span className="font-bold text-lg text-gray-900">Club Admin</span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebarNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </div>
                  {item.badge && (
                    <Badge variant="destructive" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Club info */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-700">CS</span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Computer Science Club</div>
                <div className="text-xs text-gray-500">University of Dhaka</div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3">
              View Public Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </Button>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                🔔 Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Link href="/">View Public Site</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}