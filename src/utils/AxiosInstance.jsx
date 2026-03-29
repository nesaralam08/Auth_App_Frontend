import axios from "axios";
import { useAuthStore } from "../auth/Store";
import { refreshToken } from "../services/AuthService";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:8081/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

// Attach access token
AxiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let isRefreshing = false;
let pending = [];

// queue request
function queueRequest(cb) {
  pending.push(cb);
}

// resolve queue
function resolveQueue(newToken) {
  pending.forEach((cb) => cb(newToken));
  pending = [];
}

// Response interceptor
AxiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const original = error.config;
    const is401 = error.response?.status === 401;

    // If not 401 OR already retried
    if (!is401 || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    // If refresh already in progress
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queueRequest((newToken) => {
          if (!newToken) return reject(error);

          original.headers.Authorization = `Bearer ${newToken}`;
          resolve(AxiosInstance(original));
        });
      });
    }

    isRefreshing = true;

    try {
      const loginResponse = await refreshToken();

      const newToken = loginResponse.accessToken;

      if (!newToken) throw new Error("No access token received!");

      // Update Zustand store
      useAuthStore
        .getState()
        .changeLocalLoginData(newToken,loginResponse.user, true);

      // resolve all pending requests
      resolveQueue(newToken);

      // retry original request
      original.headers.Authorization = `Bearer ${newToken}`;
      return AxiosInstance(original);

    } catch (err) {
      resolveQueue(null);

      useAuthStore.getState().logout();

      return Promise.reject(err);

    } finally {
      isRefreshing = false;
    }
  }
);

export default AxiosInstance;