import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// CSS
import './App.css'
import './css/navbar.css'
import './css/instruments.css'
import './css/container.css'
import './css/forms.css'
import './css/feature.css'
import './css/settings.css'
// Components
import Navbar from './components/Navbar'

// Pages
import Home from "./pages/Home"
import Register from "./pages/Register"
import Instruments from "./pages/Instruments"
import Login from './pages/Login'
import FeaturedInstrument from './pages/FeatureInstrument'
import Account from './pages/Account'
import Settings from './pages/Settings'

function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    
    const localToken = localStorage.getItem("token");
    if (localToken) setToken(localToken);

  }, [])

  return (
    <>
    <Router>
      <Navbar token={token} />
      <Routes>
        <Route path='/' element={<Home token={token} />} />
        <Route path='/register' element={<Register token={token} setToken={setToken}/>} />
        <Route path='/instruments' element={<Instruments token={token} setToken={setToken}/>} />
        <Route path='/login' element={<Login token={token} setToken={setToken}/>} />
        <Route path='/account' element={<Account token={token} setToken={setToken}/>} />
        <Route path='/settings' element={<Settings token={token}/>}/>
        <Route path='/instruments/:id' element={<FeaturedInstrument />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
