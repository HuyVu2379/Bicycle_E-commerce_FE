import { getValueFromLocalStorage } from "@/utils/localStorage";
import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 30000, // Tăng timeout lên 30 giây
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(
  function (config) {
    const accessTokenRaw = getValueFromLocalStorage("accessToken");
    let accessToken = null;
    if (accessTokenRaw) {
      try {
        accessToken = JSON.parse(accessTokenRaw);
      } catch (error) {
        console.error("Error parsing accessToken:", error);
        localStorage.removeItem("accessToken");
      }
    }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosConfig.interceptors.response.use(
  function (response: any) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosConfig;