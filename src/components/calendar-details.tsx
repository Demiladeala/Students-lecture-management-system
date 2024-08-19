import React from "react";
import { format, addDays } from "date-fns";

export type Course = {
  title: string;
  time: string;
  students: number;
  subtitle: string;
};

export type CalendarWeekData = {
  [day: string]: Course[];
};

const generateWeekDates = () => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => addDays(today, i));
};

const dayColors = [
  "bg-red-100",
  "bg-yellow-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-indigo-100",
  "bg-purple-100",
  "bg-pink-100",
];

interface WeeklyCalendarProps {
  calendarWeekData: CalendarWeekData;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ calendarWeekData }) => {
  const weekDates = generateWeekDates();

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {weekDates.map((date, index) => {
          const dayName = format(date, "EEEE");
          const dayNumber = format(date, "d");
          const isToday = index === 0;
          const coursesForDay = calendarWeekData[dayName] || [];
          const dayColor = dayColors[index % dayColors.length];

          return (
            <div key={index} className={`p-4 border rounded-2xl shadow ${dayColor}`}>
              <div className="flex justify-between items-center">
                <div className="font-bold text-lg">{dayNumber}</div>
                {isToday && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Today</span>
                )}
              </div>
              <div className="text-gray-700 text-lg">{dayName}</div>

              <div className="mt-2 space-y-2">
                {coursesForDay.length > 0 ? (
                  coursesForDay.map((course, i) => (
                    <div key={i} className="p-2 bg-white rounded shadow cursor-pointer">
                      <div className="font-bold">{course.title}</div>
                      <div className="text-sm text-gray-600">{course.subtitle}</div>
                      <div className="text-xs text-gray-500">{course.time}</div>
                      <div className="text-xs text-gray-500">Students: {course.students}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-sm">No classes</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyCalendar;