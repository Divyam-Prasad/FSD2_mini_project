import React, { useState } from 'react';
import api from '../services/api';
import { UploadCloud, CheckCircle2, AlertCircle, X } from 'lucide-react';

const ApplyModal = ({ job, onClose, onSuccess }) => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        setError('Please select a valid PDF file for your resume.');
        setResume(null);
        return;
      }
      setError('');
      setResume(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      setError('Please upload your resume in PDF format.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('resume', resume);
      formData.append('coverLetter', coverLetter);

      const res = await api.post(`/applications/apply/${job._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onSuccess(res.data.message || 'Application submitted successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Apply for Position</h2>
            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{job.title} at {job.companyName}</p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {error && (
            <div className="alert alert-danger">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Upload Resume (PDF only) *</label>
            <div style={{ border: '2px dashed #cbd5e1', borderRadius: '10px', padding: '24px', textAlign: 'center', backgroundColor: '#f8fafc', cursor: 'pointer' }}>
              <input
                type="file"
                id="resumeUpload"
                accept=".pdf"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="resumeUpload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <UploadCloud size={36} color="#4f46e5" />
                <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.95rem' }}>
                  {resume ? resume.name : 'Click to upload your resume (PDF)'}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Max file size 10MB</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Cover Letter (Optional)</label>
            <textarea
              className="form-control"
              placeholder="Explain why you are an ideal fit for this role and your relevant accomplishments..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={4}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="btn btn-primary">
              {submitting ? 'Submitting Application...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
