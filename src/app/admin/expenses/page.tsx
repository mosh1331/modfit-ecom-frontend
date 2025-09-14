'use client'
import { adminAPis } from '@/service/adminApis'
import { RootState } from '@/store'
import { fetchPartners } from '@/store/slices/partnerSlice'
import { expensesData } from '@/utils/data'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

export default function ExpensesPage () {
  // const data = expensesData
  const [expenses, setExpenses] = useState([])
  // const [partners, setPartners] = useState<any[]>([])
  const { partners } = useSelector((state: RootState) => state.partner)
  const dispatch = useDispatch()
  console.log(partners, 'partners')

  const [form, setForm] = useState({
    particular: '',
    amount: '',
    note: '',
    date: '',
    fundedById: ''
  })

  const getExpenses = async () => {
    const response = await adminAPis().getAllExpenses()
    try {
      if (response?.status === 200) {
        setExpenses(response?.data)
      } else {
        toast.error('Something went wrong')
      }
    } catch (error) {
      toast.error(error?.message)
    }
    // console.log(response.data, 'response')
  }

  const handleAdd = async () => {
    if (!form.particular || !form.amount) return
    try {
      const data = {
        particular: form.particular,
        amount: parseFloat(form.amount),
        note: form.note || '',
        date: form.date || new Date().toISOString().split('T')[0],
        createdById: 1, // 👈 replace with logged-in user id
        fundedById: parseInt(form?.fundedById)
      }
      const response = await adminAPis().logExpense(data)

      console.log(response, 'response')

      setForm({
        particular: '',
        amount: '',
        note: '',
        date: '',
        fundedById: ''
      })
      getExpenses()
    } catch (error) {}
  }

  const getContributer = id => {
    return id ? partners.find(i => i.id === id)?.name : 'Company'
  }
  useEffect(() => {
    getExpenses()
    //@ts-ignore
    dispatch(fetchPartners())
  }, [])

  return (
    <div className='bg-white dark:bg-gray-900 rounded-2xl shadow p-4'>
      <h2 className='text-lg font-semibold mb-4'>Expenses</h2>

      {/* Add Expense Form */}
      <div className='flex gap-2 mb-4'>
        <input
          type='text'
          placeholder='Particular / Category'
          className='px-3 py-1 border rounded-md dark:bg-gray-800 dark:border-gray-700'
          value={form.particular}
          onChange={e => setForm({ ...form, particular: e.target.value })}
        />
        <input
          type='number'
          placeholder='Amount'
          className='px-3 py-1 border rounded-md dark:bg-gray-800 dark:border-gray-700'
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
        />
        <input
          type='text'
          placeholder='Note (optional)'
          className='px-3 py-1 border rounded-md dark:bg-gray-800 dark:border-gray-700'
          value={form.note}
          onChange={e => setForm({ ...form, note: e.target.value })}
        />
        <input
          type='date'
          className='px-3 py-1 border rounded-md dark:bg-gray-800 dark:border-gray-700'
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
        />
        <select
          className='px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-gray-200'
          value={form.fundedById}
          onChange={e => setForm({ ...form, fundedById: e.target.value })}
        >
          <option value=''>Contributer</option>
          {partners.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <button
          className='px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700'
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      {/* Expenses Table */}
      <table className='min-w-full text-sm text-left border-collapse'>
        <thead>
          <tr className='bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'>
            <th className='px-4 py-2'>Date</th>
            <th className='px-4 py-2'>Particular</th>
            <th className='px-4 py-2'>Amount</th>
            <th className='px-4 py-2'>Note</th>
            <th className='px-4 py-2'>Contributer</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr
              key={exp.id}
              className='border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition'
            >
              <td className='px-4 py-2'>
                {dayjs(exp.createdAt).format('DD-MM-YYYY')}
              </td>
              <td className='px-4 py-2'>{exp.particular}</td>
              <td className='px-4 py-2'>₹{exp.amount}</td>
              <td className='px-4 py-2'>{exp.note}</td>
              <td className='px-4 py-2 capitalize'>{getContributer(exp?.fundedById)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
