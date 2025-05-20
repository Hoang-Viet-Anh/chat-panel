'use client'

import type { Message } from "@/lib/redux/types/Message";
import { format } from "date-fns";
import { Check } from "lucide-react";
import { useSelector } from "react-redux";

interface MessageComponentProps {
    message: Message;
    ref: React.RefObject<HTMLDivElement | null>;
}

export default function MessageComponent({ message, ref }: MessageComponentProps) {
    const currentUser = useSelector((state: any) => state.chatRoom.currentUser);
    const messageDate = format(new Date(message.timestamp ?? Date.now()), 'MM/dd/yyyy, h:mm a');

    return (
        message.sender === currentUser?._id ?
            <div className="flex flex-row items-start w-full gap-3 pb-4 transition-all p-1 rounded-lg duration-300 " ref={ref}>
                <img src={currentUser?.imageUrl} alt="user avatar" className="w-10 rounded-full bg-white" />
                <div className="flex flex-col gap-1 items-start max-w-1/2">
                    <div className="flex items-center rounded-3xl bg-gray-600 py-2 px-3">
                        <p className="text-white whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500">{messageDate}</p>
                </div>
            </div>
            :
            <div className="flex flex-row items-end justify-end w-full gap-3 pb-4 transition-all rounded-lg p-1 duration-300 " ref={ref}>
                <div className="flex flex-col gap-1 items-end max-w-1/2">
                    <div className="flex items-center rounded-3xl bg-gray-300 py-2 px-3">
                        <p className="text-black whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <div className="flex flex-row gap-1 items-center text-gray-500">
                        <p className="text-xs ">{messageDate}</p>
                        <Check className="w-4 h-4" />
                    </div>
                </div>
            </div>
    )
}