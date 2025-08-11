import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import clubSlice from './slices/clubSlice'
import eventSlice from './slices/eventSlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    clubs: clubSlice,
    events: eventSlice,
    users: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store