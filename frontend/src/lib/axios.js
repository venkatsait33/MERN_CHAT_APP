import axios from "axios";

// ✅ Ensure correct backend URL is used
const url = import.meta.env.VITE_BACKEND_URL || "https://mern-chat-app-backend-olive.vercel.app";

export const axiosInstance = axios.create({
    baseURL: `${url}/api`,
    withCredentials: true
});
