import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import JobCard from '../components/JobCard';
import { Search, MapPin, Briefcase, TrendingUp, Users, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

const Home = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs');
        setFeaturedJobs(res.data.data.slice(0, 6));
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%)', padding: '80px 0 60px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
          <span className="badge badge-primary" style={{ padding: '6px 14px', fontSize: '0.85rem', marginBottom: '20px' }}>
            <Sparkles size={14} style={{ marginRight: '4px' }} /> Discover 10,000+ Verified Tech Opportunities
          </span>

          <h1 style={{ fontSize: '3.2rem', fontWeight: 800, color: '#0f172a', lineHeight: '1.2', marginBottom: '20px' }}>
            Find Your Dream Job or Hire the <span style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Top 1% Talent</span>
          </h1>

          <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '40px', lineHeight: '1.6' }}>
            TalentPulse is the next-generation recruitment hub connecting ambitious software engineers, designers, and managers with hyper-growth companies.
          </p>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearch} style={{ background: '#ffffff', padding: '12px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 240px', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 12px' }}>
              <Search size={20} color="#64748b" />
              <input
                type="text"
                placeholder="Job title, keywords, or company..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1rem' }}
              />
            </div>

            <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 12px', borderLeft: '1px solid #e2e8f0' }}>
              <MapPin size={20} color="#64748b" />
              <input
                type="text"
                placeholder="City, State, or 'Remote'"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1rem' }}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg">
              Search Jobs
            </button>
          </form>

          {/* Popular Categories */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '24px', fontSize: '0.875rem', color: '#64748b' }}>
            <span style={{ fontWeight: 600 }}>Popular:</span>
            {['React', 'Node.js', 'Python', 'Full Stack', 'Remote', 'DevOps'].map((tag) => (
              <Link key={tag} to={`/jobs?keyword=${tag}`} style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '4px 12px', borderRadius: '20px', color: '#475569' }}>
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section style={{ padding: '30px 0', borderBottom: '1px solid #e2e8f0', background: '#ffffff' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#4f46e5' }}>10k+</div>
            <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>Live Job Openings</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0ea5e9' }}>5,200+</div>
            <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>Verified Companies</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>120k+</div>
            <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>Active Candidates</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#8b5cf6' }}>98%</div>
            <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>Hiring Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="container" style={{ padding: '60px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '8px' }}>Hand-Picked</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>Featured Opportunities</h2>
          </div>
          <Link to="/jobs" className="btn btn-secondary">
            <span>View All Jobs</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading latest opportunities...</div>
        ) : featuredJobs.length > 0 ? (
          <div className="grid grid-cols-3">
            {featuredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: '#64748b' }}>No jobs posted yet. Be the first employer to list a vacancy!</p>
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section style={{ background: '#f8fafc', padding: '70px 0', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>Built For Modern Hiring</h2>
            <p style={{ color: '#64748b' }}>Every feature engineered to streamline recruitment from application to offer.</p>
          </div>

          <div className="grid grid-cols-3">
            <div className="card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <TrendingUp size={24} color="#4f46e5" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Precision Matching</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem' }}>
                Filter listings by technology stack, compensation ranges, experience tiers, and remote eligibility.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShieldCheck size={24} color="#10b981" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Secure PDF Resumes</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem' }}>
                Uploaded PDF resumes are stored securely and rendered cleanly for hiring managers with direct review tools.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Users size={24} color="#f59e0b" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Dedicated Dashboards</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem' }}>
                Tailored interfaces for candidates, hiring managers, and administrators with role-specific permissions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
