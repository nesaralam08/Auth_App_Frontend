import axios from "axios";
import { useAuthStore } from "../auth/Store";

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:8081/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    withCredentials: true
})

// every requests
AxiosInstance.interceptors.request.use((config)=>{
    const accessToken = useAuthStore.getState().accessToken;
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
})
export default AxiosInstance;