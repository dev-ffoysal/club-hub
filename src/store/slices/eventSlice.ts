import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { eventAPI } from '../api/eventAPI'


interface Event {
  id: string
  title: string
  description: string
  clubId: string
  clubName: string
  date: Date
  time: string
  location: string
  capacity: number
  registeredCount: number
  price: number
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  category: string
  imageUrl?: string
  requirements?: string[]
  organizer: {
    name: string
    email: string
  }
  createdAt: Date
  updatedAt: Date
}

interface EventState {
  events: Event[]
  currentEvent: Event | null
  isLoading: boolean
  error: string | null
  totalCount: number
  filters: {
    status: string
    category: string
    club: string
    search: string
    dateRange: {
      start: string
      end: string
    }
  }
}

const initialState: EventState = {
  events: [],
  currentEvent: null,
  isLoading: false,
  error: null,
  totalCount: 0,
  filters: {
    status: 'all',
    category: 'all',
    club: 'all',
    search: '',
    dateRange: {
      start: '',
      end: '',
    },
  },
}

// Async thunks
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (params: { page?: number; limit?: number; filters?: any }, { rejectWithValue }) => {
    try {
      const response = await eventAPI.getEvents(params)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch events')
    }
  }
)

export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (eventId: string, { rejectWithValue }) => {
    try {
      const response = await eventAPI.getEventById(eventId)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch event')
    }
  }
)

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData: Partial<Event>, { rejectWithValue }) => {
    try {
      const response = await eventAPI.createEvent(eventData)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create event')
    }
  }
)

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ eventId, eventData }: { eventId: string; eventData: Partial<Event> }, { rejectWithValue }) => {
    try {
      const response = await eventAPI.updateEvent(eventId, eventData)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update event')
    }
  }
)

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (eventId: string, { rejectWithValue }) => {
    try {
      await eventAPI.deleteEvent(eventId)
      return eventId
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete event')
    }
  }
)

export const registerForEvent = createAsyncThunk(
  'events/registerForEvent',
  async (eventId: string, { rejectWithValue }) => {
    try {
      const response = await eventAPI.registerForEvent(eventId)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to register for event')
    }
  }
)

export const unregisterFromEvent = createAsyncThunk(
  'events/unregisterFromEvent',
  async (eventId: string, { rejectWithValue }) => {
    try {
      const response = await eventAPI.unregisterFromEvent(eventId)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to unregister from event')
    }
  }
)

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setFilters: (state, action: PayloadAction<Partial<EventState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        status: 'all',
        category: 'all',
        club: 'all',
        search: '',
        dateRange: {
          start: '',
          end: '',
        },
      }
    },
    setCurrentEvent: (state, action: PayloadAction<Event | null>) => {
      state.currentEvent = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch events
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false
        state.events = action.payload.events
        state.totalCount = action.payload.totalCount
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch event by ID
      .addCase(fetchEventById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentEvent = action.payload
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Create event
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false
        state.events.push(action.payload)
        state.totalCount += 1
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Update event
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(event => event.id === action.payload.id)
        if (index !== -1) {
          state.events[index] = action.payload
        }
        if (state.currentEvent?.id === action.payload.id) {
          state.currentEvent = action.payload
        }
      })
      // Delete event
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(event => event.id !== action.payload)
        state.totalCount -= 1
        if (state.currentEvent?.id === action.payload) {
          state.currentEvent = null
        }
      })
      // Register for event
      .addCase(registerForEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(event => event.id === action.payload.id)
        if (index !== -1) {
          state.events[index] = action.payload
        }
        if (state.currentEvent?.id === action.payload.id) {
          state.currentEvent = action.payload
        }
      })
      // Unregister from event
      .addCase(unregisterFromEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(event => event.id === action.payload.id)
        if (index !== -1) {
          state.events[index] = action.payload
        }
        if (state.currentEvent?.id === action.payload.id) {
          state.currentEvent = action.payload
        }
      })
  },
})

export const { clearError, setFilters, clearFilters, setCurrentEvent } = eventSlice.actions
export default eventSlice.reducer