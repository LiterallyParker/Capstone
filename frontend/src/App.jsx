import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'

// Components
import Home from "./components/Home"
import Register from "./components/Register"

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home token={token} />} />
        <Route path='/register' element={<Register token={token} setToken={setToken}/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
