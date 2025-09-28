'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDownIcon, ShoppingBagIcon, UserIcon } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useDispatch } from 'react-redux'
import { logoutAction } from '@/store/slices/authSlice'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user ,isLoggedIn} = useAuth()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  console.log(user,'user')

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  // 🔄 Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])



  return (
    <header className='w-full bg-black shadow p-4 flex justify-between items-center relative z-50'>
      <Link href='/' className='text-xl font-bold text-white'>
        Modtif
      </Link>

      <div className='space-x-4 flex items-center text-white'>
        {!isLoggedIn ? (
          <Link href='/auth/login' className='text-blue-400 hover:underline'>
            Login
          </Link>
        ) : (
          <>

            {/* User Dropdown */}
            <div className='relative' ref={dropdownRef}>
              <button
                onClick={toggleMenu}
                className='flex items-center gap-1 hover:text-gray-300 focus:outline-none'
              >
                <UserIcon className='w-6 h-6' />
                <ChevronDownIcon className='w-4 h-4' />
              </button>

              {/* Dropdown */}
              <div
                className={`
                  absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg py-2
                  transform transition-all duration-200 origin-top-right
                  ${menuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
                `}
              >
                <p className='px-4 py-2 text-sm text-gray-600'>Hi, {user?.name || 'User'}</p>
                {/* 
                //@ts-ignore */}
                {user?.isAdmin ? <Link href='/admin/dashboard' className='block px-4 py-2 hover:bg-gray-100'>
                  Dashboard
                </Link>:<Link href='/profile' className='block px-4 py-2 hover:bg-gray-100'>
                  My Profile
                </Link>}
                <Link href='/cart' className='block px-4 py-2 hover:bg-gray-100'>
                  My Cart
                </Link>
                <Link href='/orders' className='block px-4 py-2 hover:bg-gray-100'>
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    //@ts-ignore
                    dispatch(logoutAction())
                  }}
                  className='block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500'
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
