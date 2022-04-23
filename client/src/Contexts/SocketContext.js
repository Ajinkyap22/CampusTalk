import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = React.createContext();

export function SocketProvider({ children }) {
  const socket = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState({});

  useEffect(() => {
    socket.current = io("ws://campustalk-app.herokuapp.com/");

    socket.current.on("users", (users) => {
      setOnlineUsers(users);
    });
  }, []);

  return (
    <SocketContext.Provider value={[socket, onlineUsers, setOnlineUsers]}>
      {children}
    </SocketContext.Provider>
  );
}
