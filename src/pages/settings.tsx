import SettingsForm from "../components/settings-form"
import Sidebar from "../components/side-bar"

const Settings = () => {
  return (
    <main className="relative container w-full mx-auto max-w-[2800px] scroll-smooth">
      <Sidebar/>
      <SettingsForm /> 
  </main>
  )
}

export default Settings