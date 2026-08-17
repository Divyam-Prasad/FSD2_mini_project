import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Briefcase, Users, PlusCircle, Trash2, Calendar, Eye } from 'lucide-react';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyJobs = async () => {
    try {
      const res = await api.get('/jobs/my/listings');
      setJobs(res.data.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job listing and its applications?')) {
      try {
        await api.delete(`/jobs/${jobId}`);
        setJobs(jobs.filter((j) => j._id !== jobId));
      } catch (err) {
        alert('Failed to delete job: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>My Job Postings</h1>
          <p style={{ color: '#64748b' }}>Manage your active vacancies and review incoming candidate submissions.</p>
        </div>

        <Link to="/employer/post-job" className="btn btn-primary">
          <PlusCircle size={18} />
          <span>Post New Job</span>
        </Link>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading your job postings...</div>
      ) : jobs.length > 0 ? (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Location / Type</th>
                <th>Posted Date</th>
                <th>Applicants</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>
                      <Link to={`/jobs/${job._id}`} style={{ color: '#4f46e5' }}>
                        {job.title}
                      </Link>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{job.salary}</div>
                  </td>
                  <td>
                    <div>{job.location}</div>
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem', marginTop: '4px' }}>{job.jobType}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
                      <Calendar size={14} color="#64748b" />
                      {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <Link to={`/employer/applications?jobId=${job._id}`} className="badge badge-primary" style={{ padding: '6px 12px', fontSize: '0.8rem', cursor: 'pointer' }}>
                      <Users size={14} style={{ marginRight: '4px' }} />
                      {job.applicantCount || 0} Candidates
                    </Link>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link to={`/employer/applications?jobId=${job._id}`} className="btn btn-secondary btn-sm" title="View Applicants">
                        <Eye size={14} />
                      </Link>
                      <button onClick={() => handleDelete(job._id)} className="btn btn-danger btn-sm" title="Delete Listing">
                        <Trash2 size={14} />
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
          <Briefcase size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>No active job listings</h3>
          <p style={{ color: '#64748b', marginBottom: '20px' }}>You have not published any job vacancies yet.</p>
          <Link to="/employer/post-job" className="btn btn-primary">Post Your First Job</Link>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
