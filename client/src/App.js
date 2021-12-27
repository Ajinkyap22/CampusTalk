import "./App.css";
import Home from "./Components/Homepage/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Components/Auth";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Homepage */}
          <Route exact path="/" element={<Home />} />

          {/* Login */}
          <Route
            exact
            path="/login"
            element={<Auth type={"login"} title={"Login | CampusTalk"} />}
          />

          {/* Signup */}
          <Route
            exact
            path="/signup"
            element={<Auth type={"signup"} title={"Sign Up | CampusTalk"} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
