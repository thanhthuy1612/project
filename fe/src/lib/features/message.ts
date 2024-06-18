import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IDataListFriend } from '../../interface/IDataListFriend';

export interface MessageState {
    selectedMessage?: IDataListFriend;
    itemSearch?: IDataListFriend;
}

const initialState: MessageState = {
    selectedMessage: undefined,
};

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        updateSelectedMessage: (state, action: PayloadAction<IDataListFriend>) => {
            state.selectedMessage = action.payload;
        },
        updateItemSearch: (state, action: PayloadAction<IDataListFriend>) => {
            state.itemSearch = action.payload;
        },
        resetStateMessage: () => initialState,
    },
});

export default messageSlice.reducer;

export const { updateSelectedMessage, updateItemSearch, resetStateMessage } = messageSlice.actions;
