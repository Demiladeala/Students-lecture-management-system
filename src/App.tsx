import { Route, Routes } from "react-router-dom"
import Home from "./pages/dashboard"
import Login from "./pages/login"
import Calendar from "./pages/calendar"
import Courses from "./pages/courses"
import Timetable from "./pages/timetable"
import Settings from "./pages/settings"
import Upload from "./pages/upload-courses"
import Schedule from "./pages/schedule"
import Chat from "./pages/chat"
import Notice from "./pages/add-notice"
import EditCourse from "./pages/edit-course"

function App() {

  return (
  <main>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Home/>} />
        <Route path="/calendar" element={<Calendar/>} />
        <Route path="/courses" element={<Courses/>} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/timetable" element={<Timetable/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/upload-courses" element={<Upload/>} />
        <Route path="/schedule" element={<Schedule/>} />
        <Route path="/add-notice" element={<Notice/>} />
        <Route path="/edit-course" element={<EditCourse/>} />
      </Routes>
  </main>
  )
}

export default App
