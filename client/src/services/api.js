import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available (for future use)
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

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (for future use)
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// API methods
export const apiService = {
  // Health check
  healthCheck: () => api.get('/health'),

  // User registration
  registerUser: (userData) => api.post('/users/register', userData),

  // Get user preferences
  getUserPreferences: (userId) => api.get(`/users/${userId}/preferences`),

  // Update user preferences
  updateUserPreferences: (userId, preferences) => 
    api.put(`/users/${userId}/preferences`, preferences),

  // Future: Get daily verse
  getDailyVerse: () => api.get('/verses/daily'),

  // Future: Get verse by surah and ayah
  getVerse: (surahNo, ayahNo) => api.get(`/verses/${surahNo}/${ayahNo}`),

  // Future: Unsubscribe user
  unsubscribeUser: (userId) => api.delete(`/users/${userId}/subscription`),
};

export default api;
