import React from 'react';
import { Briefcase, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '60px 0 30px', marginTop: '60px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff', fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px' }}>
              <Briefcase size={26} color="#6366f1" />
              <span>TalentPulse</span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              Connecting high-caliber talent with top-tier companies worldwide. Built with the full MERN Stack.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '1rem' }}>For Candidates</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/jobs" style={{ color: '#94a3b8' }}>Browse All Jobs</Link></li>
              <li><Link to="/seeker/applications" style={{ color: '#94a3b8' }}>Applied Jobs Tracker</Link></li>
              <li><Link to="/register" style={{ color: '#94a3b8' }}>Create Candidate Profile</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '1rem' }}>For Employers</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/employer/post-job" style={{ color: '#94a3b8' }}>Post Open Position</Link></li>
              <li><Link to="/employer/dashboard" style={{ color: '#94a3b8' }}>Manage Job Postings</Link></li>
              <li><Link to="/employer/applications" style={{ color: '#94a3b8' }}>Review Applications</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '1rem' }}>Platform</h4>
            <p style={{ fontSize: '0.875rem', marginBottom: '12px' }}>
              Designed with MongoDB, Express, React & Node.js for modern recruitment workflows.
            </p>
            <span className="badge badge-primary">v1.0.0 Production Ready</span>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem' }}>
          <span>© {new Date().getFullYear()} TalentPulse Online Job Portal. All rights reserved.</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Engineered with <Heart size={14} color="#ef4444" fill="#ef4444" /> for Modern Web Standards
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
