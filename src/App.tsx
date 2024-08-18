import { Route, Routes } from "react-router-dom"
import Home from "./pages/dashboard"
import Login from "./pages/login"

function App() {

  return (
  <main>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Home/>} />
      </Routes>
  </main>
  )
}

export default App
