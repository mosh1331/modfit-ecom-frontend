'use client'
import { adminAPis } from '@/service/adminApis'
import React, { useEffect, useState } from 'react'
import { PageProps } from '../../../../../../.next/types/app/layout'

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

interface ProductViewProps {
  product: Product
}

export default function ProductView ({ params }: PageProps) {
  console.log(params, 'params')
  //@ts-ignore
  const { productId } = params
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch Product
  const fetchProduct = async () => {
    const res = await adminAPis().getProductDetail(productId)
    if (res?.status === 200) {
      setProduct(res.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  if (loading) return <p className='p-6 text-gray-500'>Loading product...</p>
  if (!product) return <p className='p-6 text-red-500'>Product not found</p>
  return (
    <div className='p-6 space-y-8'>
      {/* Header */}
      <div className='flex flex-col md:flex-row gap-6'>
        {/* Images */}
        <div className='flex-1 space-y-4'>
          {product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className='w-full h-96 object-cover rounded-xl shadow'
            />
          ) : (
            <div className='w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center'>
              <span className='text-gray-500'>No Image Available</span>
            </div>
          )}
          {product.images360.length > 0 && (
            <div className='flex gap-2 overflow-x-auto'>
              {product.images360.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`360-${idx}`}
                  className='w-24 h-24 object-cover rounded-lg border'
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className='flex-1 space-y-4'>
          <h1 className='text-3xl font-bold'>{product.name}</h1>
          <p className='text-gray-600 dark:text-gray-300'>
            {product.description}
          </p>

          <div className='grid grid-cols-2 gap-4 mt-4 text-gray-700 dark:text-gray-200'>
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

          <div className='mt-4 space-y-1'>
            <p>
              <span className='font-semibold'>Total Expense:</span> ₹
              {product.totalExpense}
            </p>
            <p>
              <span className='font-semibold'>Margin:</span>{' '}
              {product.margin.toFixed(2)}%
            </p>
            {product.discount && (
              <p>
                <span className='font-semibold'>Margin @ Discount:</span>{' '}
                {product.discountMargin.toFixed(2)}%
              </p>
            )}
             {product.discount && (
              <p>
                <span className='font-bold '>Margin after Discount:</span>{' '}
                ₹{product.discount - product.totalExpense}
              </p>
            )}
          </div> 
        </div>
      </div>

      {/* Expenses Table */}
      <div className='bg-white dark:bg-gray-900 shadow rounded-xl p-6'>
        <h2 className='text-2xl font-bold mb-4'>💰 Product Expenses</h2>
        <div className='overflow-x-auto'>
          <table className='w-full text-left table-auto border-collapse'>
            <thead>
              <tr className='bg-gray-100 dark:bg-gray-800'>
                <th className='px-4 py-2 border'>Type</th>
                <th className='px-4 py-2 border'>Particular</th>
                <th className='px-4 py-2 border'>Quantity</th>
                <th className='px-4 py-2 border'>Unit Price</th>
                <th className='px-4 py-2 border'>Total Price</th>
                <th className='px-4 py-2 border'>Note</th>
              </tr>
            </thead>
            <tbody>
              {product.expenses.map(exp => (
                <tr
                  key={exp.id}
                  className='hover:bg-gray-50 dark:hover:bg-gray-800'
                >
                  <td className='px-4 py-2 border capitalize'>
                    {exp.expenseType}
                  </td>
                  <td className='px-4 py-2 border'>
                    {exp.material ?  exp.material?.title : exp?.note}
                  </td>
                  <td className='px-4 py-2 border'>{exp.quantity || '—'}</td>
                  <td className='px-4 py-2 border'>
                    {exp.unitPrice ? `₹${exp.unitPrice}` : '—'}
                  </td>
                  <td className='px-4 py-2 border'>₹{exp.totalPrice}</td>
                  <td className='px-4 py-2 border'>{exp.note || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
