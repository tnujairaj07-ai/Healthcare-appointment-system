import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchDoctors } from '../api/mockApi'

export const loadDoctors = createAsyncThunk(
  'doctors/loadDoctors',
  async (params) => {
    const response = await fetchDoctors(params)
    return response
  },
)

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: {
    list: [],
    total: 0,
    status: 'idle',
    error: null,
    page: 1,
    limit: 5,
    search: '',
    specialization: '',
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload
    },
    setSearch(state, action) {
      state.search = action.payload
      state.page = 1
    },
    setSpecialization(state, action) {
      state.specialization = action.payload
      state.page = 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDoctors.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadDoctors.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload.data
        state.total = action.payload.total
      })
      .addCase(loadDoctors.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { setPage, setSearch, setSpecialization } = doctorsSlice.actions
export default doctorsSlice.reducer