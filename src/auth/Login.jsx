import React, { useContext, useState } from "react";
import { AuthContext } from "../contextApi/AuthContext";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";

const Login = () => {
  const [passwordValidation, setPasswordValidation] = useState("");
  const { loginUser, googleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

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
        navigate(location?.state || "/");
        setPasswordValidation("");
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

  const handleGoogleLogin = () => {
    console.log("google login");
    googleLogin()
      .then((result) => {
        console.log("Login with google successfully");
        Swal.fire({
          title: "Login with google successfully",
          icon: "success",
          draggable: true,
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
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
            {/* Google */}
            <button
              className="btn bg-white text-black border-[#e5e5e5]"
              onClick={handleGoogleLogin}
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
