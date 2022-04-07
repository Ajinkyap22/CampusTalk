import React, { useState } from "react";

export const EventContext = React.createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);

  return (
    <EventContext.Provider value={[events, setEvents]}>
      {children}
    </EventContext.Provider>
  );
}
