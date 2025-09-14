import { authAPI } from '@/api/apiRequest'
import { MaterialPayload, MaterialPurchasePayload, ProductExpensePayload } from '@/type/productType'

export const adminAPis = () => {
  return {
    getAllOrders: () => {
      return authAPI({
        method: 'GET',
        url: '/api/orders',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    updateOrderStatus: (orderId: any, data: any) => {
      console.log(data, 'dataa')
      return authAPI({
        method: 'POST',
        url: `/api/orders/${orderId}/status`,
        headers: {
          'Content-Type': 'application/json'
        },
        data
      })
    },
    getAllExpenses: () => {
      return authAPI({
        method: 'GET',
        url: '/api/expenses',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    logExpense: (data: any) => {
      console.log(data, 'dataa')
      return authAPI({
        method: 'POST',
        url: `/api/expenses/`,
        headers: {
          'Content-Type': 'application/json'
        },
        data
      })
    },
    getLedgerData: () => {
      return authAPI({
        method: 'GET',
        url: '/api/ledger',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    getPartners: () => {
      return authAPI({
        method: 'GET',
        url: '/api/partner/',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    logInvestment: (data: any) => {
      console.log(data, 'dataa')
      return authAPI({
        method: 'POST',
        url: `/api/partner/investments/`,
        headers: {
          'Content-Type': 'application/json'
        },
        data
      })
    },
    getPartnerBalances: () => {
      return authAPI({
        method: 'GET',
        url: '/api/partner/balances',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    getPartnerInvestmentsById: (partnerId: number) => {
      return authAPI({
        method: 'GET',
        url: `/api/partner/${partnerId}`,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    getMaterials: () => {
      return authAPI({
        method: 'GET',
        url: `/api/material`,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    addMaterial: (data: MaterialPayload) => {
      return authAPI({
        method: 'POST',
        url: `/api/material/`,
        headers: {
          'Content-Type': 'application/json'
        },
        data
      })
    },
    addMaterialPurchase: (
      id: Number | String,
      data: MaterialPurchasePayload
    ) => {
      return authAPI({
        method: 'POST',
        url: `/api/purchase/${id}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data
      })
    },
    getMaterialPurchases: (materialId: number) => {
      return authAPI({
        method: 'GET',
        url: `/api/purchase/${materialId}`,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },

    updateProductExpense: (
      id: Number | String,
      data: ProductExpensePayload
    ) => {
      return authAPI({
        method: 'POST',
        url: `/api/products/update-expense/${id}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data
      })
    },
    updateProductImages: (
      id: Number | String,
      data: ProductExpensePayload
    ) => {
      return authAPI({
        method: 'POST',
        url: `/api/products/update-images/${id}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data
      })
    },
    getProductDetail: (productId: number) => {
      return authAPI({
        method: 'GET',
        url: `/api/products/admin/${productId}`,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
  }
}
