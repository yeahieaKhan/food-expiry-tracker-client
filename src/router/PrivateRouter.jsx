import React, { useContext } from "react";
import { AuthContext } from "../contextApi/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loading from "../pages/Loading";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return (
      <Navigate to={"/auth/login"} replace state={location.pathname}></Navigate>
    );
  }
  return children;
};

export default PrivateRouter;
