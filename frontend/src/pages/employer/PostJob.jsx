import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { PlusCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    location: '',
    salary: '',
    experience: 'Mid Level',
    jobType: 'Full-time',
    skills: '',
    description: '',
    deadline: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/jobs', formData);
      navigate('/employer/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job posting.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>Post a New Job Opportunity</h1>
        <p style={{ color: '#64748b' }}>Provide detailed criteria to attract high-caliber candidates.</p>
      </div>

      {error && (
        <div className="alert alert-danger">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card" style={{ padding: '32px' }}>
        <div className="grid grid-cols-2">
          <div className="form-group">
            <label className="form-label">Job Title *</label>
            <input
              type="text"
              name="title"
              required
              className="form-control"
              placeholder="e.g. Senior Full Stack Engineer"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Company Name *</label>
            <input
              type="text"
              name="companyName"
              required
              className="form-control"
              placeholder="e.g. TechCorp Solutions"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="form-group">
            <label className="form-label">Location *</label>
            <input
              type="text"
              name="location"
              required
              className="form-control"
              placeholder="e.g. San Francisco, CA or Remote"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Salary / Compensation *</label>
            <input
              type="text"
              name="salary"
              required
              className="form-control"
              placeholder="e.g. $120,000 - $150,000 / yr"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="form-group">
            <label className="form-label">Employment Type</label>
            <select name="jobType" className="form-control" value={formData.jobType} onChange={handleChange}>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Experience Tier</label>
            <select name="experience" className="form-control" value={formData.experience} onChange={handleChange}>
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior Level">Senior Level</option>
              <option value="Lead / Executive">Lead / Executive</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="form-group">
            <label className="form-label">Required Skills (Comma separated)</label>
            <input
              type="text"
              name="skills"
              className="form-control"
              placeholder="e.g. React, Node.js, MongoDB, TypeScript"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Application Deadline</label>
            <input
              type="date"
              name="deadline"
              className="form-control"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Full Job Description & Requirements *</label>
          <textarea
            name="description"
            required
            rows={8}
            className="form-control"
            placeholder="Describe role responsibilities, team culture, requirements, and benefits..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
          <button type="button" onClick={() => navigate('/employer/dashboard')} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
            {loading ? 'Publishing Job...' : 'Publish Job Listing'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
