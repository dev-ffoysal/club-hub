'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Button } from '../../../../components/ui/button'
import { Badge } from '../../../../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar'
import { Separator } from '../../../../components/ui/separator'
import { 
  Trophy, 
  X, 
  Calendar, 
  Globe, 
  EyeOff, 
  Tag, 
  User, 
  Mail, 
  Phone, 
  Globe as Website,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Share2,
  ExternalLink
} from 'lucide-react'
import { IAchievement } from '../../../../types/interfaces'
import { formatDate } from '../../../../lib/utils'
import { getImageUrl } from '../../../../lib/utils/imageDisplay'

interface AchievementDetailsModalProps {
  achievement: IAchievement
  onClose: () => void
  onEdit?: (achievement: IAchievement) => void
  onDelete?: (achievementId: string) => void
}

export function AchievementDetailsModal({ 
  achievement, 
  onClose, 
  onEdit, 
  onDelete 
}: AchievementDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handlePreviousImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? achievement.images.length - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === achievement.images.length - 1 ? 0 : prev + 1
    )
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit(achievement)
    }
    onClose()
  }

  const handleDelete = () => {
    if (onDelete && confirm('Are you sure you want to delete this achievement? This action cannot be undone.')) {
      onDelete(achievement._id)
      onClose()
    }
  }

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share achievement:', achievement._id)
  }

  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log('Download achievement:', achievement._id)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-600" />
              <div>
                <h2 className="text-2xl font-bold">{achievement.title}</h2>
                <p className="text-gray-600">{achievement.subTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">

              <Button variant="ghost" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Status and Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Achievement Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Date:</span>
                    <span>{formatDate(achievement.date)}</span>
                  </div>
                  
                  {achievement.club && (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">Club:</span>
                      <span>{typeof achievement.club === 'string' ? achievement.club : achievement.club.clubName || achievement.club.name || 'Unknown Club'}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">ID:</span>
                    <span className="font-mono text-xs">{achievement._id}</span>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                   <Button variant="outline" size="sm" onClick={handleShare}>
                     <Share2 className="w-4 h-4 mr-2" />
                     Share
                   </Button>
               
                   <Button variant="outline" size="sm" onClick={handleEdit}>
                     <Edit className="w-4 h-4 mr-2" />
                     Edit
                   </Button>
                   <Button variant="outline" size="sm" onClick={handleDelete} className="text-red-600 hover:text-red-700">
                     <Trash2 className="w-4 h-4 mr-2" />
                     Delete
                   </Button>
                 </div>
               </CardContent>
             </Card>

            {/* Images Gallery */}
            {achievement.images.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={getImageUrl(achievement.images[currentImageIndex])}
                        alt={`Achievement image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {achievement.images.length > 1 && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                          onClick={handlePreviousImage}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                          onClick={handleNextImage}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                        
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                          {currentImageIndex + 1} / {achievement.images.length}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {achievement.images.length > 1 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto">
                      {achievement.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                            index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                          }`}
                        >
                          <img
                            src={getImageUrl(image)}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Main Description</h4>
                  <p className="text-gray-700 leading-relaxed">{achievement.description}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Additional Details</h4>
                  <p className="text-gray-700 leading-relaxed">{achievement.subDescription}</p>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            {achievement.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {achievement.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Event Association */}
            {achievement.event && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Associated Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Event ID: {achievement.event}</p>
                        <p className="text-sm text-gray-600">This achievement is linked to an event</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Event
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Organizer Information */}
            {achievement.organizedBy && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Organized By
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={achievement.organizedBy.image} alt={achievement.organizedBy.name} />
                        <AvatarFallback>
                          {achievement.organizedBy.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{achievement.organizedBy.name}</h4>
                        <p className="text-blue-600 font-medium">{achievement.organizedBy.title}</p>
                        {achievement.organizedBy.description && (
                          <p className="text-gray-600 mt-2">{achievement.organizedBy.description}</p>
                        )}
                      </div>
                    </div>

                    {/* Contact Information */}
                    {(achievement.organizedBy.email || achievement.organizedBy.phone || achievement.organizedBy.website) && (
                      <div className="border-t pt-4">
                        <h5 className="font-medium mb-3">Contact Information</h5>
                        <div className="space-y-2">
                          {achievement.organizedBy.email && (
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-4 h-4 text-gray-500" />
                              <a href={`mailto:${achievement.organizedBy.email}`} className="text-blue-600 hover:underline">
                                {achievement.organizedBy.email}
                              </a>
                            </div>
                          )}
                          {achievement.organizedBy.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <a href={`tel:${achievement.organizedBy.phone}`} className="text-blue-600 hover:underline">
                                {achievement.organizedBy.phone}
                              </a>
                            </div>
                          )}
                          {achievement.organizedBy.website && (
                            <div className="flex items-center gap-2 text-sm">
                              <Website className="w-4 h-4 text-gray-500" />
                              <a 
                                href={achievement.organizedBy.website} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-600 hover:underline"
                              >
                                {achievement.organizedBy.website}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Team Members */}
            {achievement.teams && achievement.teams.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Team Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievement.teams.map((team, index) => {
                      // Handle both string IDs and user objects
                      // Add type guard to ensure we're handling objects correctly
                      if (typeof team === 'string' || team === null || team === undefined) {
                        const teamId = String(team || 'Unknown ID');
                        return (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback>
                                <User className="w-5 h-5" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">Team Member</p>
                              <p className="text-xs text-gray-600 font-mono">ID: {teamId}</p>
                            </div>
                          </div>
                        )
                      } else if (team && typeof team === 'object' && '_id' in team) {
                        // Handle user object - ensure we only access safe properties
                        const userTeam = team as any; // Type assertion for user object
                        return (
                          <div key={userTeam._id || index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback>
                                {userTeam.name ? String(userTeam.name).charAt(0).toUpperCase() : 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{String(userTeam.name || 'Unknown User')}</p>
                              <p className="text-xs text-gray-600">{String(userTeam.email || 'No email provided')}</p>
                              {userTeam.role && (
                                <Badge variant="outline" className="text-xs mt-1">
                                  {String(userTeam.role)}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )
                      } else {
                        // Fallback for unexpected data types
                        return (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback>
                                <User className="w-5 h-5" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">Team Member</p>
                              <p className="text-xs text-gray-600 font-mono">Invalid data type</p>
                            </div>
                          </div>
                        )
                      }
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

           
          </div>
        </div>
      </div>
    </div>
  )
}