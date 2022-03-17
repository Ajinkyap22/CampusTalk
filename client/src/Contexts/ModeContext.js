import React, { useState } from "react";

export const ModeContext = React.createContext();

export function ModeProvider({ children }) {
  const [mode, setMode] = useState("light");

  return (
    <ModeContext.Provider value={[mode, setMode]}>
      {children}
    </ModeContext.Provider>
  );
}
