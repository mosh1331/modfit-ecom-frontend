'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { apiServices } from '@/service/apiService'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
   
    try {
      console.log(email,password,'auth data')
      const res = await apiServices().login({ email, password })
      if (res.status === 200) {
        toast.success('log in success')
        router.push('/') // Redirect to homepage or dashboard
      }
    } catch (err) {
      toast(err.response?.data?.message || err?.message || 'Login failed')
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`
  }

  return (
    <div className="!text-black min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome to <span className="text-black">Modtif</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="my-6 text-center text-gray-500 text-sm">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border py-3 rounded-md hover:bg-gray-100 transition"
        >
          <img src="/google.svg" alt="Google" className="h-5 w-5 mr-2" />
          Sign in with Google
        </button>

        <p className="mt-6 text-sm text-center text-gray-500">
          Don't have an account?{' '}
          <a href="/register" className="text-black font-medium hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}
