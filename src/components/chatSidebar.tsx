import React, { useState, useEffect } from 'react';
import { User, getAllClassReps, getAllLecturers, getCurrentUser } from './api';

interface ChatSidebarProps {
  currentUserId: number;
  onSelectUser: (userId: number) => void;
  
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ currentUserId, onSelectUser }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const currentUser = await getCurrentUser();
      let usersList: User[] = [];

      if (currentUser.is_class_rep) {
        usersList = await getAllLecturers();
      } else if (currentUser.is_lecturer) {
        usersList = await getAllClassReps();
      }

      setUsers(usersList);
    }

    fetchUsers();
  }, [currentUserId]);

  return ( 
    <div className="w-64 bg-[#F3F4F6] border-r border-gray-300 max-lg:pt-10">
      <ul className='mt-4'>
        {users.map(user => (
          <li
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className="max-md:text-xs mx-1 max-md:py-3 p-4 bg-white cursor-pointer 
            transition-colors duration-300 hover:bg-purple-300 rounded"
          >
            User {user.email || user.matric_number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;