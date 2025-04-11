import axios from 'axios';

// Determine the correct base URL based on environment
const getBaseUrl = () => {
  // For production (Vercel deployment)
  if (process.env.NODE_ENV === 'production') {
    return 'https://saharabackend-v190.onrender.com/api';
  }
  // For local development
  return process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
};

// Log the API base URL for debugging
const apiBaseUrl = getBaseUrl();
console.log('API Base URL:', apiBaseUrl);

// Create axios instance with base URL
const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor to inject token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper methods for authentication
api.auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  profile: () => api.get('/auth/profile'),
  checkAdmin: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data?.user?.role === 'admin';
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }
};

// Helper methods for journals
api.journals = {
  getAll: (params) => api.get('/journals', { params }),
  getById: (id) => api.get(`/journals/${id}`),
  download: (id, fileType) => api.get(`/journals/${id}/download/${fileType}`, {
    responseType: 'blob'
  }),
  upload: (formData) => {
    return api.post('/journals', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

// Helper methods for submissions
api.submissions = {
  getAll: (params) => api.get('/submissions', { params }),
  getById: (id) => api.get(`/submissions/${id}`),
  download: (id, fileType) => api.get(`/submissions/${id}/download/${fileType}`, {
    responseType: 'blob'
  }),
  updateStatus: (id, status) => api.patch(`/submissions/${id}/status`, { status }),
  delete: (id) => api.delete(`/submissions/${id}`)
};

export default api;
export const baseURL = api.defaults.baseURL;
