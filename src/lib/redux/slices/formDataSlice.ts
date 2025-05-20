import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormDataState {
    firstName: string;
    lastName: string;
}

const initialState: FormDataState = {
    firstName: '',
    lastName: '',
};

const formDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        setFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action: PayloadAction<string>) => {
            state.lastName = action.payload;
        },
    },
});

export const {
    setFirstName,
    setLastName,
} = formDataSlice.actions;

export default formDataSlice.reducer;