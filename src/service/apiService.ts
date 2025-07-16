/* eslint-disable */

import { authAPI, publicAPI } from '@/api/apiRequest'

export const apiServices = () => {
  return {
    login: (data: any) => {
      console.log(data,'dataa')
      return authAPI({
        method: 'POST',
        url: '/api/auth/login',
        headers: {
         'Content-Type': 'application/json',
        },
        data
      })
    },
    logout: () => {
      return authAPI({
        method: 'POST',
        url: '/api/auth/logout',
        headers: {
         'Content-Type': 'application/json',
        },
      })
    },
    signUp: (data: any) => {
      return publicAPI({
        method: 'POST',
        url: '/api/auth/register',
        headers: {
         'Content-Type': 'application/json',
        },
        data
      })
    },
    getProducts: () => {
      return publicAPI({
        method: 'GET',
        url: '/api/products',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    getProductById: slug => {
      return publicAPI({
        method: 'GET',
        url: `/api/products/${slug}`,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    deleteProductById: slug => {
      return publicAPI({
        method: 'DELETE',
        url: `/api/products/${slug}`,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    createProduct: (data: any) => {
      return publicAPI({
        method: 'POST',
        url: '/api/products',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data
      })
    },

    addToCart: (data: any) => {
      return authAPI({
        method: 'POST',
        url: '/api/cart/add',
        headers: {
          'Content-Type': 'application/json',
        },
        data
      })
    },
    updateCart: (data: any) => {
      return authAPI({
        method: 'PATCH',
        url: '/api/cart/update',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data
      })
    },
    removeFromCart: (data: any) => {
      return authAPI({
        method: 'DELETE',
        url: '/api/cart/remove',
        headers: {
          'Content-Type':  'application/json',
        },
        data
      })
    },
    getCart: () => {
      return authAPI({
        method: 'GET',
        url: `/api/cart`,
        headers: {
          'Content-Type':  'application/json',
        }
      })
    },
    getProfile: () => {
      return authAPI({
        method: 'GET',
        url: `/api/auth/profile`,
        headers: {
          'Content-Type':  'application/json',
        }
      })
    },
    getSavedAddresses : ()=>{
      return authAPI({
        method: 'GET',
        url: `/api/addresses/`,
        headers: {
          'Content-Type':  'application/json',
        }
      })
    },
    addAddress : (data:any)=>{
      return authAPI({
        method: 'POST',
        url: `/api/addresses/`,
        headers: {
          'Content-Type':  'application/json',
        },
        data
      })
    },
    deleteAddress : (id:any)=>{
      return authAPI({
        method: 'DELETE',
        url: `/api/addresses/${id}`,
        headers: {
          'Content-Type':  'application/json',
        },
      })
    },
    setDefaultAddress : (id:any)=>{
      return authAPI({
        method: 'PATCH',
        url: `/api/addresses/${id}/default`,
        headers: {
          'Content-Type':  'application/json',
        },
      })
    },

    
  
  }
}
