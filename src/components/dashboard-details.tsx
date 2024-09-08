import { useEffect, useState } from "react";
import WeeklyCalendar, { WeekData } from "./weekly-calendar";
import Loader from "./loader";
import { API } from "./api";

const DashboardDetails = () => {
  const [weekData, setWeekData] = useState<WeekData>({});
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoursesForWeek = async () => {
      try {
        const response = await fetch(
          `${API}/api/courses/get_my_courses_for_the_week`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data: any[] = await response.json();

        // Helper function to map day abbreviations and full names
        const getDayKey = (day: string | string[]) => {
          if (Array.isArray(day)) {
            return day[1]; // Return full day name (e.g., "Monday")
          }
          return day;
        };

        // Function to format time (remove seconds)
        const formatTime = (time: string) => {
          return time.replace(/(:\d{2}){1}$/, ""); // Remove seconds if present
        };

        // Define colors for each day
        const colors: Record<string, { color: string; subColor: string; spacing:string }> = {
          Monday: { color: "bg-[#FF823F]", subColor: "bg-[#FFDAC5]", spacing:"lg:mt-40" },
          Tuesday: { color: "bg-[#F5BB23]", subColor: "bg-[#FDEABD]", spacing:"lg:mt-16" },
          Wednesday: { color: "bg-[#FFA7A7]", subColor: "bg-[#FFE5E6]", spacing:"" },
          Thursday: { color: "bg-[#0DBDF6]", subColor: "bg-[#B7EBFC]", spacing:"lg:mt-24" },
          Friday: { color: "bg-[#465361]", subColor: "bg-[#C7CBD1]", spacing:"" },
          Saturday: { color: "bg-[#15BE39]", subColor: "bg-[#BAECC4]", spacing:"lg:mt-24" },
          Sunday: { color: "bg-gray-100", subColor: "bg-gray-50", spacing:"" },
        };

        // Transform the data into the format expected by WeeklyCalendar
        const formattedData: WeekData = data.reduce((acc, { day, courses }) => {
          const dayKey = getDayKey(day) as keyof typeof colors; // Use type assertion here
          acc[dayKey] = {
            ...colors[dayKey], // Use the predefined colors
            spacing: dayKey === "Sunday" ? "" : "mt-2",
            courses: courses.map((course: any) => ({
              ...course,
              start_time: formatTime(course.start_time),
              end_time: formatTime(course.end_time),
            })),
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

    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${API}/api/notifications`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchCoursesForWeek();
    fetchNotifications();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="pb-10">
      {/* Courses */}
      <WeeklyCalendar weekData={weekData} />
      {/* Courses */}

      {/* Notices */}
      <div className="mt-10 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Important Notices</h2>
        <div className="space-y-3">
          {notifications.length ? (
            notifications.map((notification) => (
              <div key={notification.id} className="p-3 border border-gray-300 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Urgent
                  </span>
                  <span className="ml-auto text-gray-500 text-xs">
                    {new Date(notification.created_at).toLocaleTimeString()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{notification.title}</h3>
                <p className="text-gray-700">{notification.description}</p>
              </div>
            ))
          ) : (
            <p>No notices available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardDetails;
