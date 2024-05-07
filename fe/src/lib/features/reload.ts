import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ReloadState {
    isLoadingPage: boolean;
}

const initialState: ReloadState = {
    isLoadingPage: false,
};

export const reloadSlice = createSlice({
    name: 'reload',
    initialState,
    reducers: {
        updateIsLoadingPage: (state, action: PayloadAction<boolean>) => {
            state.isLoadingPage = action.payload;
        },
        resetStateReload: () => initialState,
    },
});

export default reloadSlice.reducer;

export const { updateIsLoadingPage, resetStateReload } = reloadSlice.actions;
