# 🌟 Online Job Portal System (MERN Stack)

A complete, modern, full-stack Online Job Portal System built with **MongoDB, Express.js, React.js (Vite), and Node.js**.

---

## 🚀 Features

### 👥 Multi-Role Authentication & Access Control
- **Job Seeker**: Browse jobs with real-time search & filters, apply with PDF resume & cover letter, track application status.
- **Employer**: Post jobs, manage job listings, view applicants, review resumes, and accept/reject applications.
- **Admin**: Dashboard analytics, manage all registered users, and moderate job postings.

### 💼 Job Management & Applications
- Comprehensive Job Search by Keyword, Location, Job Type, Experience Level, and Skill tags.
- Multer-powered secure PDF Resume upload and storage.
- Real-time application status tracking (`Pending`, `Accepted`, `Rejected`).
- JWT-based authentication with secure password hashing (`bcryptjs`).

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JSON Web Tokens (JWT), Multer, Bcrypt.js, CORS, Dotenv.
- **Frontend**: React 18, Vite, React Router v6, Axios, Lucide Icons, Custom Modern CSS Design System.

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)

### 2. Installation
Run the following command from the root directory to install all dependencies for both backend and frontend:
```bash
npm run install-all
```

Alternatively, install them manually:
```bash
# Install root tools
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 3. Configure Environment Variables
In `backend/.env`, verify or update your MongoDB connection string and JWT secret:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/job_portal_db
JWT_SECRET=super_secret_job_portal_jwt_key_2026
JWT_EXPIRE=30d
```

### 4. Run the Application
You can run both backend and frontend simultaneously with a single command from the root directory:
```bash
npm run dev
```

Or run them in separate terminal windows:
```bash
# Terminal 1: Backend (Runs on http://localhost:5000)
cd backend
npm run dev

# Terminal 2: Frontend (Runs on http://localhost:5173)
cd frontend
npm run dev
```

Open your browser and navigate to **`http://localhost:5173`**.

---

## 🔑 Demo Login Accounts

You can register your own accounts via the UI, or use the built-in quick demo credentials on the Login page:
- **Admin**: `admin@jobportal.com` / `admin123`
- **Employer**: `employer@techcorp.com` / `employer123`
- **Job Seeker**: `seeker@dev.com` / `seeker123`
