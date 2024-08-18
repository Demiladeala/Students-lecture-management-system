import { useState } from "react";
import Layout from "./layout";
import { BsTrash3 } from "react-icons/bs";

export type Course = {
  code: string;
  title: string;
  students: string;
  schedule: string;
};

const initialCourses: Course[] = [
  { code: "CSC101", title: "Introduction to Computer Science", students: "150", schedule: "Monday 10:00 AM - 12:00 PM" },
  { code: "MTH201", title: "Calculus II", students: "200", schedule: "Tuesday 8:00 AM - 10:00 AM" },
  { code: "PHY101", title: "Physics I", students: "180", schedule: "Wednesday 2:00 PM - 4:00 PM" },
  { code: "CSC501", title: "Computer Science Foundation", students: "180", schedule: "Wednesday 2:00 PM - 4:00 PM" },
  { code: "CSC504", title: "Final Year Project", students: "180", schedule: "Wednesday 2:00 PM - 4:00 PM" },
];

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [newCourse, setNewCourse] = useState<Course>({ code: "", title: "", students: "", schedule: "" });
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);
  const [deleteReason, setDeleteReason] = useState<string>("");

  const openAddCourseModal = () => setIsAddCourseModalOpen(true);
  const closeAddCourseModal = () => setIsAddCourseModalOpen(false);

  const openDeleteModal = (index: number) => {
    setCourseToDelete(index);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setCourseToDelete(null);
    setDeleteReason("");
    setIsDeleteModalOpen(false);
  };

  const addCourse = () => {
    setCourses([...courses, newCourse]);
    setNewCourse({ code: "", title: "", students: "", schedule: "" }); // Reset form
    closeAddCourseModal();
  };

  const confirmDeleteCourse = () => {
    if (courseToDelete !== null) {
      const updatedCourses = courses.filter((_, i) => i !== courseToDelete);
      setCourses(updatedCourses);
      closeDeleteModal();
    }
  };

  return (
    <Layout>
        <div className="bg-white p-4 rounded-lg shadow mt-4">
        <h2 className="text-xl font-bold mb-4">Current Courses</h2>
        <div className="space-y-4">
            {courses.map((course, index) => (
            <div key={index} className="p-4 rounded-lg shadow bg-gray-50 flex justify-between items-center">
                <div>
                <h3 className="text-lg font-semibold">{course.code} - {course.title}</h3>
                <p className="text-gray-700">Students: {course.students}</p>
                <p className="text-gray-700">Schedule: {course.schedule}</p>
                </div>
                <button onClick={() => openDeleteModal(index)} className="text-red-500 hover:text-red-700">
                    <BsTrash3 />
                </button>
            </div>
            ))}
        </div>

        {/* Add Course Modal */}
        {isAddCourseModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Add New Course</h2>
                <input
                type="text"
                placeholder="Course Code"
                value={newCourse.code}
                onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                className="p-2 border rounded-lg w-full mb-2"
                />
                <input
                type="text"
                placeholder="Course Title"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                className="p-2 border rounded-lg w-full mb-2"
                />
                <input
                type="text"
                placeholder="Number of Students"
                value={newCourse.students}
                onChange={(e) => setNewCourse({ ...newCourse, students: e.target.value })}
                className="p-2 border rounded-lg w-full mb-2"
                />
                <input
                type="text"
                placeholder="Schedule (e.g., Monday 10:00 AM - 12:00 PM)"
                value={newCourse.schedule}
                onChange={(e) => setNewCourse({ ...newCourse, schedule: e.target.value })}
                className="p-2 border rounded-lg w-full mb-4"
                />
                <div className="flex justify-end">
                <button onClick={closeAddCourseModal} className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 mr-2">
                    Cancel
                </button>
                <button onClick={addCourse} className="bg-primary-black text-white px-4 py-2 rounded-lg shadow hover:bg-opacity-90">
                    Add Course
                </button>
                </div>
            </div>
            </div>
        )}

        {/* Delete Course Modal */}
        {isDeleteModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Delete Course</h2>
                <p>Please provide a reason for deleting this course:</p>
                <textarea
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                className="p-2 border rounded-lg w-full mb-4"
                rows={3}
                />
                <div className="flex justify-end">
                <button onClick={closeDeleteModal} className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 mr-2">
                    Cancel
                </button>
                <button onClick={confirmDeleteCourse} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600">
                    Delete
                </button>
                </div>
            </div>
            </div>
        )}

        <div className="flex justify-end mt-6">
            <button
            onClick={openAddCourseModal}
            className="bg-primary-black text-white px-4 py-2 rounded-lg shadow hover:bg-opacity-90"
            >
            Add New Course
            </button>
        </div>
        </div>
    </Layout>
  );
};

export default CoursesPage;