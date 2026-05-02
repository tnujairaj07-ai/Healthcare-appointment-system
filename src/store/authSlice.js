import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null, // { id, name, role: 'patient' | 'doctor' }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAsPatient(state, action) {
      state.user = {
        id: 'p1',
        name: action.payload || 'Demo Patient',
        role: 'patient',
      }
    },
    logout(state) {
      state.user = null
    },
  },
})

export const { loginAsPatient, logout } = authSlice.actions
export default authSlice.reducer