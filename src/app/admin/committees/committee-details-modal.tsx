'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../components/ui/dialog'


import { formatDate } from '../../../lib/utils'
import { 
  Shield, 
  Users, 
  Calendar, 
  Crown,
  UserCheck,
  Mail,
  Phone,
  ShieldCheck,
  ShieldOff,
  X
} from 'lucide-react'

// API imports - removed member management functionality
import { ICommitte, MembersItem } from '../../../types/commite'
import { IUser } from '../../../types/interfaces'
import { getImageUrl } from '@/lib/utils/imageDisplay'

interface CommitteeDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  committee: ICommitte | null
}

export function CommitteeDetailsModal({ isOpen, onClose, committee }: CommitteeDetailsModalProps) {


  if (!committee) return null

  // Helper function to get member info
  const getMemberInfo = (member: MembersItem): IUser | null => {
    if (typeof member.member === 'string') {
      return null // We don't have full user info
    }
    return member.member
  }

  // Helper function to get member display name
  const getMemberDisplayName = (member: MembersItem): string => {
    const userInfo = getMemberInfo(member)
    if (userInfo) {
      return userInfo.name || 'Unknown Member'
    }
    return typeof member.member === 'string' ? member.member : 'Unknown Member'
  }

  // Helper function to get member initials
  const getMemberInitials = (member: MembersItem): string => {
    const displayName = getMemberDisplayName(member)
    return displayName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Helper function to get safe image URL


  // Helper function to get position priority for sorting
  const getPositionPriority = (position: string): number => {
    const priorities: { [key: string]: number } = {
      'President': 1,
      'Vice President': 2,
      'General Secretary': 3,
      'Assistant General Secretary': 4,
      'Treasurer': 5,
      'Assistant Treasurer': 6,
      'Organizing Secretary': 7,
      'Assistant Organizing Secretary': 8,
      'Sports Secretary': 9,
      'Cultural Secretary': 10,
      'Publication Secretary': 11,
      'IT Secretary': 12,
      'Public Relations Secretary': 13,
      'Executive Member': 14,
      'Advisor': 15,
      'Other': 16
    }
    return priorities[position] || 99
  }

  // Sort members by position priority
  const sortedMembers = [...committee.members].sort((a, b) => {
    const priorityA = getPositionPriority(a.position)
    const priorityB = getPositionPriority(b.position)
    return priorityA - priorityB
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <div>
                <DialogTitle className="text-xl">Committee Details</DialogTitle>
                <DialogDescription>
                  View committee information and members
                </DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Committee Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Committee Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Term Start</label>
                  <p className="text-sm">{formatDate(committee.from)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Term End</label>
                  <p className="text-sm">{formatDate(committee.to)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <div className="flex items-center space-x-2">
                    <Badge variant={committee.status === 'active' ? 'default' : 'secondary'}>
                      {committee.status === 'active' ? (
                        <ShieldCheck className="w-3 h-3 mr-1" />
                      ) : (
                        <ShieldOff className="w-3 h-3 mr-1" />
                      )}
                      {committee.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Total Members</label>
                  <p className="text-sm">{committee.members.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Members List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Committee Members ({committee.members.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedMembers.map((member, index) => {
                  const userInfo = getMemberInfo(member)
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage 
                            src={getImageUrl(userInfo?.profile)} 
                            alt={getMemberDisplayName(member)} 
                          />
                          <AvatarFallback>
                            {getMemberInitials(member)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-medium">{getMemberDisplayName(member)}</h4>
                            <Badge variant="outline" className="flex items-center space-x-1">
                              {member.position === 'President' && <Crown className="w-3 h-3" />}
                              {member.position !== 'President' && <UserCheck className="w-3 h-3" />}
                              <span>{member.position}</span>
                            </Badge>
                          </div>
                          
                          {userInfo && (
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              {userInfo.email && (
                                <div className="flex items-center space-x-1">
                                  <Mail className="w-3 h-3" />
                                  <span>{userInfo.email}</span>
                                </div>
                              )}
                              {userInfo.phone && (
                                <div className="flex items-center space-x-1">
                                  <Phone className="w-3 h-3" />
                                  <span>{userInfo.phone}</span>
                                </div>
                              )}
                            </div>
                          )}
                          
                          {member.note && (
                            <p className="text-sm text-gray-600 mt-1">{member.note}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}