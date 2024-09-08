import axios from 'axios';
import { toast } from 'react-hot-toast';

// Assuming API URL is set correctly in environment variables
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

      // Clear cookies
      document.cookie.split(";").forEach((cookie) => {
        const [name] = cookie.split("=");
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      });

      // Redirect to login page
      window.location.assign('/');
    }
    return Promise.reject(error);
  }
);

export const fetchClassReps = async () => {
  const response = await axios.get(`${API}/api/users/get_all_classreps`, { withCredentials: true });
  return response.data;
};

export const fetchLecturers = async () => {
  const response = await axios.get(`${API}/api/users/get_all_lecturers`, { withCredentials: true });
  return response.data;
};

export const fetchPreviousMessages = async (lecturerId: number, classRepId: number) => {
  const response = await axios.get(`${API}/api/chat/${lecturerId}/${classRepId}/previous-messages`, 
  { withCredentials: true });
  return response.data;
};

export const connectWebSocket = (userId: number) => {
  return new WebSocket(`ws:///ws/chat/${userId}/`);
};

export default apiClient;