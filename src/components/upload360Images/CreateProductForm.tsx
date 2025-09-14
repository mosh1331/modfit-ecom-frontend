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
  const [form, setForm] = useState<ProductFormData>({
    name: '',
    description: '',
    category: '',
    price: '',
    discountedPrice: '',
    sizes: [],
    colors: [],
    images: [],
    image360: [],
    inStock: true,
    folder_name: '',

    stitching: '',
    delivery: '',
    rawMaterial: '',
    lining: '',
    overcoat: '',
    abaya: '',
    supervisorSalary: '',
    extra: ''
  })

  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [image360Previews, setImage360Previews] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const BASE_URL = process.env.NEXT_PUBLIC_API
  const router = useRouter()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => {
      const updated = { ...prev, [name]: value }

      // 🔹 Auto-calc Raw Material = Lining + Overcoat + Abaya
      const lining = parseFloat(updated.lining || '0')
      const overcoat = parseFloat(updated.overcoat || '0')
      const abaya = parseFloat(updated.abaya || '0')

      updated.rawMaterial = String(lining + overcoat + abaya)
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

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: 'regular' | '360'
  ) => {
    const files = Array.from(e.target.files || [])
    const filePreviews = files.map(file => URL.createObjectURL(file))

    if (type === 'regular') {
      setForm(prev => ({ ...prev, images: files }))
      setImagePreviews(filePreviews)
    } else {
      setForm(prev => ({ ...prev, image360: files }))
      setImage360Previews(filePreviews)
    }
  }

  const calculateTotalCost = () => {
    const { stitching, delivery, rawMaterial, supervisorSalary, extra } = form
    return (
      (parseFloat(stitching) || 0) +
      (parseFloat(delivery) || 0) +
      (parseFloat(rawMaterial) || 0) +
      (parseFloat(supervisorSalary) || 0) +
      (parseFloat(extra) || 0)
    )
  }

  const profit = () => {
    const sellingPrice = parseFloat(form.price) || 0
    const cost = calculateTotalCost()
    return sellingPrice - cost
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const imageForm = new FormData()
      form.images.forEach(file => imageForm.append('images', file))

      const regUploadRes = await axios.post(
        `${BASE_URL}/api/cloudinary/upload?folderName=${form.folder_name}`,
        imageForm,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
      )
      const imageUrls: string[] = regUploadRes.data.urls

      const image360Form = new FormData()
      form.image360.forEach(file => image360Form.append('images', file))

      const upload360Res = await axios.post(
        `${BASE_URL}/api/cloudinary/upload360?folderName=${form.folder_name}`,
        image360Form,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
      )
      const image360Urls: string[] = upload360Res.data.urls
      await axios.post(
        `${BASE_URL}/api/products`,
        {
          ...form,

          price: parseFloat(form.price),
          discountedPrice: parseFloat(form.discountedPrice) || undefined,
          cost: calculateTotalCost(),
          profit: profit(),
          images: imageUrls,
          image360: image360Urls
        },
        { withCredentials: true }
      )

      setLoading(false)
      alert('Product created successfully!')
      router.push('/products')
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
        { label: 'Folder', name: 'folder_name' },
        { label: 'Description', name: 'description' },
        { label: 'Category', name: 'category' },
        { label: 'Price', name: 'price', type: 'number' },
        { label: 'Discounted Price', name: 'discountedPrice', type: 'number' }
      ].map(({ label, name, type = 'text' }) => (
        <div key={name}>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
            {label}
          </label>
          <input
            type={type}
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

      {/* Costing fields */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {[
          { label: 'Stitching', name: 'stitching' },
          { label: 'Delivery / Packaging', name: 'delivery' },
          { label: 'Raw Material', name: 'rawMaterial', disabled: true },
          { label: 'Lining', name: 'lining' },
          { label: 'Overcoat', name: 'overcoat' },
          { label: 'Abaya', name: 'abaya' },
          { label: 'Supervisor Salary', name: 'supervisorSalary' },
          { label: 'Extra Cost', name: 'extra' }
        ].map(({ label, name, disabled = false }) => (
          <div key={name}>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
              {label}
            </label>
            <input
              type='number'
              name={name}
              disabled={disabled}
              value={form[name as keyof ProductFormData] as string}
              onChange={handleInputChange}
              className='w-full mt-1 p-3 border rounded-xl border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
            />
          </div>
        ))}
      </div>

      {/* Auto-calculated */}
      <div className='p-4 rounded-xl bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700'>
        <p className='text-sm text-gray-700 dark:text-gray-300'>
          <strong>Total Cost:</strong> ₹{calculateTotalCost()}
        </p>
        <p className='text-sm text-gray-700 dark:text-gray-300'>
          <strong>Expected Profit:</strong> ₹{profit()}
        </p>
      </div>

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

      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
          Colors (comma separated)
        </label>
        <input
          type='text'
          onChange={e => handleArrayInput(e, 'colors')}
          className='w-full mt-1 p-3 border rounded-xl border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
        />
      </div>

      {/* Images */}
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
          Regular Images
        </label>
        <input
          type='file'
          multiple
          onChange={e => handleFileChange(e, 'regular')}
        />
        <div className='flex flex-wrap mt-2 gap-2'>
          {imagePreviews.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=''
              className='w-20 h-20 object-cover rounded-lg border'
            />
          ))}
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
          360 Images
        </label>
        <input
          type='file'
          multiple
          onChange={e => handleFileChange(e, '360')}
        />
        <div className='flex flex-wrap mt-2 gap-2'>
          {image360Previews.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=''
              className='w-20 h-20 object-cover rounded-lg border'
            />
          ))}
        </div>
      </div>

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
