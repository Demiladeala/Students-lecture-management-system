// api.ts
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const API = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Show toast notification
      toast.error('Session expired. Please log in again.');

      // Redirect to login page
      window.location.assign('/');
    }
    return Promise.reject(error);
  }
);

export default apiClient;