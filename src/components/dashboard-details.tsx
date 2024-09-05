import { useEffect, useState } from "react";
// import { demoWeekData } from "../util/types-and-links"
import Layout from "./layout"
import WeeklyCalendar, { WeekData } from "./weekly-calendar"
import { API } from "./api";
import Loader from "./loader";


const DashboardDetails = () => {
  const [weekData, setWeekData] = useState<WeekData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoursesForWeek = async () => {
        try {
            const response = await fetch(`${API}/api/courses/get_my_courses_for_the_week`, {
                method: "GET",
                credentials: 'include' // Add this if you need to include credentials
            });

            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }

            const data: any[] = await response.json();

            // Transform the data into the format expected by WeeklyCalendar
            const formattedData: WeekData = data.reduce((acc, { day, courses }) => {
                acc[day] = {
                    color: "bg-blue-200", // Default or custom color
                    subColor: "bg-blue-100", // Default or custom color
                    spacing: "mt-2", // Default or custom spacing
                    courses,
                };
                return acc;
            }, {} as WeekData);

            setWeekData(formattedData);
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchCoursesForWeek();
}, []);

  if (loading) {
    return <Loader />
  }

  return (
    <Layout>
      {/* Courses */}
        <WeeklyCalendar weekData={weekData} />
      {/* Courses */}

      {/* Notices */}
      <div className="mt-10 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Important Notices</h2>
        <div className="space-y-3">
          <div className="p-3 border border-gray-300 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Urgent</span>
              <span className="ml-auto text-gray-500 text-xs">2 hours ago</span>
            </div>
            <h3 className="text-lg font-semibold">Change in Exam Schedule</h3>
            <p className="text-gray-700">The exam for Math 101 has been rescheduled to Friday, 10 AM.</p>
          </div>
        </div>
      </div>

      {/* Notices */}
    </Layout>
  )
}

export default DashboardDetails