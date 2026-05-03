import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadDoctors,
  setPage,
  setSearch,
  setSpecialization,
  setLocation,
  setSortBy,
} from '../store/doctorsSlice'
import { Link } from 'react-router-dom'

export default function Doctors() {
  const dispatch = useDispatch()
  const {
    list,
    total,
    page,
    limit,
    search,
    specialization,
    location,
    sortBy,
    status,
    error,
  } = useSelector((state) => state.doctors)

  // Local state for debounced inputs
  const [searchInput, setSearchInput] = useState(search)
  const [locationInput, setLocationInput] = useState(location)

  // Debounce search
  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(setSearch(searchInput))
    }, 400)
    return () => clearTimeout(id)
  }, [searchInput, dispatch])

  // Debounce location
  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(setLocation(locationInput))
    }, 400)
    return () => clearTimeout(id)
  }, [locationInput, dispatch])

  // Load doctors whenever filters/pagination change
  useEffect(() => {
    dispatch(
      loadDoctors({ page, limit, search, specialization, sortBy, location }),
    )
  }, [dispatch, page, limit, search, specialization, sortBy, location])

  const totalPages = Math.ceil(total / limit) || 1

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Find Doctors</h1>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name or city"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border rounded px-3 py-2 flex-1 min-w-[180px] dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
        />

        <input
          type="text"
          placeholder="Filter by city"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          className="border rounded px-3 py-2 min-w-[160px] dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
        />

        <select
          value={specialization}
          onChange={(e) => dispatch(setSpecialization(e.target.value))}
          className="border rounded px-3 py-2 min-w-[180px] dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
        >
          <option value="">All Specializations</option>
          <option value="General Physician">General Physician</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Orthopedic">Orthopedic</option>
          <option value="Gynecologist">Gynecologist</option>
          <option value="Dentist">Dentist</option>
          <option value="Neurologist">Neurologist</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="border rounded px-3 py-2 min-w-[180px] dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
        >
          <option value="rating_desc">Rating: High to Low</option>
          <option value="experience_desc">Experience: High to Low</option>
        </select>
      </div>

      {/* Status / error */}
      {status === 'loading' && <p>Loading doctors...</p>}
      {status === 'failed' && (
        <p className="text-red-500">Error: {error}</p>
      )}

      {/* Doctors grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {list.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white dark:bg-gray-800 shadow-sm rounded p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {doctor.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {doctor.specialization}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {doctor.experience} years experience • {doctor.location}
              </p>
              <p className="text-sm text-yellow-500">
                Rating: {doctor.rating}
              </p>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Slots: {doctor.availableSlots.length}
              </p>
              <Link
                to={`/book/${doctor.id}`}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => dispatch(setPage(page - 1))}
          className="px-3 py-1 border rounded disabled:opacity-50 dark:border-gray-700"
        >
          Prev
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => dispatch(setPage(page + 1))}
          className="px-3 py-1 border rounded disabled:opacity-50 dark:border-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  )
}