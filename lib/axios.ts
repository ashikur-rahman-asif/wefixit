
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
        Cookies.remove("user_role");

        if (window.location.pathname !== "/auth/login") {
          
          window.location.href = "/auth/login?clear=1";
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
