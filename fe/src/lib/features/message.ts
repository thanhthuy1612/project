import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IDataListFriend } from '../../interface/IDataListFriend';
import { IListUser, IMessage } from '../../interface/IMessage';

export interface MessageState {
    selectedMessage?: IDataListFriend;
    isLoadingListMessage: boolean;
    listMessage: IMessage[];
    totalListMessage: number;
    pageNumberListMessage: number;
    isLoadingListFriendMessage: boolean;
    listFriendMessage: IDataListFriend[];
    totalListFriendMessage: number;
    pageNumberListFriendMessage: number;
    listUserInMessageSelected: IListUser[];
}

const initialState: MessageState = {
    selectedMessage: undefined,
    isLoadingListMessage: false,
    listMessage: [],
    totalListMessage: 0,
    pageNumberListMessage: 1,
    isLoadingListFriendMessage: false,
    listFriendMessage: [],
    totalListFriendMessage: 0,
    pageNumberListFriendMessage: 1,
    listUserInMessageSelected: [],
};

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        updateSelectedMessage: (state, action: PayloadAction<IDataListFriend | undefined>) => {
            state.selectedMessage = action.payload;
        },
        updateIsLoadingListMessage: (state, action: PayloadAction<boolean>) => {
            state.isLoadingListMessage = action.payload;
        },
        updateListMessage: (state, action: PayloadAction<IMessage[]>) => {
            state.listMessage = action.payload;
        },
        updateTotalListMessage: (state, action: PayloadAction<number>) => {
            state.totalListMessage = action.payload;
        },
        updatePageNumberListMessage: (state, action: PayloadAction<number>) => {
            state.pageNumberListMessage = action.payload;
        },
        updateIsLoadingListFriendMessage: (state, action: PayloadAction<boolean>) => {
            state.isLoadingListFriendMessage = action.payload;
        },
        updateListFriendMessage: (state, action: PayloadAction<IDataListFriend[]>) => {
            state.listFriendMessage = action.payload;
        },
        updateTotalListFriendMessage: (state, action: PayloadAction<number>) => {
            state.totalListFriendMessage = action.payload;
        },
        updatePageNumberListFriendMessage: (state, action: PayloadAction<number>) => {
            state.pageNumberListFriendMessage = action.payload;
        },
        updateListUserInMessageSelected: (state, action: PayloadAction<IListUser[]>) => {
            state.listUserInMessageSelected = action.payload;
        },
        resetStateMessage: () => initialState,
    },
});

export default messageSlice.reducer;

export const {
    updateIsLoadingListMessage,
    updateSelectedMessage,
    updateTotalListMessage,
    updateListMessage,
    updatePageNumberListMessage,
    updateIsLoadingListFriendMessage,
    updateListFriendMessage,
    updateTotalListFriendMessage,
    updatePageNumberListFriendMessage,
    updateListUserInMessageSelected,
    resetStateMessage,
} = messageSlice.actions;
