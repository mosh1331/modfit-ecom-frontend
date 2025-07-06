'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { apiServices } from '@/service/apiService'
import { useAuth } from '@/hooks/useAuth'

type CartItem = {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  discountedPrice?: number
}


export default function CartPage () {
  const [cart, setCart] = useState<CartItem[]>([])
  const { user, isLoggedIn } = useAuth()

  console.log(user,'userr',isLoggedIn)

  const [loading, setLoading] = useState(true)


  const fetchCartData = async () => {
    const response = await apiServices().getCart()
    console.log(response, 'response cart ')
    setCart(response?.data)
    setLoading(false)
  }
  useEffect(() => {
    fetchCartData()
  }, [])

  const updateQty = (id: string, qty: number) => {
    setCart(prev =>
      prev.map(item =>
        item.productId === id ? { ...item, quantity: qty } : item
      )
    )
    // apiServices().updateCartItem({productId:id,qty});
  }

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(x => x.productId !== id))
    apiServices().removeFromCart({productId:id});
  }

  const subtotal = cart.reduce(
    (sum, { discountedPrice, price, quantity }) =>
      sum + (discountedPrice ?? price) * quantity,
    0
  )

  if (loading) return <p className='text-center py-10'>Loading your Cart…</p>

  return (
    <div className='text-black container mx-auto px-4 py-10'>
      <h1 className='text-3xl font-bold mb-6'>Your Cart</h1>
      {cart.length === 0 ? (
        <p>
          Your cart is empty.{' '}
          <Link href='/'>
            <span className='text-blue-600 underline'>Go shopping</span>
          </Link>
          .
        </p>
      ) : (
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className='flex-1 space-y-4'>
            {cart.map(item => (
              <div
                key={item.productId}
                className='flex items-center gap-4 bg-white shadow p-4 rounded'
              >
                <img
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className='rounded'
                />
                <div className='flex-1'>
                  <Link
                    href={`/products/${item.productId}`}
                    className='font-semibold'
                  >
                    {item.name}
                  </Link>
                  <div className='mt-2 flex items-center gap-2'>
                    <span>${item.discountedPrice ?? item.price}</span>
                    <input
                      type='number'
                      min='1'
                      value={item.quantity}
                      onChange={e => updateQty(item.productId, +e.target.value)}
                      className='w-16 border rounded px-2'
                    />
                    <button
                      onClick={() => removeItem(item.productId)}
                      className='text-red-500'
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <span className='font-semibold'>
                  ${(item.discountedPrice ?? item.price) * item.quantity}
                </span>
              </div>
            ))}
          </div>
          <div className='w-full lg:w-1/3 bg-gray-50 p-4 rounded shadow'>
            <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
            <div className='flex justify-between py-2'>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Link
              href='/checkout'
              className='block mt-6 bg-black text-white text-center py-2 rounded hover:bg-gray-800'
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
