// src/services/axiosInstance.ts
import axios from 'axios';

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Your API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userDetails'); // Retrieve token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally here if needed
    if (error.response && error.response.status === 401) {
      // Redirect to login page if unauthorized (401)
      window.location.href = 'http://localhost:5173/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
