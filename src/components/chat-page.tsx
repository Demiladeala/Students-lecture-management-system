import React, { useState, useEffect } from 'react';
import { fetchClassReps, fetchLecturers, fetchPreviousMessages, connectWebSocket } from "../components/api"  // Adjust the import path

export type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  senderType: "student" | "lecturer";
};

export type UserType = "student" | "classRep" | "lecturer";

interface MessagesPageProps {
  userType: UserType;
  userId: number; // Add userId prop to identify current user
}

const ChatPage: React.FC<MessagesPageProps> = ({ userType, userId }) => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<{ classReps: any[], lecturers: any[] }>({ classReps: [], lecturers: [] });
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Fetch class reps and lecturers
    const fetchUsers = async () => {
      const classReps = await fetchClassReps();
      const lecturers = await fetchLecturers();
      setUsers({ classReps, lecturers });
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedConversation !== null) {
      // Fetch previous messages
      const fetchMessages = async () => {
        const lecturerId = selectedConversation; // Example, adjust as needed
        const classRepId = userId; // Example, adjust as needed
        const data = await fetchPreviousMessages(lecturerId, classRepId);
        setMessages(data.sent_messages.concat(data.received_messages));
      };
      fetchMessages();
    }
  }, [selectedConversation, userId]);

  useEffect(() => {
    if (userType === "classRep" || userType === "lecturer") {
      // Set up WebSocket connection
      const ws = connectWebSocket(selectedConversation || 0); // Adjust as needed
      setWebSocket(ws);

      ws.onmessage = (event:any) => {
        const message = JSON.parse(event.data);
        setMessages(prevMessages => [...prevMessages, message]);
      };

      return () => {
        ws.close();
      };
    }
  }, [userType, selectedConversation]);

  const handleSendMessage = (content: string) => {
    if (webSocket) {
      webSocket.send(JSON.stringify({
        sender: userId,
        recipient: selectedConversation,
        text: content,
        timestamp: new Date().toISOString(),
      }));
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar with conversation list */}
      <div className={`w-full ${selectedConversation !== null || userType === "student" ? "hidden lg:block" : "max-lg:h-screen"} 
      md:w-1/3 bg-gray-100 p-4 border-r`}>
        <h2 className="text-xl font-bold mb-4 mt-8">Messages</h2>
        {userType !== "student" ? <ul>
          {users.classReps.concat(users.lecturers).map(user => (
            <li
              key={user.id}
              className="px-2 py-4 mb-2 bg-white text-primary-black shadow rounded cursor-pointer"
              onClick={() => setSelectedConversation(user.id)}
            >
              <div className="font-bold text-primary-black">{user.name}</div>
            </li>
          ))}
        </ul> : 
        <div className="font-medium max-lg:hidden">
            You can only chat with lecturers if you are the class representative.
        </div>}
      </div>

      {/* Message view */}
      <div className={`flex-1 flex flex-col w-full md:w-2/3 ${selectedConversation !== null && userType === "student" ? "hidden" : ""}`}>
        {userType === "student" && selectedConversation === null && (
          <div className="p-4 bg-gray-50 h-screen flex flex-col gap-3 items-center justify-center text-center
           text-primary-black text-xl font-semibold">
           <div className="w-full h-[300px] mx-auto mb-7 flex items-center">
                <img 
                src="/chat-not-allowed.svg" 
                alt="not-allowed" 
                className="w-[450px] object-contain mx-auto mb-3"/>
           </div>
            You can only chat with lecturers if you are the class representative.
          </div>
        )}

        {userType !== "student" && selectedConversation === null && (
          <div className="p-4 bg-gray-50 h-screen flex flex-col gap-3 items-center justify-center text-center
            text-primary-black text-xl font-semibold">
            <div className="w-full h-[300px] mx-auto mb-7 flex items-center justify-center ">
              <img 
              src="/start-chat.svg" 
              alt="not-allowed" 
              className="w-[450px] object-contain mx-auto mb-3"/>
           </div>
            Start chat
          </div>
        )}

        {userType !== "student" && selectedConversation !== null ? (
          <div className="relative flex-1 p-4 pt-12 bg-white overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className={`mb-4 ${message.senderType === "lecturer" ? "text-left" : "text-right"}`}>
                <div className={`inline-block p-2 rounded-lg 
                  ${message.senderType === "lecturer" ? "bg-gray-100" : "bg-primary-black/80 text-gray-100"}`}>
                  <div className="font-bold">{message.sender}</div>
                  <div>{message.content}</div>
                  <div className={` text-xs ${message.senderType === "lecturer" ? "text-gray-500" : "text-gray-200"} `}>
                    {message.timestamp}</div>
                </div>
              </div>
            ))}

            {userType === "classRep" || userType === "lecturer" ? (
              <div className="w-full md:w-[68%] lg:w-[56%] fixed right-0 bottom-0 p-4 bg-gray-100 border-t flex items-center">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg"
                />
                <button className="ml-2 p-2 bg-primary-black text-white rounded-lg" onClick={() => handleSendMessage("your message here")}>Send</button>
              </div>
            ) : null}
          </div>
        ) : null}

        <button
          className="md:hidden bg-gray-200 text-gray-700 p-2 rounded-full absolute top-4 right-4"
          onClick={() => setSelectedConversation(null)}
        >
          Back to Messages
        </button>
      </div>
    </div>
  );
};

export default ChatPage;