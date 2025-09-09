import React, { useState, useEffect } from 'react';
import './SearchFilters.css';

function SearchFilters({ departments, locations, functions, filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters || {});

  // Sync localFilters with parent filters when they change
  useEffect(() => {
    setLocalFilters(filters || {});
  }, [filters]);

  const handleInputChange = (field, value) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      department: '',
      location: '',
      function: ''
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(localFilters).some(value => value !== '');

  return (
    <div className="search-filters">
      <div className="filters-row">
        <div className="search-row">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for Job"
              value={localFilters.search}
              onChange={(e) => handleInputChange('search', e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="dropdowns-row">
          <select
            value={localFilters.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className="filter-select"
          >
            <option value="">Department</option>
            {departments.length > 0 ? departments.map(dept => (
              <option key={dept.id} value={dept.id}>
                {dept.name || dept.title}
              </option>
            )) : (
              <option value="test" disabled>Loading departments...</option>
            )}
          </select>

          <select
            value={localFilters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="filter-select"
          >
            <option value="">Location</option>
            {locations.length > 0 ? locations.map(location => (
              <option key={location.id} value={location.id}>
                {location.name || location.title}
              </option>
            )) : (
              <option value="test" disabled>Loading locations...</option>
            )}
          </select>

          <select
            value={localFilters.function}
            onChange={(e) => handleInputChange('function', e.target.value)}
            className="filter-select"
          >
            <option value="">Function</option>
            {functions.length > 0 ? functions.map(func => (
              <option key={func.id} value={func.id}>
                {func.name || func.title}
              </option>
            )) : (
              <option value="test" disabled>Loading functions...</option>
            )}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchFilters;
