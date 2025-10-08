'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { BarChart3, ClipboardList, Building2, Users, Calendar, Megaphone, CreditCard, TrendingUp, Settings, X, Menu, Bell } from 'lucide-react'
import { Badge } from '../ui/badge'
import { ThemeToggle } from '../ui/theme-toggle'


interface SuperAdminLayoutProps {
  children: React.ReactNode
}

const sidebarNavigation = [
  {
    name: 'Dashboard',
    href: '/super-admin/dashboard',
    icon: BarChart3,
    description: 'Overview and statistics'
  },
  {
    name: 'Club Requests',
    href: '/super-admin/club-requests',
    icon: ClipboardList,
    description: 'Review club applications',
    badge: 23
  },
  {
    name: 'Clubs',
    href: '/super-admin/clubs',
    icon: Building2,
    description: 'Manage all clubs'
  },
  {
    name: 'Users',
    href: '/super-admin/users',
    icon: Users,
    description: 'User management'
  },
  {
    name: 'Events',
    href: '/super-admin/events',
    icon: Calendar,
    description: 'Monitor and promote events'
  },
  {
    name: 'Advertisements',
    href: '/super-admin/advertisements',
    icon: Megaphone,
    description: 'Manage platform ads'
  },
  {
    name: 'Payments',
    href: '/super-admin/payments',
    icon: CreditCard,
    description: 'Payment management'
  },
  {
    name: 'Analytics',
    href: '/super-admin/analytics',
    icon: TrendingUp,
    description: 'Platform analytics'
  },
  {
    name: 'Settings',
    href: '/super-admin/settings',
    icon: Settings,
    description: 'System settings'
  }
]

export function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <Link href="/super-admin/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SA</span>
              </div>
              <span className="font-bold text-lg text-foreground">Super Admin</span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
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
                      ? "bg-primary/10 text-primary border-r-2 border-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
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

          {/* User info */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-muted-foreground">SA</span>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Super Admin</div>
                <div className="text-xs text-muted-foreground">admin@clubhub.edu.bd</div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => {
              // TODO: Implement sign out functionality
              console.log('Super Admin sign out clicked')
            }}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4 mr-2" />Notifications
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