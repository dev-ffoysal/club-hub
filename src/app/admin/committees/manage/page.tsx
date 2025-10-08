'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Button } from '../../../../components/ui/button'
import { Badge } from '../../../../components/ui/badge'
import { Input } from '../../../../components/ui/input'
import { Label } from '../../../../components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../../components/ui/dialog'
import { Textarea } from '../../../../components/ui/textarea'
import { ClubAdminLayout } from '../../../../components/layout/club-admin-layout'
import toast from 'react-hot-toast'
import { 
  Users, 
  Calendar, 

  UserPlus,
  Crown,

  Loader2,
  Search,
  X,
  Save,
  ArrowRight,
  ArrowLeft,

} from 'lucide-react'

// API imports

import { useCreateCommitteeMutation, useGetCommitteeByIdQuery, useUpdateCommitteeMutation } from '../../../../store/api/committeeAPI'
import { CLUB_REGISTRATION_STATUS, IUser } from '../../../../types/interfaces'
import { getImageUrl } from '../../../../lib/utils/imageDisplay'
import { useGetClubRegistrationsQuery } from '@/store/api/clubRegistrationAPI'

// Committee positions
const COMMITTEE_POSITIONS = [
  'President',
  'Vice President',
  'General Secretary',
  'Assistant General Secretary',
  'Treasurer',
  'Assistant Treasurer',
  'Organizing Secretary',
  'Assistant Organizing Secretary',
  'Sports Secretary',
  'Cultural Secretary',
  'Publication Secretary',
  'IT Secretary',
  'Public Relations Secretary',
  'Executive Member',
  'Advisor',
  'Other'
]

interface AssignedMember {
  user: IUser
  role: string
  note?: string
}

interface AssignRoleModalProps {
  isOpen: boolean
  onClose: () => void
  user: IUser | null
  onAssign: (role: string, note?: string) => void
}

