import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home({ token, setToken }) {

  useEffect(() => {
    
    console.log(token)
    
  }, [token])

  return (
    <div>
      <h1>Home</h1>
      <Link to="/register"><button>Register</button></Link>
    </div>
  );
};