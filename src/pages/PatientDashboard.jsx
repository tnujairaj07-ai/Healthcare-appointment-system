import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadPatientAppointments } from '../store/appointmentsSlice'
import { useNavigate } from 'react-router-dom'

export default function PatientDashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const { list, status } = useSelector((state) => state.appointments)

  useEffect(() => {
    if (!user) {
      navigate('/')
      return
    }
    dispatch(loadPatientAppointments(user.id))
  }, [dispatch, user, navigate])

  if (!user) return null

  const upcoming = list.filter((a) => a.status === 'upcoming')
  const past = list.filter((a) => a.status !== 'upcoming')
  const upcomingCount = upcoming.length
  const pastCount = past.length
  const totalCount = upcomingCount + pastCount || 1
  
  const upcomingPercent = Math.round((upcomingCount / totalCount) * 100)
  const pastPercent = Math.round((pastCount / totalCount) * 100)



  return (
    <div>
        <h1 className="text-2xl font-semibold mb-2">
            Hello, {user.name}
        </h1>
        <p className="text-gray-600 mb-4">
            Here is your appointment overview.
        </p>

        {status === 'loading' && <p>Loading appointments...</p>}

        {/* Chart / stats section */}
        <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white shadow rounded p-4 md:col-span-1">
                <h2 className="text-sm font-semibold mb-2">
                    Appointment Overview
                </h2>
                <p className="text-xs text-gray-500 mb-3">
                    Distribution of upcoming vs past appointments.
                </p>
                <div className="space-y-3">
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span>Upcoming ({upcomingCount})</span>
                            <span>{upcomingPercent}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded">
                            <div
                                className="h-2 bg-green-500 rounded"
                                style={{ width: `${upcomingPercent}%` }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span>Past ({pastCount})</span>
                            <span>{pastPercent}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded">
                            <div
                                className="h-2 bg-blue-500 rounded"
                                style={{ width: `${pastPercent}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* You can also put small summary cards here if you want */}
            <div className="bg-white shadow rounded p-4 flex flex-col justify-center md:col-span-2">
                <p className="text-sm text-gray-700">
                    Total appointments: <span className="font-semibold">{upcomingCount + pastCount}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    Book more appointments from the Doctors section to see this chart update.
                </p>
            </div>
        </div>

        {/* Existing two-column lists */}
        <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white shadow rounded p-4">
                <h2 className="text-lg font-semibold mb-2">
                    Upcoming Appointments ({upcoming.length})
                </h2>
                {upcoming.length === 0 && (
                    <p className="text-sm text-gray-500">
                        No upcoming appointments. Book one from the Doctors page.
                    </p>
                )}
                <ul className="space-y-2">
                    {upcoming.map((a) => (
                        <li
                            key={a.id}
                            className="border rounded px-3 py-2 text-sm flex justify-between"
                        >
                            <div>
                                <p className="font-medium">{a.doctorName}</p>
                                <p className="text-gray-600">
                                    {a.date} • {a.timeSlot}
                                </p>
                            </div>
                            <span className="text-xs text-green-600 self-center">
                                {a.status}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white shadow rounded p-4">
                <h2 className="text-lg font-semibold mb-2">
                    Past / Other Appointments ({past.length})
                </h2>
                {past.length === 0 && (
                    <p className="text-sm text-gray-500">
                        No past appointments yet.
                    </p>
                )}
                <ul className="space-y-2">
                    {past.map((a) => (
                        <li
                            key={a.id}
                            className="border rounded px-3 py-2 text-sm flex justify-between"
                        >
                            <div>
                                <p className="font-medium">{a.doctorName}</p>
                                <p className="text-gray-600">
                                    {a.date} • {a.timeSlot}
                                </p>
                            </div>
                            <span className="text-xs text-gray-500 self-center">
                                {a.status}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
    )
}