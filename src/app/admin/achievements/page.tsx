'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { ClubAdminLayout } from '../../../components/layout/club-admin-layout'
import { AchievementDetailsModal } from './components/AchievementDetailsModal'
import { formatDate } from '../../../lib/utils'
import { 
  useGetAchievementsQuery, 
  useDeleteAchievementMutation,

} from '../../../store/api/achievementAPI'
import { Trophy, Plus, Edit, Trash2, Eye, Calendar, Star,  Search,  } from 'lucide-react'
import { IAchievement } from '../../../types/interfaces'
import { getImageUrl } from '@/lib/utils/imageDisplay'



export default function AchievementsPage() {
  const router = useRouter()
  const [selectedAchievement, setSelectedAchievement] = useState<IAchievement | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(12) // Fixed page size

  // API hooks - simplified to only include pagination
  const { data, error, isLoading, refetch } = useGetAchievementsQuery({
    page: currentPage,
    limit: pageSize
  })
  const [deleteAchievement] = useDeleteAchievementMutation()

  // Ensure achievements is always an array, fallback to empty array if API fails
  const achievements = data?.data?.data || []
  const totalCount = data?.data?.meta?.total || 0



  // Filter achievements based on search term
  const filteredAchievements = achievements.filter(achievement =>
    achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    achievement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    achievement.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleDeleteAchievement = async (id: string) => {
    try {
      await deleteAchievement(id).unwrap()
      refetch() // Refresh the achievements list
    } catch (error) {
      console.error('Failed to delete achievement:', error)
    }
  }

  const handleViewDetails = (id: string) => {
    const achievement = achievements.find(a => a._id === id)
    if (achievement) {
      setSelectedAchievement(achievement)
      setShowDetailsModal(true)
    }
  }

  const handleEditAchievement = (id: string) => {
    router.push(`/admin/achievements/create?id=${id}`)
  }



  const handleCreateNew = () => {
    router.push('/admin/achievements/create')
  }

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false)
    setSelectedAchievement(null)
  }

  return (
    <ClubAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
            <p className="text-gray-600 mt-1">Manage and showcase your club's achievements</p>
          </div>
          <Button 
            onClick={handleCreateNew}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Create Achievement
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search achievements by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-3xl font-bold text-blue-600">{totalCount}</p>
                </div>
                <Trophy className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Year</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {achievements.filter(a => new Date(a.date).getFullYear() === new Date().getFullYear()).length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Recent</p>
                  <p className="text-3xl font-bold text-green-600">
                    {achievements.filter(a => {
                      const achievementDate = new Date(a.date)
                      const thirtyDaysAgo = new Date()
                      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                      return achievementDate >= thirtyDaysAgo
                    }).length}
                  </p>
                </div>
                <Star className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements List */}
        <div className="mt-6">
          <AchievementsList 
            achievements={filteredAchievements}
            isLoading={isLoading}
            error={error}
            onEdit={handleEditAchievement}
            onDelete={handleDeleteAchievement}
            onViewDetails={handleViewDetails}
          />
        </div>

        {/* Pagination */}
        {data?.meta?.page && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, data?.meta?.total || 0)} of {data?.meta?.total || 0} achievements
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, data?.meta?.totalPages || 1) }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(data?.meta?.totalPages || 1, prev + 1))}
                disabled={currentPage === data?.meta?.totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>



      {showDetailsModal && selectedAchievement && (
        <AchievementDetailsModal
          achievement={selectedAchievement}
          onClose={handleCloseDetailsModal}
          onEdit={(achievement) => handleEditAchievement(achievement._id)}
          onDelete={handleDeleteAchievement}
        />
      )}
    </ClubAdminLayout>
  )
}

// Achievements List Component
interface AchievementsListProps {
  achievements: IAchievement[]
  isLoading: boolean
  error: any
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onViewDetails: (id: string) => void
}

function AchievementsList({ achievements, isLoading, error, onEdit, onDelete, onViewDetails }: AchievementsListProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading achievements...</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="text-red-500 mb-4">
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Error loading achievements</h3>
            <p>Please try again later.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (achievements.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No achievements yet</h3>
          <p className="text-gray-500 mb-4">Start by adding your first achievement to showcase your club's success.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {achievements.map((achievement) => (
        <Card key={achievement._id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-video relative bg-gray-100">
             {achievement.images && achievement.images.length > 0 ? (
               <img
                 src={getImageUrl(achievement.images[0])}
                 alt={achievement.title}
                 className="w-full h-full object-cover"
               />
             ) : (
               <div className="w-full h-full flex items-center justify-center">
                 
                 <Trophy className="w-12 h-12 text-gray-400" />
               </div>
             )}
           </div>
          
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg line-clamp-2">{achievement.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-1">{achievement.subTitle}</p>
              <p className="text-sm text-gray-500 line-clamp-2">{achievement.description}</p>
              
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                {formatDate(achievement.date)}
              </div>
              
              {achievement.tags && achievement.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {achievement.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {achievement.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{achievement.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 mt-4 pt-4 border-t">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onViewDetails(achievement._id)}
                className="flex-1"
              >
                <Eye className="w-3 h-3 mr-1" />
                View
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(achievement._id)}
                className="flex-1"
              >
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete "${achievement.title}"? This action cannot be undone.`)) {
                    onDelete(achievement._id)
                  }
                }}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}