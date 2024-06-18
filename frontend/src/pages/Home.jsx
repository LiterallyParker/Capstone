import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home({ token, setToken }) {

  useEffect(() => {
  }, [])

  return (

    <div className="container">
      <h1 className="title">Instruments.com</h1>
      <h2 className="slogan">Welcome to Instruments.com, where sounds are sold!</h2>
    </div>

  );
};