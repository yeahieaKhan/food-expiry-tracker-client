import React from "react";
import { Outlet } from "react-router";
import Home from "../components/Home";
import Navbar from "../pages/NavBar";
import Footer from "../pages/Footer";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>

      <Outlet>
        <Home></Home>
      </Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
