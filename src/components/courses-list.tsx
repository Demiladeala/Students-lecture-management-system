import { useEffect, useState } from "react";
import Loader from "./loader";
import { API } from "./api";
import toast from "react-hot-toast";
import axios from "axios";

export type Course = {
  id: number;
  name: string;
  code: string;
  day: string;
  venue: string;
  start_time: string;
  end_time: string;
};

const formatTime = (time: string): string => {
  const [hour, minute] = time.split(':').map(Number);
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedMinute = minute.toString().padStart(2, '0');
  return `${formattedHour}:${formattedMinute} ${period}`;
};

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') || '{}');

    if (!userDetails.level) {
      toast.error("Session expired. Please log in again.");
      window.location.href = '/'; // Redirect to login
      return;
    }

    if (userDetails.level) {
      axios.get(`${API}/api/courses/get_courses_by_level`, {
        params: { level: userDetails.level },
        withCredentials: true,
      })
      .then(response => {
        setCourses(response.data);
        setLoad(false);
      })
      .catch(error => {
        const { status } = error.response;
        if (status === 401) {
          console.log('401 detected. Clearing cookies and redirecting.');
          toast.error('Session expired. Please log in again.');
    
          // Clear cookies
          document.cookie.split(";").forEach((cookie) => {
            const [name] = cookie.split("=");
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            console.log(`Cleared cookie: ${name}`);
          });
          console.error('Error fetching courses:', error);
          setLoad(false);
        }
      });
    }
  }, []);

  if (load) { return <Loader /> }

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <h2 className="text-xl font-bold mb-4">Courses for Level {JSON.parse(sessionStorage.getItem('userDetails') || '{}').level}</h2>
      <div className="space-y-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="p-4 rounded-lg shadow bg-gray-50">
              <h3 className="text-lg font-semibold">{course.code} - {course.name}</h3>
              <p className="text-gray-700">Day: {course.day}</p>
              <p className="text-gray-700">Venue: {course.venue}</p>
              <p className="text-gray-700">Time: {formatTime(course.start_time)} - {formatTime(course.end_time)}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No courses available for your level.</p>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
