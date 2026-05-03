# MediConnect – Healthcare Appointment System

MediConnect is a React-based single-page application that allows patients to browse doctors, book appointments, and view their appointment history in a simple dashboard. It is built with **React (Vite)**, **Redux Toolkit**, and **Tailwind CSS**, and integrates external mock APIs for doctors and health tips.[web:66][web:72]

## Features

- Patient login (demo) with basic role handling.
- Browse doctors with:
  - Search by name or city.
  - Filters by specialization and location.
  - Sorting by rating and experience.
  - Pagination for larger doctor lists.
- Book appointments with selected doctors and time slots.
- Patient dashboard showing:
  - Upcoming and past appointments.
  - Simple appointment statistics bar view.
- Dark/light mode toggle with preference saved in `localStorage`.
- External mock APIs:
  - Doctors list from a custom Mocki REST API.
  - Health tips from a custom Mocki REST API.

## Tech Stack

- **Frontend:** React, Vite, React Router
- **State Management:** Redux Toolkit, Redux Thunks
- **Styling:** Tailwind CSS, responsive design
- **APIs:**
  - Mocki.io for doctors and health tips (custom JSON endpoints).
  - In-memory mock API (`mockApi.js`) for appointments.

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
```

### Development

```bash
npm run dev
```

Open the app at `http://localhost:5173` (default Vite dev server).

### Build

```bash
npm run build
```

The production build will be generated in the `dist` folder.

## Deployment

This project is optimized for deployment on **Netlify**.[web:65][web:67]

Basic Netlify settings:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

For client-side routing (React Router), add a `_redirects` file in `public`:

```text
/*    /index.html   200
```

## Folder Structure (Key Files)

- `src/main.jsx` – React entry point.
- `src/App.jsx` – App routes and layout.
- `src/components/Layout.jsx` – Main layout and dark mode toggle.
- `src/pages/Home.jsx` – Landing page + health tips.
- `src/pages/Doctors.jsx` – Doctors list with filters and booking links.
- `src/pages/BookAppointment.jsx` – Appointment booking form.
- `src/pages/PatientDashboard.jsx` – Patient appointments dashboard.
- `src/store/` – Redux slices (`authSlice`, `doctorsSlice`, `appointmentsSlice`).
- `src/api/mockApi.js` – In-memory mock backend for appointments.

## Future Improvements

- Separate doctor and admin roles.
- Real backend with database for persistent appointments.
- Notifications and email/SMS reminders.
- More detailed doctor profiles and reviews.

---

Feel free to fork and customize this project for your own healthcare or booking-related use cases.