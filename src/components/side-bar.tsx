import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { FaBook, FaRegCalendarAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaHomeSolid } from "react-icons/lia";
import {  useState } from "react";
import { ImBooks } from "react-icons/im";
import { TiMessages } from "react-icons/ti";
import { LuTimer } from "react-icons/lu";
import { useMain } from "../context/MainContext";

const image = "profile-image-1.png";

const Sidebar = () => {
    const { userRole, loading } = useMain();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const location = useLocation();

    if (loading) {
        return null; // Don't render the sidebar while loading
      }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    //     }, 6000);

    //     return () => clearInterval(interval);
    // }, []);

    const linkClass = (path: string) => 
        `w-full flex items-center gap-2 transition-all duration-300 py-3 px-4 rounded-lg ${
        location.pathname === path ? "bg-primary-gray2 text-white" : "text-gray-600 lg:text-gray-400 hover:text-gray-100"
    }`;

     const links = userRole === "registration-officer" || userRole === "lecturer"
    ? [
        { path: '/chat', label: 'Messages', icon: <TiMessages size={24} /> },
        { path: '/upload-courses', label: 'Upload Courses', icon: <FaBook size={24} /> },
    ]
    : [
        { path: '/dashboard', label: 'Overview', icon: <LiaHomeSolid size={24} /> },
        { path: '/calendar', label: 'Calendar', icon: <FaRegCalendarAlt size={24}/> },
        { path: '/courses', label: 'Courses', icon: <ImBooks size={24}/> },
        { path: '/chat', label: 'Messages', icon: <TiMessages size={24}/> },
        { path: '/timetable', label: 'Timetable', icon: <LuTimer size={24}/> },
        { path: '/settings', label: 'Settings', icon: <IoSettingsOutline size={24}/> },
    ];

  return (
    <>
    {/* Hamburger Button for Mobile */}
    <div className="lg:hidden fixed top-0 left-0 w-full 
    flex items-center justify-between box-shadow p-3 bg-white z-30">
        <div>
            <h3 className="poppins text-xl md:text-2xl 2xl:text-3xl font-bold text-primary-darkblue">CSC</h3>
            <h4 className="text-xs font-medium text-gray-500">Lecture Reminder System</h4>
        </div>
            
        <div className="lg:hidden mb-2 top-4 right-4 ">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-full 
            bg-primary-darkblue text-primary-gray2">
                <span className="sr-only">Open menu</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div>
    </div>

    {/* Mobile Menu */}
    <div className={`fixed inset-0 z-40 bg-white px-5 border-r border-gray-100 text-primary-black lg:hidden transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <div className="w-full h-full">
            <div className="px-1 py-3 flex items-center justify-end">
                <button onClick={() => setIsMobileMenuOpen(false)} 
                className="text-primary-black relative top-[3px] left-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>
            </div>

            <div className="mt-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full">
                    <motion.img
                        src={image} 
                        alt="profile img" 
                        className="w-full h-full object-cover rounded-full border"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

               {userRole === "Student" ? <div>
                    <h4 className="font-semibold">Emzzy</h4>
                    <h3 className="text-sm">CSC/19/2945</h3>
                    <h3 className="text-xs text-gray-400">500 level</h3>
                </div> :
                <div>
                    <h4>Mr. Lecturer</h4>    
                </div>}
            </div>

            <div className="mt-6 w-full text-sm font-medium">
                {links.map((link, index) => (
                    <a href={link.path} key={index} onClick={() => setIsMobileMenuOpen(false)}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <button className={`${index > 0 ? 'mt-4' : ''} ${linkClass(link.path)}`}>
                                <motion.div
                                    whileHover={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {link.icon}
                                </motion.div>
                                <h4>{link.label}</h4>
                            </button>
                        </motion.div>
                    </a>
                ))}
            </div>
        </div>
    </div>
    {/* Mobile Menu */}

    <div className="pt-12 lg:hidden"></div>

    <div className="z-[3] fixed max-lg:hidden w-[16%] h-screen bg-primary-black text-gray-200 border-r border-gray-100">
        <h4 className="mt-7 text-center font-medium text-gray-200">Lecture Management System</h4>

        <div className="mt-6 px-5 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full">
                <motion.img
                    src={image} 
                    alt="profile img" 
                    className="w-full h-full object-cover rounded-full border"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
            </div>

               {userRole === "Student" ? <div>
                    <h4 className="font-semibold">Emzzy</h4>
                    <h3 className="text-sm">CSC/19/2945</h3>
                    <h3 className="text-xs text-gray-400">500 level</h3>
                </div> :
                <div>
                    <h4>Mr. Lecturer</h4>    
                </div>}
        </div>

        <div className="mt-16 w-[90%] mx-auto text-sm font-medium">
            {links.map((link, index) => (
                <a href={link.path} key={index}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <button className={`${index > 0 ? 'mt-4' : ''} ${linkClass(link.path)}`}>
                            <motion.div
                                whileHover={{ rotate: [0, 10, -10, 0] }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {link.icon}
                            </motion.div>
                            <h4>{link.label}</h4>
                        </button>
                    </motion.div>
                </a>
            ))}
        </div>
        </div>
    </>
  )
}

export default Sidebar