import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../interface/IUser';

const initialState: IUser = {
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
        updateUser: (_state, action: PayloadAction<IUser>) => {
            return action.payload;
        },
        resetStateUser: () => initialState,
    },
});

export default userSlice.reducer;

export const { resetStateUser, updateUsername, updateEmail, updateUser } = userSlice.actions;
