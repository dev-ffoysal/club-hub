import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Navbar } from '../../components/layout/navbar'
import Link from 'next/link'

// Mock data - replace with actual API calls
const mockClubs = [
  {
    id: '1',
    name: 'Computer Science Club',
    slug: 'computer-science-club',
    description: 'Fostering innovation and technical excellence in computer science',
    university: 'University of Dhaka',
    memberCount: 156,
    logo: '/clubs/cs-club-logo.jpg',
    coverImage: '/clubs/cs-club-cover.jpg',
    tags: ['Technology', 'Programming', 'Innovation'],
    isPublic: true,
    template: 'modern' as const,
    achievements: [
      { title: 'National Programming Contest Winner 2023', date: new Date('2023-12-15') }
    ]
  },
  {
    id: '2',
    name: 'Business Club',
    slug: 'business-club',
    description: 'Developing future business leaders and entrepreneurs',
    university: 'North South University',
    memberCount: 89,
    logo: '/clubs/business-club-logo.jpg',
    coverImage: '/clubs/business-club-cover.jpg',
    tags: ['Business', 'Entrepreneurship', 'Leadership'],
    isPublic: true,
    template: 'classic' as const,
    achievements: [
      { title: 'Best Business Plan Competition 2023', date: new Date('2023-11-20') }
    ]
  },
  {
    id: '3',
    name: 'Photography Club',
    slug: 'photography-club',
    description: 'Capturing moments and creating visual stories',
    university: 'BRAC University',
    memberCount: 67,
    logo: '/clubs/photo-club-logo.jpg',
    coverImage: '/clubs/photo-club-cover.jpg',
    tags: ['Photography', 'Art', 'Creative'],
    isPublic: true,
    template: 'vibrant' as const,
    achievements: [
      { title: 'Inter-University Photo Exhibition 2023', date: new Date('2023-10-10') }
    ]
  },
  {
    id: '4',
    name: 'Debate Society',
    slug: 'debate-society',
    description: 'Enhancing critical thinking and public speaking skills',
    university: 'BUET',
    memberCount: 134,
    logo: '/clubs/debate-club-logo.jpg',
    coverImage: '/clubs/debate-club-cover.jpg',
    tags: ['Debate', 'Public Speaking', 'Critical Thinking'],
    isPublic: true,
    template: 'academic' as const,
    achievements: [
      { title: 'National Debate Championship 2023', date: new Date('2023-09-25') }
    ]
  },
  {
    id: '5',
    name: 'Environmental Club',
    slug: 'environmental-club',
    description: 'Promoting environmental awareness and sustainability',
    university: 'Jahangirnagar University',
    memberCount: 92,
    logo: '/clubs/env-club-logo.jpg',
    coverImage: '/clubs/env-club-cover.jpg',
    tags: ['Environment', 'Sustainability', 'Green'],
    isPublic: true,
    template: 'minimal' as const,
    achievements: [
      { title: 'Campus Green Initiative Award 2023', date: new Date('2023-08-15') }
    ]
  },
  {
    id: '6',
    name: 'Music Club',
    slug: 'music-club',
    description: 'Celebrating musical talent and cultural diversity',
    university: 'East West University',
    memberCount: 78,
    logo: '/clubs/music-club-logo.jpg',
    coverImage: '/clubs/music-club-cover.jpg',
    tags: ['Music', 'Culture', 'Performance'],
    isPublic: true,
    template: 'vibrant' as const,
    achievements: [
      { title: 'Inter-University Music Festival Winner 2023', date: new Date('2023-07-30') }
    ]
  }
]

export default function ClubsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            University Clubs
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover and join amazing clubs from universities across Bangladesh
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search clubs by name, university, or tags..."
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">All Universities</Button>
            <Button variant="outline">All Categories</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{mockClubs.length}</div>
              <div className="text-sm text-gray-600">Active Clubs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600">
                {mockClubs.reduce((sum, club) => sum + club.memberCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600">
                {new Set(mockClubs.map(club => club.university)).size}
              </div>
              <div className="text-sm text-gray-600">Universities</div>
            </CardContent>
          </Card>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockClubs.map((club) => (
            <Card key={club.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              {/* Cover Image */}
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-800">
                        {club.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{club.name}</h3>
                      <p className="text-blue-100 text-sm">{club.university}</p>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <CardDescription className="mb-4 line-clamp-2">
                  {club.description}
                </CardDescription>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {club.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <span className="mr-1">👥</span>
                      {club.memberCount} members
                    </span>
                  </div>
                  <Badge variant="success" className="text-xs">
                    Active
                  </Badge>
                </div>

                {/* Recent Achievement */}
                {club.achievements.length > 0 && (
                  <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-600">🏆</span>
                      <span className="text-sm font-medium text-yellow-800">
                        Latest Achievement
                      </span>
                    </div>
                    <p className="text-xs text-yellow-700 mt-1">
                      {club.achievements[0].title}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button asChild className="flex-1">
                    <Link href={`/clubs/${club.slug}`}>
                      View Club
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    Join
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Load More Clubs
          </Button>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Don't see your club?</h2>
          <p className="text-blue-100 mb-6">
            Apply to get your university club featured on our platform and start managing your community effectively.
          </p>
          <Button size="lg" variant="secondary">
            <Link href="/apply">Apply for Your Club</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}