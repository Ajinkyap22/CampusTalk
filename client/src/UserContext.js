import React, { useState, useEffect } from "react";

export const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}
