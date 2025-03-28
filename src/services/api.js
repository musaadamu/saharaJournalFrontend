import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Modify response interceptor to handle multipart form data for file uploads
api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
});

// Add response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Centralized error handling
        const errorMessage = error.response?.data?.message 
            || error.message 
            || 'An unexpected error occurred';
        
        // Optional: Add toast or notification system
        console.error('API Error:', errorMessage);
        
        return Promise.reject(errorMessage);
    }
);

// Helper methods for journals
api.journals = {
    getAll: (params = {}) => api.get('/journals', { params }),
    getById: (id) => api.get(`/journals/${id}`),
    create: (data) => api.post('/journals', data),
    update: (id, data) => api.put(`/journals/${id}`, data),
    delete: (id) => api.delete(`/journals/${id}`)
};

export default api;