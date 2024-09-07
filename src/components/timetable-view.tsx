import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "./api";
import Loader from "./loader";

export type Course = {
  id: number;
  name: string;
  code: string;
  day: string;
  venue: string;
  start_time: string;
  end_time: string;
};

const formatTime = (time: string): string => {
  const [hour, minute] = time.split(':').map(Number);
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedMinute = minute.toString().padStart(2, '0');
  return `${formattedHour}:${formattedMinute} ${period}`;
};

const convertTo24HourFormat = (time: string) => {
  const [hour, minute, period] = time.split(/[:\s]/);
  let hourNumber = parseInt(hour, 10);
  if (period === 'PM' && hourNumber !== 12) hourNumber += 12;
  if (period === 'AM' && hourNumber === 12) hourNumber = 0;
  return hourNumber * 60 + parseInt(minute, 10);
};

const dayColors: Record<string, string> = {
  MON: 'bg-blue-500',
  TUE: 'bg-green-500',
  WED: 'bg-yellow-500',
  THU: 'bg-red-500',
  FRI: 'bg-purple-500',
};

const TimetableView = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    axios.get(`${API}/api/courses/get_courses_by_level`, {
      params: { level: userDetails.level },
      withCredentials: true,
    })
    .then(response => {
      setCourses(response.data);
      setLoad(false);
    })
    .catch(error => {
      console.error('Error fetching courses:', error);
      setLoad(false);
    });
  }, []);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "5:00AM", "6:00AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
    "5:00 PM", "6:00 PM"
  ];

  const getSlotStartTime = (slot: string) => convertTo24HourFormat(slot);

  if (load) { return <Loader /> }

  return (
    <div className="bg-white py-4 rounded-lg shadow mt-4">
      <h2 className="text-xl font-bold px-4 mb-4">My Timetable</h2>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-2 pr-2">
        <div></div>
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-bold max-lg:hidden">
            {day}
          </div>
        ))}
        {timeSlots.map((time) => (
          <React.Fragment key={time}>
            <div className="text-right pr-2 font-semibold">
              {time}
            </div>
            {daysOfWeek.map((day) => (
              <div key={`${day}-${time}`} className="relative h-20 lg:h-28 border overflow-y-auto">
                <div className="absolute top-2 right-4 lg:hidden text-xs text-primary-black">{day}</div>

                {courses
                  .filter(course => course.day === Object.keys(dayColors).find(d => d.startsWith(day.slice(0, 3).toUpperCase())))
                  .filter(course => {
                    const courseStart = convertTo24HourFormat(course.start_time);
                    const courseEnd = convertTo24HourFormat(course.end_time);
                    const timeSlotStart = getSlotStartTime(time);
                    return (courseStart <= timeSlotStart && timeSlotStart < courseEnd);
                  })
                  .map(course => (
                    <div
                      key={course.id}
                      className={`${dayColors[course.day]} text-white p-2 rounded absolute inset-0`}
                      title={`${course.name} (${formatTime(course.start_time)} - ${formatTime(course.end_time)}) @ ${course.venue}`}
                    >
                      <div className="absolute top-2 right-4 lg:hidden text-xs">{day}</div>
                      <div className="font-bold">{course.name}</div>
                      <div className="text-sm">
                        {formatTime(course.start_time)} - {formatTime(course.end_time)}
                      </div>
                      <div className="text-sm">{course.venue}</div>
                    </div>
                  ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TimetableView;