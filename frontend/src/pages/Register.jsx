import { useState } from "react";
import { registerUser } from "../api/index";
import { useNavigate } from "react-router-dom";

export default function Register({ token, setToken }) {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passCheck, setPassCheck] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate()

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      if (!email.includes("@") && !email.includes(".")) {
        throw new Error("Supply Valid Email.");
      };
      if (password.length < 12) {
        throw new Error("Password must be 12 characters.");
      };
      if (passCheck != password) {
        throw new Error("Passwords do not match.");
      };
      const userRequest = {firstName, lastName, email, password};
      const response = await registerUser(userRequest);
      setError(null);
      setToken(response.token);
      navigate('/');
      return response;

    } catch (error) {

      setError(error.message);

    };
  };

  return (
    <div className="Register">
      <h2>Register</h2>
      <div className="user-form">
        <div className="user-labels">
          <label className="user-label">First Name:</label>
          <label className="user-label">Last Name:</label>
          <label className="user-label">Email:</label>
          <label className="user-label">Password:</label>
          <label className="user-label">Confirm Password:</label>
        </div>
        <div className="user-inputs">
          <input className="user-input" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          <input className="user-input" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          <input className="user-input" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input className="user-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <input className="user-input" type="password" value={passCheck} onChange={(e) => setPassCheck(e.target.value)}/>
        </div>
      </div>
        <div>
          <button className="user-button" onClick={handleSubmit}>Register</button>
        </div>
        <div>
          {
            error && <p className="user-error">{error}</p>
          }
        </div>
    </div>
  );
};