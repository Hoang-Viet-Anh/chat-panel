import { Chat } from "@/lib/redux/types/Chat";
import { Message } from "@/lib/redux/types/Message";
import { User } from "@/lib/redux/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Toast } from "../types/Toast";
import { UnreadCounts } from "../types/UnreadCounts";

interface AppState {
    chats: Chat[];
    users: User[];
    unreadCounts: UnreadCounts[];
    userProfile: User | null;
    chatFilter: string;
    toastStack: Toast[];
    isDrawerOpen: boolean;
    isSearchActive: boolean;
}

const initialState: AppState = {
    chats: [],
    users: [],
    unreadCounts: [],
    userProfile: null,
    chatFilter: '',
    toastStack: [],
    isDrawerOpen: false,
    isSearchActive: false,
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
        setUnreadCounts: (state, action: PayloadAction<UnreadCounts[]>) => {
            state.unreadCounts = action.payload;
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
        clearToasts: (state) => {
            state.toastStack = [];
        },
        setDrawerOpen: (state, action: PayloadAction<boolean>) => {
            state.isDrawerOpen = action.payload;
        },
        setIsSearchActive: (state, action: PayloadAction<boolean>) => {
            state.isSearchActive = action.payload;
        },
    },
});

export const {
    setChats,
    setUsers,
    setUnreadCounts,
    setLastMessage,
    setUserProfile,
    setChatFilter,
    pushToast,
    removeToast,
    clearToasts,
    setDrawerOpen,
    setIsSearchActive,
} = appSlice.actions;

export default appSlice.reducer;