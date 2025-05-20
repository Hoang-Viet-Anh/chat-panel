import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/User";

interface UserSuggestonState {
    selectedUser: User | null;
    filter: string;
}

const initialState: UserSuggestonState = {
    selectedUser: null,
    filter: '',
};

const userSuggestionSlice = createSlice({
    name: 'userSuggestion',
    initialState,
    reducers: {
        setSelectedUser: (state, action: PayloadAction<User | null>) => {
            state.selectedUser = action.payload;
        },
        setFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        },
    },
});

export const {
    setSelectedUser,
    setFilter,
} = userSuggestionSlice.actions;

export default userSuggestionSlice.reducer;