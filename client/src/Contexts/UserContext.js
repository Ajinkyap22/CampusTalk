import React, { useState, useEffect } from "react";
import useIsAuthenticated from "../Hooks/useIsAuthenticated";

export const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  let isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      let user = JSON.parse(localStorage.getItem("user")).user;

      setUser(user);
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}
