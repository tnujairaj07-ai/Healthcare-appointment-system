# MediConnect – Healthcare Appointment System (UI)

MediConnect is a React-based healthcare appointment system UI that allows patients to browse doctors, book appointments, and view their upcoming and past visits through a simple dashboard.

This project is built as a capstone/semester project to demonstrate React, Routing, Redux Toolkit, API integration with Fetch, and UI state management.

---

## Features

- **Patient authentication (mock)**  
  - Simple login as patient with name.  
  - Role stored in global state (`patient`) and used for access control on the dashboard.

- **Doctor listing (from external API)**  
  - Doctor data (20 doctors) fetched from a custom **Mocki REST API** using `fetch`.  
  - Cards show name, specialization, experience, rating, location, and available time slots.

- **Advanced filters and search**  
  - Search by doctor name or city.  
  - Filter by specialization (Cardiologist, Dermatologist, General Physician, etc.).  
  - Filter by location (city substring).  
  - Sort by rating (high → low) or experience (high → low).  
  - Pagination with Prev/Next and page indicator.

- **Appointment booking**  
  - Appointment booking UI per doctor: date picker, time slot selection, optional reason/symptoms.  
  - Appointments are saved in an in-memory mock backend via `mockApi.js` and managed with Redux Toolkit thunks.

- **Patient dashboard with chart**  
  - Displays upcoming and past appointments separately.  
  - Simple bar-style visualization showing distribution of upcoming vs past appointments (percentage and count).  
  - Total appointment summary.

- **Health tips (from external API)**  
  - Health tip / wellness tip fetched from a custom **Mocki health tips API** on the Home page.  
  - One random tip displayed to the user on each load.

- **Dark mode toggle**  
  - Dark/light theme toggle in the header settings panel.  
  - Implemented using Tailwind CSS `dark` mode with the `class` strategy.  
  - Preference persisted in `localStorage`.

- **Responsive UI**  
  - Built with Tailwind CSS.  
  - Adapts for desktop and smaller screens.

---

## Tech Stack

- **Frontend:** React + Vite (JavaScript ES6+)
- **Routing:** React Router
- **State Management:** Redux Toolkit + React Redux
- **Styling:** Tailwind CSS
- **API Integration:** `fetch` (Mocki APIs for doctors and health tips, local mock API for appointments)
- **Build Tool:** Vite
- **Deployment:** Netlify (recommended)

---

## Project Structure

```text
src/
  api/
    mockApi.js            # In-memory mock backend for appointments
  components/
    Layout.jsx            # Main layout with navbar, footer, dark mode toggle, profile/settings
    HealthTips.jsx        # Health tips component fetching from Mocki API
  pages/
    Home.jsx              # Landing page + patient login + health tips
    Doctors.jsx           # Doctor listing with filters, search, sort, pagination
    BookAppointment.jsx   # Appointment booking UI per doctor
    PatientDashboard.jsx  # Patient dashboard with appointments & simple chart
    NotFound.jsx          # 404 page
  store/
    store.js              # Redux store configuration
    authSlice.js          # Authentication and role (patient)
    doctorsSlice.js       # Doctors data, filters, pagination, sorting
    appointmentsSlice.js  # Appointment booking and patient appointments
  App.jsx                 # Routes configuration
  main.jsx                # Entry point, wraps App in Redux Provider
  index.css               # Tailwind CSS imports
```

---

## APIs Used

### 1. Doctors API (Mocki)

- Returns an array of doctor objects (`id`, `name`, `specialization`, `experience`, `rating`, `location`, `availableSlots`).
- Used in:
  - `doctorsSlice.js` (`loadDoctors` thunk) for listing, filtering, sorting, and pagination.
  - `BookAppointment.jsx` for loading specific doctor details by `id`.

> Replace the URL below with your actual Mocki doctors endpoint:
```js
const DOCTORS_API = 'https://mocki.io/v1/530b561f-cc03-47ba-9036-4886eb14510d'
```

### 2. Health Tips API (Mocki)

- Returns an array of health/wellness tips: `{ id, message }`.
- Used in:
  - `HealthTips.jsx`, which picks a random tip and displays it on the Home page.

> Replace with your Mocki tips endpoint:
```js
const TIPS_API = 'https://mocki.io/v1/your-health-tips-endpoint'
```

### 3. Local Mock API (Appointments)

- Implemented in `src/api/mockApi.js`.
- Functions:
  - `createAppointment(appointment)` – creates an appointment in memory.
  - `fetchAppointmentsByPatient(patientId)` – returns all appointments for the patient.
- Used by:
  - `appointmentsSlice.js` (`bookAppointment`, `loadPatientAppointments` thunks).
- Simulates a backend without external dependencies.

---

## Getting Started (Development)

### Prerequisites

- Node.js and npm installed.

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

The app will typically be available at `http://localhost:5173/` (or the port shown in the terminal).

---

## Build and Deployment

### Build for production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Netlify deployment (recommended)

1. Push the project to a GitHub repository.
2. Go to [Netlify](https://www.netlify.com/) and **Import from Git**.
3. Set:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy.

For client-side routing support (React Router), add a `_redirects` file to `public/`:

```text
/*    /index.html   200
```

This ensures routes like `/doctors` and `/patient/dashboard` work directly in the deployed site.

---

## How It Works (High-Level Flow)

1. **Authentication:**  
   - Patient logs in from Home page (name + role stored in Redux).
   - Only logged-in patient can access dashboard and book appointments.

2. **Doctors page:**  
   - `loadDoctors` thunk fetches doctor list from Mocki API.
   - Filters and sort are applied on the client side.
   - Pagination controls allow navigation across pages.

3. **Booking:**  
   - When user clicks “Book Appointment,” `BookAppointment` loads doctor details from the same Mocki API.
   - On form submit, `bookAppointment` thunk creates an appointment in the mock backend.
   - User is redirected to the dashboard.

4. **Dashboard:**  
   - `loadPatientAppointments` thunk fetches appointments for the logged-in patient from the mock backend.
   - UI splits appointments into “Upcoming” and “Past/Other” and shows a simple chart.

5. **Health Tips:**  
   - On Home, `HealthTips` calls the Mocki tips API and displays one random tip.

6. **Dark Mode:**  
   - Dark/light mode toggle in Layout updates the `dark` class on `<html>` and persists preference in `localStorage`.

---

## Future Improvements

- Add real backend with authentication (JWT) and database.
- Enable doctor login and doctor-side appointment management.
- Add appointment cancellation/rescheduling (Update/Delete operations).
- Add more charts on the dashboard (e.g., appointments per month).
- Improve security (validation, form error handling, etc.).

---

## License

This project is created for academic/educational purposes.  
You may reuse and modify it for learning and non-commercial projects.