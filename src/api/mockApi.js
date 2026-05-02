// Simple in-memory mock data to mimic a backend
let doctors = [
  {
    id: 'd1',
    name: 'Dr. Aditi Sharma',
    specialization: 'Cardiologist',
    experience: 10,
    rating: 4.7,
    location: 'Delhi',
    availableSlots: ['10:00 AM', '11:30 AM', '3:00 PM', '5:30 PM'],
  },
  {
    id: 'd2',
    name: 'Dr. Rahul Verma',
    specialization: 'Dermatologist',
    experience: 7,
    rating: 4.4,
    location: 'Gurgaon',
    availableSlots: ['9:30 AM', '1:00 PM', '4:30 PM'],
  },
  // Add more doctors for pagination
]

let appointments = []

export function fetchDoctors({ page = 1, limit = 5, search = '', specialization = '' }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = doctors

      if (search) {
        const s = search.toLowerCase()
        filtered = filtered.filter(
          (d) =>
            d.name.toLowerCase().includes(s) ||
            d.location.toLowerCase().includes(s),
        )
      }

      if (specialization) {
        filtered = filtered.filter((d) => d.specialization === specialization)
      }

      const total = filtered.length
      const start = (page - 1) * limit
      const paginated = filtered.slice(start, start + limit)

      resolve({ data: paginated, total })
    }, 500)
  })
}

export function fetchDoctorById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const doctor = doctors.find((d) => d.id === id)
      if (doctor) resolve(doctor)
      else reject(new Error('Doctor not found'))
    }, 300)
  })
}

export function createAppointment(appointment) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAppointment = {
        id: `a${appointments.length + 1}`,
        ...appointment,
        createdAt: new Date().toISOString(),
      }
      appointments.push(newAppointment)
      resolve(newAppointment)
    }, 300)
  })
}

export function fetchAppointmentsByPatient(patientId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(appointments.filter((a) => a.patientId === patientId))
    }, 300)
  })
}