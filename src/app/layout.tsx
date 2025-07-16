'use client'
import './globals.css'
import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/header/Header'
import { Toaster } from 'react-hot-toast'

// 👇 Dynamically load ReduxProvider on client only
const ReduxProvider = dynamic(() => import('@/store/ReduxProvider'), { ssr: false })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className='min-h-screen flex flex-col'>
        <ReduxProvider>
          <Header />
          <main className='flex-1 bg-white'>{children}</main>
          <Toaster position='top-right' />
          <footer className='bg-black text-white w-full text-center text-sm py-4'>
            &copy; 2025 Modtif. All rights reserved.
          </footer>
        </ReduxProvider>
      </body>
    </html>
  )
}
