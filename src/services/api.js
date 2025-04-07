// import axios from 'axios';

// const api = axios.create({
//     baseURL: process.env.REACT_APP_API_URL || 'https://saharabackend-v190.onrender.com',
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // Add request interceptor to include auth token
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // Handle multipart form data for file uploads
// api.interceptors.request.use((config) => {
//     if (config.data instanceof FormData) {
//         config.headers['Content-Type'] = 'multipart/form-data';
//     }
//     return config;
// });

// // Add response interceptor for global error handling
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         // Centralized error handling
//         const errorMessage = error.response?.data?.message 
//             || error.message 
//             || 'An unexpected error occurred';
        
//         // Optional: Add toast or notification system
//         console.error('API Error:', errorMessage);
        
//         // Return the error message instead of the error object
//         return Promise.reject(error);
//     }
// );

// // Helper methods for journals
// api.journals = {
//     getAll: (params = {}) => api.get('/journals', { params }),
//     getById: (id) => api.get(`/journals/${id}`),
//     create: (data) => api.post('/journals', data),
//     update: (id, data) => api.put(`/journals/${id}`, data),
//     delete: (id) => api.delete(`/journals/${id}`),
//     download: (id, fileType) => api.get(`/journals/${id}/download/${fileType}`, { 
//         responseType: 'blob' 
//     })
// };

// export default api;

import axios from 'axios';

// Configure the API base URL with better fallback handling
const getBaseUrl = () => {
  // For local development
  if (process.env.NODE_ENV === 'development') {
    return process.env.REACT_APP_API_URL || 'http://localhost:5000';
  }
  
  // For production - prefer the environment variable, but fallback to the Render URL
  return process.env.REACT_APP_API_URL || 'https://saharabackend-v190.onrender.com';
};

const api = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
    },
    // Add withCredentials for cross-domain requests with credentials
    withCredentials: true
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        // Log outgoing requests in development
        if (process.env.NODE_ENV === 'development') {
            console.log('API Request:', config.method?.toUpperCase(), config.url);
        }
        
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle multipart form data for file uploads
api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
});

// Add response interceptor for global error handling
api.interceptors.response.use(
    (response) => {
        // Log successful responses in development
        if (process.env.NODE_ENV === 'development') {
            console.log('API Response:', response.status, response.config.url);
        }
        return response;
    },
    (error) => {
        // Centralized error handling
        const status = error.response?.status;
        const errorMessage = error.response?.data?.message 
            || error.message 
            || 'An unexpected error occurred';
        
        // Check for authentication errors (401)
        if (status === 401) {
            console.error('Authentication error:', errorMessage);
            // You could redirect to login or clear invalid tokens here
            localStorage.removeItem('authToken');
            // Optional: window.location.href = '/login';
        } else {
            console.error('API Error:', status, errorMessage);
        }
        
        return Promise.reject(error);
    }
);

// Helper methods for journals
api.journals = {
    getAll: (params = {}) => api.get('/journals', { params }),
    getById: (id) => api.get(`/journals/${id}`),
    create: (data) => api.post('/journals', data),
    update: (id, data) => api.put(`/journals/${id}`, data),
    delete: (id) => api.delete(`/journals/${id}`),
    download: (id, fileType) => api.get(`/journals/${id}/download/${fileType}`, { 
        responseType: 'blob' 
    })
};

// Export both the configured instance and the base URL for reference
export const baseURL = getBaseUrl();
export default api;