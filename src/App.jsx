import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import BookAppointment from './pages/BookAppointment'
import PatientDashboard from './pages/PatientDashboard'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/book/:doctorId" element={<BookAppointment />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App