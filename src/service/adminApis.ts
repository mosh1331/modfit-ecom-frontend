import { authAPI } from '@/api/apiRequest'

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
    updateOrderStatus: (orderId:any,data: any) => {
        console.log(data,'dataa')
        return authAPI({
          method: 'POST',
          url: `/api/orders/${orderId}/status`,
          headers: {
           'Content-Type': 'application/json',
          },
          data
        })
      },

    
  }
}
