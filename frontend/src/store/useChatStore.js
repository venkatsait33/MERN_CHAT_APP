import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import { toast } from "react-hot-toast"
import { useAuthStore } from "./useAuthStore"

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,


    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const response = await axiosInstance.get('/messages/users');
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
            set({ messages: response.data.data })

        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isMessageLoading: false })
        }

    },
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get(); // Get current messages

        if (!selectedUser || !selectedUser._id) {
            toast.error("No user selected!");
            return;
        }

        try {
            const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);

            console.log("Full response:", response.data); // Debug API response

            // Extract correct data
            const newMessage = response.data?.data; // Should be a single message object

            if (!newMessage) {
                console.error("No message data found in response:", response);
                toast.error("Failed to receive message data.");
                return;
            }

            // Ensure messages is an array before updating state
            if (!Array.isArray(messages)) {
                console.error("messages is not an array. Fixing it:", messages);
                set({ messages: [] }); // Reset to an empty array
            }

            // Append new message to state
            set((state) => ({
                messages: [...(state.messages || []), newMessage]
            }));


        } catch (error) {
            console.error("Message sending failed:", error);
            toast.error(error.response?.data?.message || "Failed to send message.");
        }
    },
    subscribeToMessages: () => {
        
        const { selectedUser } = get();
        if (!selectedUser) return;
        // we socket from useAuthStore
        const socket = useAuthStore.getState().socket;

        // socket.on is on the connection to send and receive messages from sender and receiver
        socket.on("newMessage", (newMessage) => {
            //if the selected user is not the sender of the new message, do nothing and get return
            const isMessageSentFromSelectedUser = newMessage.senderId !== selectedUser.id
            if (!isMessageSentFromSelectedUser) return;
            // we fetching the messages again to get the latest message and set to the messages array
            set({
                messages: [...get().messages, newMessage]
            })
        })
    },

    unSubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        // socket.off is to remove the event listener for the newMessage event from the socket
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),

}))