'use client'

import { Message } from "@/lib/redux/types/Message";
import useScrollToMessage from "@/hooks/useScrollToMessage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setLastMessage } from "@/lib/redux/slices/appSlice";
import { useParams } from "next/navigation";
import MessageComponent from "./MessageComponent";

export default function ChatHistory() {
    const { chatId } = useParams();
    const messages: Message[] = useSelector((state: any) => state.chatRoom.messages);
    const dispatch = useDispatch();

    useEffect(() => {
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage._id === undefined) {
                dispatch(setLastMessage({ chatId: chatId?.toString() ?? '', message: lastMessage }));
            }
        }
    }, [messages])

    return (
        messages.length === 0 ?
            <div className="flex flex-col items-center justify-center w-full h-full">
                <h1 className="text-center">Start chat by sending a message</h1>
            </div>
            :
            messages.map((message: Message, index: number) => {
                return (
                    <div key={message._id ?? index}>
                        <MessageComponent message={message} />
                    </div>
                )
            })
    );
}