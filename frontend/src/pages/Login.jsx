import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Lock, Mail, AlertCircle, Check } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(email, password);
      const role = data.data.role;
      if (role === 'Admin') navigate('/admin/dashboard');
      else if (role === 'Employer') navigate('/employer/dashboard');
      else navigate(from === '/login' ? '/seeker/applications' : from);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  // Quick demo credentials loader
  const fillDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="container" style={{ padding: '60px 24px', maxWidth: '480px' }}>
      <div className="card" style={{ padding: '36px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', padding: '12px', background: '#eef2ff', borderRadius: '16px', marginBottom: '12px' }}>
            <Briefcase size={32} color="#4f46e5" />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>Welcome Back</h1>
          <p style={{ color: '#64748b', fontSize: '0.925rem' }}>Sign in to access your recruitment portal</p>
        </div>

        {error && (
          <div className="alert alert-danger">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                className="form-control"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary btn-full btn-lg" style={{ marginTop: '10px' }}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Fast Login Buttons */}
        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>
            Demo Quick Login
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button type="button" onClick={() => fillDemo('seeker@dev.com', 'seeker123')} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
              Job Seeker
            </button>
            <button type="button" onClick={() => fillDemo('employer@techcorp.com', 'employer123')} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
              Employer
            </button>
            <button type="button" onClick={() => fillDemo('admin@jobportal.com', 'admin123')} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
              Admin
            </button>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: '#64748b' }}>
          Don't have an account? <Link to="/register" style={{ color: '#4f46e5', fontWeight: 600 }}>Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
