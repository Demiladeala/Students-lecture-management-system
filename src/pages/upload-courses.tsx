import Sidebar from "../components/side-bar"
import UploadForm from "../components/upload-form"

const Upload = () => {
  return (
    <main className="relative container w-full mx-auto max-w-[2800px] scroll-smooth">
        <Sidebar/>
        <UploadForm />
    </main>
  )
}

export default Upload