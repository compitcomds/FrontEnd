import { getAccessToken } from "@/_action/action";
import axios from "axios";
// import { getAccessToken } from "../_action/action";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"; // Fallback

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 100000, 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAccessToken(); // Ensure it's awaited properly
      console.log('token',token)
      if (token) { // No need for `.value`
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("⚠️ No token found!");
      }
    } catch (error) {
      console.error("Error fetching token:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ Axios Error:", error?.response?.data?.error?.message || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
