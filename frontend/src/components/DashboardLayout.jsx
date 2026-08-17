import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Briefcase,
  FileText,
  PlusCircle,
  Users,
  Building2,
  LogOut,
  ShieldCheck,
  CheckSquare
} from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div style={{ padding: '8px 12px 20px', borderBottom: '1px solid #e2e8f0', marginBottom: '12px' }}>
          <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem' }}>{user?.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
            <span className="badge badge-primary">{user?.role}</span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {/* Job Seeker Navigation */}
          {user?.role === 'Job Seeker' && (
            <>
              <NavLink to="/seeker/applications" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <FileText size={18} />
                <span>My Applications</span>
              </NavLink>
              <NavLink to="/jobs" className="sidebar-link">
                <Briefcase size={18} />
                <span>Search Jobs</span>
              </NavLink>
            </>
          )}

          {/* Employer Navigation */}
          {user?.role === 'Employer' && (
            <>
              <NavLink to="/employer/dashboard" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Briefcase size={18} />
                <span>Manage Jobs</span>
              </NavLink>
              <NavLink to="/employer/post-job" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <PlusCircle size={18} />
                <span>Post New Job</span>
              </NavLink>
              <NavLink to="/employer/applications" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Users size={18} />
                <span>All Applicants</span>
              </NavLink>
            </>
          )}

          {/* Admin Navigation */}
          {user?.role === 'Admin' && (
            <>
              <NavLink to="/admin/dashboard" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <ShieldCheck size={18} />
                <span>System Overview</span>
              </NavLink>
              <NavLink to="/admin/users" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Users size={18} />
                <span>Manage Users</span>
              </NavLink>
              <NavLink to="/admin/jobs" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Briefcase size={18} />
                <span>Manage All Jobs</span>
              </NavLink>
            </>
          )}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
          <button onClick={handleLogout} className="sidebar-link" style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main className="dashboard-body">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
