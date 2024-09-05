import { MdNetworkCheck } from "react-icons/md";
import ChatPage from "../components/chat-page"
import Layout from "../components/layout"
import Sidebar from "../components/side-bar"
import { useMain } from "../context/MainContext";

const Chat = () => {
  const { userRole } = useMain();

  if (userRole === ("" || undefined || null)) {
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
    )
  }
  return (
    <main className="relative container w-full mx-auto max-w-[2800px] scroll-smooth">
        <Sidebar/>
        <Layout noPadding={true}>
            <ChatPage userType="lecturer" />
        </Layout>
    </main>
  )
}

export default Chat