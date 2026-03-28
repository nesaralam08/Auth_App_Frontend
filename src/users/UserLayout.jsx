import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../auth/Store";
import { handleError } from "../utils/Toast";

function UserLayout() {
  const isLogin = useAuthStore((state) => state.isLogin);
  if (isLogin())
    return (
      <div>
        <Outlet />
      </div>
    );
    else{
        handleError("Login Required !!")
        return <Navigate to={"/login"}/>
    }
}

export default UserLayout;
