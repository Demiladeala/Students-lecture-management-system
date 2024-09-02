import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "./layout";
import { API } from "./api";

const UploadForm = () => {
    const [courseData, setCourseData] = useState({
        name: "",
        code: "",
        level: 100,
        day: "MON",
        venue: "",
        start_time: "",
        end_time: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCourseData({
            ...courseData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API}/api/courses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(courseData),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Course uploaded successfully!");
                // Optionally, reset the form
                setCourseData({
                    name: "",
                    code: "",
                    level: 100,
                    day: "MON",
                    venue: "",
                    start_time: "",
                    end_time: "",
                });
            } else {
                const errorData = await response.json();
                toast.error(`Failed to upload course: ${errorData.message}`);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Upload Course</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Course Name</label>
                    <input
                        type="text"
                        name="name"
                        value={courseData.name}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Course Code</label>
                    <input
                        type="text"
                        name="code"
                        value={courseData.code}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Level</label>
                    <input
                        type="number"
                        name="level"
                        value={courseData.level}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Day</label>
                    <select
                        name="day"
                        value={courseData.day}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
                        required
                    >
                        <option value="MON">Monday</option>
                        <option value="TUE">Tuesday</option>
                        <option value="WED">Wednesday</option>
                        <option value="THU">Thursday</option>
                        <option value="FRI">Friday</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Venue</label>
                    <input
                        type="text"
                        name="venue"
                        value={courseData.venue}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Start Time</label>
                    <input
                        type="time"
                        name="start_time"
                        value={courseData.start_time}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">End Time</label>
                    <input
                        type="time"
                        name="end_time"
                        value={courseData.end_time}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-primary-black text-white rounded-md shadow-sm"
                >
                    Upload Course
                </button>
            </form>
            <Toaster />
        </Layout>
    );
};

export default UploadForm;

