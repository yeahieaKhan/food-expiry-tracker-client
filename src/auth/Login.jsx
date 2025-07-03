import React, { useContext, useState } from "react";
import { AuthContext } from "../contextApi/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const [passwordValidation, setPasswordValidation] = useState("");
  const { loginUser } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log({ email, password });

    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;

    if (password.length < 6) {
      setPasswordValidation("Password must be at least 6 characters long");
      return;
    }

    if (!uppercasePattern.test(password)) {
      setPasswordValidation("Must have an Uppercase letter in the password");
      return;
    }

    if (!lowercasePattern.test(password)) {
      setPasswordValidation("Must have a Lowercase letter in the password");
      return;
    }

    loginUser(email, password)
      .then((result) => {
        Swal.fire({
          title: "Login successfully",
          icon: "success",
          draggable: true,
        });
        setPasswordValidation(""); // Clear validation message on success
      })
      .catch((error) => {
        console.log("Login error:", error.message);
        Swal.fire({
          title: "Email or password invalid",
          icon: "error",
          draggable: true,
        });
      });
  };

  return (
    <div>
      <div className="card bg-base-100 mx-auto md:my-20 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="text-center font-bold text-2xl">Login here!</h2>
          <form onSubmit={handleLogin} className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              required
            />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              required
            />

            <div className="mt-2">
              <a href="#" className="link link-hover">
                Forgot password?
              </a>
            </div>

            {passwordValidation && (
              <p className="text-red-700 text-lg mt-2">{passwordValidation}</p>
            )}

            <button type="submit" className="btn btn-neutral mt-4 w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
