import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Users, Calendar, Palette, MessageCircle, DollarSign, BarChart3 } from 'lucide-react'
import { Navbar } from '../components/layout/navbar'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-background to-purple-50 dark:from-blue-950 dark:via-background dark:to-purple-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Club Management Hub
              <span className="block text-blue-600">for Universities in Bangladesh</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Empower your university clubs with our comprehensive management platform. 
              Connect students, organize events, and build vibrant campus communities.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="gradient-bg">
                <Link href="/apply">Apply for Your Club</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/clubs">Explore Clubs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything Your Club Needs
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive tools to manage, grow, and engage your university club
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature Cards */}
            <Card className="slide-up hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="rounded-lg bg-blue-100 dark:bg-blue-700/30 p-2">
                    <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">Member Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Generate unique joining codes, manage member activities, and track engagement with comprehensive analytics.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="slide-up hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="rounded-lg bg-green-100 dark:bg-green-700/30 p-2">
                    <Calendar className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl">Event Organization</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create seminars, workshops, and competitions with countdown timers, registration management, and review collection.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="slide-up hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="rounded-lg bg-purple-100 dark:bg-purple-700/30 p-2">
                    <Palette className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-xl">Custom Club Profiles</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Choose from beautiful templates, customize colors, and create shareable club pages that showcase your achievements.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="slide-up hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="rounded-lg bg-yellow-100 dark:bg-yellow-700/30 p-2">
                    <MessageCircle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <CardTitle className="text-xl">Communication Tools</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Private group chats, push notifications, and email campaigns to keep your members engaged and informed.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="slide-up hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="rounded-lg bg-red-100 dark:bg-red-700/30 p-2">
                    <DollarSign className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <CardTitle className="text-xl">Financial Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track club finances, manage budgets, and maintain transparent financial records for your organization.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="slide-up hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="rounded-lg bg-indigo-100 dark:bg-indigo-700/30 p-2">
                    <BarChart3 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <CardTitle className="text-xl">Analytics & Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive analytics on member engagement, event participation, and club performance metrics.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-24 bg-muted/20 dark:bg-muted/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Supporting Universities Across Bangladesh
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Trusted by clubs from leading universities nationwide
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[
              'University of Dhaka',
              'BUET',
              'CUET',
              'RUET',
              'KUET',
              'SUST',
              'Jahangirnagar University',
              'North South University',
              'BRAC University',
              'IUB',
              'AIUB',
              'East West University'
            ].map((university) => (
              <Badge key={university} variant="outline" className="justify-center p-3 text-sm">
                {university}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/95 dark:bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground dark:text-foreground sm:text-4xl">
              Ready to Transform Your Club?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 dark:text-muted-foreground">
              Join hundreds of clubs already using our platform to engage students and organize amazing events.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Button size="lg" variant="secondary">
                <Link href="/apply">Start Your Application</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary dark:text-foreground dark:border-foreground dark:hover:bg-foreground dark:hover:text-background">
                <Link href="/demo">Request Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/95 dark:bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold text-secondary-foreground">Club Management Hub</h3>
              <p className="mt-2 text-secondary-foreground/70">
                Empowering university clubs across Bangladesh with comprehensive management tools.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-secondary-foreground uppercase tracking-wider">Platform</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="/clubs" className="text-secondary-foreground/70 hover:text-secondary-foreground">Browse Clubs</Link></li>
                <li><Link href="/events" className="text-secondary-foreground/70 hover:text-secondary-foreground">Upcoming Events</Link></li>
                <li><Link href="/apply" className="text-secondary-foreground/70 hover:text-secondary-foreground">Apply for Club</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-secondary-foreground uppercase tracking-wider">Support</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="/help" className="text-secondary-foreground/70 hover:text-secondary-foreground">Help Center</Link></li>
                <li><Link href="/contact" className="text-secondary-foreground/70 hover:text-secondary-foreground">Contact Us</Link></li>
                <li><Link href="/privacy" className="text-secondary-foreground/70 hover:text-secondary-foreground">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8">
            <p className="text-center text-secondary-foreground/70">
              © 2024 Club Management Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}