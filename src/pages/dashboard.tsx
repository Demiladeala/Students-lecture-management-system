import DashboardDetails from "../components/dashboard-details"
import Sidebar from "../components/side-bar"

const Home = () => {
  return (
    <main className="relative container w-full mx-auto max-w-[2800px] scroll-smooth">
        <Sidebar/>
        <DashboardDetails/> 
    </main>
  )
}

export default Home