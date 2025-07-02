/* eslint-disable */

'use client'
import { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import ModtifLoader from '../loader/ModtifLoader'

interface ProductFormData {
  name: string
  folder_name:string
  description: string
  category: string
  price: string // keeping as string for input
  discountedPrice: string
  sizes: string[]
  colors: string[]
  images: File[]
  image360: File[]
  inStock: boolean
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
    folder_name:''
  })

  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [image360Previews, setImage360Previews] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const BASE_URL = process.env.NEXT_PUBLIC_API

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 1. Upload regular images
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

      // 2. Upload 360 images
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

      // 3. Create the product
      await axios.post(
        `${BASE_URL}/api/products`,
        {
          name: form.name,
          description: form.description,
          category: form.category,
          price: parseFloat(form.price),
          discountedPrice: parseFloat(form.discountedPrice) || undefined,
          sizes: form.sizes,
          colors: form.colors,
          images: imageUrls,
          image360: image360Urls,
          inStock: form.inStock
        },
        { withCredentials: true }
      )
      setLoading(false)
      alert('Product created successfully!')
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
      className='text-black max-w-2xl mx-auto p-6 bg-white rounded shadow space-y-6'
    >
      <h2 className='text-2xl font-semibold text-center'>Create Product</h2>

      {[
        { label: 'Name', name: 'name' },
        { label: 'Folder', name: 'folder_name' },
        { label: 'Description', name: 'description' },
        { label: 'Category', name: 'category' },
        { label: 'Price', name: 'price', type: 'number' },
        { label: 'Discounted Price', name: 'discountedPrice', type: 'number' }
      ].map(({ label, name, type = 'text' }) => (
        <div key={name}>
          <label className='block text-gray-700'>{label}</label>
          <input
            type={type}
            name={name}
            value={form[name]}
            onChange={handleInputChange}
            required={['name', 'description', 'category', 'price'].includes(
              name
            )}
            className='w-full mt-1 p-2 border border-gray-300 rounded'
          />
        </div>
      ))}

      <div>
        <label className='block text-gray-700'>Sizes (comma separated)</label>
        <input
          type='text'
          onChange={e => handleArrayInput(e, 'sizes')}
          className='w-full mt-1 p-2 border border-gray-300 rounded'
        />
      </div>

      <div>
        <label className='block text-gray-700'>Colors (comma separated)</label>
        <input
          type='text'
          onChange={e => handleArrayInput(e, 'colors')}
          className='w-full mt-1 p-2 border border-gray-300 rounded'
        />
      </div>

      <div>
        <label className='block text-gray-700'>Regular Images</label>
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
              className='w-20 h-20 object-cover rounded'
            />
          ))}
        </div>
      </div>

      <div>
        <label className='block text-gray-700'>360 Images</label>
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
              className='w-20 h-20 object-cover rounded'
            />
          ))}
        </div>
      </div>

      <div className='flex items-center'>
        <input
          type='checkbox'
          checked={form.inStock}
          onChange={e =>
            setForm(prev => ({ ...prev, inStock: e.target.checked }))
          }
          className='mr-2'
        />
        <label>In Stock</label>
      </div>

      <button
        type='submit'
        className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'
      >
        Create Product
      </button>
    </form>
  )
}
