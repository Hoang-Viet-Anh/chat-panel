import { useDispatch, useSelector } from "react-redux";
import { User } from "@/lib/redux/types/User";
import { Chat } from "@/lib/redux/types/Chat";
import { Toast } from "@/lib/redux/types/Toast";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { pushToast, removeToast } from "@/lib/redux/slices/appSlice";

const useToast = () => {
    const toastStack: Toast[] = useSelector((state: any) => state.app.toastStack);
    const chats: Chat[] = useSelector((state: any) => state.app.chats);
    const router = useRouter();
    const dispatch = useDispatch();

    const addToast = (toast: Toast) => {
        toast.id = uuidv4();
        dispatch(pushToast(toast));
    }

    const handleClose = (id: string, e?: any) => {
        if (e) {
            e.stopPropagation();
        }
        dispatch(removeToast(id));
    }

    const navigateToChat = (id: string, user?: User) => {
        if (user) {
            const currentChat = chats.find(chat => chat.users.includes(user._id!));
            router.push(`/chat/${currentChat?._id}`);
            handleClose(id);
        }
    }

    return {
        toastStack, addToast,
        handleClose, navigateToChat
    };
}

export default useToast;