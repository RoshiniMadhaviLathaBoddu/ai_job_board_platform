import axios from 'axios';

const API = axios.create({
  baseURL: 'https://ai-job-board-platform.onrender.com/api', // Update with your backend URL
});

// Add JWT token to headers if present
//API.interceptors.request.use((req) => {
//  const token = localStorage.getItem('token');
//  if (token) {
//    req.headers.Authorization = `Bearer ${token}`;
//  }
//  return req;
//});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;

