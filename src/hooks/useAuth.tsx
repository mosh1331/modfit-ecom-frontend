// hooks/useAuth.ts
import { authAPI } from '@/api/apiRequest'
import { apiServices } from '@/service/apiService'
import { RootState } from '@/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export function useAuth() {
  const { user} = useSelector((state: RootState) => state.auth)
  
 

  return { user,isLoggedIn: !!user }
}
