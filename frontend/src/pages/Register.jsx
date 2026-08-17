import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, UserCheck, Building2, AlertCircle } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Job Seeker');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      await register({ name, email, password, role, phone });
      if (role === 'Employer') navigate('/employer/dashboard');
      else navigate('/seeker/applications');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '60px 24px', maxWidth: '520px' }}>
      <div className="card" style={{ padding: '36px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>Create Your Account</h1>
          <p style={{ color: '#64748b', fontSize: '0.925rem' }}>Join the recruitment network today</p>
        </div>

        {error && (
          <div className="alert alert-danger">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Role Selector */}
          <div className="form-group">
            <label className="form-label">I want to:</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div
                onClick={() => setRole('Job Seeker')}
                style={{
                  border: `2px solid ${role === 'Job Seeker' ? '#4f46e5' : '#e2e8f0'}`,
                  background: role === 'Job Seeker' ? '#eef2ff' : '#ffffff',
                  padding: '14px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                }}
              >
                <UserCheck size={24} color={role === 'Job Seeker' ? '#4f46e5' : '#64748b'} style={{ margin: '0 auto 6px' }} />
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: role === 'Job Seeker' ? '#4f46e5' : '#0f172a' }}>
                  Find a Job
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Candidate Profile</div>
              </div>

              <div
                onClick={() => setRole('Employer')}
                style={{
                  border: `2px solid ${role === 'Employer' ? '#4f46e5' : '#e2e8f0'}`,
                  background: role === 'Employer' ? '#eef2ff' : '#ffffff',
                  padding: '14px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                }}
              >
                <Building2 size={24} color={role === 'Employer' ? '#4f46e5' : '#64748b'} style={{ margin: '0 auto 6px' }} />
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: role === 'Employer' ? '#4f46e5' : '#0f172a' }}>
                  Hire Talent
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Employer Account</div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">{role === 'Employer' ? 'Company Representative / Name' : 'Full Name'} *</label>
            <input
              type="text"
              required
              className="form-control"
              placeholder={role === 'Employer' ? 'e.g. Sarah Jenkins' : 'e.g. Alex Rivera'}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              required
              className="form-control"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number (Optional)</label>
            <input
              type="tel"
              className="form-control"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password * (Min. 6 chars)</label>
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
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: '#64748b' }}>
          Already have an account? <Link to="/login" style={{ color: '#4f46e5', fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
