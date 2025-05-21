'use client'

import ChatHistory from "@/components/chat/ChatHistory";
import ChatInput from "@/components/chat/ChatInput";
import DeleteChat from "@/components/chat/DeleteChat";
import EditCurrentUser from "@/components/chat/EditName";
import { useDispatch, useSelector } from "react-redux";
import SearchMessage from "@/components/chat/SearchMessage";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { setCurrentUser, setMessages } from "@/lib/redux/slices/chatRoomSlice";
import { chatApi, useGetChatQuery } from "@/lib/redux/api/chatApi";
import { UnreadCounts } from "@/lib/redux/types/UnreadCounts";
import IconButton from "@/components/ui/IconButton";
import { ArrowLeft, EllipsisVertical } from "lucide-react";

export default function ChatDialog() {
    const { chatId } = useParams();
    const currentUser = useSelector((state: any) => state.chatRoom.currentUser);
    const dispatch = useDispatch();
    const isSearchActive = useSelector((state: any) => state.app.isSearchActive);
    const unreadCounts: UnreadCounts[] = useSelector((state: any) => state.app.unreadCounts);
    const amount = unreadCounts.find(unreadCount => unreadCount.chatId === chatId?.toString())?.count;
    const { data, isLoading, isSuccess, isError, refetch } = useGetChatQuery(chatId?.toString() ?? '');
    const router = useRouter();

    useEffect(() => {
        if (isSuccess && data) {
            const { messages, user } = data;
            dispatch(setMessages(messages));
            dispatch(setCurrentUser(user));
            dispatch(chatApi.util.invalidateTags(['chat']));
        }

        if (isError) {
            router.push(`/`);
        }
    }, [isSuccess, isError, data])

    useEffect(() => {
        if (amount && amount > 0) {
            refetch();
        }
    }, [amount])

    const isAuthorized = currentUser?.googleId != undefined;

    return (
        <>
            <div className="flex flex-row justify-between items-center w-full p-2 h-[58px] lg:h-20 lg:p-4 lg:bg-gray-100 border-b-2 lg:border-y-2 border-gray-300">
                <div className={"flex items-center gap-3 w-full lg:w-1/2 min-w-3xs" +
                    (isSearchActive ? " hidden lg:flex " : "")
                }>
                    {isLoading || !isSuccess ?
                        <>
                            <div className="w-11 h-10 bg-gray-300 rounded-lg animate-pulse" />
                            <div className="w-9 h-8 lg:w-10 lg:h-10 bg-gray-300 rounded-full animate-pulse" />
                            <p className="w-52 h-5 bg-gray-300 rounded-lg animate-pulse" />
                            <div className="hidden lg:flex w-10 h-10 bg-gray-300 rounded-lg animate-pulse" />
                        </>
                        :
                        currentUser ?
                            <>
                                <IconButton type="button" className="rounded-lg" onClick={() => router.push(`/`)}>
                                    <ArrowLeft />
                                </IconButton>
                                <img
                                    src={currentUser.imageUrl}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/user-round1.svg';
                                    }}
                                    alt="user avatar"
                                    className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-200 lg:bg-white rounded-full object-cover" />
                                <h1 className="lg:text-lg truncate">{`${currentUser.firstName} ${currentUser.lastName}`}</h1>
                                {isAuthorized ? null : <EditCurrentUser />}
                            </>
                            : null
                    }
                </div>
                <div className="flex flex-row items-center gap-1 lg:gap-4 justify-end">
                    <SearchMessage />
                    <div className={isSearchActive ? "hidden lg:flex" : ""}>
                        <DeleteChat />
                    </div>
                </div>
            </div>
            <div className="flex flex-col-reverse h-full w-full py-4 px-3 overflow-y-auto">
                {isLoading || !isSuccess || (amount && amount > 0) ? null : <ChatHistory />}
            </div>
            <ChatInput />
        </>
    );
}