function AssignRoleModal({ isOpen, onClose, user, onAssign }: AssignRoleModalProps) {
  const [selectedRole, setSelectedRole] = useState('')
  const [note, setNote] = useState('')

  const handleAssign = () => {
    if (!selectedRole) return
    onAssign(selectedRole, note || undefined)
    setSelectedRole('')
    setNote('')
    onClose()
  }

  const handleClose = () => {
    setSelectedRole('')
    setNote('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Assign Role to {user?.name}
          </DialogTitle>
          <DialogDescription>
            Select a role and add an optional note for this committee member.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {COMMITTEE_POSITIONS.map((position) => (
                  <SelectItem key={position} value={position}>
                    {position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Textarea
              id="note"
              placeholder="Add any additional notes about this member's role..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={!selectedRole}>
            <UserPlus className="w-4 h-4 mr-2" />
            Assign Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function CommitteeManagePage() {
  const searchParams = useSearchParams()
  const committeeId = searchParams.get('id')
  const isEditMode = !!committeeId
  
  // State management
  const [searchTerm, setSearchTerm] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [assignedMembers, setAssignedMembers] = useState<AssignedMember[]>([])
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  
  // API hooks
  const { data: registrationsData, isLoading: usersLoading } = useGetClubRegistrationsQuery({
    status: CLUB_REGISTRATION_STATUS.APPROVED,
    limit: 1000
  })
  const { data: committeeData, isLoading: committeeLoading } = useGetCommitteeByIdQuery(
    committeeId!,
    { skip: !isEditMode }
  )
  const [createCommittee, { isLoading: isCreating }] = useCreateCommitteeMutation()
  const [updateCommittee, { isLoading: isUpdating }] = useUpdateCommitteeMutation()

  // Extract users from registration data
  const users = registrationsData?.data?.data?.map(registration => registration.member) || []

  // Helper functions
  const getUserDisplayName = (user: IUser): string => {
    return user.name || user.email || 'Unknown User'
  }
  
  const getUserInitials = (user: IUser): string => {
    const name = getUserDisplayName(user)
    return name
      .split(' ')
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  
  const getSafeImageUrl = (profile: string | File | undefined): string => {
    if (!profile) return ''
    if (typeof profile === 'string') {
      return getImageUrl(profile)
    }
    if (profile instanceof File) {
      return URL.createObjectURL(profile)
    }
    return ''
  }

  // Effect to populate form when editing
  useEffect(() => {
    if (isEditMode && committeeData?.data) {
      const committee = committeeData.data
      console.log('Committee data:', committee) // Debug log
      
      setStartDate(new Date(committee.from).toISOString().split('T')[0])
      setEndDate(new Date(committee.to).toISOString().split('T')[0])
      
      // Convert committee members to AssignedMember format
      if (committee.members && Array.isArray(committee.members)) {
        const members: AssignedMember[] = committee.members
          .filter(member => {
            // Handle both populated and non-populated member objects
            return member.member && (typeof member.member === 'object' || typeof member.member === 'string')
          })
          .map(member => {
            // If member is a string (ID), we need to handle it differently
            if (typeof member.member === 'string') {
              // For now, create a placeholder user object - this should be handled by proper population in the API
              return {
                user: { _id: member.member, name: 'Loading...', email: '' } as IUser,
                role: member.position,
                note: member.note
              }
            } else {
              // Member is already populated
              return {
                user: member.member as IUser,
                role: member.position,
                note: member.note
              }
            }
          })
        
        console.log('Mapped members:', members) // Debug log
        setAssignedMembers(members)
      } else {
        console.log('No members found or members is not an array') // Debug log
        setAssignedMembers([])
      }
    }
  }, [isEditMode, committeeData])
  
  // Filter available users (not already assigned)
  const availableUsers = useMemo(() => {
    const assignedUserIds = assignedMembers.map(member => member.user._id)
    return users.filter(user => 
      !assignedUserIds.includes(user._id) &&
      getUserDisplayName(user).toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [users, assignedMembers, searchTerm])
  
  // Handle role assignment
  const handleAssignRole = (role: string, note?: string) => {
    if (!selectedUser) return
    
    setAssignedMembers(prev => [...prev, {
      user: selectedUser,
      role,
      note
    }])
    
    toast.success(`${getUserDisplayName(selectedUser)} has been assigned as ${role}`)
  }
  
  // Handle removing assigned member
  const handleRemoveMember = (userId: string) => {
    setAssignedMembers(prev => prev.filter(member => member.user._id !== userId))
    toast.success("Member has been removed from the committee")
  }
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates")
      return
    }
    
    if (assignedMembers.length === 0) {
      toast.error("Please assign at least one member to the committee")
      return
    }
    
    try {
      const committeeData = {
        from: startDate,
        to: endDate,
        members: assignedMembers.map(member => ({
          member: member.user._id,
          position: member.role,
          note: member.note
        }))
      }
      
      if (isEditMode && committeeId) {
        await updateCommittee({ committeeId, data: committeeData }).unwrap()
        
        toast.success("The committee has been successfully updated")
      } else {
        await createCommittee(committeeData).unwrap()
        
        toast.success("The committee has been successfully created")
        
        // Reset form only for create mode
        setStartDate('')
        setEndDate('')
        setAssignedMembers([])
      }
      
    } catch (error: any) {
      toast.error(error?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} committee. Please try again.`)
    }
  }
  
  return (
    <ClubAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/admin/committees" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Committees
                </Link>
              </Button>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isEditMode ? 'Edit Committee' : 'Committee Management'}
            </h1>
            <p className="text-muted-foreground">
              {isEditMode 
                ? 'Update committee information and manage member assignments'
                : 'Create and manage committees by assigning roles to members'
              }
            </p>
          </div>
        </div>
        
        {/* Committee Timeline Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Committee Timeline
            </CardTitle>
            <CardDescription>
              Set the duration for this committee
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Assigned Members Section */}
        {assignedMembers.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                {isEditMode ? 'Current Committee Members' : 'Committee Members'} ({assignedMembers.length})
              </CardTitle>
              <CardDescription>
                {isEditMode 
                  ? 'Current members of this committee - you can remove members or change their roles'
                  : 'Members assigned to this committee'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assignedMembers.map((member) => (
                  <div key={member.user._id} className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage 
                          src={getSafeImageUrl(member.user.profile)} 
                          alt={getUserDisplayName(member.user)} 
                        />
                        <AvatarFallback>
                          {getUserInitials(member.user)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{getUserDisplayName(member.user)}</p>
                        <Badge variant="secondary" className="text-xs">
                          {member.role}
                        </Badge>
                        {member.note && (
                          <p className="text-xs text-muted-foreground mt-1">{member.note}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveMember(member.user._id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Available Members Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              {isEditMode ? 'Available Members to Add' : 'Available Members'}
            </CardTitle>
            <CardDescription>
              {isEditMode 
                ? 'Add new members to the committee by selecting from available club members'
                : 'Select members to assign roles in the committee'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Members List */}
            {usersLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                Loading members...
              </div>
            ) : availableUsers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? 'No members found matching your search' : 'No available members'}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableUsers.map((user: IUser) => (
                  <div key={user._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage 
                          src={getSafeImageUrl(user.profile)} 
                          alt={getUserDisplayName(user)} 
                        />
                        <AvatarFallback>
                          {getUserInitials(user)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{getUserDisplayName(user)}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user)
                        setShowAssignModal(true)
                      }}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Assign Role
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmit} 
            disabled={isCreating || isUpdating || assignedMembers.length === 0 || !startDate || !endDate}
            size="lg"
          >
            {(isCreating || isUpdating) ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isEditMode ? 'Update Committee' : 'Create Committee'}
          </Button>
        </div>
      </div>
      
      {/* Assign Role Modal */}
      <AssignRoleModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        user={selectedUser}
        onAssign={handleAssignRole}
      />
    </ClubAdminLayout>
  )
}