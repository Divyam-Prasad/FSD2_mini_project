import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#4f46e5' }}>Loading secure session...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ color: '#ef4444', marginBottom: '12px' }}>Access Denied (403)</h2>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            Your account role (<strong>{user.role}</strong>) does not have permission to view this page.
          </p>
          <a href="/" className="btn btn-primary">Return to Homepage</a>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
