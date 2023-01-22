import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Spinner } from 'flowbite-react';


function PrivateRoute({isLoading }) {
  const token = localStorage.getItem("jtwToken")
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
