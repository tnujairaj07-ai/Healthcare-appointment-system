import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Layout({ children }) {
  const user = useSelector((state) => state.auth.user)
  const [darkMode, setDarkMode] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Load initial mode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mc_dark_mode')
    if (saved === 'true') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Keep DOM + localStorage in sync with state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('mc_dark_mode', darkMode ? 'true' : 'false')
  }, [darkMode])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow">
        <nav className="container mx-auto flex justify-between items-center p-4">
          <Link
            to="/"
            className="text-xl font-semibold text-blue-600 dark:text-blue-400"
          >
            MediConnect
          </Link>

          <div className="flex items-center gap-4">
            <NavLink
              to="/doctors"
              className={({ isActive }) =>
                `text-sm ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-gray-700 dark:text-gray-200'
                }`
              }
            >
              Doctors
            </NavLink>
            <NavLink
              to="/patient/dashboard"
              className={({ isActive }) =>
                `text-sm ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-gray-700 dark:text-gray-200'
                }`
              }
            >
              Dashboard
            </NavLink>

            {/* Settings / Profile */}
            <div className="relative">
              <button
                onClick={() => setSettingsOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-1 border rounded-full text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
              >
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                  {user ? user.name.charAt(0).toUpperCase() : 'P'}
                </span>
                <span className="hidden md:inline">
                  {user ? user.name : 'Patient'}
                </span>
              </button>

              {settingsOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg text-sm z-20">
                  <button
                    onClick={() => setDarkMode((prev) => !prev)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between items-center"
                  >
                    <span>Dark mode</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {darkMode ? 'On' : 'Off'}
                    </span>
                  </button>
                  <button
                    disabled
                    className="w-full text-left px-4 py-2 text-gray-400 cursor-not-allowed"
                  >
                    Account settings (coming soon)
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1 container mx-auto p-4">{children}</main>

      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <div className="container mx-auto p-4 text-center text-gray-500 dark:text-gray-400 text-xs">
          © {new Date().getFullYear()} MediConnect Healthcare
        </div>
      </footer>
    </div>
  )
}