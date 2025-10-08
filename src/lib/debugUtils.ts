// Clear old persisted data with version -1
const clearOldPersistedData = () => {
  if (typeof window !== 'undefined') {
    try {
      const persistedAuth = localStorage.getItem('persist:auth')
      if (persistedAuth) {
        const parsed = JSON.parse(persistedAuth)
        // Check if this is old data with version -1
        if (parsed._persist && parsed._persist.version === -1) {
          console.log('Clearing old persisted data with version -1')
          localStorage.removeItem('persist:auth')
        }
      }
    } catch (error) {
      console.error('Error checking persisted data:', error)
      // If there's an error parsing, clear the data
      localStorage.removeItem('persist:auth')
    }
  }
}

// Debug utilities for development
export const debugUtils = {
  // Clear all persisted data
  clearPersistedData: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('persist:auth')
      sessionStorage.clear()
      console.log('Persisted data cleared. Please refresh the page.')
    }
  },

  // Check current auth state
  checkAuthState: () => {
    if (typeof window !== 'undefined') {
      const persistedAuth = localStorage.getItem('persist:auth')
      console.log('Persisted auth data:', persistedAuth)
      
      try {
        if (persistedAuth) {
          const parsed = JSON.parse(persistedAuth)
          console.log('Parsed persisted data:', parsed)
        }
      } catch (error) {
        console.error('Error parsing persisted data:', error)
      }
    }
  },

  // Force logout and clear data
  forceLogout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('persist:auth')
      window.location.reload()
    }
  }
}

// Initialize on load
if (typeof window !== 'undefined') {
  // Clear old persisted data on app load
  clearOldPersistedData()
  
  // Make debug utils available globally in development
  if (process.env.NODE_ENV === 'development') {
    (window as any).debugUtils = debugUtils
    console.log('Debug utils available: window.debugUtils')
  }
}