import axios from "axios";

import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth-storage");
        Cookies.remove("user_role", { path: "/" });
        Cookies.remove("token", { path: "/" });

        if (window.location.pathname !== "/auth/login") {
          window.dispatchEvent(new Event("auth:unauthorized"));
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
