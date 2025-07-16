import { apiServices } from '@/service/apiService'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
  user: {
    id: number
    name: string
    role: 'user' | 'admin'
    email?: string | null
  } | null
  loading: boolean
}

export const logoutAction = createAsyncThunk('auth/logoutAction', async () => {
  const response = await apiServices().logout()
  window.location.href = '/'
  return response.data
})

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials (state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user
    }
  },
  extraReducers: builder => {
    builder
      .addCase(logoutAction.pending, state => {
        state.loading = true
      })
      .addCase(logoutAction.rejected, state => {
        state.loading = false
      })
      .addCase(logoutAction.fulfilled, state => {
        state.user = null
        state.token = null
        state.loading = false
      })
  }
})

export const { setCredentials } = authSlice.actions
export default authSlice.reducer
