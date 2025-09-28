// components/AdminGuard.tsx
'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isAdmin } = useAuth()
  const router = useRouter()
  console.log(isAdmin,'isAdmin')

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/login')
    } else if (!isAdmin) {
      router.push('/403') // forbidden page
    }
  }, [isLoggedIn, isAdmin, router])

  if (!isAdmin) return null // or a loading spinner
  return <>{children}</>
}
