import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getJobs, getDepartments, getLocations, getFunctions } from '../api';
import SearchFilters from './SearchFilters';
import AppliedFilters from './AppliedFilters';
import './JobList.css';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [lookupsLoading, setLookupsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    loadLookups();
    loadJobs();
  }, []);

  useEffect(() => {
    loadJobs();
  }, [filters]);

  const loadLookups = async () => {
    try {
      setLookupsLoading(true);
      console.log('Loading lookups...');
      const [deptData, locData, funcData] = await Promise.all([
        getDepartments(),
        getLocations(),
        getFunctions()
      ]);
      console.log('Departments loaded:', deptData);
      console.log('Locations loaded:', locData);
      console.log('Functions loaded:', funcData);
      
      // Set data or fallback to test data
      setDepartments(deptData && deptData.length > 0 ? deptData : [
        { id: 1, name: 'Engineering', title: 'Engineering' },
        { id: 2, name: 'Marketing', title: 'Marketing' },
        { id: 3, name: 'Sales', title: 'Sales' }
      ]);
      setLocations(locData && locData.length > 0 ? locData : [
        { id: 1, name: 'Goa Office', title: 'Goa Office' },
        { id: 2, name: 'Mumbai Office', title: 'Mumbai Office' },
        { id: 3, name: 'Delhi Office', title: 'Delhi Office' }
      ]);
      setFunctions(funcData && funcData.length > 0 ? funcData : [
        { id: 1, name: 'Development', title: 'Development' },
        { id: 2, name: 'Design', title: 'Design' },
        { id: 3, name: 'Management', title: 'Management' }
      ]);
    } catch (err) {
      console.error('Error loading lookups:', err);
      // Set test data as fallback
      setDepartments([
        { id: 1, name: 'Engineering', title: 'Engineering' },
        { id: 2, name: 'Marketing', title: 'Marketing' },
        { id: 3, name: 'Sales', title: 'Sales' }
      ]);
      setLocations([
        { id: 1, name: 'Goa Office', title: 'Goa Office' },
        { id: 2, name: 'Mumbai Office', title: 'Mumbai Office' },
        { id: 3, name: 'Delhi Office', title: 'Delhi Office' }
      ]);
      setFunctions([
        { id: 1, name: 'Development', title: 'Development' },
        { id: 2, name: 'Design', title: 'Design' },
        { id: 3, name: 'Management', title: 'Management' }
      ]);
    } finally {
      setLookupsLoading(false);
    }
  };

  const loadJobs = useCallback(async () => {
    setJobsLoading(true);
    setError(null);
    try {
      console.log('Loading jobs with filters:', filters);
      const data = await getJobs(filters);
      console.log('Jobs data received:', data);
      setJobs(data.jobs || data);
      setFilteredJobs(data.jobs || data);
    } catch (err) {
      setError('Failed to load jobs');
      console.error('Error loading jobs:', err);
    } finally {
      setJobsLoading(false);
    }
  }, [filters]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const groupJobsByDepartment = useCallback((jobsList) => {
    const grouped = {};
    jobsList.forEach(job => {
      // Group jobs by department, or put in "General" if no department
      let dept = 'General';
      if (job.department && (job.department.title || job.department)) {
        dept = job.department.title || job.department;
      }
      
      if (!grouped[dept]) {
        grouped[dept] = [];
      }
      grouped[dept].push(job);
    });
    return grouped;
  }, []);

  const groupedJobs = useMemo(() => groupJobsByDepartment(filteredJobs), [filteredJobs, groupJobsByDepartment]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  const testAPI = async () => {
    try {
      console.log('Testing API directly...');
      
      // Test locations
      const locResponse = await fetch('https://demo.jobsoid.com/api/v1/locations');
      const locData = await locResponse.json();
      console.log('Locations:', locData);
      
      // Test jobs WITHOUT any parameters (should return all jobs)
      const allJobsResponse = await fetch('https://demo.jobsoid.com/api/v1/jobs');
      const allJobsData = await allJobsResponse.json();
      console.log('All Jobs (no params):', allJobsData);
      
      // Test jobs with search parameter
      const searchJobsResponse = await fetch('https://demo.jobsoid.com/api/v1/jobs?q=developer');
      const searchJobsData = await searchJobsResponse.json();
      console.log('Jobs with search:', searchJobsData);
      
      alert(`API Test Results:\n- Locations: ${locData.length}\n- All Jobs: ${Array.isArray(allJobsData) ? allJobsData.length : 'Unknown format'}\n- Search Jobs: ${Array.isArray(searchJobsData) ? searchJobsData.length : 'Unknown format'}`);
    } catch (error) {
      console.error('Direct API test error:', error);
      alert('API Test failed: ' + error.message);
    }
  };

  return (
    <div className="job-list">
      <div className="filters-wrapper">
        <SearchFilters
          departments={departments}
          locations={locations}
          functions={functions}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>
      
      <AppliedFilters
        filters={filters}
        onRemoveFilter={handleFilterChange}
        onClearAll={() => {
          setFilters({
            search: '',
            department: '',
            location: '',
            function: ''
          });
        }}
        departments={departments}
        locations={locations}
        functions={functions}
      />
      
      <div className="jobs-container">
        {jobsLoading ? (
          <div className="loading">Loading jobs...</div>
        ) : Object.keys(groupedJobs).length === 0 ? (
          <div className="no-jobs">No jobs found matching your criteria.</div>
        ) : (
          Object.entries(groupedJobs).map(([department, departmentJobs]) => (
            <div key={department} className="department-section">
              <h2 className="department-title">{department}</h2>
              <div className="jobs-grid">
                {departmentJobs.map(job => (
                  <div key={job.id} className="job-card">
                    <h3 className="job-title">{job.title}</h3>
                    <div className="job-meta">
                      <span className="job-department">🏢 {job.department?.title || job.department || 'Department not specified'}</span>
                      <span className="job-location">📍 {job.location?.title || job.location || 'Location not specified'}</span>
                      <div className="job-type">FULL TIME</div>
                    </div>
                    <div className="job-actions">
                      {job.applyUrl && (
                        <a 
                          href={job.applyUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-secondary"
                        >
                          Apply
                        </a>
                      )}
                      <Link to={`/job/${job.id}`} className="btn btn-primary">
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default JobList;
