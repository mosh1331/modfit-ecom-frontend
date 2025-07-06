'use client'

import './globals.css'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/header/Header'

function LayoutContent ({ children }: { children: ReactNode }) {
  // const { user } = useSelector((state: RootState) => state.auth)


  return (
    <html lang='en'>
      <body className='min-h-screen flex flex-col'>
        {/* Header */}
        <Header  />
        {/* Main content */}
        <main className='flex-1 bg-white'>{children}</main>
        <Toaster position='top-right' />
        {/* Footer */}
        <footer className='bg-black text-white w-full text-center text-sm py-4'>
          &copy; 2025 Modtif. All rights reserved.
        </footer>
      </body>
    </html>
  )
}

// Wrap entire layout with Provider
export default function RootLayout ({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <LayoutContent children={children} />
    </Provider>
  )
}
