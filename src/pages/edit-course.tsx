import CourseListPage from "../components/edit-course"
import Layout from "../components/layout"
import Sidebar from "../components/side-bar"

const EditCourse = () => {
  return (
    <main className="relative container w-full mx-auto max-w-[2800px] scroll-smooth">
        <Sidebar/>
        <Layout>
          <CourseListPage />
        </Layout>
    </main>
  )
}

export default EditCourse