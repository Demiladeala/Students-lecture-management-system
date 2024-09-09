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
  const response = await axios.get<MessagesResponse>(`${API}/api/chat/${otherUserId}/previous-messages`, { withCredentials: true });
  
  // Parse sent messages
  const parsedSentMessages = response.data.sent_messages.map(msg => {
    const parsedText = JSON.parse(msg.text);
    return {
      ...parsedText,
      id: msg.id,
      sender: msg.sender,  // Ensure sender ID is preserved correctly
      timestamp: parsedText.timestamp || msg.timestamp // Use timestamp from parsed text if available
    };
  });

  // Parse received messages
  const parsedReceivedMessages = response.data.received_messages.map(msg => {
    const parsedText = JSON.parse(msg.text);
    return {
      ...parsedText,
      id: msg.id,
      sender: msg.sender,  // Ensure sender ID is preserved correctly
      timestamp: parsedText.timestamp || msg.timestamp // Use timestamp from parsed text if available
    };
  });

  return {
    ...response.data,
    sent_messages: parsedSentMessages,
    received_messages: parsedReceivedMessages
  };
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

export async function getSessionToken() {
  const response = await axios.get<{ session_token: string }>(`${API}/api/users/get_session_token`, {withCredentials:true});
  return response.data;
}

// WebSocket connection with session token
export async function createWebSocketConnection(otherUserId: number): Promise<WebSocket> {
  try {
    const { session_token } = await getSessionToken();
    const wsUrl = `wss://lecture-management-system.onrender.com/ws/chat/${otherUserId}?session_token=${session_token}`;
    
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => console.log('WebSocket connection established');
    ws.onclose = () => console.log('WebSocket connection closed');
    ws.onerror = (error) => console.error('WebSocket error:', error);

    return ws;
  } catch (error) {
    console.error('Error creating WebSocket connection:', error);
    throw error;  // You can also handle this error better in the component if needed
  }
}