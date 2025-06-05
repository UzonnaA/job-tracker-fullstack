'use client'
import { useState, useEffect } from 'react'

export function useAuth(): boolean | null {
  const [auth, setAuth] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    setAuth(!!token && !!username)
  }, [])

  return auth
}