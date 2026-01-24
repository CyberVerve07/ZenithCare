import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Note: In production this should be the relative path or env var
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
