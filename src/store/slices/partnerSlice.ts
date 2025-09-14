import { adminAPis } from '@/service/adminApis'
import { apiServices } from '@/service/apiService'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface PartnerData {
  id: string
  name: string
  email: string
}

interface Partners {
  partners: PartnerData[]
  loading: Boolean
  error: null | String
}

const initialState: Partners = {
  partners: [],
  loading: false,
  error: null
}

// Async actions
export const fetchPartners = createAsyncThunk(
  'partner/fetchPartners',
  async () => {
    const response = await adminAPis().getPartners()
    console.log(response,'res partners')
    return response.data as PartnerData[]
  }
)

const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPartners.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchPartners.fulfilled,
        (state, action: PayloadAction<PartnerData[]>) => {
          state.partners = action.payload
          state.loading = false
        }
      )
      .addCase(fetchPartners.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch cart'
      })
  }
})

export default partnerSlice.reducer
