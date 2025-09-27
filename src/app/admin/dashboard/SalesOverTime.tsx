'use client'
import dayjs from 'dayjs'
import React from 'react'
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RTooltip,
  Legend,
  LineChart,
  Line
} from 'recharts'

export default function SalesOverTime({ data, variants }) {

  const formattedData = data.map(i => {
    return {...i,date:dayjs(i.date).format('DD MMM')}
  })
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4 mb-4">
      <h2 className="text-lg font-semibold mb-4">Sales vs Expenses Over Time</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis dataKey="date" />
            <YAxis />
            <RTooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
