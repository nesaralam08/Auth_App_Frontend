import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {Link, useNavigate} from "react-router-dom";
import { loginUser} from "../services/AuthService";
import { handleSuccess,handleError } from "../utils/Toast";
import { useAuthStore } from "../auth/Store";


export default function LoginPage() {
  const [loginData, setLoginData] = useState({email:"",password:""});
  const [errors, setErrors] = useState({});
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();
  const {setAuth,isLogin} = useAuthStore();
  useEffect(() => {
    if (isLogin()) {
      handleSuccess("Already Logged In.");
      navigate("/dashboard");
    }
  }, [isLogin,navigate]);

  const validate = (field, value) => {
    let newErrors = { ...errors };

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
        const result = await loginUser(loginData)
        // console.log(result)
        setAuth(result.user,result.accessToken,true);
        handleSuccess("Logged In successfully")
        setLoginData({email:"",password:""})
        setLoading(false);
        navigate("/dashboard")
    
      } catch (error) {
        console.error("Error:", error);
        handleError("Somethin went wrong")
      }finally{
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">

      {/* Glow Background */}
      <div className="absolute w-[500px] h-[500px] bg-primary/20 blur-3xl rounded-full -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br from-primary/40 to-secondary/40"
      >
        <div className="card bg-base-100 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">

          {/* Heading */}
          <h1 className="text-3xl font-bold text-center">
            Welcome Back 👋
          </h1>
          <p className="text-center opacity-70 mt-2">
            Secure login to your futuristic dashboard
          </p>

          {/* Form */}
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={loginData.email}
                onChange={(e) => {
                  setLoginData({...loginData,email:e.target.value});
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
                value={loginData.password}
                onChange={(e) => {
                  setLoginData({...loginData,password:e.target.value});
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

            {/* Login Button */}
            <button className="btn bg-primary text-white w-full shadow-lg" type="submit" disabled={loading}>
              {
                loading ? <><span className="loading loading-spinner loading-sm"/> Please wait...</>  : "Login Now" 
              }
            </button>
            <div className="flex justify-center">
              <p className="text-sm opacity-70">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary font-semibold hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Social Login */}
          <div className="flex flex-col gap-3">

            <Link className="btn bg-base-200 hover:bg-base-300 w-full flex items-center gap-2">
              <span>🌐</span> Continue with Google
            </Link>

            <Link className="btn btn-outline bg-base-200 hover:bg-base-300 w-full flex items-center gap-2">
              <span>🐙</span> Continue with GitHub
            </Link>

          </div>

        </div>
      </motion.div>
    </div>
  );
}