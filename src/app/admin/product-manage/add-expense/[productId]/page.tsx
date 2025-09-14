'use client'
import { useEffect, useState } from 'react'
import { adminAPis } from '@/service/adminApis'
import { Material } from '@/type/productType'

interface Product {
  id: number
  name: string
  description: string
  price: number
  discount?: number
  expenses: Expense[]
}

interface Expense {
  id: number
  materialId: number
  quantity: number
  unitPrice: number
  totalPrice: number
  note?: string
  material: Material
}

interface Props {
  params: { productId: number }
}

interface MaterialEntry {
  materialId: number | ''
  quantity: number
  unitPrice: number
  unit: string
  note?: string
}

export default function AddProductExpenseView({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null)
  const [materials, setMaterials] = useState<Material[]>([])
  const [entries, setEntries] = useState<MaterialEntry[]>([
    { materialId: '', quantity: 0, unitPrice: 0, unit: '' }
  ])
  const [price, setPrice] = useState<number>(0)
  const [discountedPrice, setDiscountedPrice] = useState<number | ''>('')
  const [loading, setLoading] = useState(true)

  const { productId } = params

  // --- Fetch product detail
  const fetchProduct = async () => {
    const res = await adminAPis().getProductDetail(productId)
    if (res?.status === 200) {
      setProduct(res.data)
      setPrice(res.data.price || 0)
      setDiscountedPrice(res.data.discount || '')
    }
    setLoading(false)
  }

  // --- Fetch materials
  const fetchMaterials = async () => {
    const res = await adminAPis().getMaterials()
    if (res?.status === 200) setMaterials(res.data)
  }

  // --- Handle material selection (auto-fill unit & unitPrice)
  const handleMaterialChange = (index: number, materialId: number) => {
    const material = materials.find(m => m.id === materialId)
    if (!material) return

    const updated = [...entries]
    updated[index].materialId = material.id
    updated[index].unitPrice = material.unitPrice ?? 0 // assuming backend provides unitPrice in Material
    updated[index].unit = material.unit
    setEntries(updated)
  }

  // --- Update entry field
  const updateEntry = (
    index: number,
    field: keyof MaterialEntry,
    value: string | number
  ) => {
    const updated = [...entries]
    ;(updated[index][field] as any) = value
    setEntries(updated)
  }

  // --- Add new row
  const addEntryRow = () => {
    setEntries([...entries, { materialId: '', quantity: 0, unitPrice: 0, unit: '' }])
  }

  // --- Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const expenses = entries
      .filter(e => e.materialId && e.quantity > 0)
      .map(e => ({
        materialId: e.materialId,
        quantity: e.quantity,
        unitPrice: e.unitPrice,
        note: e.note
      }))

    if (expenses.length === 0) {
      return alert('Please add at least one material expense')
    }

    const payload = {
      price,
      discountedPrice: discountedPrice || undefined,
      expenses
    }

    const res = await adminAPis().updateProductExpense(productId, payload)
    if (res?.status === 201 || res?.status === 200) {
      fetchProduct()
      setEntries([{ materialId: '', quantity: 0, unitPrice: 0, unit: '' }])
    }
  }

  useEffect(() => {
    fetchProduct()
    fetchMaterials()
  }, [])

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>
  if (!product) return <p className="p-6 text-red-500">Product not found</p>

  // --- Live totals
  const newExpensesTotal = entries.reduce((sum, e) => sum + e.quantity * e.unitPrice, 0)
  const totalCost = product.expenses.reduce((sum, e) => sum + e.totalPrice, 0) + newExpensesTotal
  const margin =
    price && totalCost ? ((price - totalCost) / totalCost) * 100 : null
  const discountMargin =
    discountedPrice && totalCost
      ? (((+discountedPrice) - totalCost) / totalCost) * 100
      : null

  return (
    <div className="p-6 space-y-6">
      {/* Product Info */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
        <div className="mt-4 space-y-2">
          <p><span className="font-semibold">Base Price:</span> ₹{product.price}</p>
          {product.discount && (
            <p><span className="font-semibold">Discounted Price:</span> ₹{product.discount}</p>
          )}
          <p><span className="font-semibold">Total Existing Cost:</span> ₹{totalCost}</p>
          <p><span className="font-semibold">Margin:</span> {margin !== null ? `${margin.toFixed(2)}%` : '—'}</p>
          {discountMargin !== null && (
            <p><span className="font-semibold">Margin @ Discount:</span> {discountMargin.toFixed(2)}%</p>
          )}
        </div>
      </div>

      {/* Add Expense Form */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4">➕ Add Product Expenses</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Price Fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Product Price</label>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                className="border rounded-lg p-2"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Discounted Price (optional)</label>
              <input
                type="number"
                value={discountedPrice}
                onChange={e => setDiscountedPrice(e.target.value ? Number(e.target.value) : '')}
                className="border rounded-lg p-2"
              />
            </div>
          </div>

          {/* Material Rows */}
          {entries.map((entry, index) => (
            <div key={index} className="grid gap-4 md:grid-cols-5 items-end border-b pb-4 mb-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Material</label>
                <select
                  value={entry.materialId}
                  onChange={e => handleMaterialChange(index, Number(e.target.value))}
                  className="border rounded-lg p-2"
                  required
                >
                  <option value="">Select Material</option>
                  {materials.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.title} ({m.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Quantity ({entry.unit || ''})</label>
                <input
                  type="number"
                  value={entry.quantity}
                  onChange={e => updateEntry(index, 'quantity', Number(e.target.value))}
                  className="border rounded-lg p-2"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Unit Price</label>
                <input
                  type="number"
                  value={entry.unitPrice}
                  onChange={e => updateEntry(index, 'unitPrice', Number(e.target.value))}
                  className="border rounded-lg p-2"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Note</label>
                <input
                  type="text"
                  value={entry.note || ''}
                  onChange={e => updateEntry(index, 'note', e.target.value)}
                  className="border rounded-lg p-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Total</label>
                <input
                  type="number"
                  value={entry.quantity * entry.unitPrice}
                  readOnly
                  className="border rounded-lg p-2 bg-gray-100"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addEntryRow}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
          >
            ➕ Add Another Material
          </button>

          <button
            type="submit"
            className="ml-4 bg-green-600 text-white rounded-lg px-6 py-2 hover:bg-green-700"
          >
            Save Product Expenses
          </button>
        </form>
      </div>
    </div>
  )
}
