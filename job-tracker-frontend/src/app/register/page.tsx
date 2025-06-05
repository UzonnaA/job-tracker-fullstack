'use client'
import { useState } from 'react'
import { register } from '@/utils/api'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await register(username, password)
      setSuccess('Registration successful! Redirecting to login...')
      setTimeout(() => router.push('/login'), 1500)
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-900"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">
        Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
      </p>
    </div>
  )
}
