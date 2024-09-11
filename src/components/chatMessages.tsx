import React, { useState, useEffect } from 'react';
import { getPreviousMessages } from './api';

interface ChatMessagesProps {
  otherUserId: number;
  ws: WebSocket | null;
  currentUserId: number;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ otherUserId, ws, currentUserId }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // Fetch previous messages on mount
  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await getPreviousMessages(otherUserId);
        const combinedMessages = [
          ...response.sent_messages,
          ...response.received_messages
        ].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()); // Sort by timestamp
        setMessages(combinedMessages);
      } catch (error) {
        console.error('Error fetching previous messages:', error);
      }
    }
    fetchMessages();
  }, [otherUserId]);

  // Listen for incoming messages via WebSocket
// Listen for incoming messages via WebSocket
useEffect(() => {
  if (ws) {
    ws.onmessage = (event) => {
      let message;

      // Try parsing the message if it's a stringified object
      try {
        const data = JSON.parse(event.data);

        // Check if the message is in the nested format
        if (typeof data.message === 'string') {
          message = JSON.parse(data.message);
        } else {
          message = data;
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
        return;
      }

      // Ensure message has necessary fields
      if (message && message.text && message.timestamp) {
        setMessages((prevMessages) => {
          // Filter out duplicate messages
          const uniqueMessages = prevMessages.filter(
            (msg) => !(msg.timestamp === message.timestamp && msg.sender === message.sender)
          );
          const updatedMessages = [...uniqueMessages, message]
            .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()); // Sort by timestamp
          return updatedMessages;
        });
      }
    };
  }
}, [ws]);

  const handleSend = () => {
    if (ws && newMessage.trim()) {
      const message = { text: newMessage, recipient: otherUserId, sender: currentUserId, timestamp: new Date().toISOString() };
      setMessages((prevMessages) => [...prevMessages, message]);  // Optimistically update the UI

      ws.send(JSON.stringify(message)); // Send the message via WebSocket
      setNewMessage(''); // Clear input field
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default Enter key action (like form submission)
      handleSend();
    }
  };

  return (
    <div className="lg:w-full w-[150%] flex-1 p-4 flex flex-col max-lg:pt-10">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="p-4 bg-gray-50 h-[80vh] flex flex-col gap-3 items-center justify-center text-center
            text-primary-black text-xl font-semibold">
            <div className="w-full h-[300px] mx-auto mb-7 flex items-center justify-center">
              <img src="/start-chat.svg" alt="not-allowed" className="w-[450px] object-contain mx-auto mb-3"/>
            </div>
            Start chat
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`w-full p-2 ${msg.sender === currentUserId ? 'text-right' : 'text-left'}`}>
              <div className={`bg-[#F9FAFB] p-2 rounded-lg inline-block 
                ${msg.sender === currentUserId ? 'bg-gray-100' : 'bg-blue-100'}`}>
                {msg.text}
              </div>
              <div className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString('en-US', 
              { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center border-t mt-4">
        <input
          type="text"
          value={newMessage}
          onKeyDown={handleKeyDown}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300"
        />
        <button onClick={handleSend} className="p-2 bg-primary-black text-white ml-2">Send</button>
      </div>
    </div>
  );
};

export default ChatMessages;