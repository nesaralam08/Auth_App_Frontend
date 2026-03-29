import React, { useEffect, useState } from "react";
import { refreshToken } from "../services/AuthService";
import { handleError, handleSuccess } from "../utils/Toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./Store";

function OAuthSuccess() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();
  const changeLocalLoginData = useAuthStore((state)=>state.changeLocalLoginData);
  
  useEffect(() => {
    async function getAccessToken() {
      if (!isRefreshing) {
        setIsRefreshing(true);

        try {
          const responseoginData = await refreshToken();
          changeLocalLoginData(
            responseoginData.accessToken,
            responseoginData.user,
            true
          );
          handleSuccess("Logged In Success !");
          navigate("/dashboard")
        } catch (error) {
          handleError("Error while login !");
          console.log(error);
        }finally{
            setIsRefreshing(false);
        }
      }
    }
    getAccessToken()
  }, []);
  return <div className="p-10 flex flex-col gap-3 justify-center items-center">
    <span className="loading loading-spinner loading-lg"></span>
    <h1 className="text-2xl font-semibold">Please wait...</h1>
  </div>;
}

export default OAuthSuccess;
