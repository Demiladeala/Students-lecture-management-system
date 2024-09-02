const Loader = () => {
  return (
    <main className="flex justify-center items-center h-screen">
        <div className="text-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-primary-gray2" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
            <p className="mt-4">Getting Data...</p>
        </div>
    </main>
  )
}

export default Loader