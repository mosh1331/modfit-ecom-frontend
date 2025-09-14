'use client'
import React from 'react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RTooltip,
  Legend
} from 'recharts'

const COLORS = ['#6366f1', '#22c55e', '#eab308', '#06b6d4', '#ef4444']

export default function ExpenseByCategory({ data }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4 mb-4">
      <h2 className="text-lg font-semibold mb-4">Expenses by Category</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <RTooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
