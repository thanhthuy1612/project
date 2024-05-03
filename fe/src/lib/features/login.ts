import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface LoginState {
  isLoadingForm: boolean;
  isLoadingConnect: boolean;
}

const initialState: LoginState = {
  isLoadingForm: false,
  isLoadingConnect: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateIsLoadingForm: (state, action: PayloadAction<boolean>) => {
      state.isLoadingForm = action.payload;
    },
    updateIsLoadingConnect: (state, action: PayloadAction<boolean>) => {
      state.isLoadingConnect = action.payload;
    },
    resetStateLogin: () => initialState,
  },
});

export default loginSlice.reducer;

export const {
  updateIsLoadingForm,
  updateIsLoadingConnect,
  resetStateLogin,
} = loginSlice.actions;
