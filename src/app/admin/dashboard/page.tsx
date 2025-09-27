'use client'
import React, { useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
  Cell
} from 'recharts'
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
import KPI from './Kpi'
import SalesOverTime from './SalesOverTime'
import ExpenseByCategory from './ExpenseByCategory'
import PartnerContributions from './PartnerContribution'
import RecentSales from './RecentSales'
import { adminAPis } from '@/service/adminApis'

/**
 * Clothing Biz — Admin Dashboard
 * UI-only (no backend). Wire real data later.
 * - Tailwind CSS layout
 * - Recharts for charts
 * - Framer Motion micro-interactions
 */

const kpi = [
  {
    label: 'Total Sales',
    value: '₹2,48,900',
    sub: '+12.4% MoM',
    icon: Receipt,
    key:'totalSales'
  },
  {
    label: 'Total Expenses',
    value: '₹1,62,350',
    sub: '-3.1% MoM',
    icon: Wallet,
    key:'totalExpenses'
  },
  {
    label: 'Net Profit',
    value: '₹86,550',
    sub: '34.8% margin',
    icon: LineChartIcon,
    key:'netProfit'
  },
  { label: 'Avg. Margin', value: '34.8%', sub: '+2.1 pts', icon: Percent ,key:'avgMargin'}
]

// const salesOverTime = [
//   { date: 'Jul 01', sales: 12000, expense: 7000 },
//   { date: 'Jul 08', sales: 18500, expense: 9000 },
//   { date: 'Jul 15', sales: 21000, expense: 11000 },
//   { date: 'Jul 22', sales: 26000, expense: 13000 },
//   { date: 'Jul 29', sales: 30500, expense: 15000 },
//   { date: 'Aug 05', sales: 35500, expense: 17500 },
//   { date: 'Aug 12', sales: 41000, expense: 19000 },
//   { date: 'Aug 19', sales: 45500, expense: 21500 }
// ]

const expenseByCategory = [
  { name: 'Material', value: 54000 },
  { name: 'Stitching', value: 38000 },
  { name: 'Lining', value: 16000 },
  { name: 'Packaging', value: 9000 },
  { name: 'Other', value: 4500 }
]

const partnerContrib = [
  { partner: 'A', contribution: 52000 },
  { partner: 'B', contribution: 47000 },
  { partner: 'C', contribution: 42000 },
  { partner: 'Company', contribution: 21400 }
]

const recentSales = [
  {
    id: 'P-1029',
    name: 'Pardha — Rose Gold',
    cost: 940,
    price: 1490,
    margin: 36.9,
    method: 'UPI',
    date: 'Aug 24'
  },
  {
    id: 'P-1030',
    name: 'Pardha — Midnight Blue',
    cost: 980,
    price: 1590,
    margin: 38.4,
    method: 'Cash',
    date: 'Aug 24'
  },
  {
    id: 'P-1031',
    name: 'Pardha — Olive Lined',
    cost: 1120,
    price: 1690,
    margin: 33.7,
    method: 'UPI',
    date: 'Aug 23'
  },
  {
    id: 'P-1032',
    name: 'Pardha — Sand Beige',
    cost: 880,
    price: 1450,
    margin: 39.3,
    method: 'Online',
    date: 'Aug 22'
  }
]

const variants = {
  fadeIn: { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } }
}

export default function AdminDashboard () {
  const [kpiData, setKpiData] = useState(null)
  const [salesOverTime, setSalesOverTime] = useState([])

  const getKpi = async () => {
    try {
      const response = await adminAPis().getKpiSummary()
      setKpiData(response?.data)
      console.log(response, 'response')
    } catch (error) {
      console.log(error?.message)
    }
  }

  const getSalesVsExpenseData = async () => {
    try {
      const response = await adminAPis().getSalesVsExpense()
      setSalesOverTime(response?.data)
      console.log(response, 'response')
    } catch (error) {
      console.log(error?.message)
    }
  }

  useEffect(() => {
    getKpi()
    getSalesVsExpenseData()
  }, [])
  return (
    <div className='w-full'>
      <KPI kpi={kpi} kpiData={kpiData} variants={variants} />
      <SalesOverTime data={salesOverTime} variants={variants} />
      <ExpenseByCategory data={expenseByCategory} />
      {/* <PartnerContributions data={partnerContrib} /> */}
      <RecentSales data={recentSales} />
    </div>
  )
}
