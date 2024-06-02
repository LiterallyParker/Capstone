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
        <div className="user-feild">First Name:
          <input className="user-input" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </div>
        <div className="user-feild">Last Name:
          <input className="user-input" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </div>
        <div className="user-feild">Email*:
          <input className="user-input" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="user-feild">Password*:
          <input className="user-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="user-feild">
          <div>
            Confirm Password*:
          </div>
          <input className="user-input" type="password" value={passCheck} onChange={(e) => setPassCheck(e.target.value)}/>
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
    </div>
  );
};