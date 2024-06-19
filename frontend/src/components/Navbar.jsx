import { Link } from "react-router-dom"
import { CartContext } from "../context/Cart";
import { useContext } from "react";

export default function Navbar({ token, setToken }) {
  const { getCartTotal } = useContext(CartContext);

  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
  }
  return (
    <div className="NavBar">
      <p className="stamp">Instruments.com</p>
      <div className="links">
      <Link to="/" className="link"><h3>Home</h3></Link>
      <Link to="/instruments" className="link"><h3>Instruments</h3></Link>
      {
        !token && 
        <>
        <Link to="/login" className="link"><h3>Login</h3></Link>
        <Link to="/register" className="link"><h3>Register</h3></Link>
        </>
      }
      {
        token &&
        <>
        <Link to="/account" className="link"><h3>Account</h3></Link>
        <Link to="/" className="link"><h3 onClick={logOut}>Log out</h3></Link>
        <Link to="/cart" className="link"><h3>Cart</h3></Link>
        </>
      }
      <h3 className="cart-total">Cart Total: ${getCartTotal().toFixed(2)}</h3>
      </div>
    </div>
  )
}