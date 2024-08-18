import Layout from "../components/layout"
import Sidebar from "../components/side-bar"
import TimetableView from "../components/timetable-view"

const Home = () => {
  return (
    <main className="relative container w-full mx-auto max-w-[2800px] scroll-smooth">
        <Sidebar/>
        <Layout>
          <TimetableView />
        </Layout>
    </main>
  )
}

export default Home