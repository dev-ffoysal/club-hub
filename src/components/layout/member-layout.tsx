'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../../lib/utils'
import { BarChart3, Calendar, Search, MessageCircle, User, X, Menu, Bell } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { ThemeToggle } from '../ui/theme-toggle'


interface MemberLayoutProps {
  children: React.ReactNode
}

const sidebarNavigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3,
    description: 'Overview and activities'
  },
  {
    name: 'Events',
    href: '/events',
    icon: Calendar,
    description: 'Browse and join events'
  },
  {
    name: 'Discover',
    href: '/clubs',
    icon: Search,
    description: 'Find new clubs'
  },
  {
    name: 'Chat',
    href: '/dashboard/chat',
    icon: MessageCircle,
    description: 'Club group chats',
    badge: 3
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: User,
    description: 'Your profile settings'
  }
]

export function MemberLayout({ children }: MemberLayoutProps) {
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
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CH</span>
              </div>
              <span className="font-bold text-lg text-foreground">Club Hub</span>
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
                <span className="text-sm font-medium text-muted-foreground">AR</span>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Ahmed Rahman</div>
                <div className="text-xs text-muted-foreground">CSE2021001</div>
              </div>
            </div>
            <div className="mt-3 flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link href="/profile">Settings</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                // TODO: Implement sign out functionality
                console.log('Sign out clicked')
              }}>
                Sign Out
              </Button>
            </div>
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
              {/* <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4 mr-2" />Notifications
                <Badge variant="destructive" className="ml-2">3</Badge>
              </Button> */}
              <Button variant="outline" size="sm">
                <Link href="/">Public Site</Link>
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