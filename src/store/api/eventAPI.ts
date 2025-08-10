import api from './axiosConfig'

export const eventAPI = {
  // Get all events with filters and pagination
  getEvents: async (params: { page?: number; limit?: number; filters?: any }) => {
    return api.get('/events', { params })
  },

  // Get event by ID
  getEventById: async (eventId: string) => {
    return api.get(`/events/${eventId}`)
  },

  // Create new event
  createEvent: async (eventData: any) => {
    return api.post('/events', eventData)
  },

  // Update event
  updateEvent: async (eventId: string, eventData: any) => {
    return api.put(`/events/${eventId}`, eventData)
  },

  // Delete event
  deleteEvent: async (eventId: string) => {
    return api.delete(`/events/${eventId}`)
  },

  // Register for event
  registerForEvent: async (eventId: string) => {
    return api.post(`/events/${eventId}/register`)
  },

  // Unregister from event
  unregisterFromEvent: async (eventId: string) => {
    return api.post(`/events/${eventId}/unregister`)
  },

  // Get event registrations
  getEventRegistrations: async (eventId: string, params?: { page?: number; limit?: number }) => {
    return api.get(`/events/${eventId}/registrations`, { params })
  },

  // Get user's registered events
  getUserRegisteredEvents: async (userId?: string) => {
    const endpoint = userId ? `/events/user/${userId}/registered` : '/events/user/registered'
    return api.get(endpoint)
  },

  // Cancel event registration
  cancelEventRegistration: async (eventId: string, userId: string) => {
    return api.delete(`/events/${eventId}/registrations/${userId}`)
  },

  // Approve event (admin only)
  approveEvent: async (eventId: string) => {
    return api.post(`/events/${eventId}/approve`)
  },

  // Reject event (admin only)
  rejectEvent: async (eventId: string, reason?: string) => {
    return api.post(`/events/${eventId}/reject`, { reason })
  },

  // Promote event (admin only)
  promoteEvent: async (eventId: string, promotionData: any) => {
    return api.post(`/events/${eventId}/promote`, promotionData)
  },

  // Cancel event
  cancelEvent: async (eventId: string, reason?: string) => {
    return api.post(`/events/${eventId}/cancel`, { reason })
  },

  // Mark event as completed
  completeEvent: async (eventId: string) => {
    return api.post(`/events/${eventId}/complete`)
  },

  // Get event statistics
  getEventStats: async (eventId: string) => {
    return api.get(`/events/${eventId}/stats`)
  },

  // Upload event image
  uploadEventImage: async (eventId: string, file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    return api.post(`/events/${eventId}/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // Get event categories
  getEventCategories: async () => {
    return api.get('/events/categories')
  },

  // Search events
  searchEvents: async (query: string, filters?: any) => {
    return api.get('/events/search', { params: { q: query, ...filters } })
  },

  // Get featured events
  getFeaturedEvents: async () => {
    return api.get('/events/featured')
  },

  // Get upcoming events
  getUpcomingEvents: async (limit?: number) => {
    return api.get('/events/upcoming', { params: { limit } })
  },

  // Get popular events
  getPopularEvents: async () => {
    return api.get('/events/popular')
  },

  // Get events by club
  getEventsByClub: async (clubId: string, params?: { page?: number; limit?: number }) => {
    return api.get(`/events/club/${clubId}`, { params })
  },

  // Get events by category
  getEventsByCategory: async (category: string, params?: { page?: number; limit?: number }) => {
    return api.get(`/events/category/${category}`, { params })
  },

  // Get events by date range
  getEventsByDateRange: async (startDate: string, endDate: string, params?: any) => {
    return api.get('/events/date-range', { 
      params: { startDate, endDate, ...params } 
    })
  },

  // Get event analytics (admin only)
  getEventAnalytics: async (params?: { dateRange?: string; eventId?: string; clubId?: string }) => {
    return api.get('/events/analytics', { params })
  },

  // Send event reminder
  sendEventReminder: async (eventId: string) => {
    return api.post(`/events/${eventId}/send-reminder`)
  },

  // Get event feedback
  getEventFeedback: async (eventId: string) => {
    return api.get(`/events/${eventId}/feedback`)
  },

  // Submit event feedback
  submitEventFeedback: async (eventId: string, feedback: any) => {
    return api.post(`/events/${eventId}/feedback`, feedback)
  },

  // Generate event QR code
  generateEventQR: async (eventId: string) => {
    return api.get(`/events/${eventId}/qr-code`)
  },

  // Check-in to event
  checkInToEvent: async (eventId: string, qrCode?: string) => {
    return api.post(`/events/${eventId}/check-in`, { qrCode })
  },

  // Get event attendees
  getEventAttendees: async (eventId: string) => {
    return api.get(`/events/${eventId}/attendees`)
  },
}