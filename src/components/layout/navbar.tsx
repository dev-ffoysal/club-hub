'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '../ui/badge'
import { cn } from '../../lib/utils'
import { User } from '@/types'
import { useAuth } from '../../contexts/auth-context'
import { Button } from '../ui/button'


interface NavbarProps {
    className?: string
}

export function Navbar({ className }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()

    const { user, logout } = useAuth()

    const navigationLinks = [
        { name: 'Home', href: '/' },
        { name: 'Clubs', href: '/clubs' },
        { name: 'Events', href: '/events' },
        { name: 'About', href: '/about' }
    ]

    return (
        <nav className={cn('bg-white shadow-sm border-b', className)}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and primary navigation */}
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">CM</span>
                                </div>
                                <span className="font-bold text-xl text-gray-900">Club Hub</span>
                            </Link>
                        </div>

                        {/* Desktop navigation */}
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {navigationLinks.map((link) => {
                                const isActive = pathname === link.href
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={cn(
                                            "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors",
                                            isActive
                                                ? "text-blue-600 border-blue-600"
                                                : "text-gray-500 hover:text-gray-900 hover:border-gray-300 border-transparent"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                )
                            })}
                            {!user && (
                                <Link
                                    href="/login"
                                    className={cn(
                                        "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors",
                                        pathname === '/login'
                                            ? "text-blue-600 border-blue-600"
                                            : "text-gray-500 hover:text-gray-900 hover:border-gray-300 border-transparent"
                                    )}
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Right side - Auth buttons or user menu */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                                        <span className="text-sm font-medium text-white">
                                            {user.name?.charAt(0) || 'U'}
                                        </span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                                    <Button variant="ghost" size="sm" onClick={logout}>
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/apply"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Apply for Your Club
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="sm:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger icon */}
                            <svg
                                className={cn('h-6 w-6', isMenuOpen ? 'hidden' : 'block')}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            {/* Close icon */}
                            <svg
                                className={cn('h-6 w-6', isMenuOpen ? 'block' : 'hidden')}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={cn('sm:hidden', isMenuOpen ? 'block' : 'hidden')}>
                <div className="pt-2 pb-3 space-y-1">
                    {navigationLinks.map((link) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "block pl-3 pr-4 py-2 text-base font-medium transition-colors",
                                    isActive
                                        ? "text-blue-600 bg-blue-50 border-r-4 border-blue-600"
                                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                )}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        )
                    })}
                    {!user && (
                        <Link
                            href="/login"
                            className={cn(
                                "block pl-3 pr-4 py-2 text-base font-medium transition-colors",
                                pathname === '/login'
                                    ? "text-blue-600 bg-blue-50 border-r-4 border-blue-600"
                                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            )}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Login
                        </Link>
                    )}
                </div>

                <div className="pt-4 pb-3 border-t border-gray-200">
                    {user ? (
                        <div className="space-y-1">
                            <div className="flex items-center px-4">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                                        <span className="text-sm font-medium text-white">
                                            {user.name?.charAt(0) || 'U'}
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                    onClick={() => {
                                        logout()
                                        setIsMenuOpen(false)
                                    }}
                                >
                                    Sign Out
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            <Link
                                href="/apply"
                                className="block px-4 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Apply for Your Club
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}