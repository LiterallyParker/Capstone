import { useEffect, useState } from "react"
import { userInfo } from "../api/user";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Account({ token, setToken }) {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      async function getUser() {
        const result = await userInfo(token);
        return await result;
      }
      setUser(getUser());

  }, [token])

  useEffect(() => {
    async function getUser() {
      await userInfo(token).then(setUser)
    }
    getUser();
  }, [token])

  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <div className="container">
      <h1 className="title">Account</h1>
      {
        user && <>
        <h2>{user.firstname} {user.lastname}</h2>
        <hr width={300}></hr>
        <Link to="/settings"><p>Settings</p></Link>
        <Link to="/"><p onClick={logOut}>Log out</p></Link>
        </>
      }
    </div>
  )
}