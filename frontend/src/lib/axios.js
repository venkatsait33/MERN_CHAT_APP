import axios from "axios"

const url = import.meta.env.BACKEND_URL + "/api" || "http://localhost:4000/api"

export const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true
})