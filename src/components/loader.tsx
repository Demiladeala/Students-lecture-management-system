import { RiLoader4Fill } from "react-icons/ri"

const Loader = () => {
  return (
    <main className="w-full flex justify-center items-center h-screen">
        <div className="relative lg:left-[9%] w-full text-center mx-auto">
            <div className="w-full flex items-center justify-center">
              <RiLoader4Fill size={90} className="animate-spin text-center max-auto" />
            </div>
            <p className="mt-4">Loading...</p>
        </div>
    </main>
  )
}

export default Loader