import Title from "./Title";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { useContext, useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import GoogleButton from "./GoogleButton";
import Input from "../FormControl/Input";
import Password from "../FormControl/Password";
import ActionButtons from "../FormControl/ActionButtons";

function Login({ title, ...props }) {
  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(0);

  useEffect(() => {
    document.title = title || "Log in | CampusTalk";
  }, [title]);

  const handleSignIn = async (googleData) => {
    const body = JSON.stringify({
      token: googleData.tokenId,
    });

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("/api/users/google", body, headers)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data.user);
        props.history.push("/join-forum");
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setStatus(401);
        } else {
          console.error(err);
        }
      });
  };

  const loginHandler = (e) => {
    e.preventDefault();

    axios
      .post("/api/users/login", { email, password })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data.user);

        if (res.data.user.firstName) {
          props.history.push("/join-forum");
        } else {
          props.history.push("/user-info");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setStatus(401);
        } else {
          console.error(err);
        }
      });
  };

  return (
    <main className="w-full bg-bubble flex relative h-full overflow-auto flex-col xl:justify-center items-center">
      <Title />

      {/* form box */}
      <section className="bg-white rounded justify-center shadow-base w-[90%] md:w-2/3 lg:w-[40%] 2xl:w-[30%] md:my-2 lg:my-5 xl:my-8">
        <h1 className="text-lg md:text-xl lg:text-2xl text-primary text-center mt-4">
          Log in to CampusTalk
        </h1>

        <div className="flex justify-center mt-6">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => <GoogleButton renderProps={renderProps} />}
            buttonText="Sign in with Google"
            onSuccess={handleSignIn}
            onFailure={handleSignIn}
            cookiePolicy={"single_host_origin"}
          />
        </div>

        <div className="or w-full mt-5 2xl:mt-6 px-4 md:px-6">
          <span className="text-center text-sm 2xl:text-lg">OR</span>
        </div>

        <form className="px-5 md:px-10 py-2" onSubmit={loginHandler}>
          {/* Email */}
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            label="Email"
            minLength={3}
            required={true}
            callback={(value) => setEmail(value)}
          />

          {/* Password */}
          <Password
            name="password"
            placeholder="Minimum 8 characters"
            label="Password"
            minLength={8}
            required={true}
            callback={(value) => setPassword(value)}
          />

          <p
            className="mt-3 text-sm text-red-600"
            hidden={status === 401 ? false : true}
          >
            Incorrect Email or Password.
          </p>

          {/* Submit */}
          <div className="my-4 mt-6 md:my-6 md:mt-8 flex justify-between items-center">
            <div className="mt-2 md:mt-0">
              <Link
                to="/signup"
                className="text-xsm md:text-xs text-primary block mb-1 md:mb-2 lg:mb-3"
              >
                Don't have an account?
              </Link>

              <Link
                to="/"
                className="text-xsm md:text-xs text-primary block mt-1 md:mt-2 lg:mt-3"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Action buttons */}
            <ActionButtons path="/" action="Log in" />
          </div>
        </form>
      </section>
    </main>
  );
}

export default withRouter(Login);
