import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../interface/IUser';
import { urlImg } from '../../api/url';

const initialState: IUser = {
    email: '',
    username: '',
    havePassword: false
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
            const ava = action.payload?.ava;
            const banner = action.payload?.banner;
            return {
                ...action.payload,
                ava: ava ? `${urlImg}${ava}` : undefined,
                banner: banner ? `${urlImg}${banner}` : undefined,
            };
        },
        resetStateUser: () => initialState,
    },
});

export default userSlice.reducer;

export const { resetStateUser, updateUsername, updateEmail, updateUser } = userSlice.actions;
