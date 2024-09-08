import React, { useState, useEffect } from 'react';
import { getPreviousMessages } from './api';

interface ChatMessagesProps {
  otherUserId: number;
  ws: WebSocket | null;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ otherUserId, ws }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // Fetch previous messages on mount
  useEffect(() => {
    async function fetchMessages() {
      const response = await getPreviousMessages(otherUserId);
      setMessages([...response.sent_messages, ...response.received_messages]);
    }
    fetchMessages();
  }, [otherUserId]);

  // Listen for incoming messages via WebSocket
  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      };
    }
  }, [ws]);

  const handleSend = () => {
    if (ws && newMessage.trim()) {
      const message = { text: newMessage, recipient: otherUserId, sender: 0, timestamp: new Date().toISOString() }; // Placeholder sender ID
      setMessages((prevMessages) => [...prevMessages, message]);  // Optimistically update the UI

      ws.send(JSON.stringify(message)); // Send the message via WebSocket
      setNewMessage(''); // Clear input field
    }
  };

  return (
    <div className="w-full flex-1 p-4 flex flex-col max-lg:pt-10">
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
            <div key={idx} className={`w-full p-2 ${msg.sender === otherUserId ? 'text-left' : 'text-right'}`}>
              <div className="bg-[#F9FAFB] p-2 rounded-lg inline-block">
                {msg.text}
              </div>
              <div className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</div>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center border-t mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300"
        />
        <button onClick={handleSend} className="p-2 bg-primary-black text-white ml-2">Send</button>
      </div>
    </div>
  );
};

export default ChatMessages;