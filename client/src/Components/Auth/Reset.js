import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { withRouter, Link } from "react-router-dom";
import Logo from "../Logo";
import Input from "../FormControl/Input";
import Password from "../FormControl/Password";
import axios from "axios";

function Reset({ title, history }) {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState(0);
  const [changed, setChanged] = useState(false);
  const [user] = useContext(UserContext);

  useEffect(() => {
    document.title = title || "Reset Password | CampusTalk";
  }, [title]);

  useEffect(() => {
    console.log(user);
    if (user) history.push("/feed");
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("/api/users/reset-password", formData)
      .then(() => {
        setChanged(true);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setStatus(404);
        } else if (err.response?.status === 401) {
          setStatus(401);
        } else {
          console.error(err);
        }
      });
  }

  const handleChange = function (e) {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <main className="w-full bg-bubble flex relative h-full overflow-auto flex-col items-center">
      <div className="my-4">
        <Logo width="250" height="100" />
      </div>

      <section className="bg-white rounded p-3 shadow-base w-[90%] md:w-2/3 lg:w-[30%] 2xl:w-[25%]">
        <h1 className="text-lg md:text-xl lg:text-2xl text-primary text-center mt-2">
          Reset Password
        </h1>

        {changed ? (
          <div className="text-center">
            <div className="bg-green-300 p-3 w-[90%] my-4 rounded mx-auto">
              <p className="text-green-700 text-sm">
                You have successfully reset your password. You can now login
                with your new password.
              </p>
            </div>

            <Link to="/login">
              <button className="px-2 md:px-3 py-1.5 lg:py-2 ml-1 my-2 text-xs md:text-sm lg:text-base 2xl:text-lg bg-primary text-white rounded hover:bg-blue-700">
                Login
              </button>
            </Link>
          </div>
        ) : (
          <form className="my-2 mt-6 px-2" onSubmit={handleSubmit}>
            {/* email */}
            <Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              label="Email"
              minLength={3}
              required={true}
              callback={handleChange}
              setState={false}
            />

            <p
              className="mt-3 text-sm text-red-600"
              hidden={status === 404 ? false : true}
            >
              Email is not registered.
            </p>

            {/* Password */}
            <Password
              name="newPassword"
              placeholder="Minimum 8 characters"
              label="New Password"
              minLength={8}
              required={true}
              callback={handleChange}
              setState={false}
            />

            <p
              className="mt-3 text-sm text-red-600"
              hidden={status === 401 ? false : true}
            >
              Confirmed Password must be the same as password
            </p>

            {/* Confirm password */}
            <Password
              name="confirmPassword"
              placeholder="Minimum 8 characters"
              label="Confirm Password"
              minLength={8}
              required={true}
              callback={handleChange}
              setState={false}
            />

            <button className="float-right relative px-2 md:px-3 py-1.5 lg:py-2 ml-1 my-2 mt-4 text-xs md:text-sm 2xl:text-lg bg-primary text-white rounded hover:bg-blue-700">
              Reset Password
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

export default withRouter(Reset);
