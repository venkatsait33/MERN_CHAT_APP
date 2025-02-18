import SideBar from "../components/SideBar"
import { useChatStore } from "../store/useChatStore"
import ChatContainer from "./ChatContainer"
import NoChatSelected from "./NoChatSelected"

const HomePage = () => {
  const { selectedUser } = useChatStore()
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-6xl rounded-lg shadow-lg bg-base-100 h-[calc(100vh-100px)]">
          <div className="flex h-full overflow-hidden rounded-lg">
            <SideBar />

            {
              !selectedUser ? <NoChatSelected /> : <ChatContainer />
            }
          </div></div>
      </div></div>
  )
}

export default HomePage