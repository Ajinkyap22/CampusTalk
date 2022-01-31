import "./App.css";
import Home from "./Components/Homepage/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./Components/Auth";
import UserInfo from "./Components/User Info/UserInfo";
import { Join } from "./Components/JoinForum/Join";
import { UserProvider } from "./UserContext";
import CreateForum from "./Components/Create Forum/Create";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Switch>
            {/* Homepage */}
            <Route exact path="/" render={() => <Home />} />

            {/* Login */}
            <Route exact path="/login" render={() => <Auth type={"login"} />} />

            {/* Signup */}
            <Route
              exact
              path="/signup"
              render={() => <Auth type={"signup"} />}
            />

            {/* User info page*/}
            <Route
              exact
              path="/user-info"
              render={() => <UserInfo title={"User Profile | CampusTalk"} />}
            />

            {/* Join Forum */}
            <Route
              exact
              path="/join-forum"
              render={() => <Join title={"Join Forum | CampusTalk"} />}
            />

            {/* Create forum */}
            <Route
              exact
              path="/create-forum"
              render={() => <CreateForum title={"Create Forum | CampusTalk"} />}
            />
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
