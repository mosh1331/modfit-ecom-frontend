"use client"
import { useState } from "react"
import { X } from "lucide-react"
import { adminAPis } from "@/service/adminApis"

interface ExpenseFormProps {
  productId: number
  onClose: () => void
  onSaved: () => void
}

export default function ProductExpenseForm({ productId, onClose, onSaved }: ExpenseFormProps) {
  const [materialId, setMaterialId] = useState<number | "">("")
  const [quantity, setQuantity] = useState<number>(0)
  const [unitPrice, setUnitPrice] = useState<number>(0)
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!materialId) return alert("Please select a material")

    try {
      setLoading(true)
      await adminAPis().updateProductExpense(productId, {
          materialId,
          quantity,
          unitPrice,
          note,
      })
      onSaved()
      onClose()
    } catch (err) {
      console.error("Error adding expense:", err)
      alert("Failed to add expense")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">➕ Add Expense</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Material ID (dropdown later we can fetch materials list) */}
          <div>
            <label className="block text-sm font-medium mb-1">Material ID</label>
            <input
              type="number"
              placeholder="Enter Material ID"
              value={materialId}
              onChange={e => setMaterialId(Number(e.target.value))}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              placeholder="Enter Quantity"
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>

          {/* Unit Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Unit Price</label>
            <input
              type="number"
              placeholder="Enter Unit Price"
              value={unitPrice}
              onChange={e => setUnitPrice(Number(e.target.value))}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium mb-1">Note (optional)</label>
            <textarea
              placeholder="Optional note about expense"
              value={note}
              onChange={e => setNote(e.target.value)}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Expense"}
          </button>
        </form>
      </div>
    </div>
  )
}
