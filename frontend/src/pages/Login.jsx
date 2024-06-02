import { useState } from "react"

export default function Login({ token, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="Login">
      <h2>Login</h2>
    <div className="user-form">
      <div className="user-feild">Email:
        <input className="user-input" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div className="user-feild">Password:
        <input className="user-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div>
        <button className="user-button" onClick={handleSubmit}>Log in</button>
      </div>
      <div>
        {
          error && <p>{error}</p>
        }
      </div>
    </div>
  </div>
  )
}