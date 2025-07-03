import React, { useContext } from "react";
import { AuthContext } from "../contextApi/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRouter = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  if (!user) {
    return (
      <Navigate to={"/auth/login"} replace state={location.pathname}></Navigate>
    );
  }
  return children;
};

export default PrivateRouter;
