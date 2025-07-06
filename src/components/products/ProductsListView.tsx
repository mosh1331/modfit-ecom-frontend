'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { fetchProducts } from '@/store/slices/productSlice'
import ModtifLoader from '../loader/ModtifLoader'
import { apiServices } from '@/service/apiService'

type Product = {
  id: string
  name: string
  description: string
  price: number
  discountedPrice?: number
  images: string[]
  category: string
}

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>()

  const { items:products, loading, error } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleDelete = async (id: string) => {
    try {
      await apiServices().deleteProductById(id)
      dispatch(fetchProducts())
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  const addToCart = async (id: string) => {
    try {
      await apiServices().addToCart({ productId: id, quantity: 1 })
    } catch (err) {
      console.error('Add to cart failed:', err)
    }
  }

  if (loading) return <ModtifLoader />
  if (error) return <p className="text-center text-red-600">{error}</p>

  return (
    <div className="bg-white min-h-screen py-10 px-4 sm:px-6 lg:px-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center tracking-tight text-gray-900">
        Shop Clothing
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <Link href={`/products/${product.id}`}>
                <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                  <img
                    src={product.images?.[0] || '/placeholder.jpg'}
                    alt={product.name}
                    width={500}
                    height={625}
                    className="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 truncate">{product.description}</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="text-base font-medium text-gray-900">
                    {product.discountedPrice ? (
                      <>
                        <span className="text-red-600 mr-2">${product.discountedPrice}</span>
                        <span className="line-through text-gray-400 text-sm">${product.price}</span>
                      </>
                    ) : (
                      <>${product.price}</>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="bg-black text-white text-sm px-4 py-1.5 rounded hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-600 text-white text-sm px-4 py-1.5 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found.</p>
      )}
    </div>
  )
}
