import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contextApi/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const [passwordValidation, setPasswordValidation] = useState("");
  const { createUser, updateUser, user, setUser, userLogOut } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoUrl = e.target.photoUrl.value;
    const password = e.target.password.value;
    console.log({ name, email, photoUrl, password });
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;

    if (name === "" || name.length < 4) {
      setPasswordValidation("name is required");
      return;
    }
    if (password.length < 6) {
      setPasswordValidation("Password must be at least 6 characters long ");
      return;
    }
    if (!uppercasePattern.test(password)) {
      setPasswordValidation("Must have an Uppercase letter in the password ");
      return;
    }
    if (!lowercasePattern.test(password)) {
      setPasswordValidation("Must have a Lowercase letter in the password  ");
      return;
    }
    setPasswordValidation("");

    createUser(email, password)
      .then((result) => {
        updateUser({ displayName: name, photoURL: photoUrl })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photoUrl });
            Swal.fire({
              title: "Registration successfully",
              icon: "success",
              draggable: true,
            });
            userLogOut();
            navigate("/auth/login");
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Something went wrong!",
              icon: "error",
              draggable: true,
            });
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
        Swal.fire({
          title: "Email Already Exist!",
          icon: "error",
          draggable: true,
        });
      });
  };
  return (
    <div>
      <div>
        <div className="card bg-base-100 mx-auto md:my-20 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body ">
            <h2 className="text-center font-bold text-2xl">
              Create your account!
            </h2>
            <form onSubmit={handleRegister} className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                name="name"
                placeholder="Name"
                required
              />
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                name="email"
                placeholder="Email"
              />
              <label className="label">PhotoUrl</label>
              <input
                type="text"
                className="input"
                name="photoUrl"
                placeholder="PhotoUrl"
                required
              />
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                name="password"
                placeholder="Password"
              />
              {passwordValidation && (
                <p className="text-red-700 text-lg">{passwordValidation}</p>
              )}

              <button className="btn btn-neutral mt-4">Register</button>
              <p>
                Already have an account ?{" "}
                <Link
                  to={"/auth/login"}
                  className="text-blue-700 font-bold underline ml-2"
                >
                  {" "}
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
