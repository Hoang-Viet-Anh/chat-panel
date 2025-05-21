'use client'

import { chatApi } from "@/lib/redux/api/chatApi";
import { clearChatRoom } from "@/lib/redux/slices/chatRoomSlice";
import { AppDispatch } from "@/lib/redux/store";
import { Chat } from "@/lib/redux/types/Chat";
import { UnreadCounts } from "@/lib/redux/types/UnreadCounts";
import { User } from "@/lib/redux/types/User";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

interface NavigationElementProps {
    user: User;
    isNotification?: boolean;
}

export default function NavigationElement({ user, isNotification }: NavigationElementProps) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const chats: Chat[] = useSelector((state: any) => state.app.chats);
    const unreadCounts: UnreadCounts[] = useSelector((state: any) => state.app.unreadCounts);

    const currentChat = chats.find(chat => chat.users.includes(user._id!));
    const lastMessage = currentChat?.lastMessage;
    const lastMessageDate = lastMessage?.timestamp !== undefined ? format(new Date(lastMessage?.timestamp ?? Date.now()), 'MMM dd, yyyy') : '';
    const count = unreadCounts.find(unreadCount => unreadCount.chatId === currentChat?._id)?.count;

    const handleClick = () => {
        router.push(`/chat/${currentChat?._id}`);
    }

    const prefetchMessages = () => {
        if (!currentChat?._id)
            return;
        dispatch(chatApi.util.prefetch('getChat', currentChat._id, { force: false }));
    }

    return (
        <>
            <button type="button" onClick={handleClick} onMouseEnter={prefetchMessages}
                className={`flex flex-row items-start justify-between text-left gap-3 w-full h-20 py-4 px-2 select-none transition-all duration-100 disabled:hover:bg-inherit ${isNotification ? '' : 'border-b-2 border-gray-300 hover:bg-gray-200 '}`}>
                <div className="flex flex-row items-center gap-2 w-full">
                    <img
                        src={user.imageUrl}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/user-round1.svg';
                        }}
                        alt=""
                        className="w-10 h-10 object-cover rounded-full bg-white" />
                    <div className="flex flex-col gap-1 items-start w-full overflow-hidden">
                        <h1 className="text-base truncate w-full max-w-2xs">{`${user.firstName} ${user.lastName}`}</h1>
                        <p className="text-sm font-light text-gray-500 line-clamp-1">{lastMessage?.content}</p>
                    </div>
                </div>
                {isNotification ? null :
                    <div className="flex flex-col items-end h-full gap-1">
                        <p className="font-light text-xs text-nowrap text-gray-500">{lastMessageDate}</p>
                        {count === undefined || count === 0 ? null :
                            <div className="flex items-center px-2.5 py-1.5 rounded-full bg-gray-300 text-white">
                                <p className="text-xs">{count}</p>
                            </div>
                        }
                    </div>
                }
            </button>
        </>
    )
}