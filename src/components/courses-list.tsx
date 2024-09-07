import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./loader";
import { API } from "./api";

export type Course = {
  id: number;
  name: string;
  code: string;
  day: string;
  venue: string;
  start_time: string;
  end_time: string;
};

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    // Get user details from sessionStorage
    setLoad(true);
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') || '{}');

    // Fetch courses by the user's level
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
        console.error('Error fetching courses:', error);
        setLoad(false);
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
              <p className="text-gray-700">Time: {course.start_time} - {course.end_time}</p>
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