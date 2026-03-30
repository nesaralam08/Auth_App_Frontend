import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../auth/Store";
import { handleSuccess,handleError } from "../utils/Toast";

export default function UserProfile() {
  const { isLogin ,logout} = useAuthStore();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
      try {
        await logout();
        handleSuccess("Logged Out Successfully");
        navigate("/login");
      } catch (error) {
        console.log(error);
        handleError("Something went wrong !!");
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content px-4">
      {/* Glow Background */}
      <div className="absolute w-[400px] h-[400px] bg-primary/20 blur-3xl rounded-full -z-10"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br from-primary/40 to-secondary/40"
      >
        {isLogin() ? (
          <div className="bg-base-100 rounded-3xl p-8 shadow-2xl text-center backdrop-blur-xl">
            {/* Avatar */}
            <div className="avatar" to="/dashboard/profile">
                <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                  <img
                    src={
                      user?.image ||
                      "https://img.daisyui.com/images/profile/demo/superperson@192.webp"
                    }
                  />
                </div>
              </div>

            {/* Name */}
            <h2 className="mt-4 text-xl font-semibold">{user?.name}</h2>

            {/* Email */}
            <p className="text-sm opacity-70">{user?.email}</p>

            {/* Divider */}
            <div className="divider my-6">Account Details</div>

            {/* Info */}
            <div className="space-y-2 text-sm opacity-80">
              <p>Status:{user?.enable ? "Activate" : "Deactivate"}</p>
              {/* {console.log(user?.roles[0]?.name)} */}
              <p>Role: {user?.roles[0]?.name || "GUEST"}</p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3 justify-center">
              <Link className="btn btn-outline btn-sm rounded-full">Edit</Link>
              <Link className="btn btn-primary text-white btn-sm rounded-full" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-base-100 rounded-3xl p-8 shadow-2xl text-center backdrop-blur-xl">
            {/* Avatar */}
            <div className="w-20 h-20 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold shadow-lg">
              U
            </div>

            {/* Name */}
            <h2 className="mt-4 text-xl font-semibold">User Name</h2>

            {/* Email */}
            <p className="text-sm opacity-70">user@email.com</p>

            {/* Divider */}
            <div className="divider my-6">Account Details</div>

            {/* Info */}
            <div className="space-y-2 text-sm opacity-80">
              <p>Status: Active ✅</p>
              <p>Role: User</p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3 justify-center">
              <Link className="btn btn-outline btn-sm rounded-full">Edit</Link>
              <Link className="btn btn-primary btn-sm rounded-full">
                Logout
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
