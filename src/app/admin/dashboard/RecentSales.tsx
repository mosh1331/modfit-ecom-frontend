'use client'
import React from 'react'

export default function RecentSales({ data }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Recent Sales</h2>
      <table className="min-w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Cost</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Margin %</th>
            <th className="px-4 py-2">Method</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sale) => (
            <tr
              key={sale.id}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <td className="px-4 py-2 font-medium">{sale.id}</td>
              <td className="px-4 py-2">{sale.name}</td>
              <td className="px-4 py-2">₹{sale.cost}</td>
              <td className="px-4 py-2">₹{sale.price}</td>
              <td
                className={`px-4 py-2 ${
                  sale.margin >= 35 ? 'text-green-600' : 'text-yellow-600'
                }`}
              >
                {sale.margin}%
              </td>
              <td className="px-4 py-2">{sale.method}</td>
              <td className="px-4 py-2">{sale.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
