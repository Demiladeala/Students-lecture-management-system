import axios from 'axios';
import { toast } from 'react-hot-toast';
export interface User {
  id: number;
  email: string;
  matric_number: string;
  is_lecturer: boolean;
  is_class_rep: boolean;
}

export interface Message {
  id: number;
  text: string;
  timestamp: string;
  read_at: string;
  is_read: boolean;
  sender: number;
  recipient: number;
}

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
      console.log('401 detected. Clearing cookies and redirecting.');
      toast.error('Session expired. Please log in again.');

      // Clear cookies
      document.cookie.split(";").forEach((cookie) => {
        const [name] = cookie.split("=");
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        console.log(`Cleared cookie: ${name}`);
      });

      // Redirect to login page
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default apiClient;


export interface MessagesResponse {
  sent_messages: Message[];
  received_messages: Message[];
}

// Fetch current user
export async function getCurrentUser(): Promise<User> {
  const response = await axios.get<User>(`${API}/api/users/me`, {withCredentials:true});
  return response.data;
}

// Fetch previous messages
export async function getPreviousMessages(otherUserId: number): Promise<MessagesResponse> {
  const response = await axios.get<MessagesResponse>(`${API}/api/chat/${otherUserId}/previous-messages`, {withCredentials:true});
  return response.data;
}

// Fetch all class representatives
export async function getAllClassReps(): Promise<User[]> {
  const response = await axios.get<User[]>(`${API}/api/users/get_all_classreps`, {withCredentials:true});
  return response.data;
}

// Fetch all lecturers
export async function getAllLecturers(): Promise<User[]> {
  const response = await axios.get<User[]>(`${API}/api/users/get_all_lecturers`, {withCredentials:true});
  return response.data;
}

// WebSocket connection
export function createWebSocketConnection(otherUserId: number): WebSocket {
  const wsUrl = `ws://lecture-management-system.onrender.com/ws/chat/${otherUserId}`;
  const ws = new WebSocket(wsUrl);

  ws.onopen = () => console.log('WebSocket connection established');
  ws.onclose = () => console.log('WebSocket connection closed');
  ws.onerror = (error) => console.error('WebSocket error:', error);

  return ws;
}