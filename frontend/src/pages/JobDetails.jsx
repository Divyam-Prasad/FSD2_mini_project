import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ApplyModal from '../components/ApplyModal';
import {
  Building2,
  MapPin,
  DollarSign,
  Briefcase,
  GraduationCap,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Share2
} from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data.data);
      } catch (err) {
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApplyClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'Job Seeker') {
      alert('Only candidates with a "Job Seeker" account can apply for jobs.');
      return;
    }
    setShowApplyModal(true);
  };

  const handleApplySuccess = (msg) => {
    setShowApplyModal(false);
    setSuccessMessage(msg);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '80px', color: '#64748b' }}>Loading job details...</div>;
  }

  if (!job) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2>Job not found</h2>
        <Link to="/jobs" className="btn btn-primary" style={{ marginTop: '16px' }}>Back to Listings</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <Link to="/jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#64748b', fontWeight: 600, marginBottom: '24px' }}>
        <ArrowLeft size={16} />
        <span>Back to all jobs</span>
      </Link>

      {successMessage && (
        <div className="alert alert-success">
          <CheckCircle2 size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* Main Job Body */}
        <div>
          <div className="card" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '10px' }}>{job.jobType}</span>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>{job.title}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569', fontSize: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <Building2 size={18} color="#4f46e5" />
                    {job.companyName}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={16} />
                    {job.location}
                  </span>
                </div>
              </div>

              <button onClick={handleApplyClick} className="btn btn-primary btn-lg">
                Apply for this Position
              </button>
            </div>
          </div>

          <div className="card" style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px', color: '#0f172a' }}>
              Job Description & Responsibilities
            </h2>
            <div style={{ color: '#334155', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
              {job.description}
            </div>
          </div>

          {job.skills && job.skills.length > 0 && (
            <div className="card">
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px', color: '#0f172a' }}>
                Required Skills & Competencies
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {job.skills.map((skill, index) => (
                  <span key={index} style={{ background: '#eef2ff', color: '#4f46e5', padding: '6px 14px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Summary Card */}
        <aside>
          <div className="card" style={{ position: 'sticky', top: '90px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              Job Overview
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.925rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <DollarSign size={20} color="#10b981" />
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Offered Salary</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{job.salary}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <GraduationCap size={20} color="#6366f1" />
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Experience Level</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{job.experience}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Briefcase size={20} color="#0ea5e9" />
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Employment Type</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{job.jobType}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={20} color="#f59e0b" />
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Posted Date</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{new Date(job.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              {job.deadline && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Calendar size={20} color="#ef4444" />
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Application Deadline</div>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{new Date(job.deadline).toLocaleDateString()}</div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
              <button onClick={handleApplyClick} className="btn btn-primary btn-full">
                Apply Now
              </button>
            </div>
          </div>
        </aside>
      </div>

      {showApplyModal && (
        <ApplyModal
          job={job}
          onClose={() => setShowApplyModal(false)}
          onSuccess={handleApplySuccess}
        />
      )}
    </div>
  );
};

export default JobDetails;
