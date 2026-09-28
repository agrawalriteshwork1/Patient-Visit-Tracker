# Patient Visit Tracker

A full-stack application for managing clinicians, patients, and patient visit records.

## Tech Stack

### Backend

* Node.js
* Express.js
* SQLite
* Better-SQLite3
* CORS

### Frontend

* React
* Vite
* Axios
* Tailwind CSS

## Project Structure

```text
patient-visit-tracker/
├── backend/
│   ├── data/
│   └── src/
└── frontend/
    └── src/
```

## Prerequisites

Make sure you have installed:

* Node.js 18+
* npm 9+

Check your versions:

```bash
node --version
npm --version
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/agrawalriteshwork1/Patient-Visit-Tracker.git
cd patient-visit-tracker
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file if required by the project configuration.

Start the backend:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:8000
```

Health check:

```text
http://localhost:8000/api/health
```

### 3. Setup Frontend

Open another terminal:

```bash
cd patient-visit-tracker/frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:8000/api
```

Start the frontend:

```bash
npm run dev
```

Open the URL shown by Vite, typically:

```text
http://localhost:5173
```

## Available API Endpoints

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| GET    | `/api/health`     | Check API status   |
| GET    | `/api/clinicians` | Get all clinicians |
| POST   | `/api/clinicians` | Create a clinician |
| GET    | `/api/patients`   | Get all patients   |
| POST   | `/api/patients`   | Create a patient   |
| GET    | `/api/visits`     | Get all visits     |
| POST   | `/api/visits`     | Record a visit     |

Visits are returned in reverse chronological order.

## Running Tests

From the backend directory:

```bash
npm test
```

If frontend tests are configured:

```bash
cd frontend
npm test
```

## Using the Application

1. Start the backend.
2. Start the frontend.
3. Open the frontend URL in your browser.
4. Select a clinician and patient.
5. Add optional visit notes.
6. Click **Record Visit**.
7. The newly created visit appears in the visit list.
8. Use the filters to view visits for a specific clinician or patient.

## Environment Variables

### Frontend

```env
VITE_API_URL=http://localhost:8000/api
```

The backend uses SQLite for local persistence, so no separate database server is required.

## Notes

* The application is designed for local development and take-home assignment evaluation.
* Backend and frontend run as separate applications.
* CORS is enabled so the React frontend can communicate with the Express API.
* SQLite data is stored locally in the backend data directory.
