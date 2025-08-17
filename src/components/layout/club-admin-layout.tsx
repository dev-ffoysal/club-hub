'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import {
  BarChart3,
  Users,
  Calendar,
  MessageCircle,
  DollarSign,
  TrendingUp,
  Building2,
  Settings,
  X,
  Menu,
  Bell,
} from 'lucide-react'

interface ClubAdminLayoutProps {
  children: React.ReactNode
}

const sidebarNavigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: BarChart3, description: 'Overview and statistics' },
  { name: 'Members', href: '/admin/members', icon: Users, description: 'Manage club members', badge: 12 },
  { name: 'Events', href: '/admin/events', icon: Calendar, description: 'Create and manage events' },
  { name: 'Communications', href: '/admin/communications', icon: MessageCircle, description: 'Group chat and notifications' },
  { name: 'Finances', href: '/admin/finances', icon: DollarSign, description: 'Financial management' },
  { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp, description: 'Club performance metrics' },
  { name: 'Profile', href: '/admin/profile', icon: Building2, description: 'Club profile settings' },
  { name: 'Settings', href: '/admin/settings', icon: Settings, description: 'Club configuration' },
]

export function ClubAdminLayout({ children }: ClubAdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card text-card-foreground shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <Link href="/admin/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary))]/80">
                <span className="text-primary-foreground font-bold text-sm">CS</span>
              </div>
              <span className="font-bold text-lg">Club Admin</span>
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
                    'flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary border-r-2 border-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
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

          {/* Club info */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10">
                <span className="text-sm font-medium text-primary">CS</span>
              </div>
              <div>
                <div className="text-sm font-medium">Computer Science Club</div>
                <div className="text-xs text-muted-foreground">University of Dhaka</div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3">
              View Public Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/">View Public Site</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 max-w-full overflow-x-hidden">{children}</main>
      </div>
    </div>
  )
}
