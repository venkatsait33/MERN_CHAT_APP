import { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeltons/SidebarSkeleton'
import { Users } from 'lucide-react'

const SideBar = () => {
    const { setSelectedUser, getUsers, users, selectedUser, isUserLoading } = useChatStore()

    const onlineUsers = () => { }

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
                
            </div>
        </aside>
    )
}

export default SideBar