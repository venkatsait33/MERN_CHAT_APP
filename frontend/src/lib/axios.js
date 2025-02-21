import axios from "axios"

const url = import.meta.env.VITE_BACKEND_URL + "/api" || "https://mern-chat-app-backend-olive.vercel.app" +"/api"

export const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true
})