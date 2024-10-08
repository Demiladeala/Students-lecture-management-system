import { RiLoader4Fill } from "react-icons/ri"

const Loader = () => {
  return (
    <main className="relative w-full flex justify-center items-center h-[80vh] lg:h-screen">
        <div className="relative w-full text-center mx-auto">
            <div className="w-full flex items-center justify-center">
              <RiLoader4Fill size={90} className="animate-spin text-center max-auto" />
            </div>
            <p className="mt-4">Loading...</p>
        </div>
    </main>
  )
}

export default Loader