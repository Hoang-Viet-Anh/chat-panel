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
import { useGetChatQuery } from "@/lib/redux/api/chatApi";

export default function ChatDialog() {
    const { chatId } = useParams();
    const currentUser = useSelector((state: any) => state.chatRoom.currentUser);
    const dispatch = useDispatch();
    const { data, isLoading, isSuccess, isError } = useGetChatQuery(chatId?.toString() ?? '');
    const router = useRouter();

    useEffect(() => {
        if (isSuccess && data) {
            const { messages, user } = data;
            dispatch(setMessages(messages));
            dispatch(setCurrentUser(user));
        }

        if (isError) {
            router.push(`/`);
        }
    }, [isSuccess, isError, data])

    const isAuthorized = currentUser?.googleId != undefined;

    return (
        <>
            <div className="flex flex-row justify-between items-center w-full h-20 p-4 bg-gray-100 border-y-2 border-gray-300">
                <div className="flex items-center gap-3 w-1/2 min-w-3xs">
                    {isLoading || !isSuccess ?
                        <>
                            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
                            <p className="w-52 h-5 bg-gray-300 rounded-lg animate-pulse" />
                            <div className="w-10 h-10 bg-gray-300 rounded-lg animate-pulse" />
                        </>
                        :
                        currentUser ?
                            <>
                                <img src={currentUser.imageUrl} alt="user avatar" className="w-10 bg-white rounded-full" />
                                <h1 className="text-lg truncate">{`${currentUser.firstName} ${currentUser.lastName}`}</h1>
                                {isAuthorized ? null : <EditCurrentUser />}
                            </>
                            : null
                    }
                </div>
                <div className="flex flex-row items-center gap-4 justify-end">
                    <SearchMessage />
                    <DeleteChat />
                </div>
            </div>
            <div className={"flex-1 items-start w-full py-4 px-3 overflow-y-auto"}>
                {isLoading || !isSuccess ? null : <ChatHistory />}
            </div>
            <ChatInput />
        </>
    );
}