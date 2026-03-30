import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/Toast";
import { registerUser } from "../services/AuthService";
import { useAuthStore } from "../auth/Store";
import OAuth2Button from "./OAuth2Button";
import { IoIosCreate } from "react-icons/io";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isLogin } = useAuthStore();
  useEffect(() => {
    if (isLogin()) {
      handleSuccess("Already Logged In.");
      navigate("/dashboard");
    }
  }, [isLogin,navigate]);

  const validate = (field, value) => {
    let newErrors = { ...errors };

    if (field === "name") {
      if (value.trim().length < 3) {
        newErrors.name = "Name must be at least 3 characters";
      } else {
        delete newErrors.name;
      }
    }

    if (field === "email") {
      if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        newErrors.email = "Enter a valid email";
      } else {
        delete newErrors.email;
      }
    }

    if (field === "password") {
      if (value.length < 6) {
        newErrors.password = "Minimum 6 characters required";
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await registerUser(form);
      // console.log(result);
      handleSuccess("User register successfully");
      setForm({ name: "", email: "", password: "" });
      setLoading(false);
      navigate("/login");
    } catch (error) {
      // console.error("Error:", error);
      handleError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      {/* Glow Background */}
      <div className="absolute w-[500px] h-[500px] bg-secondary/20 blur-3xl rounded-full -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br from-primary/40 to-secondary/40"
      >
        <div className="card bg-base-100 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          {/* Heading */}
          <h1 className="text-3xl font-bold text-center">Create Account 🚀</h1>
          <p className="text-center opacity-70 mt-2">
            Join the future of secure authentication
          </p>

          {/* Form */}
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  validate("name", e.target.value);
                }}
                name="name"
                required
                className="input input-bordered w-full focus:input-primary px-3 bg-base-200"
              />
              {errors.name && (
                <p className="text-error text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  validate("email", e.target.value);
                }}
                name="email"
                required
                className="input input-bordered w-full focus:input-primary px-3 bg-base-200"
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  validate("password", e.target.value);
                }}
                name="password"
                required
                className="input input-bordered w-full focus:input-primary px-3 bg-base-200"
              />
              {errors.password && (
                <p className="text-error text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Signup Button */}
            <button
              className="btn bg-primary w-full shadow-lg text-white"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" /> Please
                  wait...
                </>
              ) : (
                <><IoIosCreate className="text-xl"/> Create Account</>
              )}
            </button>
            <div className="flex justify-center">
              <p className="text-sm opacity-70">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Social Signup */}
          <OAuth2Button/>
        </div>
      </motion.div>
    </div>
  );
}
