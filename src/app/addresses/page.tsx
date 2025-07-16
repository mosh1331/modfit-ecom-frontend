'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useAuth } from '@/hooks/useAuth'
import { apiServices } from '@/service/apiService'

export default function SavedAddressesPage() {
  const { user } = useAuth()
  const [addresses, setAddresses] = useState<any[]>([])
  const [newAddress, setNewAddress] = useState('')

  console.log(user,'user')

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    const res = await apiServices().getSavedAddresses()
    console.log(res,'response address')
    setAddresses(res.data)
  }

  const addAddress = async () => {
    if (!newAddress) return
   
    await apiServices().addAddress( {
        address: newAddress,
        userId: user.id
      })
    setNewAddress('')
    fetchAddresses()
  }

  const deleteAddress = async (id: number) => {
    await apiServices().deleteAddress(id)
    fetchAddresses()
  }

  const makeDefault = async (id: number) => {
    await apiServices().setDefaultAddress(id)
    fetchAddresses()
  }

  return (
    <div className='max-w-2xl mx-auto p-6 text-black'>
      <h1 className='text-2xl font-bold mb-4'>Manage Saved Addresses</h1>

      <div className='mb-6'>
        <textarea
          className='w-full p-3 border rounded'
          placeholder='New Address'
          value={newAddress}
          onChange={e => setNewAddress(e.target.value)}
          rows={3}
        />
        <button
          onClick={addAddress}
          className='bg-black text-white px-4 py-2 mt-2 rounded'
        >
          Add Address
        </button>
      </div>

      {addresses.map(addr => (
        <div key={addr.id} className='border p-4 rounded mb-4'>
          <p>{addr.address}</p>
          {addr.isDefault && <span className='text-green-600 text-sm'> (Default)</span>}
          <div className='mt-2 flex gap-4'>
            {!addr.isDefault && (
              <button onClick={() => makeDefault(addr.id)} className='text-blue-600 text-sm'>
                Set as Default
              </button>
            )}
            <button onClick={() => deleteAddress(addr.id)} className='text-red-600 text-sm'>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
