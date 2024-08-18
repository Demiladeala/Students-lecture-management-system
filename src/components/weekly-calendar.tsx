import { format, addDays } from "date-fns";

export type WeekData = {
    [day: string]: string[];
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
    <div className="">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {weekDates.map((date, index) => {
            const dayName = format(date, "EEEE"); // e.g., 'Monday'
            const dayNumber = format(date, "d");  // e.g., '18'
            const isToday = index === 0;
            const classesForDay = weekData[dayName]?.length || 0;

            return (
                <div>
                    <div key={index} className="p-4 border rounded-2xl shadow">
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
                            {classesForDay > 0 ? (
                            <span>{classesForDay} class{classesForDay > 1 ? 'es' : ''}</span>
                            ) : (
                            <span className="text-gray-500">No classes</span>
                            )}
                        </div>
                    </div>

                    <div className={`mt-12 w-full relative py-9 border-l border-gray-200 ${weekDates.length === 7 && "border-r"}`}>
                        <div className="absolute top-0 left-[50%] h-full border-[0.5px] border-gray-200"></div>

                        <div className="z-10 relative text-center">
                            class
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