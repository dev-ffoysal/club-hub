'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { SuperAdminLayout } from '../../../components/layout/super-admin-layout'
import { formatDate, formatCurrency } from '../../../lib/utils'
import { Megaphone, Eye, Pause, Play } from 'lucide-react'

// Mock data for advertisements
const mockAdvertisements = [
  {
    id: '1',
    title: 'Programming Bootcamp 2024',
    advertiser: 'TechCorp Bangladesh',
    budget: 50000,
    startDate: new Date('2024-02-15'),
    endDate: new Date('2024-03-15'),
    status: 'active' as const,
    clicks: 1250,
    impressions: 15000,
    targetAudience: 'Computer Science Students',
    adType: 'banner' as const,
    createdAt: new Date('2024-02-10')
  },
  {
    id: '2',
    title: 'University Fair 2024',
    advertiser: 'Education Ministry',
    budget: 75000,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-31'),
    status: 'pending' as const,
    clicks: 0,
    impressions: 0,
    targetAudience: 'All Students',
    adType: 'sponsored_post' as const,
    createdAt: new Date('2024-02-12')
  },
  {
    id: '3',
    title: 'Career Development Workshop',
    advertiser: 'Professional Skills Institute',
    budget: 30000,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-28'),
    status: 'completed' as const,
    clicks: 890,
    impressions: 12000,
    targetAudience: 'Final Year Students',
    adType: 'banner' as const,
    createdAt: new Date('2024-01-25')
  },
  {
    id: '4',
    title: 'Scholarship Program 2024',
    advertiser: 'Global Education Foundation',
    budget: 100000,
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-04-15'),
    status: 'rejected' as const,
    clicks: 0,
    impressions: 0,
    targetAudience: 'Graduate Students',
    adType: 'video' as const,
    createdAt: new Date('2024-02-08')
  }
]

export default function AdvertisementsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const handleApproveAd = (adId: string) => {
    console.log('Approving advertisement:', adId)
  }

  const handleRejectAd = (adId: string) => {
    console.log('Rejecting advertisement:', adId)
  }

  const handlePauseAd = (adId: string) => {
    console.log('Pausing advertisement:', adId)
  }

  const handleViewDetails = (adId: string) => {
    console.log('Viewing advertisement details:', adId)
  }

  const filteredAds = mockAdvertisements.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ad.advertiser.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || ad.status === statusFilter
    const matchesType = typeFilter === 'all' || ad.adType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    total: mockAdvertisements.length,
    active: mockAdvertisements.filter(ad => ad.status === 'active').length,
    pending: mockAdvertisements.filter(ad => ad.status === 'pending').length,
    completed: mockAdvertisements.filter(ad => ad.status === 'completed').length,
    totalRevenue: mockAdvertisements.reduce((sum, ad) => sum + ad.budget, 0),
    totalClicks: mockAdvertisements.reduce((sum, ad) => sum + ad.clicks, 0),
    totalImpressions: mockAdvertisements.reduce((sum, ad) => sum + ad.impressions, 0)
  }

  return (
    <SuperAdminLayout>
      <div className="space-y-6 w-full max-w-none">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Advertisement Management</h1>
            <p className="text-gray-600 mt-2">Review and manage platform advertisements</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">Analytics Report</Button>
            <Button size="sm" className="w-full sm:w-auto">Create Campaign</Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Ads</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-600">{stats.completed}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-600">{formatCurrency(stats.totalRevenue)}</p>
                <p className="text-sm text-gray-600">Revenue</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-purple-600">{stats.totalClicks.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Clicks</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-indigo-600">{stats.totalImpressions.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Impressions</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by title or advertiser..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="banner">Banner</option>
                  <option value="sponsored_post">Sponsored Post</option>
                  <option value="video">Video</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advertisements List */}
        <div className="space-y-4">
          {filteredAds.map((ad) => (
            <Card key={ad.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Megaphone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{ad.title}</h3>
                        <p className="text-gray-600">{ad.advertiser}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={
                          ad.status === 'active' ? 'default' :
                          ad.status === 'pending' ? 'secondary' :
                          ad.status === 'completed' ? 'outline' : 'destructive'
                        }>
                          {ad.status}
                        </Badge>
                        <Badge variant="outline">
                          {ad.adType.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Budget</p>
                        <p className="font-medium">{formatCurrency(ad.budget)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium text-sm">{formatDate(ad.startDate)} - {formatDate(ad.endDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Clicks</p>
                        <p className="font-medium">{ad.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Impressions</p>
                        <p className="font-medium">{ad.impressions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Target Audience</p>
                        <p className="font-medium text-sm">{ad.targetAudience}</p>
                      </div>
                    </div>
                    
                    {ad.clicks > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">Performance</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm font-medium">CTR: {((ad.clicks / ad.impressions) * 100).toFixed(2)}%</span>
                          <span className="text-sm font-medium">CPM: {formatCurrency((ad.budget / ad.impressions) * 1000)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-row lg:flex-col gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 lg:flex-none"
                      onClick={() => handleViewDetails(ad.id)}
                    >
                      <Eye className="w-4 h-4 mr-1" /> Details
                    </Button>
                    
                    {ad.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 flex-1 lg:flex-none"
                          onClick={() => handleApproveAd(ad.id)}
                        >
                          ✓ Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-red-600 border-red-600 hover:bg-red-50 flex-1 lg:flex-none"
                          onClick={() => handleRejectAd(ad.id)}
                        >
                          ✗ Reject
                        </Button>
                      </>
                    )}
                    
                    {ad.status === 'active' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-orange-600 border-orange-600 hover:bg-orange-50 flex-1 lg:flex-none"
                        onClick={() => handlePauseAd(ad.id)}
                      >
                        <Pause className="w-4 h-4 mr-1" /> Pause
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAds.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-500">
                <Megaphone className="w-16 h-16 mb-4 text-blue-600" />
                <h3 className="text-lg font-medium mb-2">No advertisements found</h3>
                <p>Try adjusting your search criteria or filters.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </SuperAdminLayout>
  )
}