import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, DollarSign, Clock, ArrowRight } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '8px' }}>{job.jobType}</span>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
            <Link to={`/jobs/${job._id}`} style={{ color: 'inherit' }}>
              {job.title}
            </Link>
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
            <Building2 size={16} />
            <span>{job.companyName}</span>
          </div>
        </div>

        <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={14} />
          {new Date(job.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p style={{ color: '#475569', fontSize: '0.925rem', marginBottom: '16px', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {job.description}
      </p>

      {job.skills && job.skills.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
          {job.skills.slice(0, 4).map((skill, index) => (
            <span key={index} style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span style={{ background: '#f1f5f9', color: '#64748b', fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px' }}>
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      )}

      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0f172a', fontWeight: 700, fontSize: '0.95rem' }}>
            <DollarSign size={16} color="#10b981" />
            <span>{job.salary}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '0.8rem' }}>
            <MapPin size={13} />
            <span>{job.location}</span>
          </div>
        </div>

        <Link to={`/jobs/${job._id}`} className="btn btn-secondary btn-sm">
          <span>Details</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
