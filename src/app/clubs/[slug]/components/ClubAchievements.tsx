'use client'

import { useState } from 'react'
import { IAchievement } from '@/types/interfaces'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trophy, Calendar, Users, Award } from 'lucide-react'
import { getImageUrl } from '@/lib/utils/imageDisplay'
import { useGetAchievementsByClubQuery } from '@/store/api/achievementAPI'

const ClubAchievements = ({ clubId }: { clubId: string }) => {
  const { data: achievementsResponse, isLoading, error } = useGetAchievementsByClubQuery(clubId)
  
  const achievements = achievementsResponse?.data || []

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Club Achievements
          </h3>
          <Badge variant="secondary">Loading...</Badge>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Club Achievements
          </h3>
          <Badge variant="destructive">Error</Badge>
        </div>
        <Card className="border-red-200">
          <CardContent className="p-6 text-center">
            <Trophy className="h-12 w-12 mx-auto text-red-400 mb-4" />
            <p className="text-red-600">Failed to load achievements. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Club Achievements
        </h3>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Award className="h-3 w-3" />
          {achievements.length} Achievement{achievements.length !== 1 ? 's' : ''}
        </Badge>
      </div>
      
      {achievements.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <Trophy className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h4 className="text-lg font-medium text-gray-600 mb-2">No Achievements Yet</h4>
            <p className="text-gray-500">This club hasn't earned any achievements yet. Check back later!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {achievements.map((achievement) => {
            try {
              // Ensure all fields are properly formatted
              const safeAchievement = {
                ...achievement,
                teams: Array.isArray(achievement.teams) 
                  ? achievement.teams.map(team => typeof team === 'string' ? team : team._id || team.name || 'Unknown')
                  : [],
                tags: Array.isArray(achievement.tags) ? achievement.tags : [],
                date: achievement.date ? new Date(achievement.date) : new Date()
              }

              // State for managing selected image
              const AchievementCard = () => {
                const [selectedImageIndex, setSelectedImageIndex] = useState(0)
                
                return (
                  <Card key={safeAchievement._id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                    {/* Achievement Image */}
                    {safeAchievement.images && safeAchievement.images.length > 0 && (
                      <div className="space-y-3">
                        {/* Main Image - Increased Height */}
                        <div className="relative h-64 bg-gradient-to-br from-yellow-50 to-orange-50 overflow-hidden">
                          <img 
                            src={getImageUrl(safeAchievement.images[selectedImageIndex])} 
                            alt={safeAchievement.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                              <Calendar className="h-3 w-3 mr-1" />
                              {safeAchievement.date.toLocaleDateString()}
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Thumbnail Gallery */}
                        {safeAchievement.images.length > 1 && (
                          <div className="px-4 pb-2">
                            <div className="flex gap-2 overflow-x-auto">
                              {safeAchievement.images.map((image, index) => (
                                <button
                                  key={index}
                                  onClick={() => setSelectedImageIndex(index)}
                                  className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                    selectedImageIndex === index 
                                      ? 'border-blue-500 ring-2 ring-blue-200' 
                                      : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                >
                                  <img 
                                    src={getImageUrl(image)} 
                                    alt={`${safeAchievement.title} ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-start gap-2 line-clamp-2">
                      <Trophy className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="flex-1">{safeAchievement.title}</span>
                    </CardTitle>
                    {safeAchievement.subTitle && (
                      <CardDescription className="text-blue-600 font-medium">
                        {safeAchievement.subTitle}
                      </CardDescription>
                    )}
                  </CardHeader>
                  
                  <CardContent className="pt-0 space-y-4">
                    {/* Description */}
                    <div>
                      <p className="text-gray-700 font-medium text-sm line-clamp-2">{safeAchievement.description}</p>
                      {safeAchievement.subDescription && (
                        <p className="text-gray-600 text-xs mt-1 line-clamp-2">{safeAchievement.subDescription}</p>
                      )}
                    </div>
                    
                    {/* Organized By */}
                    {safeAchievement.organizedBy && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-xs text-gray-500 mb-2 uppercase tracking-wide">Organized By</h4>
                        <div className="flex items-center gap-2">
                          {safeAchievement.organizedBy.image && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={getImageUrl(safeAchievement.organizedBy.image)} />
                              <AvatarFallback className="text-xs">{safeAchievement.organizedBy.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{safeAchievement.organizedBy.name}</p>
                            {safeAchievement.organizedBy.title && (
                              <p className="text-xs text-gray-600 truncate">{safeAchievement.organizedBy.title}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Teams */}
                    {safeAchievement.teams && safeAchievement.teams.length > 0 && (
                      <div>
                        <h4 className="font-medium text-xs text-gray-500 mb-2 uppercase tracking-wide flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          Participating Teams
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {safeAchievement.teams.slice(0, 3).map((team, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {team}
                            </Badge>
                          ))}
                          {safeAchievement.teams.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{safeAchievement.teams.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Tags */}
                    {safeAchievement.tags && safeAchievement.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {safeAchievement.tags.slice(0, 4).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {safeAchievement.tags.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{safeAchievement.tags.length - 4}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                  </CardContent>
                </Card>
                )
              }
              
              return <AchievementCard />
            } catch (error) {
              console.error('Error rendering achievement:', achievement._id, error)
              return (
                <Card key={achievement._id} className="overflow-hidden border-red-200">
                  <CardContent className="p-6 text-center">
                    <Trophy className="h-8 w-8 mx-auto text-red-400 mb-2" />
                    <p className="text-red-600 text-sm">Error loading achievement</p>
                    <p className="text-gray-500 text-xs">{achievement.title}</p>
                  </CardContent>
                </Card>
              )
            }
          })}
        </div>
      )}
    </div>
  )
}

export default ClubAchievements