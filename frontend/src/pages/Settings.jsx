import { useState, useEffect } from "react";
import { userInfo } from "../api/user";

export default function Settings({ token }) {
  const [user, setUser] = useState(null);
  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    async function getUser() {
      const result = await userInfo(token);
      return await result;
    }
    setUser(getUser());

  }, [token])

  useEffect(() => {
    async function getUser() {
      await userInfo(token).then(setUser)
    }
    getUser();
  }, [token])
 return (
  <div className="container">
    <h1 className="title">Settings</h1>
    {
      user && <>
      <h3>Change User Info</h3>
        <div className="setting">
          First Name:
          <div>
          <input type="text" placeholder={user.firstname} value={newFirstname} onChange={(e) => setNewFirstname(e.target.value)}/>
          <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
        <div className="setting">
          Last Name:
          <div>
          <input type="text" placeholder={user.lastname} value={newFirstname} onChange={(e) => setNewFirstname(e.target.value)}/>
          <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
        <div className="setting">
          Email:
          <div>
          <input type="text" placeholder={user.email} />
          <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      <hr width={300}/>
      <h3>Change Password</h3>
      <div className="setting">
          Email:
          <div>
          <input type="password" />
          <i className="fa-solid fa-arrow-right invisible"></i>
          </div>
        </div>
      <div className="setting">
          Old Password:
          <div>
          <input type="password" />
          <i className="fa-solid fa-arrow-right invisible"></i>
          </div>
        </div>
        <div className="setting">
          New Password:
          <div>
          <input type="password" />
          <i className="fa-solid fa-arrow-right invisible"></i>
          </div>
        </div>
        <div className="setting">
          Confirm Password Change:
          <div>
          <input type="password" />
          <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </>
    }
  </div>
 )
}