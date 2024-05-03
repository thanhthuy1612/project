import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { ReactNode } from 'react';

export type NotificationType = 'success' | 'warning' | 'fail';

export interface NotificationState {
  placement?: NotificationPlacement;
  message?: ReactNode;
  description?: ReactNode;
  type?: NotificationType;
}

const initialState: NotificationState = {
  placement: 'topRight',
  message: '',
  description: '',
  type: 'success',
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification: (state, action: PayloadAction<NotificationState>) => {
      state.placement = action.payload?.placement ?? initialState.placement;
      state.message = action.payload?.message;
      state.description = action.payload?.description;
      state.type = action.payload?.type ?? initialState.type;
    },
    resetStateNotification: () => initialState,
  },
});

export default notificationSlice.reducer;

export const { updateNotification, resetStateNotification } =
  notificationSlice.actions;
