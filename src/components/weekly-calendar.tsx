import { format, addDays } from "date-fns";

export type ClassDetails = {
    name: string;
    numStudents: number;
    time: string;
    start_time: string;
    end_time: string;
    subtitle: string;
  };

  export type WeekData = {
    [day: string]: {
      color: string;   
      subColor: string;   
      spacing: string;   
      courses: ClassDetails[]; 
    };
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
    <div className="pt-4 pb-9 px-4 shadow rounded-2xl">
        <h2 className="font-medium text-lg lg:text-xl mb-3 ">Courses For this Week</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {weekDates.map((date, index) => {
             const dayName = format(date, "EEEE"); // e.g., 'Monday'
             const dayNumber = format(date, "d");  // e.g., '18'
             const isToday = index === 0;
             const dayData = weekData[dayName] || { color: "", courses: [] };
             const { color, subColor, spacing, courses } = dayData;

            return (
                <div key={index}>
                    <div className="px-4 py-6 border rounded-2xl">
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
                            {courses.length > 0 ? (
                                <span>{courses.length} class{courses.length > 1 ? 'es' : ''}</span>
                            ) : (
                                <span className="text-gray-500">No classes</span>
                            )}
                        </div>
                    </div>

                    <div className={`mt-12 w-full relative pt-1 pb-9 px-2 border-l border-gray-100 lg:border-gray-200 
                        ${weekDates.length === 7 && "border-r"}`}>
                        <div className="absolute top-0 left-[50%] h-full
                         border-[0.5px] border-gray-100 lg:border-gray-200"></div>

                        <div className={`z-10 relative ${spacing}`}>
                            {courses.length > 0 ? (
                                courses.map((course, i) => (
                                <div key={i} className="flex flex-col -mb-3">
                                    <div className={`z-10 relative space-y-1 text-sm px-2 py-3 rounded-xl mt-1 ${color}`}>
                                        <div className="font-semibold text-lg flex flex-wrap">{course.name}</div>
                                        <div className="text-xs text-gray-200">{course.subtitle}</div>
                                        <div className="text-xs flex flex-wrap items-center gap-1">
                                            <div className="w-6 h-6 rounded-full">
                                                <img src="/profile-image-3.svg" 
                                                alt="students" 
                                                className="w-full h-full object-cover rounded-full border"/>
                                            </div>
                                            {course.numStudents} {course.start_time} - {course.end_time}
                                        </div>
                                    </div>
                                    <div className={`relative top-[-1rem] pt-5 pb-2 flex items-center justify-end
                                         rounded-2xl mb-3 ${subColor}`}>
                                        <div className="w-full text-xs text-center">{course.time}</div>
                                    </div>
                                </div>
                                ))
                            ) : (
                                <span className="text-gray-500 pt-9 text-center my-auto
                                font-semibold flex items-center justify-center">
                                    No classes
                                </span>
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