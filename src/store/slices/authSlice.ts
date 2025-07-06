import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  user: { id: number; name: string; role: 'user' | 'admin' } | null;
  accessToken:null | string;
  refreshToken:null | string
}

const initialState: AuthState = {
  token: null,
  user: null,
  accessToken:null,
  refreshToken:null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthState>) {
      state.user  = action.payload.user;
    },
    logout(state) {
      state.token = null;
      state.user  = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
