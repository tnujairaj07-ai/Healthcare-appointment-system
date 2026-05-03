import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const DOCTORS_API = 'https://mocki.io/v1/530b561f-cc03-47ba-9036-4886eb14510d'

export const loadDoctors = createAsyncThunk(
  'doctors/loadDoctors',
  async ({ page, limit, search, specialization, sortBy, location }) => {
    const res = await fetch(DOCTORS_API)
    if (!res.ok) {
      throw new Error('Failed to load doctors')
    }
    const data = await res.json() // array of doctors from Mocki

    let filtered = data

    // Search by name or city
    if (search) {
      const s = search.toLowerCase()
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(s) ||
          d.location.toLowerCase().includes(s),
      )
    }

    // Filter by specialization
    if (specialization) {
      filtered = filtered.filter(
        (d) => d.specialization === specialization,
      )
    }

    // Filter by location (city substring)
    if (location) {
      const loc = location.toLowerCase()
      filtered = filtered.filter((d) =>
        d.location.toLowerCase().includes(loc),
      )
    }

    // Sort
    if (sortBy === 'rating_desc') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'experience_desc') {
      filtered = [...filtered].sort((a, b) => b.experience - a.experience)
    }

    const total = filtered.length
    const start = (page - 1) * limit
    const paginated = filtered.slice(start, start + limit)

    return { data: paginated, total }
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
    location: '',
    sortBy: 'rating_desc',
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
    setLocation(state, action) {
      state.location = action.payload
      state.page = 1
    },
    setSortBy(state, action) {
      state.sortBy = action.payload
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

export const {
  setPage,
  setSearch,
  setSpecialization,
  setLocation,
  setSortBy,
} = doctorsSlice.actions

export default doctorsSlice.reducer