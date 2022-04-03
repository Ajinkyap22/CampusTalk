import React, { useState, useEffect } from "react";
import useIsAuthenticated from "../Hooks/useIsAuthenticated";
import axios from "axios";

export const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  let isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      let user = JSON.parse(localStorage.getItem("user")).user;

      axios
        .get(`/api/users/${user._id}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}
