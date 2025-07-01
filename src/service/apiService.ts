import { publicAPI } from "@/api/apiRequest"

export const apiServices = () => {
  return {
    getProducts: () => {
      return publicAPI({
        method: 'GET',
        url: '/api/products',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    createProduct: (data:any) => {
        return publicAPI({
          method: 'POST',
          url: '/api/products',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data
        })
      },
   
  }
}
