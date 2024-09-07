import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs"; // For parsing and formatting times
import { API } from "./api";

// Course type
export type Course = {
  title: string;
  startTime: string; // e.g., "10:00 AM"
  endTime: string;   // e.g., "12:00 PM"
  day: string;       // e.g., "Monday"
  location: string;  // e.g., "Room 101"
};

// Assign background colors to the days of the week
const dayColors: Record<string, string> = {
  "Monday": "bg-blue-500",
  "Tuesday": "bg-green-500",
  "Wednesday": "bg-yellow-500",
  "Thursday": "bg-purple-500",
  "Friday": "bg-red-500",
};

// Time slots and days of the week for the timetable
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = ["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"];

// Utility to convert "HH:mm:ss" to "h:mm A" format
const formatTime = (time: string) => dayjs(time, "HH:mm:ss").format("h:mm A");

// Utility to map backend day abbreviations (e.g., "MON") to full day names (e.g., "Monday")
const mapDayToFull = (day: string) => {
  switch (day) {
    case "MON":
      return "Monday";
    case "TUE":
      return "Tuesday";
    case "WED":
      return "Wednesday";
    case "THU":
      return "Thursday";
    case "FRI":
      return "Friday";
    default:
      return "";
  }
};

const TimetableView = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  // Fetch courses by level from sessionStorage
  useEffect(() => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    const level = userDetails.level;

    if (level) {
      axios.get(`${API}/api/courses/get_courses_by_level`, {
        params: { level },
        withCredentials: true
      })
      .then((response) => {
        const fetchedCourses = response.data.map((course: any) => ({
          title: course.name,
          startTime: formatTime(course.start_time),  // Format start time to "h:mm A"
          endTime: formatTime(course.end_time),      // Format end time to "h:mm A"
          day: mapDayToFull(course.day),             // Convert "MON" to "Monday"
          location: course.venue,
        }));

        setCourses(fetchedCourses);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
    }
  }, []);

  const isTimeWithinSlot = (courseTime: string, slotTime: string) => {
    const course = dayjs(courseTime, "h:mm A");
    const slot = dayjs(slotTime, "h:mm A");
    return course.isSame(slot);
  };

  return (
    <div className="bg-white py-4 rounded-lg shadow mt-4">
      <h2 className="text-xl font-bold px-4 mb-4">My Timetable</h2>

      <div className="grid grid-col-1 lg:grid-cols-6 gap-8 lg:gap-2 pr-2">
        <div></div>
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-bold max-lg:hidden">
            {day}
          </div>
        ))}
        {timeSlots.map((time) => (
          <>
            <div key={time} className="text-right pr-2 font-semibold">
              {time}
            </div>
            {daysOfWeek.map((day) => (
              <div key={`${day}-${time}`} className="relative h-20 lg:h-28 border overflow-y-auto">
                <div className="absolute top-2 right-4 lg:hidden text-xs text-primary-black">{day}</div>

                {courses
                  .filter((course) => course.day === day && isTimeWithinSlot(course.startTime, time))
                  .map((course) => (
                    <div
                      key={course.title}
                      className={`${dayColors[day]} text-white p-2 rounded absolute inset-0`}
                      title={`${course.title} (${course.startTime} - ${course.endTime}) @ ${course.location}`}
                    >
                      <div className="font-bold">{course.title}</div>
                      <div className="text-sm">
                        {course.startTime} - {course.endTime}
                      </div>
                      <div className="text-sm">{course.location}</div>
                    </div>
                  ))}
              </div>
            ))}
          </>
        ))}
      </div>
    </div>
  );
};

export default TimetableView;