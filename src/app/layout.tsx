'use client'

import './globals.css'
import { ReactNode } from 'react'
import { Provider, useSelector } from 'react-redux'
import { store, RootState } from '@/store'
import Link from 'next/link'
import { ShoppingBagIcon } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'

function LayoutContent({ children }: { children: ReactNode }) {
  // const { user } = useSelector((state: RootState) => state.auth)
  const { user } = useAuth()
  console.log(user,'user layout')
  const isLoggedIn = !!user

  return (
    <html lang='en'>
      <body className='min-h-screen flex flex-col'>
        {/* Header */}
        <header className='w-full bg-black shadow p-4 flex justify-between items-center'>
          <Link href='/' className='text-xl font-bold text-white'>
            Modtif
          </Link>
          <div className='space-x-4 flex'>
            {!isLoggedIn ? (
              <Link href='/auth/login' className='text-blue-400 hover:underline'>
                Login
              </Link>
            ) : (
              <Link href='/cart' className='text-blue-400 hover:underline'>
                <ShoppingBagIcon />
              </Link>
            )}
            <Link href='/cart' className='text-blue-400 hover:underline'>
                <ShoppingBagIcon />
              </Link>
          </div>
        </header>

        {/* Main content */}
        <main className='flex-1'>
          {children}
        </main>

        <Toaster position="top-right" />

        {/* Footer */}
        <footer className='bg-black text-white w-full text-center text-sm py-4'>
          &copy; 2025 Modtif. All rights reserved.
        </footer>
      </body>
    </html>
  )
}

// Wrap entire layout with Provider
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <LayoutContent children={children} />
    </Provider>
  )
}
