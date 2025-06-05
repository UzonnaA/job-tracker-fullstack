'use client';
import { useRouter } from 'next/navigation';
import { login } from '@/utils/api';
import { useState, useEffect } from 'react'

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(username, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

//   useEffect(() => {
//   const token = localStorage.getItem('token')
//   if (token) {
//     router.push('/search')
//   }
// }, [])

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-900"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account? <a href="/register" className="text-red-600 hover:underline">Register</a>
        </p>
    </div>
  );
}
