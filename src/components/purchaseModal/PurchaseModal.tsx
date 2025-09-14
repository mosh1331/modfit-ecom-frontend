import React from 'react'

const PurchaseModal = ({
  price,
  setPrice,
  totalPrice,
  fundedById,
  setFundedById,
  setShowPurchaseModal,
  selectedMaterial,
  handleAddPurchase,
  quantity,
  setQuantity
}) => {


  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-lg p-6 relative'>
        <button
          onClick={() => setShowPurchaseModal(false)}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
        >
          ✕
        </button>
        <h2 className='text-xl font-bold mb-4'>
          🛒 Add Purchase for {selectedMaterial.title}
        </h2>
        <form onSubmit={handleAddPurchase} className='grid gap-4'>
          {/* Quantity */}
          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700 dark:text-gray-300'>
              Quantity
            </label>
            <input
              type='number'
              placeholder='Quantity'
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              className='border rounded-lg p-2 w-full'
              required
            />
          </div>

          {/* Unit Price */}
          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700 dark:text-gray-300'>
              Unit Price
            </label>
            <input
              type='number'
              placeholder='Unit Price'
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              className='border rounded-lg p-2 w-full'
              required
            />
          </div>

          {/* Total Price */}
          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700 dark:text-gray-300'>
              Total Price
            </label>
            <input
              type='number'
              placeholder='Total Price'
              value={totalPrice}
              readOnly
              className='border rounded-lg p-2 w-full '
            />
          </div>

          {/* Funded By */}
          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700 dark:text-gray-300'>
              Funded By (optional)
            </label>
            <select
              value={fundedById}
              onChange={e =>
                setFundedById(e.target.value ? Number(e.target.value) : '')
              }
              className='border rounded-lg p-2 w-full'
            >
              <option value=''>Select Partner</option>
              <option value='1'>Binu</option>
              <option value='2'>Ashi</option>
              <option value='3'>Umma</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type='submit'
            className='w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700'
          >
            Add Purchase
          </button>
        </form>
      </div>
      {/* --- Purchase History Table --- */}
      
    </div>
  )
}

export default PurchaseModal
