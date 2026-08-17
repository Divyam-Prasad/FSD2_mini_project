import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Briefcase, Trash2, Calendar, Users, Eye } from 'lucide-react';

const ManageAllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs/admin/all');
      setJobs(res.data.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (window.confirm('Delete this job posting and all associated candidate applications?')) {
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
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>All Platform Job Postings</h1>
        <p style={{ color: '#64748b' }}>Moderate content and inspect vacancies across all employers.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading all job postings...</div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Job Title & Company</th>
                <th>Posted By</th>
                <th>Location / Type</th>
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
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{job.companyName}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.9rem', color: '#0f172a' }}>{job.postedBy?.name || 'N/A'}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{job.postedBy?.email}</div>
                  </td>
                  <td>
                    <div>{job.location}</div>
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{job.jobType}</span>
                  </td>
                  <td>
                    <span className="badge badge-primary">
                      {job.applicantCount || 0} Applications
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link to={`/jobs/${job._id}`} className="btn btn-secondary btn-sm" title="View Public Page">
                        <Eye size={14} />
                      </Link>
                      <button onClick={() => handleDelete(job._id)} className="btn btn-danger btn-sm" title="Delete Job">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageAllJobs;
