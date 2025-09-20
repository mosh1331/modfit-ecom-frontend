'use client'
import { useEffect, useState } from 'react'
import { adminAPis } from '@/service/adminApis'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { fetchProducts } from '@/store/slices/productSlice'
import BackButton from '@/components/common/BackButton'

interface Product {
  id: number
  name: string
  price: number
}

interface SaleItemInput {
  productId: number | ''
  quantity: number
  price: number
}

export default function AddSaleView () {
  const [customerName, setCustomerName] = useState('')
  const [note, setNote] = useState('')
  const [saleDate, setSaleDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  )

  const [items, setItems] = useState<SaleItemInput[]>([
    { productId: '', quantity: 1, price: 0 }
  ])
  const dispatch = useDispatch<AppDispatch>()

  const {
    items: products,
    loading,
    error
  } = useSelector((state: RootState) => state.products)

  console.log(products, 'product')

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])


  // --- Handlers ---
  const handleItemChange = (
    index: number,
    field: keyof SaleItemInput,
    value: string | number
  ) => {
    const updated = [...items]
    updated[index][field] = value as never

    // Autofill price if product selected
    if (field === 'productId' && typeof value === 'number') {
      const product = products.find(p => p.id === value)
      if (product) updated[index].price = product.price
    }

    setItems(updated)
  }

  const addRow = () =>
    setItems([...items, { productId: '', quantity: 1, price: 0 }])

  const removeRow = (index: number) =>
    setItems(items.filter((_, i) => i !== index))

  const total = items.reduce((sum, i) => sum + i.quantity * i.price, 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const filteredItems = items.filter(i => i.productId !== '')

    if (filteredItems.length === 0) {
      return alert('Please select at least one product')
    }

    const payload = {
      customerName,
      note,
      saleDate,
      items: filteredItems
    }

    const res = await adminAPis().addManualSale(payload)
    if (res?.status === 200) {
      alert('Sale added successfully')
      // reset
      setCustomerName('')
      setNote('')
      setItems([{ productId: '', quantity: 1, price: 0 }])
    }
  }

  return (
    <div className=' mx-auto p-4'>
        <BackButton route='/admin/sales' />
      <h2 className='text-xl font-bold mb-4'>🛒 Add Sale</h2>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Customer + Date */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex flex-col'>
            <label className='text-sm font-medium mb-1'>Customer Name</label>
            <input
              type='text'
              className='border rounded-lg p-2'
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              placeholder='Walk-in / Customer Name'
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-sm font-medium mb-1'>Sale Date</label>
            <input
              type='date'
              className='border rounded-lg p-2'
              value={saleDate}
              onChange={e => setSaleDate(e.target.value)}
            />
          </div>
        </div>

        {/* Note */}
        <div className='flex flex-col'>
          <label className='text-sm font-medium mb-1'>Note</label>
          <textarea
            className='border rounded-lg p-2'
            rows={2}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder='Any special note (optional)'
          />
        </div>

        {/* Dynamic Items Table */}
        <div className='overflow-x-auto'>
          <table className='min-w-full border-collapse'>
            <thead>
              <tr className='bg-gray-700 text-sm'>
                <th className='p-2 text-left'>Product</th>
                <th className='p-2 text-left'>Qty</th>
                <th className='p-2 text-left'>Price</th>
                <th className='p-2 text-left'>Subtotal</th>
                <th className='p-2'></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className='border-b'>
                  {/* Product Dropdown */}
                  <td className='p-2'>
                    <select
                      value={item.productId}
                      onChange={e =>
                        handleItemChange(
                          index,
                          'productId',
                          Number(e.target.value)
                        )
                      }
                      className='border rounded-lg p-2 w-full'
                      required
                    >
                      <option value=''>Select Product</option>
                      {products.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Quantity */}
                  <td className='p-2'>
                    <input
                      type='number'
                      min={1}
                      value={item.quantity}
                      onChange={e =>
                        handleItemChange(
                          index,
                          'quantity',
                          Number(e.target.value)
                        )
                      }
                      className='border rounded-lg p-2 w-20'
                      required
                    />
                  </td>

                  {/* Price */}
                  <td className='p-2'>
                    <input
                      type='number'
                      value={item.price}
                      onChange={e =>
                        handleItemChange(index, 'price', Number(e.target.value))
                      }
                      className='border rounded-lg p-2 w-24'
                      required
                    />
                  </td>

                  {/* Subtotal */}
                  <td className='p-2 font-medium'>
                    ₹{(item.quantity * item.price).toFixed(2)}
                  </td>

                  {/* Remove Row */}
                  <td className='p-2 text-center'>
                    {items.length > 1 && (
                      <button
                        type='button'
                        onClick={() => removeRow(index)}
                        className='text-red-600 hover:underline'
                      >
                        ✕
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Row Button */}
          <button
            type='button'
            onClick={addRow}
            className='mt-2 text-blue-600 hover:underline'
          >
            ➕ Add Another Product
          </button>
        </div>

        {/* Total */}
        <div className='text-right text-lg font-bold'>
          Total: ₹{total.toFixed(2)}
        </div>

        {/* Submit */}
        <button
          type='submit'
          className='bg-green-600 text-white rounded-lg py-2 px-4 hover:bg-green-700 w-full md:w-auto'
        >
          💾 Save Sale
        </button>
      </form>
    </div>
  )
}
