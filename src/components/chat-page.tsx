import React, { useState } from "react";

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
}

const sampleMessages: Message[] = [
  { id: 1, sender: "Lecturer", content: "Please remember the deadline for assignment submission.", timestamp: "10:30 AM", senderType: "lecturer" },
  { id: 2, sender: "Class Rep", content: "Noted, sir.", timestamp: "10:35 AM", senderType: "student" },
  { id: 3, sender: "Lecturer", content: "Don't forget to remind the class.", timestamp: "10:40 AM", senderType: "lecturer" },
];

const ChatPage: React.FC<MessagesPageProps> = ({ userType }) => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar with conversation list */}
      <div className={`w-full ${selectedConversation !== null ? "hidden md:block" : "max-lg:h-screen"} 
      md:w-1/3 bg-gray-100 p-4 border-r`}>
        <h2 className="text-xl font-bold mb-4 mt-8">Messages</h2>
       {userType !== "student" ? <ul>
          {sampleMessages.map((message) => (
            <li
              key={message.id}
              className="px-2  py-3 mb-2 bg-white shadow rounded cursor-pointer"
              onClick={() => setSelectedConversation(message.id)}
            >
              <div className="font-bold">{message.sender}</div>
              <div className="text-sm text-gray-600 truncate">{message.content}</div>
              <div className="text-xs text-gray-500 text-right">{message.timestamp}</div>
            </li>
          ))}
        </ul> : 
        <div className="font-medium max-lg:hidden">
            You can only chat with lecturers if you are the class representative.
        </div>
        }
      </div>

      {/* Message view */}
      <div className={`flex-1 flex flex-col w-full md:w-2/3
        ${selectedConversation !== null && userType === "student" ? "hidden" : ""}`}>
        {userType === "student" && selectedConversation === null && (
          <div className="p-4 bg-gray-50 h-screen flex flex-col gap-3 items-center justify-center text-center
           text-primary-black text-xl font-semibold">
           <div className="w-full h-[300px] mx-auto mb-7 flex items-center">
                <img 
                src="/chat-not-allowed.png" 
                alt="not-allowed" 
                className="object-contain mx-auto mb-3"/>
           </div>
            You can only chat with lecturers if you are the class representative.
          </div>
        )}

        {userType !== "student" && selectedConversation === null && (
          <div className="p-4 bg-gray-50 h-screen flex items-center justify-center text-center">
            Start chat
          </div>
        )}

        {userType !== "student" && selectedConversation !== null ? (
          <div className="relative flex-1 p-4 pt-12 bg-white overflow-y-auto">
            {sampleMessages
              .filter((message) => message.id === selectedConversation)
              .map((message) => (
                <div key={message.id} className={`mb-4 ${message.senderType === "lecturer" ? "text-left" : "text-right"}`}>
                  <div className={`inline-block p-2 rounded-lg ${message.senderType === "lecturer" ? "bg-blue-100" : "bg-green-100"}`}>
                    <div className="font-bold">{message.sender}</div>
                    <div>{message.content}</div>
                    <div className="text-xs text-gray-500">{message.timestamp}</div>
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
                <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg">Send</button>
            </div>
            ) : null}
          </div>

        ) : null }

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