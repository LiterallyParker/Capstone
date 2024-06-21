import { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// CSS
import './App.css'
import './css/navbar.css'
import './css/instruments.css'
import './css/container.css'
import './css/forms.css'
import './css/feature.css'
import './css/settings.css'
import './css/cart.css'
import './css/invoice.css'

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
import Cart from './pages/Cart'
import Purchases from './pages/Purchases'

function App() {

  return (
    <>
    <Router>
      <Navbar  />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/instruments' element={<Instruments />} />
        <Route path='/login' element={<Login />} />
        <Route path='/account' element={<Account />} />
        <Route path='/settings' element={<Settings />}/>
        <Route path='/instruments/:id' element={<FeaturedInstrument />}/>
        <Route path='/cart' element={<Cart />} />
        <Route path='/purchases' element={<Purchases />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
