import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { bookAppointment } from '../store/appointmentsSlice'

const DOCTORS_API = 'https://mocki.io/v1/530b561f-cc03-47ba-9036-4886eb14510d'

export default function BookAppointment() {
  const { doctorId } = useParams()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedSlot, setSelectedSlot] = useState('')
  const [date, setDate] = useState('')
  const [reason, setReason] = useState('')

  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    async function loadDoctor() {
      try {
        setLoading(true)
        setError('')

        const res = await fetch(DOCTORS_API)
        if (!res.ok) {
          throw new Error('Failed to load doctor details')
        }
        const data = await res.json() // array of doctors from Mocki

        // If your Mocki ids are strings like "d1", this comparison is fine.
        // If they are numbers, use: data.find((d) => String(d.id) === doctorId)
        const found = data.find((d) => d.id === doctorId)

        if (!found) {
          throw new Error('Doctor not found')
        }

        setDoctor(found)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadDoctor()
  }, [doctorId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      alert('Please login as patient first.')
      navigate('/')
      return
    }
    if (!date || !selectedSlot) {
      alert('Please select date and time slot.')
      return
    }

    await dispatch(
      bookAppointment({
        doctorId: doctor.id,
        doctorName: doctor.name,
        patientId: user.id,
        patientName: user.name,
        date,
        timeSlot: selectedSlot,
        reason,
        status: 'upcoming',
      }),
    )

    alert('Appointment booked successfully!')
    navigate('/patient/dashboard')
  }

  if (loading) return <p>Loading doctor details...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (!doctor) return <p>No doctor found.</p>

  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded p-6">
      <h1 className="text-2xl font-semibold mb-2">
        Book Appointment with {doctor.name}
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        {doctor.specialization} • {doctor.experience} years • {doctor.location}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Time Slot
          </label>
          <div className="flex flex-wrap gap-2">
            {doctor.availableSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`px-3 py-1 rounded border ${
                  selectedSlot === slot
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-50 text-gray-700'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Reason / Symptoms (optional)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Confirm Appointment
        </button>
      </form>
    </div>
  )
}