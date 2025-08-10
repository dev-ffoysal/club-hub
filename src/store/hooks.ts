import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Custom hooks for common selectors
export const useAuthState = () => {
  return useAppSelector((state) => state.auth)
}

export const useClubs = () => {
  return useAppSelector((state) => state.clubs)
}

export const useEvents = () => {
  return useAppSelector((state) => state.events)
}

export const useUsers = () => {
  return useAppSelector((state) => state.users)
}

// Specific auth selectors
export const useCurrentUser = () => {
  return useAppSelector((state) => state.auth.user)
}

export const useIsLoggedIn = () => {
  return useAppSelector((state) => state.auth.isLoggedIn)
}

export const useAuthLoading = () => {
  return useAppSelector((state) => state.auth.isLoading)
}

export const useAuthError = () => {
  return useAppSelector((state) => state.auth.error)
}

// Specific club selectors
export const useClubsList = () => {
  return useAppSelector((state) => state.clubs.clubs)
}

export const useCurrentClub = () => {
  return useAppSelector((state) => state.clubs.currentClub)
}

export const useClubsLoading = () => {
  return useAppSelector((state) => state.clubs.isLoading)
}

export const useClubsError = () => {
  return useAppSelector((state) => state.clubs.error)
}

export const useClubFilters = () => {
  return useAppSelector((state) => state.clubs.filters)
}

// Specific event selectors
export const useEventsList = () => {
  return useAppSelector((state) => state.events.events)
}

export const useCurrentEvent = () => {
  return useAppSelector((state) => state.events.currentEvent)
}

export const useEventsLoading = () => {
  return useAppSelector((state) => state.events.isLoading)
}

export const useEventsError = () => {
  return useAppSelector((state) => state.events.error)
}

export const useEventFilters = () => {
  return useAppSelector((state) => state.events.filters)
}

// Specific user selectors
export const useUsersList = () => {
  return useAppSelector((state) => state.users.users)
}

export const useSelectedUser = () => {
  return useAppSelector((state) => state.users.currentUser)
}

export const useUsersLoading = () => {
  return useAppSelector((state) => state.users.isLoading)
}

export const useUsersError = () => {
  return useAppSelector((state) => state.users.error)
}

export const useUserFilters = () => {
  return useAppSelector((state) => state.users.filters)
}