'use client'
import { adminAPis } from '@/service/adminApis'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function SalesPage() {
  const [sales, setSales] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchSales = async () => {
      const res = await adminAPis().getSales()
      
      setSales(res.data)
    }
    fetchSales()
  }, [])

  const filtered = sales.filter(
    (sale: any) =>
      sale.customerName?.toLowerCase().includes(query.toLowerCase()) ||
      sale.id.toString().includes(query)
  )

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">All Sales</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name or ID..."
            className="px-3 py-1 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <Link
            href={'/admin/sales/add'}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            + Add Sale
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Items</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((sale: any) => (
              <tr
                key={sale.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="px-4 py-2 font-medium">{sale.id}</td>
                <td className="px-4 py-2">{sale.customerName || 'N/A'}</td>
                <td className="px-4 py-2">{sale.items.length}</td>
                <td className="px-4 py-2 font-semibold">
                  ₹{sale.items.reduce((sum: number, i: any) => sum + i.subtotal, 0)}
                </td>
                <td className="px-4 py-2">
                  {new Date(sale.saleDate || sale.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
