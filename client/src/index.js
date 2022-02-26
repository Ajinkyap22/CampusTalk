import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ForumProvider } from "./Contexts/ForumContext";

ReactDOM.render(
  <React.StrictMode>
    <ForumProvider>
      <App />
    </ForumProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
