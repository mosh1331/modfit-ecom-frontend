"use client"
import { useEffect, useState } from "react"
import { adminAPis } from "@/service/adminApis"
import { Material } from "@/type/productType"

interface Expense {
  id: number
  materialId: number
  quantity: number
  unitPrice: number
  totalPrice: number
  note?: string
  material: Material
}

interface Product {
  id: number
  name: string
  description: string
  category: string
  price: number
  discount?: number | null
  images: string[]
  images360: string[]
  sizes: string[]
  sku: string
  inStock: boolean
  isActive: boolean
  expenses: Expense[]
}

export default function ProductDetailView({ params }: { params: { productId: number } }) {
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

  if (loading) return <p className="p-6 text-gray-500">Loading product...</p>
  if (!product) return <p className="p-6 text-red-500">Product not found</p>

  // --- Calculations ---
  const totalCost = product.expenses.reduce((sum, e) => sum + e.totalPrice, 0)
  const margin =
    product.price && totalCost
      ? ((product.price - totalCost) / totalCost) * 100
      : null
  const discountMargin =
    product.discount && totalCost
      ? ((product.discount - totalCost) / totalCost) * 100
      : null

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* --- Product Header --- */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 flex flex-col md:flex-row gap-6">
        {/* Product Images */}
        <div className="flex-1">
          {product.images?.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="rounded-lg w-full h-64 object-cover"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  className="w-20 h-20 object-cover rounded-md border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-3">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-sm text-gray-500">SKU: {product.sku}</p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <p className="text-sm text-gray-500">
            Status:{" "}
            <span
              className={`px-2 py-1 text-xs rounded ${
                product.isActive ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {product.isActive ? "Active" : "Draft"}
            </span>
          </p>

          <div className="space-y-1">
            <p className="text-lg font-semibold">Price: ₹{product.price}</p>
            {product.discount && (
              <p className="text-lg font-semibold text-green-600">
                Discounted: ₹{product.discount}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* --- Material Expenses --- */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4">🧾 Materials Used</h3>
        {product.expenses.length === 0 ? (
          <p className="text-gray-500">No materials logged.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="text-left p-2">Material</th>
                <th className="text-left p-2">Qty</th>
                <th className="text-left p-2">Unit Price</th>
                <th className="text-left p-2">Total</th>
                <th className="text-left p-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {product.expenses.map(e => (
                <tr key={e.id} className="border-b">
                  <td className="p-2">{e.material.title}</td>
                  <td className="p-2">
                    {e.quantity} {e.material.unit}
                  </td>
                  <td className="p-2">₹{e.unitPrice}</td>
                  <td className="p-2">₹{e.totalPrice}</td>
                  <td className="p-2">{e.note || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Totals & Margin */}
        <div className="mt-4 space-y-1">
          <p>
            <span className="font-semibold">Total Cost:</span> ₹{totalCost}
          </p>
          <p>
            <span className="font-semibold">Margin:</span>{" "}
            {margin !== null ? `${margin.toFixed(2)}%` : "—"}
          </p>
          {product.discount && (
            <p>
              <span className="font-semibold">Margin @ Discount:</span>{" "}
              {discountMargin !== null ? `${discountMargin.toFixed(2)}%` : "—"}
            </p>
          )}
        </div>
      </div>

      {/* --- 360 Images --- */}
      {product.images360.length > 0 && (
        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4">🌀 360° Images</h3>
          <div className="flex gap-2 overflow-x-auto">
            {product.images360.map((img, idx) => (
              <img
                key={idx}
                src={img}
                className="w-32 h-32 object-cover rounded-md border"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
