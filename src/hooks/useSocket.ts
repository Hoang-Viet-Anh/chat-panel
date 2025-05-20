import { chatApi } from "@/lib/redux/api/chatApi";
import { addMessage } from "@/lib/redux/slices/chatRoomSlice";
import socket from "@/lib/socket/socket";
import { Message } from "@/lib/redux/types/Message";
import { User } from "@/lib/redux/types/User";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useToast from "./useToast";
import { useParams } from "next/navigation";

const useSocket = () => {
    const { chatId } = useParams();
    const userProfile = useSelector((state: any) => state.app.userProfile);
    const users: User[] = useSelector((state: any) => state.app.users);
    const { addToast } = useToast();
    const dispatch = useDispatch();

    const currentChatRef = useRef(chatId);
    const usersRef = useRef(users);

    useEffect(() => {
        currentChatRef.current = chatId;
        usersRef.current = users;
    }, [chatId, users]);


    useEffect(() => {
        if (userProfile) {
            socket.emit('joinUserRoom');
        }


        socket.on('newMessage', handleNewMessage)

        socket.on('chatDeleted', () => dispatch(chatApi.util.invalidateTags(['chat'])));


        return () => {
            socket.off('newMessage');
        }
    }, [userProfile])

    const handleNewMessage = (message: Message) => {
        const currentChatId = currentChatRef.current;
        if (currentChatId === message.chatId) {
            dispatch(addMessage(message));
        } else {
            const sender = usersRef.current.find(user => user._id === message.sender);
            addToast({ title: 'New message', content: message.content, sender: sender, type: 'info' });
        }
        dispatch(chatApi.util.invalidateTags(['chat', { type: 'message', id: message.chatId }]));
    }
}

export default useSocket;