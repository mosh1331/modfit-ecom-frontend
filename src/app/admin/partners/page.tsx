'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { adminAPis } from '@/service/adminApis'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { fetchPartners } from '@/store/slices/partnerSlice'

export default function PartnersPage () {
  const [balances, setBalances] = useState<any[]>([])
  const { partners } = useSelector((state: RootState) => state.partner)
  const [form, setForm] = useState({ partnerId: '', amount: '' })
  const dispatch = useDispatch()

  useEffect(() => {
    fetchBalances()
    //@ts-ignore
    dispatch(fetchPartners())
  }, [])

  const fetchBalances = async () => {
    const res = await adminAPis().getPartnerBalances()
    console.log(res, 'resss')
    setBalances(res.data?.balances)
  }



  const handleAddInvestment = async () => {
    if (!form.partnerId || !form.amount) return alert('Fill all fields')
    const data = {
      partnerId: Number(form.partnerId),
      amount: parseFloat(form.amount),
      createdById: 1 // TODO: Replace with logged-in user id
    }
    await adminAPis().logInvestment(data)
    setForm({ partnerId: '', amount: '' })
    fetchBalances()
  }

  return (
    <div className='p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>
        Partner Balances
      </h2>

      {/* Investment Form */}
      <div className='flex gap-2 mb-6'>
        <select
          className='px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-gray-200'
          value={form.partnerId}
          onChange={e => setForm({ ...form, partnerId: e.target.value })}
        >
          <option value=''>Select Partner</option>
          {partners.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <input
          type='number'
          placeholder='Amount'
          className='px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-gray-200'
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
        />
        <button
          onClick={handleAddInvestment}
          className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
        >
          Add Investment
        </button>
      </div>

      {/* Balances Table */}
      <table className='w-full border-collapse border dark:border-gray-700'>
        <thead className='bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'>
          <tr>
            <th className='border px-4 py-2'>Partner</th>
            <th className='border px-4 py-2'>Expected</th>
            <th className='border px-4 py-2'>Actual</th>
            <th className='border px-4 py-2'>Balance</th>
          </tr>
        </thead>
        <tbody>
          {balances.map((b, idx) => (
            <tr key={idx} className='text-gray-700 dark:text-gray-300'>
              <td className='border px-4 py-2'>
                {' '}
                <Link href={`/admin/partners/${b.id}`}>{b.partner}</Link>
              </td>
              <td className='border px-4 py-2'>{b.expected.toFixed(2)}</td>
              <td className='border px-4 py-2'>{b.actual.toFixed(2)}</td>
              <td
                className={`border px-4 py-2 ${
                  b.balance >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {b.balance.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
