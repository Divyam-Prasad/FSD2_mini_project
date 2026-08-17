import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Users, Briefcase, FileText, Building2, ShieldCheck, ArrowRight } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/applications/admin/stats');
        setStats(res.data.data);
      } catch (err) {
        console.error('Error fetching admin metrics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>System Administration Portal</h1>
        <p style={{ color: '#64748b' }}>Overview of platform users, job postings, and active applications.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading system metrics...</div>
      ) : (
        <>
          <div className="grid grid-cols-4" style={{ marginBottom: '32px' }}>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Total Users</span>
                <Users size={20} color="#4f46e5" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{stats?.totalUsers || 0}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                {stats?.totalSeekers} Seekers • {stats?.totalEmployers} Employers
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Active Jobs</span>
                <Briefcase size={20} color="#0ea5e9" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{stats?.totalJobs || 0}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Across all companies</div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Applications</span>
                <FileText size={20} color="#10b981" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{stats?.totalApplications || 0}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Submissions recorded</div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Companies</span>
                <Building2 size={20} color="#8b5cf6" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{stats?.totalCompanies || 0}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Registered organizations</div>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' }}>User Management</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem', marginBottom: '20px' }}>
                Review all registered candidates, employers, and administrator accounts. Delete or audit credentials.
              </p>
              <Link to="/admin/users" className="btn btn-primary">
                <span>Manage Users</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' }}>Job Moderation</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem', marginBottom: '20px' }}>
                Inspect all job listings posted platform-wide. Moderate content or remove non-compliant listings.
              </p>
              <Link to="/admin/jobs" className="btn btn-primary">
                <span>Manage All Jobs</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
