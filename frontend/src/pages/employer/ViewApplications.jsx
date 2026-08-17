import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import { Users, FileText, ExternalLink, Mail, Phone, Calendar, Check, X } from 'lucide-react';

const ViewApplications = () => {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId');

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const endpoint = jobId ? `/applications/job/${jobId}` : '/applications/employer/all';
      const res = await api.get(endpoint);
      setApplications(res.data.data);
    } catch (err) {
      console.error('Error fetching applicants:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      await api.put(`/applications/${appId}/status`, { status: newStatus });
      setApplications(
        applications.map((app) => (app._id === appId ? { ...app, status: newStatus } : app))
      );
    } catch (err) {
      alert('Status update failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>Candidate Applications</h1>
        <p style={{ color: '#64748b' }}>Review submissions, inspect PDF resumes, and update recruitment status.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading applicants...</div>
      ) : applications.length > 0 ? (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Job Applied For</th>
                <th>Applied Date</th>
                <th>Resume (PDF)</th>
                <th>Current Status</th>
                <th>Decision Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{app.applicantId?.name || 'Candidate'}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#64748b' }}>
                      <Mail size={12} />
                      {app.applicantId?.email}
                    </div>
                    {app.applicantId?.phone && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#64748b' }}>
                        <Phone size={12} />
                        {app.applicantId?.phone}
                      </div>
                    )}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#4f46e5' }}>{app.jobId?.title || 'Job Posting'}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{app.jobId?.location}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
                      <Calendar size={14} color="#64748b" />
                      {new Date(app.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                    >
                      <FileText size={14} />
                      <span>Review Resume</span>
                      <ExternalLink size={12} />
                    </a>
                  </td>
                  <td>
                    <span className={`badge badge-${app.status.toLowerCase()}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => handleStatusUpdate(app._id, 'Accepted')}
                        className="btn btn-sm"
                        style={{ background: '#ecfdf5', color: '#10b981', border: '1px solid #10b981' }}
                        title="Accept Application"
                      >
                        <Check size={14} />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(app._id, 'Rejected')}
                        className="btn btn-sm"
                        style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #ef4444' }}
                        title="Reject Application"
                      >
                        <X size={14} />
                        <span>Reject</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <Users size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>No applicants found</h3>
          <p style={{ color: '#64748b' }}>No candidates have applied for this listing yet.</p>
        </div>
      )}
    </div>
  );
};

export default ViewApplications;
