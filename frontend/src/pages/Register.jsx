import { useContext, useState } from "react";
import { registerUser } from "../api/user";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";

export default function Register() {

  const { token, setToken } = useContext(AuthContext);

  // User Object Variables
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passCheck, setPassCheck] = useState("");

  // Error Display Variable
  const [error, setError] = useState(null);

  // Dynamic Navigation
  const navigate = useNavigate()

  // User is ready to register
  async function handleSubmit(e) {

    e.preventDefault();

    // Try sending the UserObject to the API
    try {
      if (!email.includes("@") || !email.includes(".")) {
        throw new Error("Supply Valid Email.");
      };
      if (password.length < 12) {
        throw new Error("Password must be 12 characters.");
      };
      if (passCheck != password) {
        throw new Error("Passwords do not match.");
      };
      const userRequest = { firstname, lastname, email, password };
      const response = await registerUser(userRequest);
      setError(null);
      if (response.error) {
        setError(response.message);
        return;
      }
      setToken(response.token);
      localStorage.setItem("token", response.token);
      navigate('/account');
      return response;

    } catch (error) {

      setError(error.message);

    };
  };

  return (
    <div className="container margin-left">
      <div className="form-page">
        <h2 className="title">Register</h2>
        <div className="user-form">
          <div className="user-labels">
            <label className="user-label">First Name:</label>
            <label className="user-label">Last Name:</label>
            <label className="user-label">Email:</label>
            <label className="user-label">Password:</label>
            <label className="user-label">Confirm Password:</label>
          </div>
          <div className="user-inputs">
            <input className="user-input" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            <input className="user-input" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
            <input className="user-input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="user-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input className="user-input" type="password" value={passCheck} onChange={(e) => setPassCheck(e.target.value)} />
          </div>
        </div>
        <div>
          <button onClick={handleSubmit}>Register</button>
        </div>
        <div>
          {
            error && <p className="error">{error}</p>
          }
        </div>
      </div>
    </div>
  );
};