import CalendarComponent from "../components/full-calendar"
import Layout from "../components/layout"
import Sidebar from "../components/side-bar"

const Home = () => {
  return (
    <main className="relative container w-full mx-auto max-w-[2800px] scroll-smooth">
        <Sidebar/>
        <Layout>
          <CalendarComponent />
        </Layout>
    </main>
  )
}

export default Home