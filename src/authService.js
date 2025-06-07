
import axios from 'axios';

const API_BASE_URL = 'https://frimum.onrender.com/api';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {

      localStorage.removeItem('token');
      localStorage.removeItem('username');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {

  login: async (username, password) => {
    try {
      const response = await api.post('/login', {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || 'Login failed';
    }
  },


  register: async (username, password, email, fullName) => {
    try {
      const response = await api.post('/register', {
        username,
        password,
        email,
        fullName,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || 'Registration failed';
    }
  },


  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  },


  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },


  getCurrentUser: () => {
    return localStorage.getItem('username');
  },


  getToken: () => {
    return localStorage.getItem('token');
  },


  validateToken: async () => {
    try {
      const response = await api.get('/validate');
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Token validation failed';
    }
  },
};


export { api };