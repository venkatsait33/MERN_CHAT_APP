import { X } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore"
import { useChatStore } from "../store/useChatStore"

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore()
    const { onlineUsers } = useAuthStore()
    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="relative rounded-full size-10">
                            <img src={selectedUser?.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
                        </div>
                    </div>
                    <div>
                        <h3>{selectedUser?.fullName}</h3>
                        <p>{onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}</p>
                    </div>

                </div>
                <button onClick={() => setSelectedUser(null)}>
                    <X />
                </button>
            </div>
        </div>
    )
}

export default ChatHeader