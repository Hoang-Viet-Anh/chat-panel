import { Message } from '@/lib/redux/types/Message';
import { User } from '@/lib/redux/types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatRoomState {
    currentUser: User | null;
    messages: Message[];
    matchedMessage: Message | null;
}

const initialState: ChatRoomState = {
    currentUser: null,
    messages: [],
    matchedMessage: null,
};

const ChatRoomSlice = createSlice({
    name: 'chatRoom',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
        },
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.unshift(action.payload);
        },
        clearChatRoom: (state) => {
            state.currentUser = null;
            state.messages = [];
        },
        setMatchedMessage: (state, action: PayloadAction<Message | null>) => {
            state.matchedMessage = action.payload;
        },
    },
});

export const {
    setCurrentUser,
    setMessages,
    addMessage,
    clearChatRoom,
    setMatchedMessage,
} = ChatRoomSlice.actions;

export default ChatRoomSlice.reducer;