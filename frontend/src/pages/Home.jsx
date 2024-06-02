import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home({ token, setToken }) {

  useEffect(() => {
  }, [token])

  return (

    <div>
      <h1>Instruments.com</h1>
    </div>

  );
};