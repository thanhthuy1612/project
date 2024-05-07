import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserState {
    email?: string;
    username?: string;
    image?: string;
}

const initialState: UserState = {
    email: '',
    username: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        updateUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        updateUser: (state, action: PayloadAction<UserState>) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.image = action.payload.image;
        },
        resetStateUser: () => initialState,
    },
});

export default userSlice.reducer;

export const { resetStateUser, updateUsername, updateEmail, updateUser } = userSlice.actions;
