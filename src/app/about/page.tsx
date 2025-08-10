import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Navbar } from '../../components/layout/navbar'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              About
              <span className="block text-blue-600">Club Management Hub</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              We're revolutionizing how university clubs operate in Bangladesh, creating a unified platform 
              that empowers student organizations to thrive, connect, and make lasting impact on campus communities.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <Card className="slide-up hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  To democratize club management by providing accessible, comprehensive tools that enable 
                  every university club in Bangladesh to organize effectively, engage meaningfully with 
                  their members, and create memorable experiences that foster personal and professional growth.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="slide-up hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="rounded-lg bg-purple-100 p-3">
                    <span className="text-3xl">🌟</span>
                  </div>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  To become the cornerstone of student life in Bangladeshi universities, where every club 
                  has the tools to flourish, every student finds their community, and campus culture 
                  thrives through organized, impactful student activities.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Story
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Born from the challenges faced by student organizations across Bangladesh
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="slide-up hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-center">
                  <div className="mx-auto rounded-lg bg-red-100 p-3 w-16 h-16 flex items-center justify-center">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <CardTitle className="text-xl mt-4">The Problem</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  University clubs struggled with fragmented tools, poor communication, 
                  and lack of proper management systems, leading to decreased student engagement 
                  and missed opportunities for growth.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="slide-up hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-center">
                  <div className="mx-auto rounded-lg bg-yellow-100 p-3 w-16 h-16 flex items-center justify-center">
                    <span className="text-2xl">💡</span>
                  </div>
                  <CardTitle className="text-xl mt-4">The Solution</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  We developed a comprehensive platform that brings together all essential 
                  club management tools in one place, designed specifically for the unique 
                  needs of Bangladeshi university culture.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="slide-up hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-center">
                  <div className="mx-auto rounded-lg bg-green-100 p-3 w-16 h-16 flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <CardTitle className="text-xl mt-4">The Impact</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Today, hundreds of clubs across Bangladesh use our platform to engage 
                  thousands of students, organize impactful events, and build stronger 
                  campus communities than ever before.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto rounded-lg bg-blue-100 p-4 w-20 h-20 flex items-center justify-center mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community First</h3>
              <p className="text-gray-600">
                We prioritize the needs of student communities and work to strengthen 
                the bonds that make university life meaningful.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto rounded-lg bg-green-100 p-4 w-20 h-20 flex items-center justify-center mb-4">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Empowerment</h3>
              <p className="text-gray-600">
                We believe in empowering students with the tools and knowledge 
                they need to lead, organize, and create positive change.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto rounded-lg bg-purple-100 p-4 w-20 h-20 flex items-center justify-center mb-4">
                <span className="text-3xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Simplicity</h3>
              <p className="text-gray-600">
                We design intuitive, user-friendly solutions that anyone can use, 
                regardless of their technical background.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto rounded-lg bg-yellow-100 p-4 w-20 h-20 flex items-center justify-center mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Continuous Growth</h3>
              <p className="text-gray-600">
                We're committed to constantly improving our platform based on 
                user feedback and evolving needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Built by Students, for Students
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our team understands the challenges because we've lived them
            </p>
          </div>

          <Card className="slide-up hover:shadow-lg transition-shadow max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="mx-auto rounded-lg bg-indigo-100 p-4 w-24 h-24 flex items-center justify-center mb-6">
                  <span className="text-4xl">👥</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Development Team</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We are a passionate team of current and former university students from across Bangladesh 
                  who have experienced firsthand the challenges of managing student organizations. Our diverse 
                  backgrounds in computer science, business, and student leadership give us unique insights 
                  into what clubs really need to succeed.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  <Badge variant="outline" className="text-sm">Software Engineering</Badge>
                  <Badge variant="outline" className="text-sm">UI/UX Design</Badge>
                  <Badge variant="outline" className="text-sm">Student Leadership</Badge>
                  <Badge variant="outline" className="text-sm">Event Management</Badge>
                  <Badge variant="outline" className="text-sm">Community Building</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Impact in Numbers
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Growing stronger every day with our community
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Active Clubs</div>
              <div className="text-gray-600">Across Bangladesh</div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">50,000+</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Students Engaged</div>
              <div className="text-gray-600">Monthly active users</div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">10,000+</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Events Organized</div>
              <div className="text-gray-600">Since our launch</div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">50+</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Universities</div>
              <div className="text-gray-600">Partner institutions</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Join Our Community?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Be part of the movement that's transforming student life in Bangladesh.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Button size="lg" variant="secondary">
                <Link href="/apply">Apply for Your Club</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                <Link href="/clubs">Explore Clubs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}