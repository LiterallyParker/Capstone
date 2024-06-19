import { createContext, useState, useEffect } from "react";
import { userInfo } from "../api/user";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  )
  const [user, setUser] = useState(null);

  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null)
  }

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
    }
    getUser();
  }, [token]);

  useEffect(() => {

      const localToken = localStorage.getItem("token");
      if (localToken) setToken(localToken);

  }, [])

  return (
   <AuthContext.Provider
    value={{ token, user, setToken, logOut }}>
      {children}
   </AuthContext.Provider>
  )
}