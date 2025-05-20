'use client'

import useToast from "@/hooks/useToast";
import { useSendMessageMutation } from "@/lib/redux/api/chatApi";
import { addMessage } from "@/lib/redux/slices/chatRoomSlice";
import { MessageStatus } from "@/lib/redux/types/Message";
import { SendHorizonal } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ChatInput() {
    const { chatId } = useParams();
    const dispatch = useDispatch();
    const [sendMessage, { isError }] = useSendMessageMutation();
    const [textInput, setTextInput] = useState('');
    const { addToast } = useToast();

    useEffect(() => {
        if (isError) {
            addToast({
                title: 'Error',
                content: 'Failed to send message',
                type: 'error'
            });
        }
    }, [isError])

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();

        const text = textInput.trim();

        if (text.length > 0) {
            dispatch(addMessage({
                chatId: chatId?.toString(),
                content: text,
                status: MessageStatus.PENDING,
            }));
            setTextInput('');
            sendMessage({
                chatId,
                content: text,
            });
        } else {
            setTextInput('');
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    }
    return (
        <>
            <div className="flex flex-row justify-start items-center w-full px-4 py-5 bg-gray-100 border-t-2 border-gray-300">
                <form className="flex items-center justify-center rounded-2xl w-full bg-white border-2 border-gray-200" onSubmit={handleSendMessage}>
                    <textarea className="ml-2 w-full rounded-2xl bg-white py-2 text-sm text-black focus-visible:outline-none resize-none"
                        placeholder="Type your message" rows={1} value={textInput} onChange={(e) => setTextInput(e.target.value)} onKeyDown={handleKeyDown} />
                    <button type="submit" className="hover:bg-gray-200 transition-all duration-100 p-2 rounded-r-lg">
                        <SendHorizonal className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </>
    );
}