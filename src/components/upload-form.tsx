import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "./layout";
import { API } from "./api";
import * as XLSX from "xlsx";
import { MdDoNotDisturb } from "react-icons/md";

interface Lecturer {
    email: string;
    is_lecturer: boolean;
    is_registration_officer: boolean;
    lecturer_courses: string[];
    assisted_courses: string[];
  }
  
  export interface CourseData {
    name: string;
    code: string;
    level: number;
    day: string;
    venue: string;
    start_time: string;
    end_time: string;
    lecturer: string;
    assistants: string[]; // Define assistants as a string array
  }

const UploadForm = () => {
    const details = sessionStorage.getItem("userDetails");
    const userDetails = details ? JSON.parse(details) : null;
    const isRegOfficer = userDetails?.is_registration_officer;
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const [courseData, setCourseData] = useState<CourseData>({
        name: "",
        code: "",
        level: 100,
        day: "MON",
        venue: "",
        start_time: "",
        end_time: "",
        lecturer: "",
        assistants: []
    });
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);

    useEffect(() => {
        const fetchLecturers = async () => {
            try {
                const response = await fetch(`${API}/api/users/get_all_lecturers`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    "credentials": "include",
                });
                const data = await response.json();
                setLecturers(data);
            } catch (error) {
                console.error("Error fetching lecturers:", error);
            }
        };
        fetchLecturers();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCourseData({
            ...courseData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await uploadCourse(courseData);
    };

    const uploadCourse = async (course: any) => {
        try {
            const response = await fetch(`${API}/api/courses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    
                },
                body: JSON.stringify(course),
                "credentials": "include",
            });

            if (response.ok) {
                toast.success(`Course ${course.name} uploaded successfully!`);
            } else {
                const errorData = await response.json();
                toast.error(`Failed to upload course ${course.name}: ${errorData.message || errorData.detail}`);
            }
        } catch (error) {
            toast.error(`An error occurred while uploading course ${course.name}. Please try again.`);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const data = event.target?.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const courses = XLSX.utils.sheet_to_json(worksheet);

            setIsUploading(true);
            setUploadProgress(0);

            for (let i = 0; i < courses.length; i++) {
                await uploadCourse(courses[i]);
                setUploadProgress(((i + 1) / courses.length) * 100);
            }

            setIsUploading(false);
            toast.success("All courses uploaded successfully!");
        };
        reader.readAsBinaryString(file);
    };


    if(!isRegOfficer) {
        return ( 
        <div className='w-full h-screen flex items-center justify-center border-4'>
            <div className='w-[90%] mx-auto relative lg:left-[8%] flex flex-col gap-2'>
              <MdDoNotDisturb size={150} className='mx-auto text-primary-black' />
                <p className="text-center">You can't access this page if you're not a Registration Officer</p>
                <button onClick={() => window.history.back()} 
                className='md:w-[30%] lg:w-[20%] mx-auto py-3 px-9 
                bg-primary-black text-white text-center rounded-xl'>
                Go back
                </button>
            </div>
        </div>
        )
    }

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Upload Course/ File</h1>

            <div className="mt-6 mb-16 py-10 px-2 border border-dashed border-black rounded-xl">
                <label className="block font-semibold text-lg">Upload Excel File</label>
                <label className="block font-semibold text-sm">Arrange in this format ("name"; "code"; "level"; "day"; 
                "venue"; "start_time"; "end_time";)</label>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            {isUploading && (
                <div className="mt-4 mb-9">
                    <p>Uploading courses... {uploadProgress}%</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 pb-12">
                <label className="block font-semibold text-lg">Upload Course</label>
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
                {/* Lecturer Selection */}
                <div>
                    <label className="block text-sm font-medium">Select Lecturer</label>
                    <select
                        name="lecturer"
                        value={courseData.lecturer}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
                        required
                    >
                        <option value="">Select a lecturer</option>
                        {lecturers.map((lecturer: any) => (
                            <option key={lecturer.email} value={lecturer.email}>
                                {lecturer.email}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Assistants Selection */}
                <div>
                    <label className="block text-sm font-medium">Select Assistants</label>
                    <select
                        multiple
                        name="assistants"
                        value={courseData.assistants}
                        onChange={(e) => {
                            const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                            setCourseData({ ...courseData, assistants: selectedOptions });
                        }}
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
                    >
                        {lecturers.map((lecturer: any) => (
                            <option key={lecturer.email} value={lecturer.email}>
                                {lecturer.email}
                            </option>
                        ))}
                    </select>
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