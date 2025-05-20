import { setMatchedMessage } from "@/lib/redux/slices/chatRoomSlice";
import { Message } from "@/lib/redux/types/Message";
import { createRef, RefObject, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const useScrollToMessage = () => {
    const relatedMessages: Message[] = useSelector((state: any) => state.chatRoom.messages);
    const matchedMessage = useSelector((state: any) => state.chatRoom.matchedMessage);
    const messageRefs = useRef<Record<string, RefObject<HTMLDivElement | null>>>({});
    const dispatch = useDispatch();

    if (relatedMessages) {
        relatedMessages.forEach((message: Message) => {
            if (!messageRefs.current[message._id || '']) {
                messageRefs.current[message._id || ''] = createRef<HTMLDivElement>();
            }
        });
    }

    useEffect(() => {
        if (relatedMessages) {
            const length = relatedMessages.length;
            if (length > 0) {
                const lastMessage = relatedMessages[length - 1];
                const lastMessageRef = messageRefs.current[lastMessage._id || ''];
                if (lastMessageRef && lastMessageRef.current) {
                    lastMessageRef.current.scrollIntoView({ behavior: 'instant' });
                }
            }
        }
    }, [relatedMessages])

    useEffect(() => {
        if (matchedMessage) {
            const ref = messageRefs.current[matchedMessage._id ?? ''];
            if (ref.current) {
                ref.current.scrollIntoView({ behavior: 'smooth' });
                ref.current.classList.add('bg-gray-400');
                setTimeout(() => {
                    if (ref.current) {
                        ref.current.classList.remove('bg-gray-400');
                    }
                }, 1300);
            }
            dispatch(setMatchedMessage(null));
        }
    }, [matchedMessage])

    return { messageRefs };
}

export default useScrollToMessage;