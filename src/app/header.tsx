'use client'
import React from 'react'
import {
  Menu,
  Download,
  Search,
  Plus,
  Filter,
  ChevronDown,
  Sun,
  MoonStar,
  Wallet,
  Receipt,
  Shirt,
  LineChart as LineChartIcon,
  Percent,
  Users
} from 'lucide-react'

const AdminHeader = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  function ModeToggle () {
    const [dark, setDark] = React.useState(false)
    React.useEffect(() => {
      if (dark) document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
    }, [dark])
    return (
      <button
        className='border rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800'
        onClick={() => setDark(d => !d)}
      >
        {dark ? <Sun className='h-4 w-4' /> : <MoonStar className='h-4 w-4' />}
      </button>
    )
  }
  return (
    <div className='sticky top-0 z-40 w-full backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b'>
      <div className='mx-auto max-w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <button
            className='lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'
            onClick={onToggleSidebar}
          >
            <Menu className='h-5 w-5' />
          </button>
          <div className='flex items-center gap-2'>
            <Shirt className='h-6 w-6' />
            <span className='font-semibold text-lg tracking-tight'>
              Modtif Admin
            </span>
            <span className='text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full'>
              v0.1
            </span>
          </div>
        </div>
        <div className='hidden md:flex items-center gap-2'>
          <div className='relative w-72'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-70' />
            <input
              placeholder='Search orders, pardhas, customers…'
              className='pl-9 w-full py-2 rounded-xl border bg-white dark:bg-gray-800'
            />
          </div>
          <select className='py-2 px-3 rounded-xl border bg-white dark:bg-gray-800'>
            <option>Last 30 days</option>
            <option>Today</option>
            <option>Last 7 days</option>
            <option>This quarter</option>
            <option>YTD</option>
          </select>
          <button className='border px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800'>
            <Download className='h-4 w-4' /> Export
          </button>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

export default AdminHeader
