// store/productSlice.ts
import { apiServices } from '@/service/apiService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const response = await apiServices().getProducts()
  return response.data
})

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: true,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch products'
      })
  }
})

export default productSlice.reducer
