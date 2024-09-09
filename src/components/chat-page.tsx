import React, { useState, useEffect } from 'react';
import { getCurrentUser, createWebSocketConnection, User } from './api';
import ChatSidebar from './chatSidebar';
import ChatMessages from './chatMessages';
import Loader from './loader';

const ChatPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      setCurrentUser(user);
    }

    fetchUser();
  }, []);

  useEffect(() => {
    async function connectWebSocket() {
      if (selectedUserId !== null && currentUser) {
        try {
          const websocket = await createWebSocketConnection(selectedUserId);
          setWs(websocket);
  
          websocket.onopen = () => {
            console.log('WebSocket connection opened');
          };
  
          websocket.onclose = () => {
            console.log('WebSocket connection closed');
          };
  
          return () => {
            websocket.close();
          };
        } catch (error) {
          console.error('Error connecting WebSocket', error);
        }
      }
    }
  
    connectWebSocket();
  }, [selectedUserId, currentUser]);  

  if (!currentUser) return <Loader/>;
  if (!currentUser.is_class_rep && !currentUser.is_lecturer) {
    return <div className="p-4 bg-gray-50 w-full h-screen flex flex-col gap-3 items-center justify-center text-center
    text-primary-black text-xl font-semibold">
    <div className="w-full h-[300px] mx-auto mb-7 flex items-center">
         <img 
         src="/chat-not-allowed.svg" 
         alt="not-allowed" 
         className="w-[450px] object-contain mx-auto mb-3"/>
    </div>
    You are not authorized to view this page.
   </div>
  }

  return (
    <div className="flex h-screen">
      <ChatSidebar currentUserId={currentUser.id} onSelectUser={setSelectedUserId} />
      {(selectedUserId !== null && ws) ? (
        <ChatMessages otherUserId={selectedUserId} currentUserId={currentUser.id} ws={ws} />) :
        <div className="p-4 bg-gray-50 w-full h-screen overflow-y-auto flex flex-col 
        gap-3 items-center justify-center text-center
          text-primary-black text-xl font-semibold">
          <div className="w-full h-[300px] mx-auto mb-7 flex items-center justify-center ">
            <img 
            src="/start-chat.svg" 
            alt="not-allowed" 
            className="w-[450px] object-contain mx-auto mb-3"/>
         </div>
          Start chat
        </div>
      }
    </div>
  );
};

export default ChatPage;