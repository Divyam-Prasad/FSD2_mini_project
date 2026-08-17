import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import JobCard from '../components/JobCard';
import { Search, MapPin, Filter, RotateCcw } from 'lucide-react';

const JobListings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [jobType, setJobType] = useState(searchParams.get('jobType') || 'All');
  const [experience, setExperience] = useState(searchParams.get('experience') || 'All');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (keyword) params.keyword = keyword;
      if (location) params.location = location;
      if (jobType !== 'All') params.jobType = jobType;
      if (experience !== 'All') params.experience = experience;

      const res = await api.get('/jobs', { params });
      setJobs(res.data.data);
    } catch (err) {
      console.error('Error loading jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [jobType, experience]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleReset = () => {
    setKeyword('');
    setLocation('');
    setJobType('All');
    setExperience('All');
    setSearchParams({});
    setTimeout(() => {
      api.get('/jobs').then((res) => setJobs(res.data.data));
    }, 50);
  };

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
          Explore Job Listings
        </h1>
        <p style={{ color: '#64748b' }}>Search and filter through all currently active job postings.</p>
      </div>

      {/* Main Search Bar */}
      <form onSubmit={handleSearchSubmit} className="card" style={{ padding: '16px', marginBottom: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px' }}>
          <Search size={20} color="#64748b" />
          <input
            type="text"
            className="form-control"
            placeholder="Search by title, skill, or keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px' }}>
          <MapPin size={20} color="#64748b" />
          <input
            type="text"
            className="form-control"
            placeholder="Location or 'Remote'"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          <Search size={16} />
          <span>Search</span>
        </button>

        <button type="button" onClick={handleReset} className="btn btn-secondary" title="Reset Filters">
          <RotateCcw size={16} />
        </button>
      </form>

      {/* Layout with Filters Sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }}>
        {/* Sidebar Filters */}
        <aside>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontWeight: 700, fontSize: '1.1rem' }}>
              <Filter size={18} color="#4f46e5" />
              <span>Filter Results</span>
            </div>

            <div className="form-group">
              <label className="form-label">Job Type</label>
              <select className="form-control" value={jobType} onChange={(e) => setJobType(e.target.value)}>
                <option value="All">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Experience Tier</label>
              <select className="form-control" value={experience} onChange={(e) => setExperience(e.target.value)}>
                <option value="All">All Levels</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
                <option value="Lead / Executive">Lead / Executive</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Job Cards Grid */}
        <main>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#64748b' }}>
              Showing {jobs.length} open position{jobs.length !== 1 ? 's' : ''}
            </span>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading matching jobs...</div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-2">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>No matches found</h3>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>Try broadening your search query or removing filters.</p>
              <button onClick={handleReset} className="btn btn-primary">Reset All Filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default JobListings;
