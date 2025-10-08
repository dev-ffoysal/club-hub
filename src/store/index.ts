import { configureStore } from '@reduxjs/toolkit'
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { baseAPI } from './api/baseAPI'
import { persistedAuthReducer } from './persistConfig'

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    [baseAPI.reducerPath]: baseAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseAPI.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store