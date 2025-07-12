// store/slices/cartSlice.ts
import { apiServices } from '@/service/apiService'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  discountedPrice?: number
}

interface CartState {
  items: CartItem[]
  loading: boolean
  error: string | null
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null
}

// Async actions
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await apiServices().getCart()
  return response.data as CartItem[]
})

export const removeCartItem = createAsyncThunk(
  'cart/removeItem',
  async (productId: string) => {
    await apiServices().removeFromCart({ productId })
    return productId
  }
)

export const updateCartItemQty = createAsyncThunk(
  'cart/updateQty',
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    await apiServices().updateCart({ productId, qty: quantity })
    return { productId, quantity }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart (state) {
      state.items = []
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCart.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchCart.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.items = action.payload
          state.loading = false
        }
      )
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch cart'
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          item => item.productId !== action.payload
        )
      })
      .addCase(updateCartItemQty.fulfilled, (state, action) => {
        state.items = state.items.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      })
  }
})

export const { clearCart } = cartSlice.actions
export default cartSlice.reducer
