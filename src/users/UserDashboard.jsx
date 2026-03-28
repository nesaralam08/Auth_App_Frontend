import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuthStore } from "../auth/Store";

export default function UserDashboard() {
  const { isLogin } = useAuthStore();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content px-4">
      
      <div>
        <h1 className="text-3xl font-semibold opacity-50">User Dashboard</h1>
      </div>
      
    </div>
  );
}
