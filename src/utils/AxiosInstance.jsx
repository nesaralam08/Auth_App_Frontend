import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:8081/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    withCredentials: true
})

export default AxiosInstance;