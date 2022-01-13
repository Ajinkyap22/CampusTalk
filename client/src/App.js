import "./App.css";
import Home from "./Components/Homepage/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./Components/Auth";
import { useState } from "react";
import UserInfo from "./Components/User Info/UserInfo";
import Join from "./Components/Join";

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

          {/* User info page*/}
          <Route
            exact
            path="/user-info"
            render={() => (
              <UserInfo
                user={user}
                setUser={setUser}
                title={"User Profile | CampusTalk"}
              />
            )}
          />

          {/* Join Forum */}
          <Route exact path="/join-forum" render={() => <Join />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
