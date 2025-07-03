import React from "react";
import { Outlet } from "react-router";
import Home from "../components/Home";
import Navbar from "../pages/NavBar";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>

      <Outlet>
        <Home></Home>
      </Outlet>
    </div>
  );
};

export default Root;
