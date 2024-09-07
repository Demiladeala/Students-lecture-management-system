import Layout from "../components/layout"
import Loader from "../components/loader"
import SettingsForm from "../components/settings-form"
import Sidebar from "../components/side-bar"
import { useMain } from "../context/MainContext"

const Settings = () => {
  const {loading} = useMain();

  if (loading) {
    return <Loader />
  }
  
  return (
    <main className="relative container w-full mx-auto max-w-[2800px] scroll-smooth">
      <Sidebar/>
      <Layout>
        <SettingsForm /> 
      </Layout>
  </main>
  )
}

export default Settings