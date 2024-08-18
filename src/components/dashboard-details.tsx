import WeeklyCalendar, { WeekData } from "./weekly-calendar"

const weekData: WeekData = {
    Monday: ["Math", "History"],
    Tuesday: ["Science"],
    Wednesday: ["Art", "Physical Education"],
    Thursday: ["Math", "Science"],
    Friday: ["English", "Music"],
    Saturday: [],
    Sunday: []
  };

const DashboardDetails = () => {
  return (
    <div className="w-full flex lg:justify-end">
        <div className="w-full lg:w-[84%] flex bg-white text-primary-black h-screen pt-8 lg:pt-12 overflow-y-scroll">
             <div className="w-[95%] mx-auto">
                {/* Courses */}
                <WeeklyCalendar weekData={weekData} />
                {/* Courses */}
            </div>
        </div>
    </div>
  )
}

export default DashboardDetails