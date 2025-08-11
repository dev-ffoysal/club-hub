import api from './axiosConfig'
import { User } from '../../types'

export const userAPI = {
  // Get all users with filters and pagination
  getUsers: async (params: { page?: number; limit?: number; filters?: any }) => {
    return api.get('/users', { params })
  },

  // Get user by ID
  getUserById: async (userId: string) => {
    return api.get(`/users/${userId}`)
  },

  // Update user
  updateUser: async (userId: string, userData: Partial<User>) => {
    return api.put(`/users/${userId}`, userData)
  },

  // Delete user
  deleteUser: async (userId: string) => {
    return api.delete(`/users/${userId}`)
  },

  // Suspend user (admin only)
  suspendUser: async (userId: string, reason?: string) => {
    return api.post(`/users/${userId}/suspend`, { reason })
  },

  // Activate user (admin only)
  activateUser: async (userId: string) => {
    return api.post(`/users/${userId}/activate`)
  },

  // Change user role (admin only)
  changeUserRole: async (userId: string, role: string) => {
    return api.put(`/users/${userId}/role`, { role })
  },

  // Reset user password (admin only)
  resetUserPassword: async (userId: string) => {
    return api.post(`/users/${userId}/reset-password`)
  },

  // Get user profile
  getUserProfile: async (userId: string) => {
    return api.get(`/users/${userId}/profile`)
  },

  // Update user profile
  updateUserProfile: async (userId: string, profileData: any) => {
    return api.put(`/users/${userId}/profile`, profileData)
  },

  // Get user clubs
  getUserClubs: async (userId: string) => {
    return api.get(`/users/${userId}/clubs`)
  },

  // Get user events
  getUserEvents: async (userId: string, params?: { page?: number; limit?: number; status?: string }) => {
    return api.get(`/users/${userId}/events`, { params })
  },

  // Get user statistics
  getUserStats: async (userId: string) => {
    return api.get(`/users/${userId}/stats`)
  },

  // Search users
  searchUsers: async (query: string, filters?: any) => {
    return api.get('/users/search', { params: { q: query, ...filters } })
  },

  // Get user roles
  getUserRoles: async () => {
    return api.get('/users/roles')
  },

  // Get user permissions
  getUserPermissions: async (userId: string) => {
    return api.get(`/users/${userId}/permissions`)
  },

  // Update user permissions
  updateUserPermissions: async (userId: string, permissions: string[]) => {
    return api.put(`/users/${userId}/permissions`, { permissions })
  },

  // Get user activity log
  getUserActivityLog: async (userId: string, params?: { page?: number; limit?: number }) => {
    return api.get(`/users/${userId}/activity`, { params })
  },

  // Get user notifications
  getUserNotifications: async (userId: string, params?: { page?: number; limit?: number; unread?: boolean }) => {
    return api.get(`/users/${userId}/notifications`, { params })
  },

  // Mark notification as read
  markNotificationAsRead: async (userId: string, notificationId: string) => {
    return api.put(`/users/${userId}/notifications/${notificationId}/read`)
  },

  // Mark all notifications as read
  markAllNotificationsAsRead: async (userId: string) => {
    return api.put(`/users/${userId}/notifications/read-all`)
  },

  // Delete notification
  deleteNotification: async (userId: string, notificationId: string) => {
    return api.delete(`/users/${userId}/notifications/${notificationId}`)
  },

  // Get user preferences
  getUserPreferences: async (userId: string) => {
    return api.get(`/users/${userId}/preferences`)
  },

  // Update user preferences
  updateUserPreferences: async (userId: string, preferences: any) => {
    return api.put(`/users/${userId}/preferences`, preferences)
  },

  // Upload user avatar
  uploadUserAvatar: async (userId: string, file: File) => {
    const formData = new FormData()
    formData.append('avatar', file)
    return api.post(`/users/${userId}/upload-avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // Get user analytics (admin only)
  getUserAnalytics: async (params?: { dateRange?: string; userId?: string }) => {
    return api.get('/users/analytics', { params })
  },

  // Export users data (admin only)
  exportUsersData: async (filters?: any) => {
    return api.get('/users/export', { params: filters, responseType: 'blob' })
  },

  // Bulk update users (admin only)
  bulkUpdateUsers: async (userIds: string[], updateData: any) => {
    return api.put('/users/bulk-update', { userIds, updateData })
  },

  // Bulk delete users (admin only)
  bulkDeleteUsers: async (userIds: string[]) => {
    return api.delete('/users/bulk-delete', { data: { userIds } })
  },

  // Send message to user
  sendMessageToUser: async (userId: string, message: any) => {
    return api.post(`/users/${userId}/message`, message)
  },

  // Get user sessions
  getUserSessions: async (userId: string) => {
    return api.get(`/users/${userId}/sessions`)
  },

  // Terminate user session
  terminateUserSession: async (userId: string, sessionId: string) => {
    return api.delete(`/users/${userId}/sessions/${sessionId}`)
  },

  // Get user login history
  getUserLoginHistory: async (userId: string, params?: { page?: number; limit?: number }) => {
    return api.get(`/users/${userId}/login-history`, { params })
  },
}