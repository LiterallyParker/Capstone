import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../context/Auth";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="NavBar">
      {
        user &&
        <> 
        <p className="stamp" onClick={(e) => navigate("/")}>{user.firstname} {user.lastname}</p>
        <p className="tiny-stamp">InstrumentDash</p>
        </>
      }
      {
        !user && 
        <>
        <p className="stamp" onClick={(e) => navigate("/")}>InstrumentDash</p>
        <p className="tiny-stamp">Where sounds are sold</p>
        </>
      }
      <div className="links">
      <Link to="/" className="link"><h3>Home</h3></Link>
      <Link to="/instruments" className="link"><h3>Instruments</h3></Link>
      {
        !user && 
        <>
        <Link to="/login" className="link"><h3>Login</h3></Link>
        <Link to="/register" className="link"><h3>Register</h3></Link>
        </>
      }
      {
        user &&
        <>
        <Link to="/account" className="link"><h3>Account</h3></Link>
        <Link to="/" className="link"><h3 onClick={logOut}>Log out</h3></Link>
        <Link to="/cart" className="link"><h3>Cart</h3></Link>
        </>
      }
      </div>
    </div>
  )
}