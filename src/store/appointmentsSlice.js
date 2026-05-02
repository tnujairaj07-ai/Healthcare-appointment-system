import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createAppointment, fetchAppointmentsByPatient } from '../api/mockApi'

export const bookAppointment = createAsyncThunk(
  'appointments/bookAppointment',
  async (appointmentData) => {
    const response = await createAppointment(appointmentData)
    return response
  },
)

export const loadPatientAppointments = createAsyncThunk(
  'appointments/loadPatientAppointments',
  async (patientId) => {
    const response = await fetchAppointmentsByPatient(patientId)
    return response
  },
)

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPatientAppointments.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadPatientAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(loadPatientAppointments.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })
  },
})

export default appointmentsSlice.reducer