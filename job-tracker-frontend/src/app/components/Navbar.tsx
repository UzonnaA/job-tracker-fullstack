'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '@/utils/api'
import { Plus, Search, BarChart2, Wrench } from 'lucide-react'

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const router = useRouter()

  const syncAuthState = () => {
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('username')
    setIsAuthenticated(!!token && !!name)
    setUsername(name)
  }

  useEffect(() => {
    syncAuthState()
    const handleStorage = () => syncAuthState()
    window.addEventListener('storage', handleStorage)
    const interval = setInterval(syncAuthState, 1000)
    return () => {
      window.removeEventListener('storage', handleStorage)
      clearInterval(interval)
    }
  }, [])

  const handleLogout = () => {
    logout()
    syncAuthState()
    router.push('/login')
  }

  return (
    <nav className="w-full bg-white shadow p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        Job Tracker
      </Link>

      {isAuthenticated && (
        <div className="flex items-center gap-5">
          <Link href="/add" className="text-gray-700 hover:text-blue-600">
            <Plus className="w-5 h-5" />
          </Link>
          <Link href="/search" className="text-gray-700 hover:text-blue-600">
            <Search className="w-5 h-5" />
          </Link>
          <Link href="/stats" className="text-gray-700 hover:text-blue-600">
            <BarChart2 className="w-5 h-5" />
          </Link>
          <Link href="/settings" className="text-gray-700 hover:text-blue-600">
            <Wrench className="w-5 h-5" />
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-900 transition"
          >
            Logout (<span className="font-medium">{username}</span>)
          </button>
        </div>
      )}
    </nav>
  )
}
