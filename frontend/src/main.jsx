import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './context/Cart.jsx'
import { AuthProvider } from './context/Auth.jsx'
import { InstrumentsProvider } from './context/Instruments.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <InstrumentsProvider>
    <CartProvider>
    <App />
    </CartProvider>
      </InstrumentsProvider>
    </AuthProvider>
  </React.StrictMode>,
)
