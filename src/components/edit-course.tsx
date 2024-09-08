import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { API } from "./api";
import EditCourseModal from "./edit-modal";
import DeleteCourseModal from "./delete-modal";
import Loader from "./loader";

type Lecturer = {
    id: number;
    email: string;
    is_lecturer: boolean;
    is_registration_officer: boolean;
  };

export type Course = {
  id: number;
  name: string;
  code: string;
  level: number;
  day: string;
  venue: string;
  start_time: string;
  end_time: string;
  lecturer: Lecturer;
};

const CourseListPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    // Fetch all courses
    setLoad(true);
    axios.get(`${API}/api/courses`, {withCredentials:true})
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
        console.error("Error fetching courses:", error);
        toast.error("Failed to fetch courses");
        setLoad(false);
    });
  }, []);

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  const handleDelete = (course: Course) => {
    setSelectedCourse(course);
    setIsDeleteModalOpen(true);
  };

  if(load) {
    return <Loader/>
  }

  return (
    <div className="p-4">
        <Toaster />
      <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>
      <div className="space-y-6">
        {courses.length > 0 ? (
          courses.map(course => (
            <div key={course.id} className="p-4 bg-white shadow rounded-lg">
              <h3 className="font-semibold">{course.code} - {course.name}</h3>
              <p>Level: {course.level}</p>
              <p>Day: {course.day}</p>
              <p>Time: {course.start_time} - {course.end_time}</p>
              <p>Venue: {course.venue}</p>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="px-4 py-2 bg-primary-black text-white rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </div>

      {selectedCourse && (
        <>
          <EditCourseModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            course={selectedCourse}
            refreshCourses={() => axios.get(`${API}/api/courses`).then(res => setCourses(res.data))}
          />
          <DeleteCourseModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            course={selectedCourse}
            refreshCourses={() => axios.get(`${API}/api/courses`).then(res => setCourses(res.data))}
          />
        </>
      )}
    </div>
  );
};

export default CourseListPage;