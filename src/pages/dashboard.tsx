import DashboardDetails from "../components/dashboard-details"
import Layout from "../components/layout"
import Sidebar from "../components/side-bar"

const Home = () => {
  return (
    <main className="relative container w-full mx-auto max-w-[2800px] scroll-smooth">
        <Sidebar/>
        <Layout>
          <DashboardDetails/> 
        </Layout>
    </main>
  )
}

export default Home