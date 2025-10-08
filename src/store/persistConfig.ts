import { persistReducer } from 'redux-persist'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import authReducer from './slices/AuthSlice'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

// Create a safe storage for SSR
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null)
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value)
    },
    removeItem(_key: string) {
      return Promise.resolve()
    },
  }
}

// Create storage with proper SSR handling
const storage = (() => {
  if (typeof window === 'undefined') {
    return createNoopStorage()
  }
  
  try {
    return createWebStorage('local')
  } catch (error) {
    console.warn('localStorage not available, using noop storage')
    return createNoopStorage()
  }
})()


const encryptionTransform = encryptTransform({
  secretKey: process.env.NEXT_PUBLIC_PERSIST_KEY || 'club-hub-default-key',
  onError: function (error) {
    console.error('Redux Persist Encryption Error:', error)
  },
})

// Auth persist configuration
const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['accessToken', 'refreshToken', 'user', 'isAuthenticated'],
  transforms: [encryptionTransform],
}

// Create persisted auth reducer
export const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)

export default {
  authPersistConfig,
}