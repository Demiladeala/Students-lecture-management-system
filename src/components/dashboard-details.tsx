import { demoWeekData } from "../util/types-and-links"
import WeeklyCalendar from "./weekly-calendar"


const DashboardDetails = () => {
  return (
    <div className="w-full flex lg:justify-end">
        <div className="w-full lg:w-[84%] flex bg-white text-primary-black h-screen pt-8 lg:pt-12 overflow-y-scroll">
             <div className="w-[95%] mx-auto">
                {/* Courses */}
                <WeeklyCalendar weekData={demoWeekData} />
                {/* Courses */}
            </div>
        </div>
    </div>
  )
}

export default DashboardDetails