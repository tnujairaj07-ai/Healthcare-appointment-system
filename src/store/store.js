import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import doctorsReducer from './doctorsSlice'
import appointmentsReducer from './appointmentsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorsReducer,
    appointments: appointmentsReducer,
  },
})