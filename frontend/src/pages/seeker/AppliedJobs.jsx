import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FileText, ExternalLink, Calendar, Building2, MapPin } from 'lucide-react';

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/applications/my');
        setApplications(res.data.data);
      } catch (err) {
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return <span className="badge badge-accepted">Accepted</span>;
      case 'Rejected':
        return <span className="badge badge-rejected">Rejected</span>;
      default:
        return <span className="badge badge-pending">Pending Review</span>;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>My Submitted Applications</h1>
        <p style={{ color: '#64748b' }}>Track real-time statuses of all your job submissions.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading application history...</div>
      ) : applications.length > 0 ? (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Job Title & Company</th>
                <th>Location & Type</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>
                      {app.jobId ? (
                        <Link to={`/jobs/${app.jobId._id}`} style={{ color: '#4f46e5' }}>
                          {app.jobId.title}
                        </Link>
                      ) : (
                        <span style={{ color: '#94a3b8' }}>Job Posting Closed</span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      {app.jobId?.companyName || 'N/A'}
                    </div>
                  </td>
                  <td>
                    <div>{app.jobId?.location || 'N/A'}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{app.jobId?.jobType}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem' }}>
                      <Calendar size={14} color="#64748b" />
                      {new Date(app.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>{getStatusBadge(app.status)}</td>
                  <td>
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                    >
                      <FileText size={14} />
                      <span>View PDF</span>
                      <ExternalLink size={12} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <FileText size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>No applications submitted yet</h3>
          <p style={{ color: '#64748b', marginBottom: '20px' }}>Start browsing open positions and apply with your resume.</p>
          <Link to="/jobs" className="btn btn-primary">Browse Jobs Now</Link>
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
