'use client'
import PurchaseHistoryModal from '@/components/purchaseHistory/PurchaseHistoryModal'
import PurchaseModal from '@/components/purchaseModal/PurchaseModal'
import { adminAPis } from '@/service/adminApis'
import { MaterialPayload, MaterialPurchasePayload } from '@/type/productType'
import { History, HistoryIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Material {
  id: number
  title: string
  unit: string
  description?: string
  stock: number
  avgUnitPrice?:number
}

export default function MaterialsPage () {
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  

  // --- Add Material form states ---
  const [title, setTitle] = useState('')
  const [unit, setUnit] = useState('')
  const [description, setDescription] = useState('')

  // --- Purchase modal ---
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)

  // --- Add Purchase form states ---
  const [quantity, setQuantity] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [fundedById, setFundedById] = useState<number | ''>('')

  // --- Add Material ---
  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault()
    const data: MaterialPayload = { title, unit, description }
    const res = await adminAPis().addMaterial(data)
    console.log('Material Added:', res.data)
    fetchMaterials()
    setTitle('')
    setUnit('')
    setDescription('')
  }

  // --- Add Purchase ---
  const handleAddPurchase = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMaterial) return alert('No material selected')
    const data: MaterialPurchasePayload = {
      quantity,
      unitPrice: price,
      totalPrice,
      fundedById: fundedById === '' ? undefined : Number(fundedById)
    }
    const res = await adminAPis().addMaterialPurchase(selectedMaterial.id, data)
    console.log('Purchase Added:', res.data)
    fetchMaterials()
    // reset form
    setQuantity(0)
    setPrice(0)
    setTotalPrice(0)
    setFundedById('')
    setShowPurchaseModal(false)
    setSelectedMaterial(null)
  }

  // --- Fetch materials ---
  const fetchMaterials = async () => {
    const res = await adminAPis().getMaterials()
    if (res?.status === 200) {
      setMaterials(res?.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMaterials()
  }, [])

  useEffect(() => {
    setTotalPrice(quantity * price)
  }, [quantity, price])

  return (
    <div className='p-6 space-y-8'>
      {/* --- Add Material Form --- */}
      <div className='bg-white dark:bg-gray-900 shadow rounded-xl p-6'>
        <h2 className='text-xl font-bold mb-4'>➕ Add Material</h2>
        <form
          onSubmit={handleAddMaterial}
          className='grid gap-4 md:grid-cols-3'
        >
          <input
            type='text'
            placeholder='Material Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='border rounded-lg p-2 w-full'
            required
          />
          <input
            type='text'
            placeholder='Unit (e.g. meter, kg)'
            value={unit}
            onChange={e => setUnit(e.target.value)}
            className='border rounded-lg p-2 w-full'
            required
          />
          <input
            type='text'
            placeholder='Description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            className='border rounded-lg p-2 w-full'
          />
          <button
            type='submit'
            className='col-span-3 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700'
          >
            Save Material
          </button>
        </form>
      </div>

      {/* --- Material Dashboard --- */}
      <div>
        <h2 className='text-xl font-bold mb-4'>📦 Inventory</h2>
        {loading ? (
          <p className='text-gray-500'>Loading materials...</p>
        ) : (
          <div className='grid md:grid-cols-3 gap-6'>
            {materials.map(m => (
              <div
                key={m.id}
                className='relative bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 hover:shadow-xl transition'
              >
                <h3 className='text-lg font-semibold capitalize'>{m.title}</h3>
                <p className='text-sm text-gray-500'>₹{m.avgUnitPrice}/{m.unit}</p>
                <p className='mt-4 text-2xl font-bold'>
                  {m.stock} {m.unit}
                </p>
                <span
                  className={`mt-2 inline-block px-3 py-1 text-sm rounded-full ${
                    m.stock > 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {m.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
                <button
                  onClick={() => {
                    setSelectedMaterial(m)
                    setShowPurchaseModal(true)
                  }}
                  className='mt-4 w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700'
                >
                  ➕ Add Purchase
                </button>
                <button
                  onClick={() => {
                    setSelectedMaterial(m)
                    setShowHistory(true)
                  }}
                  className='mt-4 w-8 h-8 grid place-content-center cursor-pointer hover:bg-gray-200 text-white rounded-lg py-2 bg-gray-700 absolute top-1 right-1'
                >
                  <HistoryIcon />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- Purchase Modal --- */}
      {showPurchaseModal && selectedMaterial && (
     <PurchaseModal price={price} setPrice={setPrice} totalPrice={totalPrice} fundedById={fundedById} setFundedById={setFundedById} setShowPurchaseModal={setShowPurchaseModal} selectedMaterial={selectedMaterial} handleAddPurchase={handleAddPurchase} quantity={quantity} setQuantity={setQuantity}/>
      )}

      {showHistory && selectedMaterial && (<PurchaseHistoryModal selectedMaterial={selectedMaterial} setShowHistory={setShowHistory} />)}
    </div>
  )
}
