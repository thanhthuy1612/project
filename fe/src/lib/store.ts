import { configureStore } from '@reduxjs/toolkit';
import notificationSlice from './features/notification';
import loginSlice from './features/login';
import userSlice from './features/userSlice';
import reloadSlice from './features/reload';
import messageSlice from './features/message';

export const makeStore = () => {
    return configureStore({
        reducer: {
            notification: notificationSlice,
            login: loginSlice,
            user: userSlice,
            reload: reloadSlice,
            message: messageSlice,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
