import { useContext, useState } from "react"
import { loginUser } from "../api/user.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth.jsx";

export default function Login() {

  const { token, setToken } = useContext(AuthContext)

  // UserObject variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //  User is ready to log in
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await loginUser({ email, password });
    setError(null);

    if (response.error) {
      setError(response.message);
      return;
    }
    setToken(response.token);
    localStorage.setItem("token", response.token);
    navigate("/account");
  };

  return (
    <div className="container margin-left">
      <div className="form-page">
        <h2 className="title">Login</h2>
      <div className="user-form">
          <div className="user-labels">
            <label className="user-label">Email:</label>
            <label className="user-label">Password:</label>
          </div>
          <div className="user-inputs">
            <input className="user-input" id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="user-input" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <button onClick={handleSubmit}>Log in</button>
        <div>
          {
            error && <p className="error">{error}</p>
          }
        </div>
      </div>
          </div>
  )
}