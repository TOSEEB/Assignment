import axios from 'axios';

const API_BASE_URL = 'https://demo.jobsoid.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

export const getJobs = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    // Use correct API parameter names
    if (filters.search) params.append('q', filters.search);
    if (filters.department) params.append('dept', filters.department);
    if (filters.location) params.append('loc', filters.location);
    if (filters.function) params.append('fun', filters.function);
    
    const url = `/api/v1/jobs${params.toString() ? '?' + params.toString() : ''}`;
    console.log('Jobs API URL:', `${API_BASE_URL}${url}`); // Debug log
    console.log('Jobs API Parameters:', Object.keys(filters).map(key => `${key}: ${filters[key]}`).join(', ')); // Debug log
    
    const response = await api.get(url);
    console.log('Jobs API Response:', response.data); // Debug log
    console.log('Jobs API Status:', response.status); // Debug log
    
    // Handle different response structures
    if (Array.isArray(response.data)) {
      return { jobs: response.data, total: response.data.length };
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    console.error('Error status:', error.response?.status); // Debug log
    console.error('Error details:', error.response?.data); // Debug log
    console.error('Error message:', error.message); // Debug log
    
    // Return empty data instead of throwing to prevent app crash
    return { jobs: [], total: 0 };
  }
};

export const getJobById = async (id) => {
  try {
    const response = await api.get(`/api/v1/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job details:', error);
    throw error;
  }
};


export const getDepartments = async () => {
  try {
    const response = await api.get('/api/v1/departments');
    console.log('Departments API Response:', response.data); // Debug log
    console.log('Departments API URL:', `${API_BASE_URL}/api/v1/departments`); // Debug log
    return response.data || [];
  } catch (error) {
    console.error('Error fetching departments:', error);
    console.error('Error details:', error.response?.data); // Debug log
    return []; // Return empty array instead of throwing
  }
};

export const getLocations = async () => {
  try {
    const response = await api.get('/api/v1/locations');
    console.log('Locations API Response:', response.data); // Debug log
    return response.data || [];
  } catch (error) {
    console.error('Error fetching locations:', error);
    return []; // Return empty array instead of throwing
  }
};

export const getFunctions = async () => {
  try {
    const response = await api.get('/api/v1/functions');
    console.log('Functions API Response:', response.data); // Debug log
    return response.data || [];
  } catch (error) {
    console.error('Error fetching functions:', error);
    return []; // Return empty array instead of throwing
  }
};
