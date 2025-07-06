'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiServices } from '@/service/apiService'

export default function RegisterPage () {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await apiServices().signUp({ name, email, password })
      if (res.status === 201) {
        router.push('/') // Redirect after successful registration
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`
  }

  return (
    <div className=' !text-black min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='max-w-md w-full bg-white shadow-lg rounded-xl p-8 sm:p-10'>
        <h2 className='text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800'>
          Create your account
        </h2>

        <form onSubmit={handleRegister} className='space-y-4'>
          <input
            type='text'
            placeholder='Full Name'
            required
            className='w-full px-4 py-3 border rounded-md focus:outline-none focus:ring focus:ring-black'
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            type='email'
            placeholder='Email'
            required
            className='w-full px-4 py-3 border rounded-md focus:outline-none focus:ring focus:ring-black'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type='password'
            placeholder='Password'
            required
            className='w-full px-4 py-3 border rounded-md focus:outline-none focus:ring focus:ring-black'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <button
            type='submit'
            className='w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition'
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className='my-6 text-center text-gray-500 text-sm'>or</div>

        <button
          onClick={handleGoogleSignUp}
          className='w-full flex items-center justify-center border py-3 rounded-md hover:bg-gray-100 transition'
        >
          <img src='/google.svg' alt='Google' className='h-5 w-5 mr-2' />
          Sign up with Google
        </button>

        <p className='mt-6 text-sm text-center text-gray-500'>
          Already have an account?{' '}
          <a href='/login' className='text-black font-medium hover:underline'>
            Login
          </a>
        </p>
      </div>
    </div>
  )
}
