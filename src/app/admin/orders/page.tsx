'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiServices } from '@/service/apiService'
import { adminAPis } from '@/service/adminApis'
import ModtifLoader from '@/components/loader/ModtifLoader'

export default function AdminOrdersPage () {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    const res = await adminAPis().getAllOrders()
    console.log('orders', res.data)
    setOrders(res.data)
    setLoading(false)
  }

  const updateStatus = async (orderId: number, status: string) => {}

  const saveStatus = async (orderId: number, status: string) => {
    console.log(orderId, 'order id')
    try {
      setLoading(true)
      const data = { shippingStatus: status }
      const response = await adminAPis().updateOrderStatus(orderId, data)
      console.log(response, 'saveRes')
      fetchOrders()
    } catch (error) {
      fetchOrders()
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  if (loading) return <ModtifLoader />

  return (
    <div className='p-6 !text-black'>
      <h1 className='text-2xl font-bold mb-4'>Latest Orders</h1>
      <table className='w-full border text-left'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='p-2'>Order ID</th>
            <th className='p-2'>User</th>
            <th className='p-2'>Created</th>
            <th className='p-2'>Status</th>
            <th className='p-2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr key={order.id} className='border-t'>
              <td className='p-2'>{order.id}</td>
              <td className='p-2'>{order.user?.email}</td>
              <td className='p-2'>
                {new Date(order.createdAt).toLocaleString()}
              </td>
              <td className='p-2'>
                <select
                  className='border rounded p-1'
                  value={order.shippingStatus}
                  onChange={e => saveStatus(order.id, e.target.value)}
                >
                  <option value='processing'>Processing</option>
                  <option value='dispatched'>Dispatched</option>
                  <option value='in_transit'>In Transit</option>
                  <option value='delivered'>Delivered</option>
                  <option value='refunded'>Refunded</option>
                </select>
              </td>
              <td className='p-2'>
                <button
                  className='bg-black text-white px-3 py-1 rounded'
                  onClick={() => saveStatus(order.id, order.shippingStatus)}
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
