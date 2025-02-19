import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import { toast } from "react-hot-toast"

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,
   

    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const response = await axiosInstance.get('/messages/users');
            console.log(response.data)
            set({ users: response.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUserLoading: false })
        }
    },
    getMessages: async (userId) => {
        set({ isMessageLoading: true })
        try {
            const response = await axiosInstance.get(`/messages/${userId}`)
            set({ messages: response.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isMessageLoading: false })
        }

    },
    // todo:optimze this one later
    setSelectedUser: (selectedUser) => set({ selectedUser })

}))