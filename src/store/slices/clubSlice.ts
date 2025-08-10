import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { clubAPI } from '../api/clubAPI'

interface Club {
  id: string
  name: string
  university: string
  category: string
  description: string
  status: 'active' | 'pending' | 'suspended' | 'inactive'
  memberCount: number
  maxMembers: number
  eventsCount: number
  revenue: number
  president: {
    name: string
    email: string
  }
  advisor: {
    name: string
    email: string
  }
  createdAt: Date
  lastActivity: Date
  website?: string
  socialMedia: {
    facebook?: string
    instagram?: string
  }
}

interface ClubState {
  clubs: Club[]
  currentClub: Club | null
  isLoading: boolean
  error: string | null
  totalCount: number
  filters: {
    status: string
    category: string
    university: string
    search: string
  }
}

const initialState: ClubState = {
  clubs: [],
  currentClub: null,
  isLoading: false,
  error: null,
  totalCount: 0,
  filters: {
    status: 'all',
    category: 'all',
    university: 'all',
    search: '',
  },
}

// Async thunks
export const fetchClubs = createAsyncThunk(
  'clubs/fetchClubs',
  async (params: { page?: number; limit?: number; filters?: any }, { rejectWithValue }) => {
    try {
      const response = await clubAPI.getClubs(params)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch clubs')
    }
  }
)

export const fetchClubById = createAsyncThunk(
  'clubs/fetchClubById',
  async (clubId: string, { rejectWithValue }) => {
    try {
      const response = await clubAPI.getClubById(clubId)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch club')
    }
  }
)

export const createClub = createAsyncThunk(
  'clubs/createClub',
  async (clubData: Partial<Club>, { rejectWithValue }) => {
    try {
      const response = await clubAPI.createClub(clubData)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create club')
    }
  }
)

export const updateClub = createAsyncThunk(
  'clubs/updateClub',
  async ({ clubId, clubData }: { clubId: string; clubData: Partial<Club> }, { rejectWithValue }) => {
    try {
      const response = await clubAPI.updateClub(clubId, clubData)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update club')
    }
  }
)

export const deleteClub = createAsyncThunk(
  'clubs/deleteClub',
  async (clubId: string, { rejectWithValue }) => {
    try {
      await clubAPI.deleteClub(clubId)
      return clubId
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete club')
    }
  }
)

export const approveClub = createAsyncThunk(
  'clubs/approveClub',
  async (clubId: string, { rejectWithValue }) => {
    try {
      const response = await clubAPI.approveClub(clubId)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to approve club')
    }
  }
)

export const suspendClub = createAsyncThunk(
  'clubs/suspendClub',
  async (clubId: string, { rejectWithValue }) => {
    try {
      const response = await clubAPI.suspendClub(clubId)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to suspend club')
    }
  }
)

const clubSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setFilters: (state, action: PayloadAction<Partial<ClubState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        status: 'all',
        category: 'all',
        university: 'all',
        search: '',
      }
    },
    setCurrentClub: (state, action: PayloadAction<Club | null>) => {
      state.currentClub = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch clubs
      .addCase(fetchClubs.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchClubs.fulfilled, (state, action) => {
        state.isLoading = false
        state.clubs = action.payload.clubs
        state.totalCount = action.payload.totalCount
      })
      .addCase(fetchClubs.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch club by ID
      .addCase(fetchClubById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchClubById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentClub = action.payload
      })
      .addCase(fetchClubById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Create club
      .addCase(createClub.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createClub.fulfilled, (state, action) => {
        state.isLoading = false
        state.clubs.push(action.payload)
        state.totalCount += 1
      })
      .addCase(createClub.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Update club
      .addCase(updateClub.fulfilled, (state, action) => {
        const index = state.clubs.findIndex(club => club.id === action.payload.id)
        if (index !== -1) {
          state.clubs[index] = action.payload
        }
        if (state.currentClub?.id === action.payload.id) {
          state.currentClub = action.payload
        }
      })
      // Delete club
      .addCase(deleteClub.fulfilled, (state, action) => {
        state.clubs = state.clubs.filter(club => club.id !== action.payload)
        state.totalCount -= 1
        if (state.currentClub?.id === action.payload) {
          state.currentClub = null
        }
      })
      // Approve club
      .addCase(approveClub.fulfilled, (state, action) => {
        const index = state.clubs.findIndex(club => club.id === action.payload.id)
        if (index !== -1) {
          state.clubs[index] = action.payload
        }
      })
      // Suspend club
      .addCase(suspendClub.fulfilled, (state, action) => {
        const index = state.clubs.findIndex(club => club.id === action.payload.id)
        if (index !== -1) {
          state.clubs[index] = action.payload
        }
      })
  },
})

export const { clearError, setFilters, clearFilters, setCurrentClub } = clubSlice.actions
export default clubSlice.reducer