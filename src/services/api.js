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

// Add a function to check if we're using the production API
export const isProduction = () => apiBaseUrl.includes('saharabackend-v190.onrender.com');

// Create axios instance with base URL
const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 30000, // Increase timeout to 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true // Enable sending cookies with cross-origin requests
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
  // Try both endpoint patterns for better compatibility
  login: (credentials) => {
    console.log('Attempting login with credentials:', credentials);
    return api.post('/login', credentials)
      .catch(error => {
        console.log('Login failed at /login, trying /api/auth/login');
        return api.post('/api/auth/login', credentials);
      });
  },
  register: (userData) => {
    console.log('Attempting registration with data:', userData);
    return api.post('/register', userData)
      .catch(error => {
        console.log('Registration failed at /register, trying /api/auth/register');
        return api.post('/api/auth/register', userData);
      });
  },
  profile: () => {
    return api.get('/me')
      .catch(error => {
        console.log('Profile fetch failed at /me, trying /api/auth/me');
        return api.get('/api/auth/me');
      });
  },
  updateProfile: (userData) => {
    return api.put('/profile', userData)
      .catch(error => {
        console.log('Profile update failed at /profile, trying /api/auth/profile');
        return api.put('/api/auth/profile', userData);
      });
  },
  forgotPassword: (email) => {
    return api.post('/forgot-password', { email })
      .catch(error => {
        console.log('Forgot password failed at /forgot-password, trying /api/auth/forgot-password');
        return api.post('/api/auth/forgot-password', { email });
      });
  },
  resetPassword: (token, password) => {
    return api.post(`/reset-password/${token}`, { password })
      .catch(error => {
        console.log('Reset password failed at /reset-password, trying /api/auth/reset-password');
        return api.post(`/api/auth/reset-password/${token}`, { password });
      });
  },
  checkAdmin: async () => {
    try {
      const response = await api.get('/me')
        .catch(error => {
          console.log('Admin check failed at /me, trying /api/auth/me');
          return api.get('/api/auth/me');
        });
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
    responseType: 'blob',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/octet-stream'
    },
    timeout: 60000 // 60 seconds timeout for downloads
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
