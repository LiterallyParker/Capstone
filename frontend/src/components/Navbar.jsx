import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="NavBar">
      <p className="stamp">Instruments.com</p>
      <div className="links">
      <Link to="/" className="link"><h3>Home</h3></Link>
      <Link to="/instruments" className="link"><h3>Instruments</h3></Link>
      <Link to="/login" className="link"><h3>Login</h3></Link>
      <Link to="/register" className="link"><h3>Register</h3></Link>
      <Link to="/account" className="link"><h3>Account</h3></Link>
      </div>
    </div>
  )
}