import React from "react";
import { motion } from "framer-motion";
import { Link, Navigate } from "react-router-dom";
import { useAuthStore } from "../auth/Store";
import { getCurrentUser } from "../services/AuthService";
import {handleSuccess,handleError} from '../utils/Toast'

export default function UserDashboard() {
  const { isLogin } = useAuthStore();
  const user = useAuthStore((state) => state.user);

  const fetchCurrentUser = async()=>{
    try {
      const data = await getCurrentUser(user?.email);
      // console.log(data)
      handleSuccess(data?.name)
    } catch (error) {
      handleError("Error in Getting Data.")
      console.log(error);
    }
  }

  return (
    <>
      {
        isLogin() ? <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content px-4">
      
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-3xl font-semibold opacity-50">User Dashboard</h1>
          <button className="btn bg-primary text-white rounded-md px-3" onClick={fetchCurrentUser}>Get Current User</button>
        </div>
        
      </div>:<Navigate to={"/login"}/>
      }
    </>
  );
}
