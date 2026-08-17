import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Register from './pages/Register';

// Job Seeker Pages
import AppliedJobs from './pages/seeker/AppliedJobs';

// Employer Pages
import PostJob from './pages/employer/PostJob';
import ManageJobs from './pages/employer/ManageJobs';
import ViewApplications from './pages/employer/ViewApplications';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageAllJobs from './pages/admin/ManageAllJobs';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Job Seeker Protected Routes */}
          <Route
            path="/seeker"
            element={
              <ProtectedRoute allowedRoles={['Job Seeker']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/seeker/applications" replace />} />
            <Route path="applications" element={<AppliedJobs />} />
          </Route>

          {/* Employer Protected Routes */}
          <Route
            path="/employer"
            element={
              <ProtectedRoute allowedRoles={['Employer']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/employer/dashboard" replace />} />
            <Route path="dashboard" element={<ManageJobs />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="applications" element={<ViewApplications />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="jobs" element={<ManageAllJobs />} />
          </Route>

          {/* Fallback 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
