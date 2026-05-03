import { useDispatch, useSelector } from 'react-redux'
import { loginAsPatient, logout } from '../store/authSlice'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import HealthTips from '../components/HealthTips'

export default function Home() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const [name, setName] = useState('')

  const handleLogin = () => {
    dispatch(loginAsPatient(name || 'Guest Patient'))
  }

  return (
    <>
      <div className="mt-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Healthcare Appointment System
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Book doctor appointments, manage your upcoming visits, and keep track
            of your healthcare in one place.
          </p>
          <ul className="text-gray-700 dark:text-gray-200 mb-6 space-y-1 text-sm">
            <li>• Browse doctors by specialization and location</li>
            <li>• Select convenient time slots and confirm instantly</li>
            <li>• View upcoming and past appointments in your dashboard</li>
          </ul>
          {user && (
            <div className="space-x-3">
              <Link
                to="/doctors"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Find Doctors
              </Link>
              <Link
                to="/patient/dashboard"
                className="inline-block bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          {!user ? (
            <>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Login as Patient
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                This simple login represents patient authentication for accessing
                personalized appointments.
              </p>
              <input
                type="text"
                placeholder="Enter your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4 bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
              />
              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Continue as Patient
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                You are logged in
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Role:{' '}
                <span className="font-semibold capitalize">{user.role}</span>
              </p>
              <p className="mb-4 text-gray-800 dark:text-gray-100">
                Welcome back, <span className="font-semibold">{user.name}</span>.
              </p>
              <div className="space-y-3">
                <Link
                  to="/doctors"
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Browse Doctors
                </Link>
                <Link
                  to="/patient/dashboard"
                  className="block w-full text-center bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  View Dashboard
                </Link>
                <button
                  onClick={() => dispatch(logout())}
                  className="block w-full text-center text-red-500 underline text-sm"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Health tips section below the main grid */}
        <HealthTips />
    </>
  )
}