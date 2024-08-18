export type Course = {
  title: string;
  startTime: string; // e.g., "10:00 AM"
  endTime: string;   // e.g., "12:00 PM"
  day: string;       // e.g., "Monday"
  location: string;  // e.g., "Room 101"
  color: string;     // background color for the course
};

const sampleCourses: Course[] = [
  { title: "Intro to Computer Science", startTime: "10:00 AM", endTime: "12:00 PM", day: "Monday", location: "Room 101", color: "bg-blue-500" },
  { title: "Calculus II", startTime: "1:00 PM", endTime: "3:00 PM", day: "Tuesday", location: "Room 202", color: "bg-green-500" },
  { title: "Physics I", startTime: "9:00 AM", endTime: "11:00 AM", day: "Wednesday", location: "Room 303", color: "bg-yellow-500" },
  { title: "Physics I", startTime: "10:00 AM", endTime: "11:00 AM", day: "Wednesday", location: "Room 303", color: "bg-yellow-500" },
  // Add more courses here
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

const TimetableView = () => {
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

                {sampleCourses
                  .filter(
                    (course) =>
                      course.day === day &&
                      course.startTime === time
                  )
                  .map((course) => (
                    <div
                      key={course.title}
                      className={`${course.color} text-white p-2 rounded absolute inset-0`}
                      title={`${course.title} (${course.startTime} - ${course.endTime}) @ ${course.location}`}
                    >
                        <div className="absolute top-2 right-4 lg:hidden text-xs">{day}</div>
                      <div className="font-bold">{course.title}</div>
                      <div className="text-sm">
                        {course.startTime} - {course.endTime}
                      </div>
                      <div className="text-sm">{course.location} - {course.day}</div>
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
