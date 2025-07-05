import React, { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";

import { AuthContext } from "../contextApi/AuthContext";

const NavBar = () => {
  const { user, userLogOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(user);
  const links = (
    <>
      <li>
        <NavLink to={"/"}>
          {" "}
          <a>Home</a>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/fridge"}>
          {" "}
          <a>Fridge</a>
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to={"/add-food"}>
              {" "}
              <a>Add Food</a>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/my-item"}>
              {" "}
              <a>My Item</a>
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const handleLogout = () => {
    userLogOut()
      .then(() => {
        console.log("logOut successfully");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log("Something went wrong: " + error.message);
      });
  };
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"}>
            {" "}
            <a className="btn btn-ghost text-xl">Food Court</a>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-3">
          {user ? (
            <>
              <div className="relative cursor-pointer group">
                <img
                  className="w-12 h-12 rounded-full"
                  src={user.photoURL}
                  alt="User"
                />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-1 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {user.displayName}
                </div>
              </div>
              <button className="btn ml-3" onClick={handleLogout}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/auth/login" className="btn">
                Login
              </NavLink>
              <NavLink to="/auth/register" className="btn">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
