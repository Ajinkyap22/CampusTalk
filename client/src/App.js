import "./App.css";
import Home from "./Components/Homepage/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./Components/Auth";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Homepage */}
          <Route exact path="/" render={() => <Home />} />

          {/* Login */}
          <Route
            exact
            path="/login"
            render={() => <Auth type={"login"} setUser={setUser} />}
          />

          {/* Signup */}
          <Route
            exact
            path="/signup"
            render={() => <Auth type={"signup"} setUser={setUser} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
