import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ForumProvider } from "./Contexts/ForumContext";
import { PostProvider } from "./Contexts/PostContext";
import { UserProvider } from "./Contexts/UserContext";
import { ModeProvider } from "./Contexts/ModeContext";

ReactDOM.render(
  <React.StrictMode>
    <ModeProvider>
      <UserProvider>
        <ForumProvider>
          <PostProvider>
            <App />
          </PostProvider>
        </ForumProvider>
      </UserProvider>
    </ModeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
