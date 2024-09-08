import { useState, useEffect } from "react";
import axios from "axios";
import { Course } from "./edit-course";
import { API } from "./api";
import toast, { Toaster } from "react-hot-toast";

type Lecturer = {
  id: number;
  email: string;
  is_lecturer: boolean;
  is_registration_officer: boolean;
};

type EditCourseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  refreshCourses: () => void;
};

const EditCourseModal = ({ isOpen, onClose, course, refreshCourses }: EditCourseModalProps) => {
  const [formValues, setFormValues] = useState<Course>(course);
  const [isLoading, setIsLoading] = useState(false);
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [assistants, setAssistants] = useState<any[]>([]);

  useEffect(() => {
    // Fetch all lecturers for the select options
    axios.get(`${API}/api/users/get_all_lecturers`, { withCredentials: true })
      .then(response => setLecturers(response.data))
      .catch(error => console.error('Error fetching lecturers:', error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAssistantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setAssistants(options);
  };

  const handleSubmit = () => {
    const courseData = {
      ...formValues,
      lecturer: formValues.lecturer.id, // Send only the lecturer's id
      assistants: assistants, // Send array of assistant IDs
    };

    setIsLoading(true); // Start loading
    axios.put(`${API}/api/courses/${course.id}`, courseData, { withCredentials: true })
      .then(() => {
        toast.success("Course updated successfully");
        window.location.reload();
        refreshCourses();
        onClose();
      })
      .catch(error => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 401) {
            toast.error("Session expired. Please log in again.");
            // Clear cookies
            document.cookie.split(";").forEach((cookie) => {
              const [name] = cookie.split("=");
              document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            });
            window.location.href = '/'; // Redirect to login
            return;
          }
          if (status === 400 || status === 404) {
            const errorMessage = data.message || data.error || data.detail || 'An error occurred. Please try again.';
            toast.error(errorMessage);
          } else {
            toast.error('Failed to update course');
          }
        }
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <Toaster />
      <div className="relative left-[4%] w-[90%] md:w-[70%] lg:w-[40%] mx-auto bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Course</h2>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder="Course Name"
          className="mb-2 p-2 border rounded-lg w-full"
          disabled={isLoading}
        />
        <input
          type="text"
          name="code"
          value={formValues.code}
          onChange={handleChange}
          placeholder="Course Code"
          className="mb-2 p-2 border rounded-lg w-full"
          disabled={isLoading}
        />
        <select
          name="day"
          value={formValues.day}
          onChange={handleChange}
          className="mb-2 p-2 border rounded-lg w-full"
          disabled={isLoading}
        >
          <option value="MON">Monday</option>
          <option value="TUE">Tuesday</option>
          <option value="WED">Wednesday</option>
          <option value="THU">Thursday</option>
          <option value="FRI">Friday</option>
        </select>
        <input
          type="text"
          name="venue"
          value={formValues.venue}
          onChange={handleChange}
          placeholder="Venue"
          className="mb-2 p-2 border rounded-lg w-full"
          disabled={isLoading}
        />
        <input
          type="time"
          name="start_time"
          value={formValues.start_time}
          onChange={handleChange}
          className="mb-2 p-2 border rounded-lg w-full"
          disabled={isLoading}
        />
        <input
          type="time"
          name="end_time"
          value={formValues.end_time}
          onChange={handleChange}
          className="mb-2 p-2 border rounded-lg w-full"
          disabled={isLoading}
        />
        <select
          name="lecturer"
          value={formValues.lecturer.id}
          onChange={handleChange}
          className="mb-2 p-2 border rounded-lg w-full"
          disabled={isLoading}
        >
          <option value="">Select Lecturer</option>
          {lecturers.map((lecturer) => (
            <option key={lecturer.id} value={lecturer.id}>{lecturer.email}</option>
          ))}
        </select>
        <select
          name="assistants"
          multiple
          value={assistants}
          onChange={handleAssistantChange}
          className="mb-2 p-2 border rounded-lg w-full"
          disabled={isLoading}
        >
          {lecturers.map((lecturer) => (
            <option key={lecturer.id} value={lecturer.id}>{lecturer.email}</option>
          ))}
        </select>
        <button
          onClick={handleSubmit}
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 ml-2 bg-gray-500 text-white rounded-lg"
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditCourseModal;