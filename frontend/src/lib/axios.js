import axios from "axios"

const url = import.meta.env.VITE_BACKEND_URL + "/api" 

export const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true
})