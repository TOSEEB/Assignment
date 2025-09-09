import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobById, getJobs } from '../api';
import SocialShare from './SocialShare';
import './JobDetails.css';

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadJobDetails();
  }, [id]);

  const loadJobDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const jobData = await getJobById(id);
      setJob(jobData);
      
      // Add dummy related jobs for now
      const dummyRelatedJobs = [
        {
          id: 'dummy1',
          title: 'Quality Assurance Analyst',
          department: { title: 'Quality Assurance' },
          location: { title: 'Verna, Goa' }
        },
        {
          id: 'dummy2',
          title: 'HR Manager',
          department: { title: 'Human Resources' },
          location: { title: 'Verna, Goa' }
        },
        {
          id: 'dummy3',
          title: 'Project Manager',
          department: { title: 'Project Management' },
          location: { title: 'Verna, Goa' }
        },
        {
          id: 'dummy4',
          title: 'Technical Lead - Dot Net / React JS',
          department: { title: 'Development' },
          location: { title: 'Verna, Goa' }
        }
      ];
      setRelatedJobs(dummyRelatedJobs);
      
      // Load related jobs from the same department
      if (jobData.department) {
        try {
          const departmentId = jobData.department?.id || jobData.department;
          const allJobs = await getJobs({ department: departmentId });
          const related = allJobs.jobs || allJobs;
          setRelatedJobs(related.filter(j => j.id !== id).slice(0, 4));
        } catch (error) {
          console.error('Error loading related jobs:', error);
          // Keep dummy data if API fails
        }
      }
    } catch (err) {
      setError('Failed to load job details');
      console.error('Error loading job details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading job details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!job) {
    return <div className="error">Job not found</div>;
  }

  return (
    <div className="job-details">
      <Link to="/" className="back-link">← Back to Jobs</Link>
      
      <div className="job-header">
        <div className="company-header">
          {(job.department?.title || job.department) ? `${job.department?.title || job.department} Department At Teknorix Systems Goa` : 'Department At Teknorix Systems Goa'}
        </div>
        <h1 className="job-title">{job.title}</h1>
        <div className="job-meta">
          <span className="job-department">🏢 {job.department?.title || job.department || 'Department not specified'}</span>
          <span className="job-location">📍 {job.location?.title || job.location || 'Location not specified'}</span>
          <span className="job-type">FULL TIME</span>
        </div>
        {job.applyUrl && (
          <a 
            href={job.applyUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary apply-btn"
          >
            Apply
          </a>
        )}
        <div className="horizontal-line"></div>
      </div>

      <div className="job-details-container">
        <div className="main-content">
          <div className="job-content">
            <div className="job-description">
              <div dangerouslySetInnerHTML={{ __html: job.description || 'No description available' }} />
            </div>
          </div>
        </div>

        <div className="sidebar">
          <div className="other-jobs-container">
            <h2 className="sidebar-title">OTHER JOB OPENINGS</h2>
            <div className="other-jobs-list">
              {relatedJobs.map(relatedJob => (
                <div key={relatedJob.id} className="other-job-item">
                  <div className="other-job-title">{relatedJob.title}</div>
                  <div className="other-job-meta">
                    <span>🏢 {relatedJob.department?.title || relatedJob.department || 'Department'}</span>
                    <span>📍 {relatedJob.location?.title || relatedJob.location || 'Location'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="share-section">
            <h2 className="sidebar-title">SHARE JOB OPENINGS</h2>
            <div className="social-icons">
              <a href="#" className="social-icon facebook">f</a>
              <a href="#" className="social-icon linkedin">in</a>
              <a href="#" className="social-icon twitter">🐦</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
