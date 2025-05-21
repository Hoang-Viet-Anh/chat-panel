'use client'

import useScrollToMessage from "@/hooks/useScrollToMessage";
import type { Message } from "@/lib/redux/types/Message";
import { format } from "date-fns";
import { Check } from "lucide-react";
import { useSelector } from "react-redux";

interface MessageComponentProps {
    message: Message;
}

export default function MessageComponent({ message }: MessageComponentProps) {
    const interlocutor = useSelector((state: any) => state.chatRoom.currentUser);
    const messageDate = format(new Date(message.createdAt ?? Date.now()), 'MM/dd/yyyy, h:mm a');
    const isMessageByUser = message.sender !== interlocutor?._id;
    const { messageRefs } = useScrollToMessage();

    return (
        <div className={"flex flex-row items-start w-full gap-3 pb-4 transition-all p-1 rounded-lg duration-300 " + (isMessageByUser ? 'justify-end' : '')}
            ref={messageRefs.current[message._id || '']}>
            {isMessageByUser ? null : <img src={interlocutor?.imageUrl} alt="user avatar" className="w-10 rounded-full bg-white" />}
            <div className={"flex flex-col gap-1 max-w-3xl " + (isMessageByUser ? 'items-end' : 'items-start')}>
                <div className={"flex items-center rounded-3xl py-2 px-3 " +
                    (isMessageByUser ? 'bg-gray-300 text-black' : 'bg-gray-600 text-white')}>
                    <p className="whitespace-pre-wrap break-before-words [overflow-wrap:anywhere]">{message.content}</p>
                </div>
                <div className="flex flex-row gap-1 items-center text-gray-500">
                    <p className="text-xs">{messageDate}</p>
                    {isMessageByUser ?
                        <Check className="w-4 h-4" /> : null
                    }
                </div>
            </div>
        </div>
    )
}