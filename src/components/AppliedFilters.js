import React from 'react';
import './AppliedFilters.css';

const AppliedFilters = ({ filters, onRemoveFilter, onClearAll, departments, locations, functions }) => {
  const hasActiveFilters = Object.values(filters).some(value => value && value !== '');

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="applied-filters-container">
      <div className="filter-tags-container">
        {filters.search && (
          <span className="filter-tag">
            {filters.search}
            <button 
              onClick={() => onRemoveFilter('search', '')}
              className="remove-filter"
            >
              ×
            </button>
          </span>
        )}
        {filters.department && (
          <span className="filter-tag">
            {departments.find(d => d.id == filters.department)?.title || departments.find(d => d.id == filters.department)?.name || filters.department}
            <button 
              onClick={() => onRemoveFilter('department', '')}
              className="remove-filter"
            >
              ×
            </button>
          </span>
        )}
        {filters.location && (
          <span className="filter-tag">
            {locations.find(l => l.id == filters.location)?.title || locations.find(l => l.id == filters.location)?.name || filters.location}
            <button 
              onClick={() => onRemoveFilter('location', '')}
              className="remove-filter"
            >
              ×
            </button>
          </span>
        )}
        {filters.function && (
          <span className="filter-tag">
            {functions.find(f => f.id == filters.function)?.title || functions.find(f => f.id == filters.function)?.name || filters.function}
            <button 
              onClick={() => onRemoveFilter('function', '')}
              className="remove-filter"
            >
              ×
            </button>
          </span>
        )}
      </div>
      <button onClick={onClearAll} className="clear-all">
        Clear All
      </button>
    </div>
  );
};

export default AppliedFilters;
