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
    <div className="register-div">
      <div className="user-form">
        <label className="user-form-label">First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </label>
        <label className="user-form-label">Last Name:
          <input className="user-form-input" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </label>
        <label className="user-form-label">Email:
          <input className="user-form-input" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label className="user-form-label">Password:
          <input className="user-form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <label className="user-form-label">Confirm Password:
          <input className="user-form-input" type="password" value={passCheck} onChange={(e) => setPassCheck(e.target.value)}/>
        </label>
        <div>
          <button className="user-form-button" onClick={handleSubmit}>Sign Up</button>
        </div>
        <div>
          {
            error && <p>{error}</p>
          }
        </div>
      </div>
    </div>
  );
};