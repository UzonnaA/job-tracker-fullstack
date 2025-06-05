'use client'
import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Link from 'next/link'

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    AOS.init({ duration: 800, once: true })
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('username')
    if (token && name) {
      setIsAuthenticated(true)
      setUsername(name)
    }
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
      <div data-aos="fade-up" className="space-y-4">
        <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
          Welcome to <span className="text-blue-600">Job Tracker</span>
        </h1>
        {isAuthenticated && username && (
          <p className="text-xl text-gray-700 mt-2">Hello, {username}!</p>
        )}
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Add and manage your job applications easily.
        </p>
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          {isAuthenticated ? (
            <>
              <Link href="/add" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded shadow transition">
                Add Application
              </Link>
              <Link href="/search" className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded shadow transition">
                Search Applications
              </Link>
            </>
          ) : (
            <Link href="/login" className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-5 py-2.5 rounded shadow transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}
