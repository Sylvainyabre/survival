import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Spinner } from 'flowbite-react';


function PrivateRoute({token,isLoading }) {
  //const token = localStorage.getItem("jtwToken")
  console.log(token)
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
    <Navigate to={"/home"} state={{ prev: location.pathname }} />
  );
}

export default PrivateRoute;
