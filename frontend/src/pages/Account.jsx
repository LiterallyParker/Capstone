import { useContext, useEffect, useState } from "react"
import { userInfo } from "../api/user";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
export default function Account({ token, setToken }) {

  const { user } = useContext(AuthContext)

  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <div className="container margin-left">
      <h1 className="title">Account</h1>
      {
        user && <>
        <h2>{user.firstname} {user.lastname}</h2>
        <p className="email">{user.email}</p>
        <hr width={300}></hr>
        <Link to="/settings"><p>Settings</p></Link>
        <Link to="/purchases">View Purchases</Link>
        <Link to="/"><p onClick={logOut}>Log out</p></Link>
        </>
      }
    </div>
  )
}