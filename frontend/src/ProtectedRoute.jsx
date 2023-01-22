import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase";
import Spinner from "../blog/Spinner";
import { USER } from "../../constants";

function PrivateRoute({ token, isLoading }) {
  const location = useLocation();
  if (isLoading) {
    return (
      <div className="justify-center  m-auto w-10 mt-32 items-center">
        <Spinner />
      </div>
    );
  }

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ prev: location.pathname }} />
  );
}

export default PrivateRoute;
