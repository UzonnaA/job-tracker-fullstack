'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (isAuthenticated === null) {
    return <p className="text-center mt-10">Checking login...</p>
  }

  return <>{isAuthenticated ? children : null}</>
}
