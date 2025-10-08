'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../components/ui/dialog'
import { ClubAdminLayout } from '../../../components/layout/club-admin-layout'
import { formatDate } from '../../../lib/utils'

import { 
  Shield, 
  Users, 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  ShieldCheck,
  ShieldOff,
  Crown,
  UserCheck,
  Clock,
  Loader2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

// API imports
import { 
  useGetCommitteesQuery,
  useToggleCommitteeStatusMutation
} from '../../../store/api/committeeAPI'
import { ICommitte, MembersItem } from '../../../types/commite'
import { CommitteeDetailsModal } from './committee-details-modal'
import { IUser } from '@/types'
import toast from 'react-hot-toast'

export default function CommitteesPage() {

  
  // State management
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [yearFilter, setYearFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedCommittee, setSelectedCommittee] = useState<ICommitte | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  // API queries
  const { 
    data: committeesData, 
    isLoading: committeesLoading, 
    error: committeesError 
  } = useGetCommitteesQuery({
    page: currentPage,
    limit: 10,
    searchTerm: searchTerm || undefined,
    status: statusFilter === 'all' ? undefined : statusFilter,
    year: yearFilter === 'all' ? undefined : parseInt(yearFilter),
  })

  // API mutations
  const [toggleCommitteeStatus, { isLoading: isTogglingStatus }] = useToggleCommitteeStatusMutation()

  // Computed values
  const committees = committeesData?.data || []
  console.log(committees)
  const totalPages = committeesData?.meta?.totalPages || 1

  // Generate year options for filter
  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - i)

  // Event handlers
  const handleViewDetails = (committee: ICommitte) => {
    setSelectedCommittee(committee)
    setShowDetailsModal(true)
  }

  const handleEditCommittee = (committee: ICommitte) => {
    setSelectedCommittee(committee)
    // setShowCreateForm(true)
    // Navigate to the edit page instead
    window.location.href = `/admin/committees/manage?id=${committee._id}`
  }

  const handleStatusChange = (committee: ICommitte) => {
    setSelectedCommittee(committee)
    setShowConfirmDialog(true)
  }

  const confirmStatusChange = async () => {
    if (!selectedCommittee) return

    try {
      await toggleCommitteeStatus(selectedCommittee._id).unwrap()
      const newStatus = selectedCommittee.status === 'active' ? 'inactive' : 'active'
      toast.success(`Committee ${newStatus === 'active' ? 'Activated' : 'Deactivated'}`, {
        duration: 3000,
      })
    } catch (error) {
      toast.error('Failed to change committee status. Please try again.', {
        duration: 3000,
      })
    } finally {
      setShowConfirmDialog(false)
      setSelectedCommittee(null)
    }
  }



  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false)
    setSelectedCommittee(null)
  }

  // Loading state
  if (committeesLoading && currentPage === 1) {
    return (
      <ClubAdminLayout>
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              <p className="mt-2">Loading committees...</p>
            </CardContent>
          </Card>
        </div>
      </ClubAdminLayout>
    )
  }

  // Error state
  if (committeesError) {
    return (
      <ClubAdminLayout>
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-red-600">Error loading committees. Please try again.</p>
            </CardContent>
          </Card>
        </div>
      </ClubAdminLayout>
    )
  }

  return (
    <ClubAdminLayout>
      <div className="mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Committee Management</h1>
            <p className="text-gray-600 mt-1">Manage club committees and member positions</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild className="flex items-center gap-2">
              <Link href="/admin/committees/manage">
                <Plus className="w-4 h-4" />
                Create New Committee
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search committees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={(value: 'all' | 'active' | 'inactive') => setStatusFilter(value)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {yearOptions.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Committees List */}
        <Card>
          <CardHeader>
            <CardTitle>Committees</CardTitle>
            <CardDescription>
              Manage your club committees and their members
            </CardDescription>
          </CardHeader>
          <CardContent>
            {committeesLoading ? (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                <p className="mt-2">Loading committees...</p>
              </div>
            ) : committees?.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No committees found</p>
                <Button asChild className="mt-4">
                  <Link href="/admin/committees/manage">
                    Create Your First Committee
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {committees?.map((committee: ICommitte) => (
                  <div key={committee._id} className="border border-border rounded-lg p-4 hover:bg-muted">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">
                            Committee {new Date(committee.from).getFullYear()}-{new Date(committee.to).getFullYear()}
                          </h3>
                          <Badge variant={committee.status === 'active' ? 'default' : 'secondary'}>
                            {committee.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(committee.from)} - {formatDate(committee.to)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{committee.members.length} members</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-2">
                            {committee.members.slice(0, 3).map((member: MembersItem, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {typeof member.member === 'string' ? member.member : member.member.name} - {member.position}
                              </Badge>
                            ))}
                            {committee.members.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{committee.members.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(committee)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCommittee(committee)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        {committee.status === 'active' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(committee)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <ShieldOff className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(committee)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedCommittee?.status === 'active' ? 'Deactivate Committee' : 'Activate Committee'}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {selectedCommittee?.status === 'active' ? 'deactivate' : 'activate'} this committee? 
              {selectedCommittee?.status === 'active' && ' This will make the committee inactive but preserve all data.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmStatusChange}
              disabled={isTogglingStatus}
              variant={selectedCommittee?.status === 'active' ? 'destructive' : 'default'}
            >
              {isTogglingStatus && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {selectedCommittee?.status === 'active' ? 'Deactivate' : 'Activate'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Committee Details Modal */}
      <CommitteeDetailsModal
        isOpen={showDetailsModal}
        onClose={handleCloseDetailsModal}
        committee={selectedCommittee}
      />
    </ClubAdminLayout>
  )
}