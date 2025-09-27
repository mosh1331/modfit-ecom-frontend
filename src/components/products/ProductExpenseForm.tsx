"use client"
import { useState } from "react"
import { X } from "lucide-react"
import { adminAPis } from "@/service/adminApis"

interface ExpenseFormProps {
  productId: number
  onClose: () => void
  onSaved: () => void
}

interface ExpenseInput {
  expenseType: string
  materialId?: number
  quantity?: number
  unitPrice?: number
  note?: string
}

export default function ProductExpenseForm({
  productId,
  onClose,
  onSaved,
}: ExpenseFormProps) {
  const [expenses, setExpenses] = useState<ExpenseInput[]>([
    { expenseType: "material" },
  ])
  const [loading, setLoading] = useState(false)

  const handleAddRow = () => {
    setExpenses([...expenses, { expenseType: "material" }])
  }

  const handleRemoveRow = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, field: keyof ExpenseInput, value: any) => {
    const updated = [...expenses]
    //@ts-ignore
    updated[index][field] = value
    setExpenses(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!expenses.length) return alert("Please add at least one expense")

    try {
      setLoading(true)
      await adminAPis().updateProductExpense(productId, {
        expenses,
      })
      onSaved()
      onClose()
    } catch (err) {
      console.error("Error adding expenses:", err)
      alert("Failed to add expenses")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-2xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">➕ Add Expenses</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {expenses.map((exp, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-4 space-y-4 relative bg-gray-50 dark:bg-gray-800"
            >
              {/* Remove row */}
              {expenses.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveRow(idx)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Expense Type */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Expense Type
                </label>
                <select
                  value={exp.expenseType}
                  onChange={(e) =>
                    handleChange(idx, "expenseType", e.target.value)
                  }
                  className="border rounded-lg p-2 w-full"
                >
                  <option value="material">Material</option>
                  <option value="tailoring">Tailoring</option>
                  <option value="delivery">Delivery</option>
                  <option value="packaging">Packaging</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Material-specific fields */}
              {exp.expenseType === "material" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Material ID
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Material ID"
                      value={exp.materialId || ""}
                      onChange={(e) =>
                        handleChange(idx, "materialId", Number(e.target.value))
                      }
                      className="border rounded-lg p-2 w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Quantity"
                        value={exp.quantity || ""}
                        onChange={(e) =>
                          handleChange(idx, "quantity", Number(e.target.value))
                        }
                        className="border rounded-lg p-2 w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Unit Price
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Unit Price"
                        value={exp.unitPrice || ""}
                        onChange={(e) =>
                          handleChange(idx, "unitPrice", Number(e.target.value))
                        }
                        className="border rounded-lg p-2 w-full"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Note */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Note (optional)
                </label>
                <textarea
                  placeholder="Optional note about expense"
                  value={exp.note || ""}
                  onChange={(e) => handleChange(idx, "note", e.target.value)}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
            </div>
          ))}

          {/* Add more button */}
          <button
            type="button"
            onClick={handleAddRow}
            className="w-full border border-dashed rounded-lg py-2 text-blue-600 hover:bg-blue-50"
          >
            ➕ Add Another Expense
          </button>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Expenses"}
          </button>
        </form>
      </div>
    </div>
  )
}
