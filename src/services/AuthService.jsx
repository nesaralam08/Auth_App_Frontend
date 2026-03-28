import AxiosInstance from "../utils/AxiosInstance";

// register
export const registerUser = async(data)=>{
    const response = await AxiosInstance.post("/auth/register",data)
    return response.data;
}

//login
export const loginUser = async(data)=>{
    const response = await AxiosInstance.post("/auth/login",data)
    return response.data;
}

// logout
export const logoutUser = async()=>{
    const response = await AxiosInstance.post("/auth/logout")
    return response.data;
}
// get current user

export const getCurrentUser = async(emailId)=>{
    const response = await AxiosInstance.get(`/users/email/${emailId}`)
    return response.data;
}

// refresh token