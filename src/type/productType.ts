
export interface MaterialPayload {
  title: string
  unit: string
  description?: string
}

export interface MaterialPurchasePayload {
  quantity: number
  unitPrice?: number
  totalPrice: number
  fundedById?: number
}

export interface ProductExpensePayload {
  quantity: number
  materialId:number | string
  unitPrice?: number
  totalPrice?: number
  note?: string

}


// types/productType.ts
export interface Product {
  id: number
  name: string
  category?: string
  price: number
  discount?: number | null
  sku: string
  isActive: boolean
  images: string[]
  createdAt: string
}

export interface ProductExpensePayload {
  materialId: number
  quantity: number
  unitPrice: number
  note?: string
}

export interface ProductImagePayload {
  images: string[]
  images360: string[]
}

