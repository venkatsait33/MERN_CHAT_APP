import { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeltons/SidebarSkeleton'
import { Users } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

const SideBar = () => {
    const { setSelectedUser, getUsers, users, selectedUser, isUserLoading } = useChatStore();


    const { onlineUsers } = useAuthStore()

    useEffect(() => {
        getUsers()
    }, [getUsers])

    if (isUserLoading) return <SidebarSkeleton />

    return (
        <aside className='flex flex-col w-20 h-full transition-all duration-300 border-r lg:w-72 border-base-200'>
            <div className='w-full p-5 border-b border-base-200'>
                <div className='flex items-center gap-2'>
                    <Users className=' size-6' />
                    <span className='hidden font-medium lg:block'> Contacts </span>
                </div>
                {/* todo:online filter toggle */}
            </div>
            <div className='w-full py-3 overflow-y-auto'>
                {
                    users.data?.map((user) => (
                        <button key={user._id} className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? 'bg-base-300' : ''}`} onClick={() => setSelectedUser(user)}>
                            <div className='relative mx-auto lg:mx-0'>
                                <img src={user?.profilePic} className='object-cover rounded-full size-12' />
                                {
                                    onlineUsers.includes(user._id) && (
                                        <span className='absolute bottom-0 right-0 bg-green-500 rounded-full size-3 ring-2 ring-zinc-900' />
                                    )
                                }
                                
                            </div>
                            <div className="hidden min-w-0 text-left lg:block">
                                <div className="font-medium truncate">{user.fullName}</div>
                                <div className="text-sm text-zinc-400">
                                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                                </div>
                            </div>
                        </button>
                    ))
                }
            </div>
        </aside>
    )
}

export default SideBar