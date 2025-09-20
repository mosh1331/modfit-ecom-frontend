'use client'
import { useEffect, useState } from 'react'
import { Plus, Download } from 'lucide-react'
import { adminAPis } from '@/service/adminApis'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'

interface LedgerEntry {
  id: number
  createdAt: string
  particular: string
  type: 'income' | 'expense'
  amount: number
  createdBy?: { name: string }
}

export default function LedgerPage () {
  const [ledger, setLedger] = useState<LedgerEntry[]>([])

  const getLedger = async () => {
    const response = await adminAPis().getLedgerData()
    try {
      if (response?.status === 200) {
        setLedger(response?.data)
      } else {
        toast.error('Something went wrong')
      }
    } catch (error) {
      toast.error(error?.message)
    }
    // console.log(response.data, 'response')
  }

  useEffect(() => {
    getLedger()
  }, [])

  const getColor = (type: string) => {
    const caseType = type.toLowerCase()
    switch (caseType) {
      case 'income':
        return { color: 'green' }
      case 'capital':
        return { color: 'orange' }

      default:
        return { color: 'red' }
    }
  }

  return (
    <div className='p-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-semibold'>Ledger</h2>
        <div className='flex gap-2'>
          <button className='px-3 py-1 bg-green-600 text-white rounded-md flex items-center gap-2 hover:bg-green-700'>
            <Plus size={16} /> Add Entry
          </button>
          <button className='px-3 py-1 bg-gray-200 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-300'>
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Ledger Table */}
      <div className='overflow-x-auto border rounded-lg'>
        <table className='w-full text-sm'>
          <thead className='bg-gray-100 dark:bg-gray-800'>
            <tr>
              <th className='text-left px-4 py-2'>Date</th>
              <th className='text-left px-4 py-2'>Particular</th>
              <th className='text-left px-4 py-2'>Type</th>
              <th className='text-right px-4 py-2'>Amount</th>
              <th className='text-left px-4 py-2'>Added By</th>
            </tr>
          </thead>
          <tbody>
            {ledger.map(entry => (
              <tr
                key={entry.id}
                className='border-t hover:bg-gray-50 dark:hover:bg-gray-900'
              >
                <td className='px-4 py-2'>
                  {dayjs(entry.createdAt).format('DD-MM-YYYY')}
                </td>
                <td className='px-4 py-2'>{entry.particular}</td>
                <td
                  style={getColor(entry.type)}
                  className={`px-4 py-2 font-medium `}
                >
                  {entry.type}
                </td>
                <td className='px-4 py-2 text-right'>
                  ₹{entry.amount.toLocaleString()}
                </td>
                <td className='px-4 py-2'>{entry?.createdBy?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className='mt-6 flex justify-end text-sm'>
        <div className='p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 space-y-2'>
          {/* Sales */}
          <p>
            Total Sales:{' '}
            <span className='text-blue-600 font-semibold'>
              ₹
              {ledger
                .filter(e => e.type.toLowerCase() === 'income')
                .reduce((sum, e) => sum + e.amount, 0)
                .toLocaleString()}
            </span>
          </p>

          {/* Investments */}
          <p>
            Total Investments:{' '}
            <span className='text-purple-600 font-semibold'>
              ₹
              {ledger
                .filter(e => e.type.toLowerCase() === 'capital')
                .reduce((sum, e) => sum + e.amount, 0)
                .toLocaleString()}
            </span>
          </p>

          {/* Expenses */}
          <p>
            Total Expenses:{' '}
            <span className='text-red-600 font-semibold'>
              ₹
              {ledger
                .filter(e => e.type.toLowerCase() === 'expense')
                .reduce((sum, e) => sum + e.amount, 0)
                .toLocaleString()}
            </span>
          </p>

          {/* Profit = Sales - Expenses */}
          <p>
            Profit:{' '}
            <span
              className={`font-bold ${
                ledger
                  .filter(e => e.type.toLowerCase() === 'income' )
                  .reduce((sum, e) => sum + e.amount, 0) -
                  ledger
                    .filter(e => e.type.toLowerCase() === 'expense')
                    .reduce((sum, e) => sum + e.amount, 0) >=
                0
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              ₹
              {(
                ledger
                  .filter(e => e.type.toLowerCase() === 'income')
                  .reduce((sum, e) => sum + e.amount, 0) -
                ledger
                  .filter(e => e.type.toLowerCase() === 'expense')
                  .reduce((sum, e) => sum + e.amount, 0)
              ).toLocaleString()}
            </span>
          </p>

          {/* Net Balance = Sales + Investments - Expenses */}
          <p>
            Net Balance:{' '}
            <span
              className={`font-bold ${
                ledger.reduce(
                  (sum, e) =>
                    sum +
                    (e.type.toLowerCase() === 'income' ? e.amount : -e.amount),
                  0
                ) >= 0
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              ₹
              {ledger
                .reduce(
                  (sum, e) =>
                    sum +
                    (e.type.toLowerCase() === 'income' ? e.amount : -e.amount),
                  0
                )
                .toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
