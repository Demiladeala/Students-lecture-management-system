import { demoWeekData } from "../util/types-and-links"
import Layout from "./layout"
import WeeklyCalendar from "./weekly-calendar"


const DashboardDetails = () => {
  return (
    <Layout>
      {/* Courses */}
      <WeeklyCalendar weekData={demoWeekData} />
      {/* Courses */}

      {/* Notices */}
      <div className="mt-10 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Important Notices</h2>
        <div className="space-y-3">
          <div className="p-3 border border-gray-300 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Urgent</span>
              <span className="ml-auto text-gray-500 text-xs">2 hours ago</span>
            </div>
            <h3 className="text-lg font-semibold">Change in Exam Schedule</h3>
            <p className="text-gray-700">The exam for Math 101 has been rescheduled to Friday, 10 AM.</p>
          </div>
        </div>
      </div>

      {/* Notices */}
    </Layout>
  )
}

export default DashboardDetails