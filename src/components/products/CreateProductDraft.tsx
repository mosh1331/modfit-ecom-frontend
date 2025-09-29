/* eslint-disable */

'use client'
import { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import ModtifLoader from '../loader/ModtifLoader'
import { useRouter } from 'next/navigation'

interface ProductFormData {
  name: string
  folder_name: string
  description: string
  category: string
  price: string
  discountedPrice: string
  sizes: string[]
  colors: string[]
  images: File[]
  image360: File[]
  inStock: boolean

  // extra costing fields
  stitching: string
  delivery: string
  rawMaterial: string
  lining: string
  overcoat: string
  abaya: string
  supervisorSalary: string
  extra: string
}

export default function CreateProduct() {
  const [form, setForm] = useState<Partial<ProductFormData> >({
    name: '',
    description: '',
    category: '',
    sizes: [],
    inStock: true,

  })

  const [loading, setLoading] = useState<boolean>(false)

  const BASE_URL = process.env.NEXT_PUBLIC_API
  const router = useRouter()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => {
      const updated = { ...prev, [name]: value }
      return updated
    })
  }

  const handleArrayInput = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof ProductFormData
  ) => {
    const values = e.target.value.split(',').map(v => v.trim())
    setForm(prev => ({ ...prev, [field]: values }))
  }


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
     
  
      await axios.post(
        `${BASE_URL}/api/products`,
        {
          ...form,
        },
        { withCredentials: true }
      )

      setLoading(false)
      alert('Product created successfully!')
      router.push('/admin/product-manage')
    } catch (err) {
      console.error(err)
      setLoading(false)
      alert('Error creating product')
    }
  }

  if (loading) return <ModtifLoader />

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-full mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md space-y-6'
    >
      <h2 className='text-2xl font-bold text-center text-gray-800 dark:text-gray-100'>
        Create Pardha
      </h2>

      {/* General fields */}
      {[
        { label: 'Name', name: 'name' },
        // { label: 'Folder', name: 'folder_name' },
        { label: 'Description', name: 'description' },
        { label: 'Category', name: 'category' }
      
      ].map(({ label, name }) => (
        <div key={name}>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
            {label}
          </label>
          <input
            name={name}
            value={form[name as keyof ProductFormData] as string}
            onChange={handleInputChange}
            required={['name', 'description', 'category', 'price'].includes(
              name
            )}
            className='w-full mt-1 p-3 border rounded-xl border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
          />
        </div>
      ))}


      {/* Sizes & Colors */}
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
          Sizes (comma separated)
        </label>
        <input
          type='text'
          onChange={e => handleArrayInput(e, 'sizes')}
          className='w-full mt-1 p-3 border rounded-xl border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
        />
      </div>

      {/* <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
          Colors (comma separated)
        </label>
        <input
          type='text'
          onChange={e => handleArrayInput(e, 'colors')}
          className='w-full mt-1 p-3 border rounded-xl border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
        />
      </div> */}

    

    

      {/* Stock toggle */}
      <div className='flex items-center'>
        <input
          type='checkbox'
          checked={form.inStock}
          onChange={e =>
            setForm(prev => ({ ...prev, inStock: e.target.checked }))
          }
          className='mr-2'
        />
        <label className='text-sm text-gray-700 dark:text-gray-300'>
          In Stock
        </label>
      </div>

      {/* Submit */}
      <button
        type='submit'
        className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition'
      >
        Create Pardha
      </button>
    </form>
  )
}
