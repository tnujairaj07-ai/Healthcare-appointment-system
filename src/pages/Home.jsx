import { useDispatch, useSelector } from 'react-redux'
import { loginAsPatient, logout } from '../store/authSlice'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Home() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const [name, setName] = useState('')

  const handleLogin = () => {
    dispatch(loginAsPatient(name || 'Demo Patient'))
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to MediConnect
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-xl">
        A simple healthcare appointment system to explore doctors, book time
        slots, and manage your appointments as a patient.
      </p>

      {!user ? (
        <div className="bg-white shadow rounded p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Login as Patient</h2>
          <input
            type="text"
            placeholder="Enter your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="bg-white shadow rounded p-6 w-full max-w-md text-center">
          <p className="mb-4 text-gray-700">
            Logged in as <span className="font-semibold">{user.name}</span>
          </p>
          <div className="space-x-2">
            <Link
              to="/doctors"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Doctors
            </Link>
            <Link
              to="/patient/dashboard"
              className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
            >
              Go to Dashboard
            </Link>
          </div>
          <button
            onClick={() => dispatch(logout())}
            className="mt-4 text-red-500 underline"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}