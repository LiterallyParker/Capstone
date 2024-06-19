import { useState, useEffect } from "react";
import { updateUser, userInfo } from "../api/user";

export default function Settings({ token }) {
  const [user, setUser] = useState(null);

  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function getUser() {
      const result = await userInfo(token);
      return await result;
    }
    setUser(getUser());

  }, [token]);

  useEffect(() => {
    async function getUser() {
      await userInfo(token).then(setUser)
    };
    getUser();
  }, [token]);

  function resetFeilds() {
    setNewFirstname("");
    setNewLastname("");
    setNewEmail("");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }
  async function applyChanges() {
    if (!newFirstname && !newLastname && !newEmail && !newPassword) {
      setSuccess(null);
      setError(null);
      resetFeilds();
      return;
    };
    if (newPassword && newPassword != confirmPassword) {
      setError("Passwords do not match.");
      setSuccess(null);
      resetFeilds();
      return;
    };
    const result = await updateUser(token, { 
      firstname: newFirstname,
      lastname: newLastname,
      email: newEmail,
      password: oldPassword,
      newPassword: newPassword
    });
    if (result.error) {
      setError(result.message);
      setSuccess(null);
      resetFeilds();
      return;
    }
    setError(null);
    setSuccess("Changes applied.");
    resetFeilds();
  }

  return (
    <div className="container">
      <h1 className="title">Settings</h1>
      {
        user && <>
          <h3>Change User Info</h3>
          <div className="setting">
            First Name:
            <input type="text" placeholder={user.firstname} value={newFirstname} onChange={(e) => setNewFirstname(e.target.value)} />
          </div>
          <div className="setting">
            Last Name:
            <input type="text" placeholder={user.lastname} value={newLastname} onChange={(e) => setNewLastname(e.target.value)} />
          </div>
          <div className="setting">
            Email:
            <input type="email" placeholder={user.email} value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          </div>
          <hr width={300} />
          <h3>Change Password</h3>
          <div className="setting">
            <div>
              <span className="required">*</span>Old Password:
            </div>
            <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          </div>
          <div className="setting">
            <div>
              <span className="required">*</span>New Password:
            </div>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div className="setting">
            <div>
              <span className="required">*</span>Confirm New Password:
            </div>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
        </>
      }
      <button onClick={applyChanges}>Apply Changes</button>
      {
        error && <p className="error">{error}</p>
      }
      {
        success && <p>{success}</p>
      }
    </div>
  )
}