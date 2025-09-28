// hooks/useAuth.ts
import { RootState } from '@/store'
import { useSelector } from 'react-redux'

export function useAuth() {
  const { user } = useSelector((state: RootState) => state.auth)
  const isLoggedIn = !!user
  const isAdmin = user?.isAdmin || false

  return { user, isLoggedIn, isAdmin }
}
