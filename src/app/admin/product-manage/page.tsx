'use client'

import React, { useEffect } from 'react'
import { Loader2, Plus } from 'lucide-react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { fetchProducts, fetchProductsForAdmin } from '@/store/slices/productSlice'

export default function ProductsListAdmin () {
  const dispatch = useDispatch<AppDispatch>()

  const {
    adminItems: products,
    loading,
    error
  } = useSelector((state: RootState) => state.products)

  console.log(products, 'product')

  useEffect(() => {
    dispatch(fetchProductsForAdmin())
  }, [dispatch])

  return (
    <div className='p-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold mb-6'>📦 Product Listing</h1>
        <Link
          href='/admin/product-manage/create'
          className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition'
        >
          <Plus className='h-4 w-4' />
          Add Pardha
        </Link>
      </div>

      {/* Table */}
      <div className='p-6'>
        {loading ? (
          <div className='flex justify-center py-10'>
            <Loader2 className='h-8 w-8 animate-spin text-gray-500' />
          </div>
        ) : (
          <div className='grid md:grid-cols-3 gap-6'>
            {products.map(p => (
              <div
                key={p.id}
                className='bg-white dark:bg-gray-900 shadow rounded-xl p-6 hover:shadow-lg transition'
              >
                <h2 className='text-lg font-semibold'>{p.name}</h2>
                <p className='text-sm text-gray-500'>SKU: {p.sku}</p>
                <p className='mt-2 text-xl font-bold'>₹{p.price}</p>
                <span
                  className={`mt-2 inline-block px-3 py-1 text-xs rounded-full ${
                    p.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {p.isActive ? 'Active' : 'Draft'}
                </span>

                {/* Actions */}
                <div className='mt-4 flex flex-col gap-2'>
                  <Link
                    href={`/admin/product-manage/detail-view/${p.id}`}
                    className='cursor-pointer text-center w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2 text-sm'
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/product-manage/add-expense/${p.id}`}
                    className='w-full bg-blue-600 text-center hover:bg-blue-700 text-white rounded-lg py-2 text-sm'
                  >
                    Add Materials
                  </Link>
                  <Link
                    href={`/admin/product-manage/add-images/${p.id}`}
                    className='w-full bg-purple-600 text-center hover:bg-purple-700 text-white rounded-lg py-2 text-sm'
                  >
                    Upload Images
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
