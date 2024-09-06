import { useEffect, useState } from "react";
import { useMain } from "../context/MainContext";
import { Toaster } from "react-hot-toast";
import Loader from "./loader";
import { CourseData } from "./upload-form";
import { MdDoNotDisturb } from "react-icons/md";
import axios from "axios";
import { API } from "./api";


const LecturerSchedule = () => {
  const {loading } = useMain();
  const [lecturerCourses, setLecturerCourses] = useState<CourseData[]>([]);
  const [load, setLoad] = useState(false);
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoad(true)
        const response = await axios.get(`${API}/api/users/me`, {
          withCredentials: true,
        });
        const userDetails = response.data;
        setLecturerCourses(userDetails.courses)
        setLoad(false)
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
  
    // Fetch user details when component mounts
      fetchUserDetails();
  }, []);
  
  if (loading || load) return <Loader/>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Your Schedule</h1>
      
      {lecturerCourses? (
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Course</th>
              <th className="border p-2">Code</th>
              <th className="border p-2">Day</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Venue</th>
            </tr>
          </thead>
          <tbody>
            {lecturerCourses.map((course, index) => (
              <tr key={index}>
                <td className="border p-2">{course.name}</td>
                <td className="border p-2">{course.code}</td>
                <td className="border p-2">{course.day}</td>
                <td className="border p-2">
                  {course.start_time} - {course.end_time}
                </td>
                <td className="border p-2">{course.venue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className='w-full h-[70vh] flex items-center justify-center'>
            <div className='w-[90%] mx-auto relative lg:left-[8%] flex flex-col gap-2'>
              <MdDoNotDisturb size={150} className='mx-auto text-primary-black' />
                <p className="text-center">No courses available</p>
            </div>
        </div>
      )}
      
      <Toaster />
    </div>
  );
};

export default LecturerSchedule;