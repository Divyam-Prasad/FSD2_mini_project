import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, User, LogOut, LayoutDashboard, PlusCircle, Search } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'Admin') return '/admin/dashboard';
    if (user.role === 'Employer') return '/employer/dashboard';
    return '/seeker/applications';
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand-logo">
          <Briefcase size={28} color="#4f46e5" />
          <span>TalentPulse</span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className={`nav-link ${location.pathname === '/jobs' ? 'active' : ''}`}>
              Browse Jobs
            </Link>
          </li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {user ? (
            <>
              <Link to={getDashboardPath()} className="btn btn-secondary btn-sm">
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>
              
              {user.role === 'Employer' && (
                <Link to="/employer/post-job" className="btn btn-primary btn-sm">
                  <PlusCircle size={16} />
                  <span>Post a Job</span>
                </Link>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 10px', background: '#f1f5f9', borderRadius: '20px' }}>
                <User size={16} color="#64748b" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.name}</span>
                <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{user.role}</span>
              </div>

              <button onClick={handleLogout} className="btn btn-secondary btn-sm" title="Log Out">
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
