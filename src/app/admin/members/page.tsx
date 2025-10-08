'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../components/ui/dialog'
import { Textarea } from '../../../components/ui/textarea'
import { ClubAdminLayout } from '../../../components/layout/club-admin-layout'
import { formatDate } from '../../../lib/utils'
import toast from 'react-hot-toast'
import { 
  Users, 
  CheckCircle, 
  Clock, 
  Crown, 
  Eye, 
  UserCheck,
  UserX, 
  Mail, 
  Download,
  Search,

  ChevronLeft,
  ChevronRight,
  Shield,
  ShieldOff,
  Loader2,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link as LinkIcon,
  Type,
  User,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Building,
  CreditCard,
  Droplets,
  UserCircle
} from 'lucide-react'

// API imports
import { 
  useGetClubRegistrationsQuery,
  useApproveRegistrationMutation,
  useRejectRegistrationMutation,
  useRestrictMemberAccessMutation,
  useSendBulkEmailMutation,
  useExportRegistrationsMutation,
  useGetRegistrationStatsQuery
} from '@/store/api/clubRegistrationAPI'

import { IClubregistration, CLUB_REGISTRATION_STATUS } from '@/types/interfaces'

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Rich Text Editor Component
function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Enter your message..." 
}: { 
  value: string
  onChange: (value: string) => void
  placeholder?: string 
}) {
  const [isPreview, setIsPreview] = useState(false)

  const insertFormatting = (before: string, after: string = '') => {
    const textarea = document.querySelector('#rich-text-editor') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    
    onChange(newText)
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const formatButtons = [
    { icon: Bold, action: () => insertFormatting('<strong>', '</strong>'), title: 'Bold' },
    { icon: Italic, action: () => insertFormatting('<em>', '</em>'), title: 'Italic' },
    { icon: Underline, action: () => insertFormatting('<u>', '</u>'), title: 'Underline' },
    { icon: List, action: () => insertFormatting('<ul><li>', '</li></ul>'), title: 'Bullet List' },
    { icon: ListOrdered, action: () => insertFormatting('<ol><li>', '</li></ol>'), title: 'Numbered List' },
    { icon: LinkIcon, action: () => insertFormatting('<a href="URL">', '</a>'), title: 'Link' },
  ]

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        {formatButtons.map((button, index) => (
          <Button
            key={index}
            type="button"
            variant="ghost"
            size="sm"
            onClick={button.action}
            title={button.title}
            className="h-8 w-8 p-0"
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
        <div className="ml-auto flex gap-1">
          <Button
            type="button"
            variant={!isPreview ? "default" : "ghost"}
            size="sm"
            onClick={() => setIsPreview(false)}
            className="h-8 px-3"
          >
            Edit
          </Button>
          <Button
            type="button"
            variant={isPreview ? "default" : "ghost"}
            size="sm"
            onClick={() => setIsPreview(true)}
            className="h-8 px-3"
          >
            Preview
          </Button>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="min-h-[200px]">
        {isPreview ? (
          <div 
            className="p-3 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: value || '<p class="text-gray-500">Nothing to preview...</p>' }}
          />
        ) : (
          <Textarea
            id="rich-text-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[200px] border-0 resize-none focus:ring-0 rounded-none"
          />
        )}
      </div>
    </div>
  )
}

export default function MembersPage() {
  // State management
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedRegistrations, setSelectedRegistrations] = useState<string[]>([])
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [selectedRegistration, setSelectedRegistration] = useState<IClubregistration | null>(null)
  const [emailSubject, setEmailSubject] = useState('')
  const [emailContent, setEmailContent] = useState('')
  const [isLoadingAction, setIsLoadingAction] = useState(false)
  const [activeTab, setActiveTab] = useState('approved')

  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const itemsPerPage = 10

  // API hooks
  const { 
    data: registrationsResponse, 
    isLoading: isLoadingRegistrations, 
    error: registrationsError 
  } = useGetClubRegistrationsQuery({
    page: currentPage,
    limit: itemsPerPage,
    searchTerm: debouncedSearchTerm,
    status: statusFilter === 'all' ? undefined : statusFilter as CLUB_REGISTRATION_STATUS
  })

  const { data: statsResponse } = useGetRegistrationStatsQuery({
    period: 'month'
  })
  const [approveRegistration] = useApproveRegistrationMutation()
  const [rejectRegistration] = useRejectRegistrationMutation()
  const [restrictMemberAccess] = useRestrictMemberAccessMutation()
  const [sendBulkEmail] = useSendBulkEmailMutation()
  const [exportRegistrations] = useExportRegistrationsMutation()

  // Computed values
  const registrations = useMemo(() => {
    return registrationsResponse?.data?.data || []
  }, [registrationsResponse])

  const stats = useMemo(() => {
    return statsResponse?.data || {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      manual: 0,
      recentRegistrations: 0
    }
  }, [statsResponse])

  const filteredRegistrations = useMemo(() => {
    if (!Array.isArray(registrations)) return []
    return registrations
  }, [registrations])

  const approvedRegistrations = useMemo(() => 
    filteredRegistrations.filter(reg => reg.status === CLUB_REGISTRATION_STATUS.APPROVED),
    [filteredRegistrations]
  )

  const pendingRegistrations = useMemo(() => 
    filteredRegistrations.filter(reg => reg.status === CLUB_REGISTRATION_STATUS.PENDING),
    [filteredRegistrations]
  )

  const rejectedRegistrations = useMemo(() => 
    filteredRegistrations.filter(reg => reg.status === CLUB_REGISTRATION_STATUS.REJECTED),
    [filteredRegistrations]
  )

  const totalPages = Math.ceil((registrationsResponse?.data?.meta?.totalPages || 0))

  // Event handlers
  const handleApproveRegistration = useCallback(async (id: string) => {
    try {
      setIsLoadingAction(true)
      await approveRegistration(id).unwrap()
      toast.success("Member registration has been approved successfully.")
    } catch (error) {
      toast.error("Failed to approve registration. Please try again.")
    } finally {
      setIsLoadingAction(false)
    }
  }, [approveRegistration])

  const handleRejectRegistration = useCallback(async (id: string, reason?: string) => {
    try {
      setIsLoadingAction(true)
      await rejectRegistration({ registrationId: id, reason }).unwrap()
      toast.success("Registration has been rejected.")
    } catch (error) {
      toast.error("Failed to reject registration. Please try again.")
    } finally {
      setIsLoadingAction(false)
    }
  }, [rejectRegistration])

  const handleRestrictAccess = useCallback(async (id: string, isRestricted: boolean, reason?: string) => {
    try {
      setIsLoadingAction(true)
      await restrictMemberAccess({ registrationId: id, isRestricted, reason }).unwrap()
      toast.success(isRestricted ? "Member access has been restricted." : "Member access has been restored.")
    } catch (error) {
      toast.error(`Failed to ${isRestricted ? 'restrict' : 'restore'} member access. Please try again.`)
    } finally {
      setIsLoadingAction(false)
    }
  }, [restrictMemberAccess])

  const handleSendBulkEmail = useCallback(async () => {
    if (selectedRegistrations.length === 0) {
      toast.error("Please select at least one member to send email.")
      return
    }

    if (!emailSubject.trim() || !emailContent.trim()) {
      toast.error("Please fill in both subject and content.")
      return
    }

    try {
      setIsLoadingAction(true)
      await sendBulkEmail({
        registrationIds: selectedRegistrations,
        subject: emailSubject,
        content: emailContent
      }).unwrap()
      
      toast.success(`Email sent successfully to ${selectedRegistrations.length} member(s).`)
      setShowEmailModal(false)
      setEmailSubject('')
      setEmailContent('')
      setSelectedRegistrations([])
    } catch (error) {
      toast.error("Failed to send email. Please try again.")
    } finally {
      setIsLoadingAction(false)
    }
  }, [selectedRegistrations, emailSubject, emailContent, sendBulkEmail])

  const handleExportData = useCallback(async () => {
    try {
      setIsLoadingAction(true)
      const result = await exportRegistrations().unwrap()
      
      // Create and download the file
      const blob = new Blob([result.data], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = result.filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast.success("Data exported successfully.")
    } catch (error) {
      toast.error("Failed to export data. Please try again.")
    } finally {
      setIsLoadingAction(false)
    }
  }, [exportRegistrations])

  const handleViewDetails = useCallback((registration: IClubregistration) => {
    setSelectedRegistration(registration)
    setShowDetailsModal(true)
  }, [])

  const getStatusBadge = (status: CLUB_REGISTRATION_STATUS) => {
    switch (status) {
      case CLUB_REGISTRATION_STATUS.APPROVED:
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>
      case CLUB_REGISTRATION_STATUS.PENDING:
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
      case CLUB_REGISTRATION_STATUS.REJECTED:
        return <Badge variant="destructive"><UserX className="h-3 w-3 mr-1" />Rejected</Badge>
      case CLUB_REGISTRATION_STATUS.MANUAL:
        return <Badge variant="outline"><Crown className="h-3 w-3 mr-1" />Manual</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  if (registrationsError) {
    return (
      <ClubAdminLayout>
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-red-600">Error loading registrations. Please try again.</p>
            </CardContent>
          </Card>
        </div>
      </ClubAdminLayout>
    )
  }

  return (
    <ClubAdminLayout>
      <div className=" mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Members Management</h1>
            <p className="text-gray-600 mt-1">Manage club member registrations and communications</p>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Members</p>
                    <p className="text-3xl font-bold text-blue-600">{stats.total || 0}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Approved</p>
                    <p className="text-3xl font-bold text-green-600">{stats.approved || 0}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-3xl font-bold text-yellow-600">{stats.pending || 0}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rejected</p>
                    <p className="text-3xl font-bold text-red-600">{stats.rejected || 0}</p>
                  </div>
                  <UserX className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="approved">Approved Members</TabsTrigger>
            <TabsTrigger value="pending">Pending Applications</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Search and Filter Controls - Improved Responsiveness */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Search and Filter Section */}
                <div className="flex flex-col sm:flex-row gap-4 flex-1 lg:max-w-md">
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  {/* Status Filter - Only show for non-approved tabs
                  {activeTab !== 'approved' && (
                    <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value={CLUB_REGISTRATION_STATUS.APPROVED}>Approved</SelectItem>
                        <SelectItem value={CLUB_REGISTRATION_STATUS.PENDING}>Pending</SelectItem>
                        <SelectItem value={CLUB_REGISTRATION_STATUS.REJECTED}>Rejected</SelectItem>
                        <SelectItem value={CLUB_REGISTRATION_STATUS.MANUAL}>Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  )} */}
                </div>

                {/* Action Buttons Section */}
                <div className="flex flex-col sm:flex-row lg:flex-row gap-2 sm:gap-3 lg:flex-shrink-0">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowEmailModal(true)}
                    disabled={selectedRegistrations.length === 0}
                    className="flex-1 sm:flex-none lg:whitespace-nowrap"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline lg:inline">Send Email to Selected</span>
                    <span className="sm:hidden lg:hidden">Email</span>
                    <span className="ml-1">({selectedRegistrations.length})</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleExportData()}
                    disabled={isLoadingAction}
                    className="flex-1 sm:flex-none lg:whitespace-nowrap"
                  >
                    {isLoadingAction ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4 mr-2" />
                    )}
                    <span className="hidden sm:inline lg:inline">Export CSV</span>
                    <span className="sm:hidden lg:hidden">CSV</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleExportData()}
                    disabled={isLoadingAction}
                    className="flex-1 sm:flex-none lg:whitespace-nowrap"
                  >
                    {isLoadingAction ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4 mr-2" />
                    )}
                    <span className="hidden sm:inline lg:inline">Export PDF</span>
                    <span className="sm:hidden lg:hidden">PDF</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Approved Members Tab */}
          <TabsContent value="approved" className="space-y-6">
            <MembersList 
              registrations={approvedRegistrations}
              isLoading={isLoadingRegistrations}
              selectedRegistrations={selectedRegistrations}
              setSelectedRegistrations={setSelectedRegistrations}
              onViewDetails={handleViewDetails}
              onRestrictAccess={handleRestrictAccess}
              isLoadingAction={isLoadingAction}
            />
          </TabsContent>

          {/* Pending Applications Tab */}
          <TabsContent value="pending" className="space-y-6">
            <PendingApplicationsList 
              registrations={pendingRegistrations}
              isLoading={isLoadingRegistrations}
              onViewDetails={handleViewDetails}
              onApprove={handleApproveRegistration}
              onReject={handleRejectRegistration}
              isLoadingAction={isLoadingAction}
            />
          </TabsContent>

          {/* Rejected Tab */}
          <TabsContent value="rejected" className="space-y-6">
            <RejectedList 
              registrations={rejectedRegistrations}
              isLoading={isLoadingRegistrations}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <HistoryList 
              registrations={registrations}
              isLoading={isLoadingRegistrations}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {totalPages > 1 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Member Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              {/* <UserCircle className="h-5 w-5" /> */}
              Member Details
            </DialogTitle>
            {/* <DialogDescription>
              Comprehensive information about this member registration.
            </DialogDescription> */}
          </DialogHeader>
          {selectedRegistration && (
            <div className="space-y-6">
              {/* Member Profile Section */}
              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  {selectedRegistration.member?.profile ? (
                    <img 
                      src={typeof selectedRegistration.member.profile === 'string' ? selectedRegistration.member.profile : ''} 
                      alt="Profile" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {selectedRegistration.member?.name || 'N/A'} {selectedRegistration.member?.lastName || ''}
                  </h3>
                  <p className="text-muted-foreground">{selectedRegistration.member?.email || 'N/A'}</p>
                  <div className="mt-2">
                    {getStatusBadge(selectedRegistration.status)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <User className="h-4 w-4" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Student ID</p>
                        <p className="text-sm text-muted-foreground">{selectedRegistration.member?.studentId || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{selectedRegistration.member?.phone || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Blood Group</p>
                        <p className="text-sm text-muted-foreground">{selectedRegistration.member?.bloodGroup || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Gender</p>
                        <p className="text-sm text-muted-foreground">{selectedRegistration.member?.gender || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">{selectedRegistration.member?.address || 'N/A'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Academic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <GraduationCap className="h-4 w-4" />
                      Academic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">University</p>
                        <p className="text-sm text-muted-foreground">{selectedRegistration.member?.university || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Department</p>
                        <p className="text-sm text-muted-foreground">{selectedRegistration.member?.department || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Year</p>
                        <p className="text-sm text-muted-foreground">{selectedRegistration.member?.year || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Semester</p>
                        <p className="text-sm text-muted-foreground">{selectedRegistration.member?.semester || 'N/A'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <CreditCard className="h-4 w-4" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Payment Required</p>
                        <p className="text-sm text-muted-foreground">{selectedRegistration.isPaymentRequired ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Payment Status</p>
                        <Badge variant={
                          selectedRegistration.paymentStatus === 'completed' ? 'default' :
                          selectedRegistration.paymentStatus === 'pending' ? 'secondary' :
                          selectedRegistration.paymentStatus === 'failed' ? 'destructive' : 'outline'
                        }>
                          {selectedRegistration.paymentStatus || 'N/A'}
                        </Badge>
                      </div>
                    </div>
                    {selectedRegistration.paymentInfo && (
                      <>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Payment Amount</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedRegistration.paymentInfo.amount} {selectedRegistration.paymentInfo.currency || 'BDT'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Payment Method</p>
                            <p className="text-sm text-muted-foreground">{selectedRegistration.paymentInfo.method || 'N/A'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCircle className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Transaction ID</p>
                            <p className="text-sm text-muted-foreground font-mono">{selectedRegistration.paymentInfo.transactionId || 'N/A'}</p>
                          </div>
                        </div>
                        {selectedRegistration.paymentInfo.processedAt && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Payment Date</p>
                              <p className="text-sm text-muted-foreground">{formatDate(new Date(selectedRegistration.paymentInfo.processedAt))}</p>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Registration Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Calendar className="h-4 w-4" />
                      Registration Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Registration Date</p>
                        <p className="text-sm text-muted-foreground">{formatDate(new Date(selectedRegistration.createdAt))}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Last Updated</p>
                        <p className="text-sm text-muted-foreground">{formatDate(new Date(selectedRegistration.updatedAt))}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Approved by Club</p>
                        <p className="text-sm text-muted-foreground">{selectedRegistration.isApprovedByClub ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Crown className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Created by Admin</p>
                        <p className="text-sm text-muted-foreground">{selectedRegistration.isCreatedByAdmin ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Information */}
              {selectedRegistration.member?.description && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Type className="h-4 w-4" />
                      Additional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{selectedRegistration.member.description}</p>
                  </CardContent>
                </Card>
              )}

              {/* Interests */}
              {selectedRegistration.member?.interestedIn && selectedRegistration.member.interestedIn.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Crown className="h-4 w-4" />
                      Interests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedRegistration.member.interestedIn.map((interest, index) => (
                        <Badge key={index} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Modal */}
      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Send Email to Selected Members</DialogTitle>
            <DialogDescription>
              Compose and send an email to {selectedRegistrations.length} selected members.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <Input 
                placeholder="Email subject..." 
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <RichTextEditor
                value={emailContent}
                onChange={setEmailContent}
                placeholder="Compose your email message here..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmailModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendBulkEmail} disabled={isLoadingAction}>
              {isLoadingAction && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ClubAdminLayout>
  )
}

// Component for displaying approved members list
function MembersList({ 
  registrations, 
  isLoading, 
  selectedRegistrations, 
  setSelectedRegistrations, 
  onViewDetails, 
  onRestrictAccess,
  isLoadingAction 
}: {
  registrations: IClubregistration[]
  isLoading: boolean
  selectedRegistrations: string[]
  setSelectedRegistrations: (ids: string[]) => void
  onViewDetails: (registration: IClubregistration) => void
  onRestrictAccess: (id: string, isRestricted: boolean, reason?: string) => void
  isLoadingAction: boolean
}) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2">Loading members...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Approved Members</CardTitle>
        <CardDescription>
          Manage approved club members and their access
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {registrations.map((registration) => (
            <div key={registration._id} className="border border-border rounded-lg p-4 hover:bg-muted">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                    checked={selectedRegistrations.includes(registration._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRegistrations([...selectedRegistrations, registration._id])
                      } else {
                        setSelectedRegistrations(selectedRegistrations.filter(id => id !== registration._id))
                      }
                    }}
                  />
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <span className="font-medium text-muted-foreground">
                      {(typeof registration.member === 'object' && registration.member?.name?.charAt(0)) || 'U'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">
                        {typeof registration.member === 'object' 
                          ? `${registration.member?.name || ''} ${registration.member?.lastName || ''}`.trim() || 'Unknown'
                          : 'Unknown'
                        }
                      </h3>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approved
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>{(typeof registration.member === 'object' && registration.member?.email) || 'No email'}</p>
                      <p>Joined: {formatDate(new Date(registration.createdAt))}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewDetails(registration)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onRestrictAccess(registration._id, true)}
                    disabled={isLoadingAction}
                  >
                    <ShieldOff className="h-3 w-3 mr-1" />
                    Restrict Access
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {registrations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No approved members found.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Component for displaying pending applications
function PendingApplicationsList({ 
  registrations, 
  isLoading, 
  onViewDetails, 
  onApprove, 
  onReject,
  isLoadingAction 
}: {
  registrations: IClubregistration[]
  isLoading: boolean
  onViewDetails: (registration: IClubregistration) => void
  onApprove: (id: string) => void
  onReject: (id: string, reason?: string) => void
  isLoadingAction: boolean
}) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2">Loading applications...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Applications</CardTitle>
        <CardDescription>
          Review and approve new member applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {registrations.map((registration) => (
            <div key={registration._id} className="border border-border rounded-lg p-4 hover:bg-muted">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-950/20 rounded-full flex items-center justify-center">
                    <span className="font-medium text-yellow-600 dark:text-yellow-400">
                      {(typeof registration.member === 'object' && registration.member?.name?.charAt(0)) || 'U'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {typeof registration.member === 'object' 
                        ? `${registration.member?.name || ''} ${registration.member?.lastName || ''}`.trim() || 'Unknown'
                        : 'Unknown'
                      }
                    </h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>{(typeof registration.member === 'object' && registration.member?.email) || 'No email'}</p>
                      <p>Applied: {formatDate(new Date(registration.createdAt))}</p>
                      <p>Payment Required: {registration.isPaymentRequired ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewDetails(registration)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onReject(registration._id)}
                    disabled={isLoadingAction}
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onApprove(registration._id)}
                    disabled={isLoadingAction}
                  >
                    <UserCheck className="h-3 w-3 mr-1" />
                    Accept Registration
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {registrations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No pending applications found.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Component for displaying rejected registrations
function RejectedList({ 
  registrations, 
  isLoading, 
  onViewDetails 
}: {
  registrations: IClubregistration[]
  isLoading: boolean
  onViewDetails: (registration: IClubregistration) => void
}) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2">Loading rejected registrations...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rejected Registrations</CardTitle>
        <CardDescription>
          View declined registration requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {registrations.map((registration) => (
            <div key={registration._id} className="border border-border rounded-lg p-4 hover:bg-muted">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-950/20 rounded-full flex items-center justify-center">
                    <span className="font-medium text-red-600 dark:text-red-400">
                      {(typeof registration.member === 'object' && registration.member?.name?.charAt(0)) || 'U'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {typeof registration.member === 'object' 
                        ? `${registration.member?.name || ''} ${registration.member?.lastName || ''}`.trim() || 'Unknown'
                        : 'Unknown'
                      }
                    </h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>{(typeof registration.member === 'object' && registration.member?.email) || 'No email'}</p>
                      <p>Applied: {formatDate(new Date(registration.createdAt))}</p>
                      <p>Rejected: {formatDate(new Date(registration.updatedAt))}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewDetails(registration)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {registrations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No rejected registrations found.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Component for displaying registration history
function HistoryList({ 
  registrations, 
  isLoading, 
  onViewDetails 
}: {
  registrations: IClubregistration[]
  isLoading: boolean
  onViewDetails: (registration: IClubregistration) => void
}) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2">Loading registration history...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registration History</CardTitle>
        <CardDescription>
          Complete log of all registration requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {registrations.map((registration) => (
            <div key={registration._id} className="border border-border rounded-lg p-4 hover:bg-muted">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <span className="font-medium text-muted-foreground">
                      {(typeof registration.member === 'object' && registration.member?.name?.charAt(0)) || 'U'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">
                        {typeof registration.member === 'object' 
                          ? `${registration.member?.name || ''} ${registration.member?.lastName || ''}`.trim() || 'Unknown'
                          : 'Unknown'
                        }
                      </h3>
                      <Badge variant={
                        registration.status === CLUB_REGISTRATION_STATUS.APPROVED ? 'default' :
                        registration.status === CLUB_REGISTRATION_STATUS.PENDING ? 'secondary' :
                        registration.status === CLUB_REGISTRATION_STATUS.REJECTED ? 'destructive' : 'outline'
                      }>
                        {registration.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>{(typeof registration.member === 'object' && registration.member?.email) || 'No email'}</p>
                      <p>Applied: {formatDate(new Date(registration.createdAt))}</p>
                      <p>Last Updated: {formatDate(new Date(registration.updatedAt))}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewDetails(registration)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {registrations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No registration history found.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}