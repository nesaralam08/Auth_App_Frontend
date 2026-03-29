import AxiosInstance from "../utils/AxiosInstance";

// register
export const registerUser = async (data) => {
  try {
    const response = await AxiosInstance.post("/auth/register", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//login
export const loginUser = async (data) => {
  try {
    const response = await AxiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// logout
export const logoutUser = async () => {
  try {
    const response = await AxiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
// get current user

export const getCurrentUser = async (emailId) => {
  try {
    const response = await AxiosInstance.get(`/users/email/${emailId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// refresh token
export const refreshToken = async()=>{
    try {
        const response = await AxiosInstance.post("/auth/refresh")
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}