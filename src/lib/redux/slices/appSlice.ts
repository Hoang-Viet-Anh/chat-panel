import { Chat } from "@/lib/redux/types/Chat";
import { Message } from "@/lib/redux/types/Message";
import { User } from "@/lib/redux/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Toast } from "../types/Toast";

interface AppState {
    chats: Chat[];
    users: User[];
    userProfile: User | null;
    chatFilter: string;
    toastStack: Toast[];
}

const initialState: AppState = {
    chats: [],
    users: [],
    userProfile: null,
    chatFilter: '',
    toastStack: [],
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<User | null>) => {
            state.userProfile = action.payload;
        },
        setChatFilter: (state, action: PayloadAction<string>) => {
            state.chatFilter = action.payload;
        },
        setChats: (state, action: PayloadAction<Chat[]>) => {
            state.chats = action.payload;
        },
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        setLastMessage: (state, action: PayloadAction<{ chatId: string, message: Message, date?: string }>) => {
            const { chatId, message, date } = action.payload;
            const chat = state.chats.find(chat => chat._id === chatId);
            if (chat) {
                chat.lastMessage = {
                    content: message.content,
                    timestamp: new Date(date ?? Date.now()).toISOString(),
                }
            }
        },
        pushToast: (state, action: PayloadAction<Toast>) => {
            state.toastStack.push(action.payload);
        },
        removeToast: (state, action: PayloadAction<string>) => {
            state.toastStack = state.toastStack.filter(toast => toast.id !== action.payload);
        },
    },
});

export const {
    setChats,
    setUsers,
    setLastMessage,
    setUserProfile,
    setChatFilter,
    pushToast,
    removeToast
} = appSlice.actions;

export default appSlice.reducer;