import { useEffect, useState } from "react";
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
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }

            const data: any[] = await response.json();

            // Helper function to map day abbreviations and full names
            const getDayKey = (day: string | string[]) => {
              if (Array.isArray(day)) {
                return day[1]; // Return full day name (e.g., "Monday")
              }
              return day;
            };

            // Transform the data into the format expected by WeeklyCalendar
            const formattedData: WeekData = data.reduce((acc, { day, courses }) => {
                const dayKey = getDayKey(day); // Use the helper function
                acc[dayKey] = {
                    color: "bg-blue-200",
                    subColor: "bg-blue-100",
                    spacing: "mt-2",
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
    <div>
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
    </div>
  )
}

export default DashboardDetails