'use client'
import { salesData } from '@/utils/data'
import React, { useState } from 'react'

export default function SalesPage () {
  const data = salesData
  const [query, setQuery] = useState('')

  const filtered = data.filter(
    sale =>
      sale.name.toLowerCase().includes(query.toLowerCase()) ||
      sale.id.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className='bg-white dark:bg-gray-900 rounded-2xl shadow p-4 overflow-x-auto'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold'>All Sales</h2>
        <input
          type='text'
          placeholder='Search...'
          className='px-3 py-1 border rounded-md dark:bg-gray-800 dark:border-gray-700'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <table className='min-w-full text-sm text-left border-collapse'>
        <thead>
          <tr className='bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'>
            <th className='px-4 py-2'>ID</th>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Cost</th>
            <th className='px-4 py-2'>Price</th>
            <th className='px-4 py-2'>Margin %</th>
            <th className='px-4 py-2'>Method</th>
            <th className='px-4 py-2'>Date</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(sale => (
            <tr
              key={sale.id}
              className='border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition'
            >
              <td className='px-4 py-2 font-medium'>{sale.id}</td>
              <td className='px-4 py-2'>{sale.name}</td>
              <td className='px-4 py-2'>₹{sale.cost}</td>
              <td className='px-4 py-2'>₹{sale.price}</td>
              <td
                className={`px-4 py-2 ${
                  sale.margin >= 35 ? 'text-green-600' : 'text-yellow-600'
                }`}
              >
                {sale.margin}%
              </td>
              <td className='px-4 py-2'>{sale.method}</td>
              <td className='px-4 py-2'>{sale.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
