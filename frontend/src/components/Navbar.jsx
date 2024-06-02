import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="NavBar">
      <p>Instruments.com</p>
      <div>
      <Link to="/"><h3>Home</h3></Link>
      <Link to="/instruments"><h3>Instruments</h3></Link>
      <Link to="/login"><h3>Login</h3></Link>
      <Link to="/register"><h3>Register</h3></Link>
      <Link to="/account"><h3>Account</h3></Link>
      </div>
    </div>
  )
}