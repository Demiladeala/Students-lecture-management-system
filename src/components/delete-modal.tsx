import { useState } from "react";
import axios from "axios";
import { Course } from "./edit-course";
import { API } from "./api";
import toast, { Toaster } from "react-hot-toast";

type DeleteCourseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  refreshCourses: () => void;
};

const DeleteCourseModal = ({ isOpen, onClose, course, refreshCourses }: DeleteCourseModalProps) => {
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleDelete = () => {
    setIsLoading(true); // Start loading
    axios.delete(`${API}/api/courses/${course.id}`, {withCredentials:true})
      .then(() => {
        toast.success("Course deleted successfully");
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
                console.log(`Cleared cookie: ${name}`);
              });
              
              window.location.href = '/'; // Redirect to login
              return;
            }
            if (status === 400 || status === 404) {
              // Display the error message from the API response
              const errorMessage = data.message || data.error || data.detail || 'An error occurred. Please try again.';
              toast.error(errorMessage);
            } else {
              // Handle other errors
              toast.error('Failed to delete course');
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
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete {course.name}?</p>
        <button
          onClick={handleDelete}
          className={`px-4 py-2 bg-red-500 text-white rounded-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete"}
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

export default DeleteCourseModal;