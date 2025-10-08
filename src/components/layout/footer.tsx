'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart, ExternalLink } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Clubs', href: '/clubs' },
    { name: 'Apply', href: '/apply' },
  ]

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Support', href: '/support' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ]

  const universities = [
    'University of Dhaka',
    'BUET',
    'North South University',
    'BRAC University',
    'Independent University',
    'American International University'
  ]

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CH</span>
              </div>
              <span className="font-bold text-xl text-foreground">Club Hub</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Connecting university students across Bangladesh through clubs, events, and meaningful experiences. Join the largest student community platform.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>support@clubhub.edu.bd</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+880 1700-000000</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Get the latest updates about events, clubs, and opportunities.
            </p>
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="text-sm"
              />
              <Button size="sm" className="w-full">
                Subscribe
              </Button>
            </div>
            <div className="pt-2">
              <h4 className="font-medium text-sm text-foreground mb-2">Partner Universities</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                {universities.slice(0, 3).map((uni) => (
                  <div key={uni}>{uni}</div>
                ))}
                <div className="text-primary cursor-pointer hover:underline">
                  +{universities.length - 3} more universities
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom section */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>© {currentYear} Club Hub. All rights reserved.</span>
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>in Bangladesh</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  )
}