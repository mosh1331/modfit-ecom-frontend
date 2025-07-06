// hooks/useAuth.ts
import { authAPI } from '@/api/apiRequest'
import { apiServices } from '@/service/apiService'
import { useEffect, useState } from 'react'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiServices().getProfile()
      .then(res => {
        setUser(res.data)
      })
      .catch(() => {
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  return { user, loading, isLoggedIn: !!user }
}
