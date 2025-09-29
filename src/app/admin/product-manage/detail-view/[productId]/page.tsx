'use client'

import { adminAPis } from '@/service/adminApis'
import React, { use, useEffect, useState } from 'react'

interface Material {
  id: number
  title: string
  unit: string
  stock: number
  avgUnitPrice: number
}

interface Expense {
  id: number
  materialId: number | null
  quantity: number | null
  unitPrice: number | null
  totalPrice: number
  note?: string
  expenseType: 'material' | 'misc'
  material?: Material | null
}

interface Product {
  id: number
  name: string
  description: string
  price: number
  discount?: number
  images: string[]
  images360: string[]
  sizes: string[]
  category: string
  inStock: boolean
  sku: string
  isActive: boolean
  expenses: Expense[]
  totalExpense: number
  margin: number
  discountMargin: number
}

export default function ProductView ({
  params
}: {
  params: Promise<{ productId: number }>
}) {
  const { productId } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  // Fetch Product
  const fetchProduct = async () => {
    const res = await adminAPis().getProductDetail(productId)
    if (res?.status === 200) {
      setProduct(res.data)
    }
    setLoading(false)
  }

  const toggleActivation = async () => {
    if (!product) return
    setUpdating(true)
    try {
      const res = await adminAPis().updateProductStatus(product.id, {
        isActive: !product.isActive
      })
      if (res?.status === 200) {
        fetchProduct()
      }
    } catch (err) {
      console.error('Error updating status', err)
    } finally {
      setUpdating(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  if (loading)
    return (
      <p className='p-6 text-gray-500 w-full h-full grid place-content-center'>
        Loading product...
      </p>
    )
  if (!product) return <p className='p-6 text-red-500'>Product not found</p>

  return (
    <div className='p-4 sm:p-6 space-y-8'>
      {/* Header */}
      <div className='flex flex-col md:flex-row gap-6'>
        {/* Images */}
        <div className='space-y-4 '>
          <div className='w-full h-64 sm:h-96 rounded-xl shadow'>
            {product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className='w-full h-full block object-cover '
              />
            ) : (
              <div className='w-full h-64 sm:h-96 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center'>
                <span className='text-gray-500'>No Image Available</span>
              </div>
            )}
          </div>

          {product.images360.length > 0 && (
            <div className='flex gap-2 overflow-x-auto'>
              {product.images360.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`360-${idx}`}
                  className='w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border flex-shrink-0'
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className='flex-1 space-y-4'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl sm:text-3xl font-bold'>{product.name}</h1>
          </div>

          <p className='text-gray-600 dark:text-gray-300 text-sm sm:text-base'>
            {product.description}
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-gray-700 dark:text-gray-200 text-sm sm:text-base'>
            <p>
              <span className='font-semibold'>Category:</span>{' '}
              {product.category}
            </p>
            <p>
              <span className='font-semibold'>SKU:</span> {product.sku}
            </p>
            <p>
              <span className='font-semibold'>Price:</span> ₹{product.price}
            </p>
            {product.discount && (
              <p>
                <span className='font-semibold'>Discounted:</span> ₹
                {product.discount}
              </p>
            )}
            <p>
              <span className='font-semibold'>Stock Status:</span>{' '}
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
            <p>
              <span className='font-semibold'>Active:</span>{' '}
              {product.isActive ? 'Yes' : 'No'}
            </p>
          </div>

          <div className='mt-4 space-y-1 text-sm sm:text-base'>
            <p>
              <span className='font-semibold'>Total Expense:</span> ₹
              {product.totalExpense}
            </p>
            <p>
              <span className='font-semibold'>Margin:</span>{' '}
              {product?.margin?.toFixed(2)}%
            </p>
            {product.discount && (
              <>
                <p>
                  <span className='font-semibold'>Margin @ Discount:</span>{' '}
                  {product.discountMargin?.toFixed(2)}%
                </p>
                <p>
                  <span className='font-bold'>Margin after Discount:</span> ₹
                  {product.discount - product.totalExpense}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={toggleActivation}
        disabled={updating}
        className={`px-4 py-2 my-4 rounded-lg text-sm font-medium transition ${
          product.isActive
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-green-500 text-white hover:bg-green-600'
        } disabled:opacity-50`}
      >
        {updating
          ? 'Updating...'
          : product.isActive
          ? 'Deactivate'
          : 'Activate'}
      </button>
      {/* Expenses Table */}
      <div className='bg-white dark:bg-gray-900 shadow rounded-xl p-4 sm:p-6'>
        <h2 className='text-lg sm:text-2xl font-bold mb-4'>
          💰 Product Expenses
        </h2>

        {/* Mobile view → Cards */}
        <div className='space-y-4 sm:hidden'>
          {product.expenses.map(exp => (
            <div
              key={exp.id}
              className='border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 shadow-sm'
            >
              <p className='text-sm'>
                <span className='font-semibold'>Type:</span>{' '}
                <span className='capitalize'>{exp.expenseType}</span>
              </p>
              <p className='text-sm'>
                <span className='font-semibold'>Particular:</span>{' '}
                {exp.material ? exp.material?.title : exp?.note}
              </p>
              <p className='text-sm'>
                <span className='font-semibold'>Quantity:</span>{' '}
                {exp.quantity || '—'}
              </p>
              <p className='text-sm'>
                <span className='font-semibold'>Unit Price:</span>{' '}
                {exp.unitPrice ? `₹${exp.unitPrice}` : '—'}
              </p>
              <p className='text-sm'>
                <span className='font-semibold'>Total Price:</span> ₹
                {exp.totalPrice}
              </p>
              <p className='text-sm'>
                <span className='font-semibold'>Note:</span> {exp.note || '—'}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop view → Table */}
        <div className='overflow-x-auto hidden sm:block'>
          <table className='w-full text-left table-auto border-collapse text-sm sm:text-base'>
            <thead>
              <tr className='bg-gray-100 dark:bg-gray-800'>
                <th className='px-2 sm:px-4 py-2 border'>Type</th>
                <th className='px-2 sm:px-4 py-2 border'>Particular</th>
                <th className='px-2 sm:px-4 py-2 border'>Quantity</th>
                <th className='px-2 sm:px-4 py-2 border'>Unit Price</th>
                <th className='px-2 sm:px-4 py-2 border'>Total Price</th>
                <th className='px-2 sm:px-4 py-2 border'>Note</th>
              </tr>
            </thead>
            <tbody>
              {product.expenses.map(exp => (
                <tr
                  key={exp.id}
                  className='hover:bg-gray-50 dark:hover:bg-gray-800'
                >
                  <td className='px-2 sm:px-4 py-2 border capitalize'>
                    {exp.expenseType}
                  </td>
                  <td className='px-2 sm:px-4 py-2 border'>
                    {exp.material ? exp.material?.title : exp?.note}
                  </td>
                  <td className='px-2 sm:px-4 py-2 border'>
                    {exp.quantity || '—'}
                  </td>
                  <td className='px-2 sm:px-4 py-2 border'>
                    {exp.unitPrice ? `₹${exp.unitPrice}` : '—'}
                  </td>
                  <td className='px-2 sm:px-4 py-2 border'>
                    ₹{exp.totalPrice}
                  </td>
                  <td className='px-2 sm:px-4 py-2 border'>
                    {exp.note || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
