import { useState } from "react"

export default function Login({ token, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="login">
      <h2>Login</h2>
    <div className="user-form">
      <div className="form-labels">
        <label htmlFor="email">Email:</label>
        <label htmlFor="password">Password:</label>
      </div>
      <div className="user-inputs">
        <input className="user-input" id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input className="user-input" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
    </div>
        <button className="user-button" onClick={handleSubmit}>Log in</button>
      <div>
        {
          error && <p>{error}</p>
          }
      </div>
  </div>
  )
}