import Layout from "../components/layout"
import AddNoticePage from "../components/notice"
import Sidebar from "../components/side-bar"

const Notice = () => {
  return (
    <main className="relative container w-full mx-auto max-w-[2800px] scroll-smooth">
        <Sidebar/>
        <Layout>
          <AddNoticePage />
        </Layout>
    </main>
  )
}

export default Notice