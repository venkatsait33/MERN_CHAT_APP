import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import Messages from "../components/Messages";
import MessageSkeleton from "../components/skeltons/MessageSkeleton";
import { useChatStore } from "../store/useChatStore"
import { useEffect } from "react"

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore()

  useEffect(() => {
    getMessages(selectedUser._id)

  }, [selectedUser._id, getMessages]);

  if (isMessagesLoading) return <div className="flex flex-col flex-1 overflow-auto">
    <ChatHeader />
    <MessageSkeleton />
    <MessageInput />
  </div>



  return (
    <div className="flex flex-col flex-1 overflow-auto ">
      {/* chatHeader */}
      <ChatHeader />
      {/* messages */}
      <Messages />
      {/* message Inputs */}
      <MessageInput />/
    </div>
  )
}

export default ChatContainer