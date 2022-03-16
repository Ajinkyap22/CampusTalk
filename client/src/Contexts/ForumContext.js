import React, { useState, useEffect } from "react";
import axios from "axios";

export const ForumContext = React.createContext();

export function ForumProvider({ children }) {
  const [forums, setForums] = useState([]);

  // fetch forum list
  useEffect(() => {
    axios
      .get("/api/forums/")
      .then((res) => {
        setForums(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <ForumContext.Provider value={[forums, setForums]}>
      {children}
    </ForumContext.Provider>
  );
}
