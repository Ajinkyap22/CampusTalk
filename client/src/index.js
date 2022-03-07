import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ForumProvider } from "./Contexts/ForumContext";
import { PostProvider } from "./Contexts/PostContext";
import { UserProvider } from "./Contexts/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ForumProvider>
        <PostProvider>
          <App />
        </PostProvider>
      </ForumProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
