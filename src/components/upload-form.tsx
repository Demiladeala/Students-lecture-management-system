import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "./layout";
import { API } from "./api";
import * as XLSX from "xlsx";
import { MdDoNotDisturb } from "react-icons/md";
import { RiLoader4Fill } from "react-icons/ri";

interface Lecturer {
  id: number;  // Add lecturer ID
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
  lecturer: number;  // Send lecturer ID
  assistants: number[];  // Send array of assistant IDs
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
    lecturer: 0,  // Initialize as 0 (no lecturer selected)
    assistants: [],
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const[file, setFile] = useState(false);

  // Fetch lecturers when component mounts
  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await fetch(`${API}/api/users/get_all_lecturers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
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
  
    // Ensure lecturer and level are numbers
    let newValue = value;
    if (name === "start_time" || name === "end_time") {
      // Slice the time to only "hh:mm" if it's in "hh:mm:ss"
      newValue = value.slice(0, 5);
    }
  
    setCourseData({
      ...courseData,
      [name]: name === "level" || name === "lecturer" ? Number(newValue) : newValue,
    });
  };  

  const handleAssistantsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => Number(option.value));
    setCourseData({ ...courseData, assistants: selectedOptions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true); // Set loading state to true
    await uploadCourse(courseData);
    setIsUploading(false); // Set loading state to false after upload
  };

  const uploadCourse = async (course: CourseData) => {
    try {
      const response = await fetch(`${API}/api/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
        credentials: "include",
      });

      if (response.ok) {
        toast.success(`Course ${course.name} uploaded successfully!`);
        setCourseData({
          name: "",
          code: "",
          level: 100,
          day: "MON",
          venue: "",
          start_time: "",
          end_time: "",
          lecturer: 0,
          assistants: [],
        }); //cleat course data after success
      } else {
        const errorData = await response.json();
        toast.error(`${errorData.message || errorData.detail || errorData.code}`);
        if(file){
        toast.error(`Failed to upload course ${course.name}: ${errorData.message || errorData.detail || errorData.code}`);
        }
      }
    } catch (error) {
      toast.error(`An error occurred while uploading course ${course.name}. Please try again.`);
    }
  };

    // Function to validate if an object is of type CourseData
  function isValidCourseData(obj: any): obj is CourseData {
    return (
      typeof obj.name === "string" &&
      typeof obj.code === "string" &&
      typeof obj.level === "number" &&
      typeof obj.day === "string" &&
      typeof obj.venue === "string" &&
      typeof obj.start_time === "string" &&
      typeof obj.end_time === "string" &&
      typeof obj.lecturer === "number" &&
      Array.isArray(obj.assistants) &&
      obj.assistants.every((id: any) => typeof id === "number")
    );
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = event.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const parsedCourses = XLSX.utils.sheet_to_json(worksheet);
  
      // Check if parsed data is valid
      const courses: CourseData[] = parsedCourses
        .filter(isValidCourseData)
        .map((course) => ({
          name: course.name,
          code: course.code,
          level: course.level,
          day: course.day,
          venue: course.venue,
          start_time: course.start_time.slice(0, 5),
          end_time: course.end_time.slice(0, 5),
          lecturer: course.lecturer,
          assistants: course.assistants,
        }));
  
      setIsUploading(true);
      setUploadProgress(0);
  
      for (let i = 0; i < courses.length; i++) {
        setFile(true);
        await uploadCourse(courses[i]);
        setUploadProgress(((i + 1) / courses.length) * 100);
      }
  
      setIsUploading(false);
      toast.success("All courses uploaded successfully!");
    };
    reader.readAsBinaryString(file);
  };

  if (!isRegOfficer) {
    return (
      <div className="w-full h-screen flex items-center justify-center border-4">
        <div className="w-[90%] mx-auto relative lg:left-[8%] flex flex-col gap-2">
          <MdDoNotDisturb size={150} className="mx-auto text-primary-black" />
          <p className="text-center">You can't access this page if you're not a Registration Officer</p>
          <button
            onClick={() => window.history.back()}
            className="md:w-[30%] lg:w-[20%] mx-auto py-3 px-9 bg-primary-black text-white text-center rounded-xl"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Upload Course/ File</h1>

      <div className="mt-6 mb-16 py-10 px-2 border border-dashed border-black rounded-xl">
        <label className="block font-semibold text-lg">Upload Excel File</label>
        <label className="block font-semibold text-sm">
          Arrange in this format ("name"; "code"; "level"; "day"; "venue"; "start_time"; "end_time";)
        </label>
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

      <form onSubmit={handleSubmit} className="space-y-4 pb-12 overflow-y-auto">
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
            <option value={0}>Select a lecturer</option>
            {lecturers.map((lecturer) => (
              <option key={lecturer.id} value={lecturer.id}>
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
            value={courseData.assistants.map(String)}
            onChange={handleAssistantsChange}
            className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
          >
            {lecturers.map((lecturer) => (
              <option key={lecturer.id} value={lecturer.id} className="p-3">
                {lecturer.email}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-primary-black text-white 
          flex items-center justify-center text-center rounded-md shadow-sm
          disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isUploading} // Disable button if isUploading is true
        >
          {isUploading ? 
          <div className="flex items-center gap-1">
            <RiLoader4Fill size={25} className="animate-spin"/>
            Uploading...
          </div>
          : "Upload Course"} {/* Show loading text when uploading */}
        </button>
      </form>

      <Toaster />
    </Layout>
  );
};

export default UploadForm;