import { useEffect, useState } from "react";
import { MdNetworkCheck } from "react-icons/md";
import ChatPage from "../components/chat-page";
import Layout from "../components/layout";
import Sidebar, { UserDetails } from "../components/side-bar";
import { useMain } from "../context/MainContext";
import axios from "axios";

const Chat = () => {
  const { userRole } = useMain();
  const [currentUser, setCurrentUser] = useState<UserDetails>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch current user data
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('/api/users/me');
        setCurrentUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching current user:', error);
        setLoading(false);
      }
    };
    
    fetchCurrentUser();
  }, []);

  if (loading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <p>Loading...</p>
      </div>
    );
  }

  if (!currentUser || !userRole) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='flex flex-col gap-2'>
          <MdNetworkCheck size={150} className='mx-auto text-primary-black' />
          <p>Session expired...</p>
          <a href="/" className='py-3 px-9 bg-primary-black text-white text-center rounded-xl'>
            Login
          </a>
        </div>
      </div>
    );
  }

  // Determine user type based on the current user's data
  const userType = currentUser.is_class_rep ? 'classRep' : userRole === 'lecturer' ? 'lecturer' : 'student';

  return (
    <main className="relative container w-full mx-auto max-w-[2800px] scroll-smooth">
      <Sidebar />
      <Layout noPadding={true}>
        <ChatPage userType={userType} userId={currentUser.id ?? 0} />
      </Layout>
    </main>
  );
}

export default Chat;