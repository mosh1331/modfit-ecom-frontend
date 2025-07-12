'use client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { loadRazorpay } from '@/utils/helper'
import { RootState } from '@/store'
import { fetchCart } from '@/store/slices/cartSlice'
import { useAuth } from '@/hooks/useAuth'

export default function CheckoutPage () {
  const dispatch = useDispatch()
  const { user } = useAuth()

  // const { user } = useSelector((state: RootState) => state.auth)
  const { items: cartItems, loading } = useSelector(
    (state: RootState) => state.cart
  )

  const [address, setAddress] = useState('')

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchCart())
  }, [dispatch])

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.discountedPrice ?? item.price) * item.quantity,
    0
  )

  console.log(user, 'user')

  const handlePayment = async () => {
    const BASE_URL = process.env.NEXT_PUBLIC_API

    if (!address) return alert('Please enter a shipping address.')

    const res = await loadRazorpay()
    if (!res) return alert('Failed to load Razorpay.')

    try {
      const orderRes = await axios.post(`${BASE_URL}/api/orders/create`, {
        userId: user.id,
        amount: totalAmount,
        address,
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      },{
        withCredentials: true,
        headers: { Accept: 'application/json' }
      })

      const { razorpayOrderId, orderId } = orderRes.data
      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: totalAmount * 100,
        currency: 'INR',
        name: 'Modtif Store',
        description: 'Order Payment',
        order_id: razorpayOrderId,
        handler: async (response: any) => {
          const verifyRes = await axios.post(`${BASE_URL}/api/orders/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId
          },{
            withCredentials: true,
            headers: { Accept: 'application/json' }
          })

          if (verifyRes.data.success) {
            alert('Payment successful! Order placed.')
          } else {
            alert('Payment verification failed.')
          }
        },
        prefill: {
          name: user.name,
          email: user.email
        },
        theme: { color: '#000' }
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error('Error initiating payment:', err)
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Checkout</h1>

      {loading ? (
        <p>Loading cart...</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Summary */}
          <div className='mb-6 text-black'>
            <h2 className='text-lg font-semibold mb-2'>Items</h2>
            {cartItems.map(item => (
              <div
                key={item.productId}
                className='flex justify-between border-b py-2'
              >
                <div>
                  <p className='font-medium'>{item.name}</p>
                  <p className='text-sm text-gray-500'>Qty: {item.quantity}</p>
                </div>
                <p>₹{(item.discountedPrice ?? item.price) * item.quantity}</p>
              </div>
            ))}
            <div className='flex justify-between font-semibold mt-4'>
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          {/* Address */}
          <div className='mb-6 text-black'>
            <h2 className='text-lg font-semibold mb-2'>Shipping Address</h2>
            <textarea
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder='Enter full shipping address'
              className='w-full p-3 border rounded resize-none'
              rows={3}
            />
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            className='bg-black text-white px-6 py-3 rounded hover:bg-gray-800 w-full'
          >
            Pay Now with Razorpay
          </button>
        </>
      )}
    </div>
  )
}
