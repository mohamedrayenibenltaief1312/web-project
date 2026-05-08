import axios from 'axios';

// We create a "pre-configured" version of Axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // The address of your Laravel server
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// This special logic adds your Token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
