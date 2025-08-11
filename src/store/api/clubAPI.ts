import api from './axiosConfig'

export const clubAPI = {
  // Get all clubs with filters and pagination
  getClubs: async (params: { page?: number; limit?: number; filters?: any }) => {
    return api.get('/clubs', { params })
  },

  // Get club by ID
  getClubById: async (clubId: string) => {
    return api.get(`/clubs/${clubId}`)
  },

  // Create new club
  createClub: async (clubData: any) => {
    return api.post('/clubs', clubData)
  },

  // Update club
  updateClub: async (clubId: string, clubData: any) => {
    return api.put(`/clubs/${clubId}`, clubData)
  },

  // Delete club
  deleteClub: async (clubId: string) => {
    return api.delete(`/clubs/${clubId}`)
  },

  // Approve club (admin only)
  approveClub: async (clubId: string) => {
    return api.post(`/clubs/${clubId}/approve`)
  },

  // Reject club (admin only)
  rejectClub: async (clubId: string, reason?: string) => {
    return api.post(`/clubs/${clubId}/reject`, { reason })
  },

  // Suspend club (admin only)
  suspendClub: async (clubId: string, reason?: string) => {
    return api.post(`/clubs/${clubId}/suspend`, { reason })
  },

  // Activate club (admin only)
  activateClub: async (clubId: string) => {
    return api.post(`/clubs/${clubId}/activate`)
  },

  // Get club members
  getClubMembers: async (clubId: string, params?: { page?: number; limit?: number }) => {
    return api.get(`/clubs/${clubId}/members`, { params })
  },

  // Add member to club
  addMember: async (clubId: string, userId: string, role?: string) => {
    return api.post(`/clubs/${clubId}/members`, { userId, role })
  },

  // Remove member from club
  removeMember: async (clubId: string, userId: string) => {
    return api.delete(`/clubs/${clubId}/members/${userId}`)
  },

  // Update member role
  updateMemberRole: async (clubId: string, userId: string, role: string) => {
    return api.put(`/clubs/${clubId}/members/${userId}`, { role })
  },

  // Join club (user request)
  joinClub: async (clubId: string) => {
    return api.post(`/clubs/${clubId}/join`)
  },

  // Leave club
  leaveClub: async (clubId: string) => {
    return api.post(`/clubs/${clubId}/leave`)
  },

  // Get club events
  getClubEvents: async (clubId: string, params?: { page?: number; limit?: number }) => {
    return api.get(`/clubs/${clubId}/events`, { params })
  },

  // Get club statistics
  getClubStats: async (clubId: string) => {
    return api.get(`/clubs/${clubId}/stats`)
  },

  // Upload club logo
  uploadClubLogo: async (clubId: string, file: File) => {
    const formData = new FormData()
    formData.append('logo', file)
    return api.post(`/clubs/${clubId}/upload-logo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // Upload club banner
  uploadClubBanner: async (clubId: string, file: File) => {
    const formData = new FormData()
    formData.append('banner', file)
    return api.post(`/clubs/${clubId}/upload-banner`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // Get club categories
  getClubCategories: async () => {
    return api.get('/clubs/categories')
  },

  // Get universities
  getUniversities: async () => {
    return api.get('/clubs/universities')
  },

  // Search clubs
  searchClubs: async (query: string, filters?: any) => {
    return api.get('/clubs/search', { params: { q: query, ...filters } })
  },

  // Get featured clubs
  getFeaturedClubs: async () => {
    return api.get('/clubs/featured')
  },

  // Get popular clubs
  getPopularClubs: async () => {
    return api.get('/clubs/popular')
  },

  // Get recent clubs
  getRecentClubs: async () => {
    return api.get('/clubs/recent')
  },

  // Get club requests (admin only)
  getClubRequests: async (params?: { page?: number; limit?: number; status?: string }) => {
    return api.get('/clubs/requests', { params })
  },

  // Get club analytics (admin only)
  getClubAnalytics: async (params?: { dateRange?: string; clubId?: string }) => {
    return api.get('/clubs/analytics', { params })
  },
}