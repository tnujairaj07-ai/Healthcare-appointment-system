import { Link } from 'react-router-dom'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow">
        <nav className="container mx-auto flex justify-between items-center p-4">
          <Link to="/" className="text-xl font-semibold text-blue-600">
            MediConnect
          </Link>
          <div className="space-x-4">
            <Link to="/doctors" className="text-gray-700 hover:text-blue-600">
              Doctors
            </Link>
            <Link
              to="/patient/dashboard"
              className="text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-1 container mx-auto p-4">{children}</main>
      <footer className="bg-white border-t">
        <div className="container mx-auto p-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} MediConnect Healthcare
        </div>
      </footer>
    </div>
  )
}