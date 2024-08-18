import CoursesList from "../components/courses-list"
import Sidebar from "../components/side-bar"

const Home = () => {
  return (
    <main className="relative container w-full mx-auto max-w-[2800px] scroll-smooth">
        <Sidebar/>
        <CoursesList />
    </main>
  )
}

export default Home