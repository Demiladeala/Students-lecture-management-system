import { format, addDays } from "date-fns";

export type ClassDetails = {
    name: string;
    color: string;
    numStudents: number;
    time: string;
    subtitle: string;
  };

export type WeekData = {
    [day: string]: ClassDetails[];
  };

  interface WeeklyCalendarProps {
    weekData: WeekData;
  }

  const generateWeekDates = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => addDays(today, i));
  };
  

//   <div className="mt-2">
//   {weekData[day]?.length ? (
//   weekData[day].map((course, i) => (
//       <div key={i} className="text-sm bg-blue-100 p-2 rounded mt-1">
//       {course}
//       </div>
//   ))
//   ) : (
//   <div className="text-gray-500 text-sm">No classes</div>
//   )}
// </div>

const WeeklyCalendar = ({ weekData }: WeeklyCalendarProps) => {
    const weekDates = generateWeekDates();
  
  return (
    <div className="py-9 px-4 shadow rounded-2xl">
        <h2 className="font-medium ">Courses For this Week</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {weekDates.map((date, index) => {
            const dayName = format(date, "EEEE"); // e.g., 'Monday'
            const dayNumber = format(date, "d");  // e.g., '18'
            const isToday = index === 0;
            const classesForDay = weekData[dayName] || [];

            return (
                <div>
                    <div key={index} className="p-4 border rounded-2xl">
                        <div className="flex justify-between items-center">
                            <div className="font-bold text-lg">
                            {dayNumber}
                            </div>
                            {isToday && (
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                                Today
                            </span>
                            )}
                        </div>
                        <div className="text-gray-700 text-lg">
                            {dayName}
                        </div>
                        <div className="mt-2 text-sm font-medium">
                            {classesForDay.length > 0 ? (
                                <span>{classesForDay.length} class{classesForDay.length > 1 ? 'es' : ''}</span>
                            ) : (
                                <span className="text-gray-500">No classes</span>
                            )}
                        </div>
                    </div>

                    <div className={`mt-12 w-full relative py-9 px-2 border-l border-gray-200 ${weekDates.length === 7 && "border-r"}`}>
                        <div className="absolute top-0 left-[50%] h-full border-[0.5px] border-gray-200"></div>

                        <div className="z-10 relative text-center">
                            {classesForDay.length > 0 ? (
                                classesForDay.map((course, i) => (
                                <div key={i} className={`text-sm p-2 rounded mt-1 ${course.color}`}>
                                    <div className="font-semibold">{course.name}</div>
                                    <div className="text-xs text-gray-600">{course.subtitle}</div>
                                    <div className="text-xs">{course.time}</div>
                                    <div className="text-xs">Students: {course.numStudents}</div>
                                </div>
                                ))
                            ) : (
                                <span className="text-gray-500">No classes</span>
                            )}
                        </div>
                    </div>
                </div>
            );
            })}
        </div>
    </div>
  );
};

export default WeeklyCalendar;