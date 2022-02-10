import "./App.css";
import Home from "./Components/Homepage/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserInfo from "./Components/User Info/UserInfo";
import { Join } from "./Components/JoinForum/Join";
import { UserProvider } from "./UserContext";
import CreateForum from "./Components/Create Forum/Create";
import Forum from "./Components/Forum/Forum";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import { ForumContext } from "./ForumContext";
import { useContext } from "react";
import Feed from "./Components/Feed/Feed";
import { TabProvider } from "./TabContext";

function App() {
  const [forums] = useContext(ForumContext);

  return (
    <div className="App relative">
      <UserProvider>
        <Router>
          <Switch>
            {/* Homepage */}
            <Route exact path="/" render={() => <Home />} />

            {/* Login */}
            <Route
              exact
              path="/login"
              render={() => <Login title="Log in | CampusTalk" />}
            />

            {/* Signup */}
            <Route
              exact
              path="/signup"
              render={() => <Signup title={"Sign up | CampusTalk"} />}
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

            {/* Feed */}
            <TabProvider>
              <Route
                exact
                path="/feed"
                render={() => <Feed title={"Feed | CampusTalk"} />}
              />

              {/* forum page */}
              {forums.map((forum, i) => (
                <Route
                  exact
                  path={`/forums/${forum._id}`}
                  key={i}
                  render={() => (
                    <Forum title={`${forum.forumName} | CampusTalk`} />
                  )}
                />
              ))}
            </TabProvider>
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
