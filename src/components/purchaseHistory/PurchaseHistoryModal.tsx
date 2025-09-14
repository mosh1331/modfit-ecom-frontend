'use client'
import { adminAPis } from '@/service/adminApis'
import React, { useEffect, useState } from 'react'

const PurchaseHistoryModal = ({ selectedMaterial,setShowHistory }) => {
  const [purchaseHistory, setPurchaseHistory] = useState<any[]>([])

  // Fetch purchases when modal opens
  useEffect(() => {
    if (selectedMaterial) {
      const fetchHistory = async () => {
        const res = await adminAPis().getMaterialPurchases(selectedMaterial.id)
        if (res?.status === 200) {
          setPurchaseHistory(res.data)
        }
      }
      fetchHistory()
    }
  }, [selectedMaterial])
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-lg p-6 relative'>
        <button
          onClick={() => setShowHistory(false)}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
        >
          ✕
        </button>
        <h3 className='text-lg font-semibold mb-2'>📜 Purchase History</h3>
        {purchaseHistory.length === 0 ? (
          <p className='text-gray-500 text-sm'>
            No purchases yet for this material.
          </p>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full border border-gray-200 text-sm'>
              <thead className='bg-gray-600'>
                <tr>
                  <th className='px-3 py-2 text-left'>Date</th>
                  <th className='px-3 py-2 text-left'>Qty</th>
                  <th className='px-3 py-2 text-left'>Unit Price</th>
                  <th className='px-3 py-2 text-left'>Total</th>
                  <th className='px-3 py-2 text-left'>Funded By</th>
                </tr>
              </thead>
              <tbody>
                {purchaseHistory.map((p, idx) => (
                  <tr
                    key={idx}
                    className='border-t hover:bg-gray-50 dark:hover:bg-gray-800'
                  >
                    <td className='px-3 py-2'>
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className='px-3 py-2'>{p.quantity}</td>
                    <td className='px-3 py-2'>₹{p.unitPrice}</td>
                    <td className='px-3 py-2 font-medium'>₹{p.totalPrice}</td>
                    <td className='px-3 py-2'>
                      {p.fundedBy ? p.fundedBy.name : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default PurchaseHistoryModal
