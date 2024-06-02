import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'

// Components
import Navbar from './components/Navbar'

// Pages
import Home from "./pages/Home"
import Register from "./pages/Register"
import Instruments from "./pages/Instruments"
import Login from './pages/Login'

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home token={token} />} />
        <Route path='/register' element={<Register token={token} setToken={setToken}/>} />
        <Route path='/instruments' element={<Instruments token={token} setToken={setToken}/>} />
        <Route path='/login' element={<Login token={token} setToken={setToken}/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
