import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../auth/Store";
import { handleError, handleSuccess } from "../utils/Toast";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const { isLogin, logout } = useAuthStore();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };
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
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-base-100/70 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          to="/"
        >
          AuthX
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          
          {isLogin() ? (
            <Link
              className="hover:text-primary transition cursor-pointer"
              to="/dashboard"
            >
              Dashboard
            </Link>
          ) : (
            <a className="hover:text-primary transition cursor-pointer">
              Workflow
            </a>
          )}
          <a className="hover:text-primary transition cursor-pointer">
            Features
          </a>
          <a className="hover:text-primary transition cursor-pointer">
            Pricing
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Theme Toggle */}
          <Link
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle text-lg"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </Link>

          {isLogin() ? (
            <>
              {" "}
              <Link className="avatar" to="/dashboard/profile">
                <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                  <img
                    src={
                      user?.image ||
                      "https://img.daisyui.com/images/profile/demo/superperson@192.webp"
                    }
                  />
                </div>
              </Link>
              <button
                className="btn bg-primary text-white rounded-full px-4 md:px-6 shadow-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {" "}
              <Link className="btn btn-ghost hidden md:inline-flex" to="/login">
                Login
              </Link>
              <Link
                className="btn btn-primary text-white rounded-full px-4 md:px-6 shadow-lg"
                to="/signup"
              >
                Signup Now
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <Link
            className="md:hidden btn btn-ghost btn-circle"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 bg-base-100/90 backdrop-blur-xl border-t border-base-300">
          <div className="flex flex-col gap-4 mt-4">
            <a className="hover:text-primary">Features</a>
            <a className="hover:text-primary">Workflow</a>
            <a className="hover:text-primary">Pricing</a>
            <Link className="btn btn-outline" to="/login">
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
