import React from "react";
import {  NavLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";


function OAuth2Button() {
  return (
    <div className="flex flex-col gap-3">
      <NavLink className="btn bg-base-200 hover:bg-base-300 w-full flex items-center gap-2" to={`${import.meta.env.VITE_BASE_URL || "http://localhost:8081"}/oauth2/authorization/google`}>
      <FcGoogle className="text-xl"/>  Continue with Google
      </NavLink>

      <NavLink className="btn bg-base-200 hover:bg-base-300 w-full flex items-center gap-2"to={`${import.meta.env.VITE_BASE_URL || "http://localhost:8081"}/oauth2/authorization/github`}>
       <FaGithub className="text-xl"/> Continue with GitHub
      </NavLink>
    </div>
  );
}

export default OAuth2Button;
